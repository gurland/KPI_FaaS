from typing import Callable

import grpclib
from betterproto.grpc.grpclib_client import MetadataLike

from .contracts.faas import CrontabTriggerServiceBase, CrontabTriggerConfiguration, Empty


class CrontabService(CrontabTriggerServiceBase):
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

            new_mapping[route] = grpclib.const.Handler(
                self.rpc_call_with_metadata(handler_method), cardinality, request_type, reply_type
            )

        return new_mapping

    async def create_crontab_trigger(
            self,
            crontab_trigger_configuration: CrontabTriggerConfiguration,
            metadata: MetadataLike = None
    ) -> Empty:
        user_id = metadata.get("user-id")

        pass
