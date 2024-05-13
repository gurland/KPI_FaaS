from typing import Callable, AsyncIterable, AsyncIterator

import grpclib
from betterproto.grpc.grpclib_client import MetadataLike
from grpclib import GRPCError, Status


from .contracts.faas import LoadBalancerServiceBase, InvokeFunctionRequest, InvocationResult, Logs


class LoadBalancerService(LoadBalancerServiceBase):
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

    async def invoke_function(
        self, request: InvokeFunctionRequest, metadata: MetadataLike = None
    ) -> InvocationResult:

        return InvocationResult(
            json=request.json_trigger_context,
            log_lines=Logs(
                log_lines=["log1", "log2", "log3", "log4"]
            )
        )
