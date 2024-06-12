from asyncio import sleep
from multiprocessing.connection import Client

import docker
from docker import DockerClient
from docker.errors import APIError
from docker.models.containers import Container
from docker.models.networks import Network

from .cfg import DOCKER_REGISTRY_URL, logger
from .contracts.faas import AgentServiceBase, InvokeFunctionRequest, InvocationResult, Logs

import json
import hashlib


def get_launched_runtimes(client: DockerClient) -> dict[str, Container]:
    result = {}
    for container in client.containers.list():
        if not container.name.startswith("runtime-container"):
            continue

        for tag in container.image.tags:
            result[tag] = container

    return result


def get_container_network(client: DockerClient, container: Container) -> Network:
    network_ids = list(container.attrs.get('NetworkSettings', {}).get("Networks", {}).keys())
    return client.networks.get(network_ids[0])


def get_tag_md5(runtime_tag: str) -> str:
    return hashlib.md5(runtime_tag.encode()).hexdigest()


class AgentService(AgentServiceBase):
    async def invoke_function(
            self,
            request: InvokeFunctionRequest
    ) -> InvocationResult:
        client = docker.from_env()
        client.login(
            username=None, password=None, email=None,
            registry=DOCKER_REGISTRY_URL
        )
        launched_runtimes = get_launched_runtimes(client)
        safe_tag = get_tag_md5(request.runtime.tag)

        if request.runtime.tag not in launched_runtimes:
            try:
                network = client.networks.create(
                    f"runtime-network-{safe_tag}",
                    driver="bridge",
                    attachable=True
                )
                logger.info(f"Created network {network.name}")
            except APIError:
                network = client.networks.get(f"runtime-network-{safe_tag}")
                logger.info(f"Got already existing network {network.name}")

            try:
                runtime_container = client.containers.run(
                    request.runtime.tag,
                    detach=True,
                    name=f"runtime-container-{safe_tag}",
                    network=network.name
                )
                logger.info(f"Started runtime container. {runtime_container.name} | Tag: {request.runtime.tag}")
            except APIError:
                runtime_container = client.containers.get(
                    f"runtime-container-{safe_tag}"
                )
                runtime_container.remove()
                runtime_container = client.containers.run(
                    request.runtime.tag,
                    detach=True,
                    name=f"runtime-container-{safe_tag}",
                    network=network.name
                )
                logger.info(f"Re-Started runtime container. {runtime_container.name} | Tag: {request.runtime.tag}")
        else:
            runtime_container = launched_runtimes[request.runtime.tag]

        runtime_network = get_container_network(client, runtime_container)
        agent_container = client.containers.get("kpi_faas-node-agent")

        try:
            runtime_network.connect(agent_container)
        except APIError:
            logger.info(f"Agent is already connected to network {agent_container}")

        result = "{}"
        for _ in range(10):
            try:
                client = Client((runtime_container.name, 9999))
                client.send(
                    json.dumps({
                        "code": request.function.code,
                        "context": request.json_trigger_context
                    })
                )

                result = client.recv()
                break
            except Exception as e:
                logger.error(e)
                await sleep(1)

        client.close()
        logger.info(runtime_container.logs())

        result = json.loads(result)

        return InvocationResult(
            json=json.dumps(result.get("result", {})),
            log_lines=Logs(
                log_lines=result.get("logs", ["Hello World"])
            )
        )
