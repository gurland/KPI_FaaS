#!/bin/bash

# Check if path argument is provided
if [ $# -eq 0 ]; then
    echo "Usage: $0 /path/to/proto/files"
    exit 1
fi

# Check if provided path exists
if [ ! -d "$1" ]; then
    echo "Error: Directory $1 does not exist."
    exit 1
fi

# Build Docker image if not already built
docker build -t protoc-gen-mermaid .

# Run Docker container with mounted volume
echo "$(realpath $1)"
docker run -v "$(realpath $1)":/app/protos -v ./uml:/app/output protoc-gen-mermaid:latest

# protoc-gen-uml echo "\$\(pwd\)"

# "$(find /protos -name '*.proto')"

# protoc --uml_out=/uml_output -I/protos "$(find . -name '/protos/*.proto')"

#protoc --uml_out=/tmp -I/protos /protos/*.proto

# "/protos/*.proto"

# protoc --uml_out=/tmp -I/protos /protos/*.proto
