FROM archlinux:latest

RUN pacman -Syu --noconfirm && \
    pacman -S --noconfirm \
    gcc make git cmake \
    boost opencv vtk hdf5 fmt \
    qt6-base qt6-declarative qt6-tools libglvnd glew \
    python3


WORKDIR /app

RUN git clone --branch development --single-branch --recurse-submodules https://github.com/gurland/Asampl.git

WORKDIR /app/Asampl

# Configure and build the project
RUN cmake . && make

COPY . .

RUN chmod +x invoker

# Command to run your application
CMD ["python", "invoker"]
