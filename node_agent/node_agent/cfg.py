import os
from logging import Logger

logger = Logger("node_agent")

SERVICE_HOST = os.getenv("SERVICE_HOST", "0.0.0.0")
SERVICE_PORT = os.getenv("SERVICE_PORT", "50000")

DOCKER_REGISTRY_URL = os.getenv("DOCKER_REGISTRY_URL", "localhost:5555")
