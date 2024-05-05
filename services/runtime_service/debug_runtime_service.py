import asyncio
import sys

from runtime_service.contracts.faas import RuntimeServiceStub, RuntimeConfiguration, BriefRuntime, Empty
from runtime_service.cfg import SERVICE_HOST, SERVICE_PORT

from grpclib.client import Channel


channel = Channel(host=SERVICE_HOST, port=SERVICE_PORT)
service = RuntimeServiceStub(channel)


async def create_runtime():
    response = await service.create_runtime(
        RuntimeConfiguration(
            tag="test123",
            dockerfile='FROM hello-world\nCMD ["/hello"]'
        ),
        metadata={"user-id": "1"}
    )

    print(response)


async def edit_runtime():
    response = await service.edit_runtime(
        RuntimeConfiguration(
            tag="test123",
            dockerfile='FROM hello-world\nARG TEST\nCMD ["/hello"]'
        ),
        metadata={"user-id": "1"}
    )

    print(response)


async def get_runtime_details():
    response = await service.get_runtime_details(
        BriefRuntime(
            tag="test123",
            registry_url=""
        ),
        metadata={"user-id": "1"}
    )

    print(response)


async def get_runtime_tags():
    response = service.get_runtime_tags(
        Empty(),
        metadata={"user-id": "1"}
    )

    async for runtime in response:
        print(runtime)


async def delete_runtime():
    response = await service.delete_runtime(
        BriefRuntime(
            tag="test123",
            registry_url=""
        ),
        metadata={"user-id": "1"}
    )

    print(response)


async def main():
    available_rpcs = {
        "1. Create Runtime": create_runtime,
        "2. Edit Runtime": edit_runtime,
        "3. Get Runtime Details": get_runtime_details,
        "4. Get all Runtime tags": get_runtime_tags,
    }

    rpc_number = input("\n".join(available_rpcs.keys()) + "\nEnter RPC number to execute: ")
    rpc_coroutine = None
    for key in available_rpcs.keys():
        if key.startswith(rpc_number):
            rpc_coroutine = available_rpcs[key]
            break

    if not rpc_coroutine:
        sys.exit("Invalid RPC number")

    try:
        await rpc_coroutine()
    except Exception as e:
        print(e)
        pass

    channel.close()


if __name__ == "__main__":
    loop = asyncio.get_event_loop()
    loop.run_until_complete(main())
