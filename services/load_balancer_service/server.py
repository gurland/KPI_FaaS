import asyncio

from grpclib.utils import graceful_exit
from grpclib.server import Server
from load_balancer_service.service import LoadBalancerService
from load_balancer_service.cfg import SERVICE_PORT, SERVICE_HOST


async def main(host: str = '127.0.0.1', port: int = 50051) -> None:
    server = Server([LoadBalancerService()])
    with graceful_exit([server]):
        await server.start(host, port)
        print(f'Serving on {host}:{port}')
        await server.wait_closed()


if __name__ == '__main__':
    asyncio.run(main(
        host=SERVICE_HOST,
        port=SERVICE_PORT
    ))
