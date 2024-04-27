import asyncio
from auth_service.contracts.faas import AuthServiceStub, UserCredentialsRequest

from grpclib.client import Channel


async def main():
    channel = Channel(host="127.0.0.1", port=50051)
    auth_service = AuthServiceStub(channel)

    response = await auth_service.create_user(
        UserCredentialsRequest(
            username="user",
            password="pass"
        )
    )

    print(response.role)

    response = await auth_service.get_user(
        UserCredentialsRequest(
            username="user",
            password="pass"
        )
    )

    print(response)

    channel.close()


if __name__ == "__main__":
    loop = asyncio.get_event_loop()
    loop.run_until_complete(main())
