import tarfile
import io

import docker
from docker import DockerClient
from docker.models.images import Image

from runtime_service.cfg import logger


class DockerImage:
    tag: str
    dockerfile: str
    docker_client: DockerClient

    image: Image | None = None
    registry_url: str | None = None

    def __init__(self, tag: str, dockerfile: str, registry_url: str) -> None:
        self.tag = tag
        self.dockerfile = dockerfile
        self.docker_client = docker.from_env()
        self.registry_url = registry_url

        self.docker_client.login(
            username=None, password=None, email=None,
            registry=registry_url
        )

        pass

    def build(self):
        build_context = self.create_docker_build_context_tarball(self.dockerfile)

        image, logs_generator = self.docker_client.images.build(
            tag=f"{self.tag}",
            fileobj=build_context,
            custom_context=True
        )
        self.image = image

        logger.info(f"Built docker image with tag: '{self.tag}'. Build log: {list(logs_generator)}")

    def push(self) -> None:
        self.image.tag(f"{self.registry_url}/{self.tag}")
        response = self.docker_client.images.push(
            repository=f"{self.registry_url}/{self.tag}"
        )

        logger.info(f"Response for push: {response}")

    @staticmethod
    def create_docker_build_context_tarball(dockerfile_content: str) -> io.BytesIO:
        file_handler = io.BytesIO()
        dockerfile_content_binary = dockerfile_content.encode()
        context_tarball = tarfile.open(fileobj=file_handler, mode='w')

        dockerfile_info = tarfile.TarInfo("Dockerfile")
        dockerfile_info.size = len(dockerfile_content.encode())

        context_tarball.addfile(dockerfile_info, io.BytesIO(dockerfile_content_binary))

        file_handler.seek(0)
        return file_handler
