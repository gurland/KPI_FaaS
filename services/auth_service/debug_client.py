import asyncio
from auth_service.contracts.faas import AuthServiceStub, UserCredentialsRequest, ChangeUserPasswordRequest

from grpclib.client import Channel


async def main():
    channel = Channel(host="127.0.0.1", port=50051)
    auth_service = AuthServiceStub(channel)

    try:
        response = await auth_service.create_user(
            UserCredentialsRequest(
                username="test",
                password="test"
            )
        )

        print(response)
    except:
        pass

    response = await auth_service.get_user(
        UserCredentialsRequest(
            username="test",
            password="test"
        )
    )

    response = await auth_service.change_user_password(
        ChangeUserPasswordRequest(
            user_id=response.user_id,
            old_password="test",
            new_password="test"
        )
    )

    print(response)

    channel.close()


if __name__ == "__main__":
    loop = asyncio.get_event_loop()
    loop.run_until_complete(main())
