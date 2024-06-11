import asyncio
import json
import sys

from load_balancer_service.contracts.faas import LoadBalancerServiceStub, InvokeFunctionRequest, DetailedFunction, BriefRuntime
from load_balancer_service.cfg import SERVICE_HOST, SERVICE_PORT

from grpclib.client import Channel


channel = Channel(host=SERVICE_HOST, port=SERVICE_PORT)
service = LoadBalancerServiceStub(channel)


demo_f = """def lambda_function(context: dict) -> dict:
    message = "Hello, cruel, serverless world :("
    print(message)

    return {"message": message}
"""

async def main():
    try:
        response = await service.invoke_function(
            InvokeFunctionRequest(
                function=DetailedFunction(
                    function_id=1,
                    runtime_tag="runtimes/python:3.11",
                    function_name="Test function",
                    code=demo_f,
                ),
                runtime=BriefRuntime(
                    tag="runtimes/python:3.11",
                    registry_url="localhost:5555/runtimes/python:3.11"
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
