from typing import Callable, AsyncIterable, AsyncIterator

import grpclib
from betterproto.grpc.grpclib_client import MetadataLike
from grpclib import GRPCError, Status
from sqlalchemy import select
from sqlalchemy.orm import Session

from .contracts.faas import FunctionServiceBase, FunctionConfiguration, DetailedFunction, Empty, BriefFunction, \
    ChangeFunctionCodeRequest, ChangeFunctionRuntimeRequest, GetFunctionDetailsRequest
from .models import FunctionModel, engine


class FunctionService(FunctionServiceBase):
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

    def __mapping__(self) -> dict[str, grpclib.const.Handler]:
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

    async def create_function(
        self, request: FunctionConfiguration, metadata: MetadataLike = None
    ) -> DetailedFunction:
        user_id = metadata.get("user-id")

        with Session(engine) as session:
            existing_function: FunctionModel | None = session.query(FunctionModel).filter(
                FunctionModel.name == request.function_name,
                FunctionModel.user_id == user_id
            ).first()

            if existing_function:
                raise GRPCError(
                    Status.ALREADY_EXISTS,
                    f"Function with name '{request.function_name} already exists!"
                )

            function_model = FunctionModel(
                runtime_tag=request.runtime_tag,
                user_id=user_id,
                name=request.function_name,
                code=request.code
            )
            session.add(function_model)
            session.commit()

            return function_model.to_detailed_function()

    async def change_function_code(
        self, request: ChangeFunctionCodeRequest, metadata: MetadataLike = None
    ) -> DetailedFunction:
        user_id = metadata.get("user-id")

        with Session(engine) as session:
            existing_function: FunctionModel | None = session.query(FunctionModel).where(
                FunctionModel.id == request.function_id,
                FunctionModel.user_id == user_id
            ).first()

            if not existing_function:
                raise GRPCError(
                    Status.NOT_FOUND,
                    f"Function with ID '{request.function_id}' does not exist",
                )

            existing_function.code = request.code
            session.commit()

            return existing_function.to_detailed_function()

    async def change_function_runtime(
        self, request: ChangeFunctionRuntimeRequest, metadata: MetadataLike = None
    ) -> DetailedFunction:
        user_id = metadata.get("user-id")

        with Session(engine) as session:
            existing_function: FunctionModel | None = session.query(FunctionModel).where(
                FunctionModel.id == request.function_id,
                FunctionModel.user_id == user_id
            ).first()

            if not existing_function:
                raise GRPCError(
                    Status.NOT_FOUND,
                    f"Function with ID '{request.function_id}' does not exist",
                )

            existing_function.runtime_tag = request.runtime_tag
            session.commit()

            return existing_function.to_detailed_function()

    async def get_function(
            self, request: GetFunctionDetailsRequest, metadata: MetadataLike = None
    ) -> DetailedFunction:
        user_id = metadata.get("user-id")

        with Session(engine) as session:
            existing_function: FunctionModel | None = session.query(FunctionModel).filter(
                FunctionModel.id == request.function_id,
                FunctionModel.user_id == user_id
            ).first()

            if not existing_function:
                raise GRPCError(
                    Status.NOT_FOUND,
                    f"Function with ID '{request.function_id}' does not exist",
                )

            return existing_function.to_detailed_function()

    async def get_functions(
            self, request: Empty, metadata: MetadataLike = None
    ) -> AsyncIterator[BriefFunction]:
        user_id = metadata.get("user-id")

        with Session(engine) as session:
            functions_query = select(FunctionModel).where(
                FunctionModel.user_id == user_id
            )

            for function in session.scalars(functions_query):
                yield function.to_brief_function()

    async def delete_function(
            self, request: BriefFunction, metadata: MetadataLike = None
    ) -> Empty:
        user_id = metadata.get("user-id")

        with Session(engine) as session:
            existing_function: FunctionModel | None = session.query(FunctionModel).filter(
                FunctionModel.id == request.function_name,
                FunctionModel.user_id == user_id
            ).first()

            if not existing_function:
                raise GRPCError(
                    Status.NOT_FOUND,
                    f"Function with id '{request.function_id}' does not exist",
                )

            session.delete(existing_function)
            return Empty()
