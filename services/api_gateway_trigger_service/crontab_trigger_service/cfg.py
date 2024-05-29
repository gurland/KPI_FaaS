import logging
import os

SERVICE_HOST = os.getenv("SERVICE_HOST", "0.0.0.0")
SERVICE_PORT = os.getenv("SERVICE_PORT", "50051")

BASE_API_GATEWAY_URL = "http://localhost"

logger = logging.getLogger("crontab_service")
