import asyncio

from grpclib.utils import graceful_exit
from grpclib.server import Server
from auth_service.service import AuthService


async def main(*, host: str = '127.0.0.1', port: int = 50051) -> None:
    server = Server([AuthService()])
    # Note: graceful_exit isn't supported in Windows
    with graceful_exit([server]):
        await server.start(host, port)
        print(f'Serving on {host}:{port}')
        await server.wait_closed()


if __name__ == '__main__':
    asyncio.run(main())