"""Runs protoc with the gRPC plugin to generate messages and gRPC stubs."""
from pathlib import Path

from grpc_tools import protoc

SERVICES = [
    Path("services") / "auth_service" / "auth_service" / "contracts",
]

TS_SERVICES = [
    Path("frontend") / "src" / "lib" / "contracts",
]

GEN_TS_PATH = str(Path("./node_modules/.bin/protoc-gen-ts_proto").absolute())

contracts_path = Path("contracts").absolute()
proto_paths = [str(path) for path in contracts_path.glob("*.proto")]


for service_contracts_path in SERVICES:
    if not service_contracts_path.exists():
        service_contracts_path.mkdir(parents=True, exist_ok=True)

    protoc.main((
        "grpc_tools.protoc",
        f"--proto_path={contracts_path}",
        f"--python_betterproto_out={service_contracts_path}",
        *proto_paths
    ))

# for service_contracts_path in TS_SERVICES:
#     if not service_contracts_path.exists():
#         service_contracts_path.mkdir(parents=True, exist_ok=True)
#
#     protoc.main((
#         "",
#         f"--plugin={GEN_TS_PATH}",
#         f"--proto_path={contracts_path}",
#         f"--ts_proto_out={service_contracts_path}",
#         *proto_paths
#     ))
