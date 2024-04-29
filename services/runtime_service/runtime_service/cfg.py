import logging
import os

SERVICE_HOST = os.getenv("SERVICE_HOST", "0.0.0.0")
SERVICE_PORT = os.getenv("SERVICE_PORT", "50051")

DOCKER_REGISTRY_URL = os.getenv("DOCKER_REGISTRY_URL", "localhost:5555")

logger = logging.getLogger("runtime_service")
