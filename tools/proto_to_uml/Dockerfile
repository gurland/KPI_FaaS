# Start from a Golang base image
FROM golang:latest

# Set the working directory inside the container
WORKDIR /app

RUN apt-get install -y git && \
    rm -rf /var/lib/apt/lists/*

RUN git clone https://github.com/GoogleCloudPlatform/proto-gen-md-diagrams.git

WORKDIR /app/
COPY main.go .
RUN go build main.go

WORKDIR /app/proto-gen-md-diagrams

# Build the Go application
RUN go build

# Run proto-gen-md-diagrams
CMD ./proto-gen-md-diagrams -d /app/protos -o /app/output && cd /app && ./main
