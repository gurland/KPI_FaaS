from typing import AsyncIterator, Dict, Callable, AsyncIterable
import tarfile
import io

import grpclib
from betterproto.grpc.grpclib_client import MetadataLike
from sqlalchemy import select, func
from grpclib import GRPCError, Status
from sqlalchemy.orm import Session

from .cfg import DOCKER_REGISTRY_URL, logger
from .docker_image import DockerImage
from .contracts.faas import RuntimeServiceBase, RuntimeConfiguration, BriefRuntime, DetailedRuntime, Empty, \
    UpdatedRuntimeResponse, Logs
from .models import RuntimeModel, engine
import docker


class RuntimeService(RuntimeServiceBase):
    def rpc_call_with_metadata(
        self, handler: Callable
    ) -> None:
        # TODO: rewrite this
        async def f(stream: grpclib.server.Stream):
            request = await stream.recv_message()
            response = await handler(request, metadata=stream.metadata)
            await stream.send_message(response)

        return f

    def rpc_call_with_metadata_server_stream(self, handler: Callable):
        async def f(stream: grpclib.server.Stream):
            request = await stream.recv_message()

            response_iter = handler(request, metadata=stream.metadata)
            # check if response is actually an AsyncIterator
            # this might be false if the method just returns without
            # yielding at least once
            # in that case, we just interpret it as an empty iterator
            if isinstance(response_iter, AsyncIterable):
                async for response_message in response_iter:
                    await stream.send_message(response_message)
            else:
                response_iter.close()

        return f

    def __mapping__(self) -> Dict[str, grpclib.const.Handler]:
        existing_mapping = super().__mapping__()
        new_mapping = {}

        for route, mapping in existing_mapping.items():
            __rpc_func, cardinality, request_type, reply_type = mapping

            handler_method_name = __rpc_func.__name__.removeprefix("__rpc_")
            handler_method = getattr(self, handler_method_name)

            if cardinality == grpclib.const.Cardinality.UNARY_STREAM:
                new_mapping[route] = grpclib.const.Handler(
                    self.rpc_call_with_metadata_server_stream(handler_method), cardinality, request_type, reply_type
                )
            else:
                new_mapping[route] = grpclib.const.Handler(
                    self.rpc_call_with_metadata(handler_method), cardinality, request_type, reply_type
                )

        return new_mapping

    async def create_runtime(
            self, request: RuntimeConfiguration, metadata: MetadataLike = None
    ) -> UpdatedRuntimeResponse:
        with Session(engine) as session:
            existing_runtime: RuntimeModel | None = session.query(RuntimeModel).filter(
                RuntimeModel.tag == request.tag
            ).first()

            if existing_runtime:
                raise GRPCError(
                    Status.ALREADY_EXISTS,
                    f"Runtime with tag '{request.tag}' already exists",
                )

        user_id = metadata.get("user-id")

        image = DockerImage(
            tag=request.tag,
            dockerfile=request.dockerfile,
            base_registry_url=DOCKER_REGISTRY_URL
        )

        try:
            image.build()
            image_url = image.push()
        except Exception as e:
            raise GRPCError(
                Status.INVALID_ARGUMENT,
                f"Could not properly build or push the image. Error: {e}"
            )

        new_runtime = RuntimeModel(
            user_id=user_id,
            tag=request.tag,
            registry_url=image_url,
            dockerfile=request.dockerfile,
        )

        session.add(new_runtime)
        session.commit()

        return UpdatedRuntimeResponse(
            runtime=new_runtime.to_deatiled_runtime(),
            logs=Logs(
                log_lines=image.logs
            )
        )

    async def edit_runtime(
            self, request: RuntimeConfiguration, metadata: MetadataLike = None
    ) -> UpdatedRuntimeResponse:
        with Session(engine) as session:
            existing_runtime: RuntimeModel | None = session.query(RuntimeModel).filter(
                RuntimeModel.tag == request.tag
            ).first()

            if not existing_runtime:
                raise GRPCError(
                    Status.NOT_FOUND,
                    f"Runtime with tag '{request.tag}' does not exist",
                )

            image = DockerImage(
                tag=request.tag,
                dockerfile=request.dockerfile,
                base_registry_url=DOCKER_REGISTRY_URL
            )

            try:
                image.build()
                image_url = image.push()
            except Exception as e:
                raise GRPCError(
                    Status.INVALID_ARGUMENT,
                    f"Could not properly build or push the image. Error: {e}"
                )

            existing_runtime.dockerfile = request.dockerfile
            existing_runtime.registry_url = image_url
            session.commit()

            return UpdatedRuntimeResponse(
                runtime=existing_runtime.to_deatiled_runtime(),
                logs=Logs(
                    log_lines=image.logs
                )
            )

    async def get_runtime_tags(
            self, _request: Empty, metadata: MetadataLike = None
    ) -> AsyncIterator[BriefRuntime]:
        with Session(engine) as session:
            runtime_models_query = select(RuntimeModel)
            count = session.query(func.count(RuntimeModel.tag)).scalar()

            logger.info("count: %s", count)
            for runtime_model in session.scalars(runtime_models_query):
                logger.info(f"Found runtime model: {runtime_model}")
                yield runtime_model.to_brief_runtime()

    async def get_runtime_details(
        self, request: BriefRuntime, metadata: MetadataLike = None
    ) -> DetailedRuntime:
        with Session(engine) as session:
            existing_runtime: RuntimeModel | None = session.query(RuntimeModel).filter(
                RuntimeModel.tag == request.tag
            ).first()

            if not existing_runtime:
                raise GRPCError(
                    Status.NOT_FOUND,
                    f"Runtime with tag '{request.tag}' does not exist",
                )

            return existing_runtime.to_deatiled_runtime()
