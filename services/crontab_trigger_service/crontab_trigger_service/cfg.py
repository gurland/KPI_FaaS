import logging
import os

SERVICE_HOST = os.getenv("SERVICE_HOST", "0.0.0.0")
SERVICE_PORT = os.getenv("SERVICE_PORT", "50051")

logger = logging.getLogger("crontab_service")
