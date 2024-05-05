import asyncio
import logging

from grpclib.utils import graceful_exit
from grpclib.server import Server
from crontab_service.service import CrontabService
from crontab_service.cfg import SERVICE_PORT, SERVICE_HOST


async def main(host: str = '127.0.0.1', port: int = 50051) -> None:
    server = Server([CrontabService()])
    with graceful_exit([server]):
        await server.start(host, port)
        print(f'Serving on {host}:{port}')
        await server.wait_closed()

logging.getLogger().setLevel(logging.DEBUG)

if __name__ == '__main__':
    asyncio.run(main(
        host=SERVICE_HOST,
        port=SERVICE_PORT
    ))
