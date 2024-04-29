import asyncio
from runtime_service.contracts.faas import RuntimeServiceStub, CreateRuntimeRequest
from runtime_service.cfg import SERVICE_HOST, SERVICE_PORT

from grpclib.client import Channel


async def main():
    channel = Channel(host=SERVICE_HOST, port=SERVICE_PORT)
    service = RuntimeServiceStub(channel)

    try:
        response = await service.create_runtime(
            CreateRuntimeRequest(
                tag="test123",
                dockerfile="""FROM hello-world

CMD ["/hello"]
"""
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
