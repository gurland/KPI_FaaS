from typing import AsyncIterator, Dict, Callable
import tarfile
import io

import grpclib
from betterproto.grpc.grpclib_client import MetadataLike
from sqlalchemy import select
from grpclib import GRPCError, Status
from sqlalchemy.orm import Session

from .cfg import DOCKER_REGISTRY_URL
from .docker_image import DockerImage
from .contracts.faas import RuntimeServiceBase, CreateRuntimeRequest, BriefRuntime, DetailedRuntime, Empty, User
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

    def __mapping__(self) -> Dict[str, grpclib.const.Handler]:
        existing_mapping = super().__mapping__()
        new_mapping = {}

        for route, mapping in existing_mapping.items():
            __rpc_func, cardinality, request_type, reply_type = mapping

            handler_method_name = __rpc_func.__name__.removeprefix("__rpc_")
            handler_method = getattr(self, handler_method_name)

            new_mapping[route] = grpclib.const.Handler(
                self.rpc_call_with_metadata(handler_method), cardinality, request_type, reply_type
            )

        return new_mapping



    async def create_runtime(
        self, request: CreateRuntimeRequest, metadata: MetadataLike = None
    ) -> BriefRuntime:
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
        print(user_id, metadata)

        container = DockerImage(tag=request.tag, dockerfile=request.dockerfile, registry_url=DOCKER_REGISTRY_URL)
        container.build()
        container.push()

        # TODO: add correct database record creation

        return BriefRuntime(
            tag=request.tag, registry_url="qweqwe"
        )

        new_runtime = RuntimeModel(
            user_id=request.user.user_id,
            tag=request.tag,
            registry_url=request.registry_url,
            dockerfile=request.dockerfile,
        )
        session.add(new_runtime)
        session.commit()
        return new_runtime.to_runtime_message()

    async def get_runtime_tags(self, _request: Empty) -> AsyncIterator[BriefRuntime]:
        with Session(engine) as session:
            runtime_models_query = select(RuntimeModel)
            for runtime_model in session.scalars(runtime_models_query):
                yield runtime_model.to_brief_runtime()
