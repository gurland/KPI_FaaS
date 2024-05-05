import json
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
    base_registry_url: str | None = None
    logs: list

    def __init__(self, tag: str, dockerfile: str, base_registry_url: str) -> None:
        self.tag = tag
        self.dockerfile = dockerfile
        self.docker_client = docker.from_env()
        self.base_registry_url = base_registry_url
        self.logs = []

        self.docker_client.login(
            username=None, password=None, email=None,
            registry=base_registry_url
        )

    def build(self):
        build_context = self.create_docker_build_context_tarball(self.dockerfile)

        image, logs_generator = self.docker_client.images.build(
            tag=f"{self.tag}",
            fileobj=build_context,
            custom_context=True
        )
        self.image = image

        build_logs = list(json.dumps(log_line) for log_line in logs_generator)
        self.logs.extend(build_logs)

        logger.info(f"Built docker image with tag: '{self.tag}'. Build logs: {build_logs}")

    def push(self) -> str:
        self.image.tag(f"{self.base_registry_url}/{self.tag}")
        response = self.docker_client.images.push(
            repository=f"{self.base_registry_url}/{self.tag}"
        )

        push_logs = response.splitlines()
        self.logs.extend(push_logs)
        logger.info(f"Pushed image {self.image.tags}. Response: {push_logs}")

        return f"{self.base_registry_url}/{self.tag}"


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
