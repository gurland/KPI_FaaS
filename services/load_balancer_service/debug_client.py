import asyncio
import json
import sys

from load_balancer_service.contracts.faas import LoadBalancerServiceStub, InvokeFunctionRequest, DetailedFunction, BriefRuntime
from load_balancer_service.cfg import SERVICE_HOST, SERVICE_PORT

from grpclib.client import Channel


channel = Channel(host=SERVICE_HOST, port=SERVICE_PORT)
service = LoadBalancerServiceStub(channel)


async def main():
    try:
        response = await service.invoke_function(
            InvokeFunctionRequest(
                function=DetailedFunction(
                    function_id=1,
                    runtime_tag="tag",
                    function_name="Test function",
                    code="empty",
                ),
                runtime=BriefRuntime(
                    tag="tag",
                    registry_url="localhost"
                ),
                json_trigger_context=json.dumps({"Test": "Hello"})
            ),
            metadata={"user-id": "1"}
        )

        print(response)
    except Exception as e:
        print(e)
        pass

    channel.close()


if __name__ == "__main__":
    loop = asyncio.get_event_loop()
    loop.run_until_complete(main())
