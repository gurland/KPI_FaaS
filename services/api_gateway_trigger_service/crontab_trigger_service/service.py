from typing import Callable, AsyncIterator, Sequence, AsyncIterable

import grpclib
from betterproto.grpc.grpclib_client import MetadataLike
from sqlalchemy.orm import Session

from .contracts.faas import ApiGatewayServiceBase, ApiGatewayTriggerConfiguration, DetailedApiGatewayTrigger, Empty, \
    GetApiGatewayTriggersRequest
from .models import engine, APIGatewayTriggerModel


class APIGatewayService(ApiGatewayServiceBase):
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

    def rpc_call_with_metadata(
        self, handler: Callable
    ) -> None:
        # TODO: rewrite this
        async def f(stream: grpclib.server.Stream):
            request = await stream.recv_message()
            response = await handler(request, metadata=stream.metadata)
            await stream.send_message(response)

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

    async def create_api_gateway_trigger(
        self, api_gateway_trigger_configuration: ApiGatewayTriggerConfiguration
    ) -> DetailedApiGatewayTrigger:
        pass

    async def get_all_api_gateway_triggers(
            self,
            empty: Empty,
            metadata: MetadataLike = None
    ) -> AsyncIterator[DetailedApiGatewayTrigger]:
        user_id = metadata.get("user-id")

        with Session(engine) as session:
            triggers: Sequence[APIGatewayTriggerModel] = session.query(APIGatewayTriggerModel).filter(
                APIGatewayTriggerModel.user_id == user_id
            )

            for api_gateway_trigger in triggers:
                yield api_gateway_trigger.to_crontab_message()

    async def get_api_gateway_triggers(
            self,
            request: GetApiGatewayTriggersRequest,
            metadata: MetadataLike = None
    ) -> AsyncIterator[DetailedApiGatewayTrigger]:
        user_id = metadata.get("user-id")

        with Session(engine) as session:
            triggers: Sequence[APIGatewayTriggerModel] = session.query(APIGatewayTriggerModel).filter(
                APIGatewayTriggerModel.user_id == user_id,
                APIGatewayTriggerModel.function_id == request.function_id
            )

            for api_gateway_trigger in triggers:
                yield api_gateway_trigger.to_crontab_message()
