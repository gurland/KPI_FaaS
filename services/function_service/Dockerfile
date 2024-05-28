FROM python:3.11-slim


ENV PATH="/root/.local/bin:${PATH}"

RUN apt-get update && \
    apt-get install -y --no-install-recommends gcc gnupg2 && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*


RUN python3 -m pip install --user pipx && python3 -m pipx ensurepath && python3 -m pipx install poetry


ENV PATH="/root/.poetry/bin:${PATH}"

WORKDIR /app

# Install dependencies
COPY poetry.loc[k] ./
COPY pyproject.toml ./
RUN poetry install

COPY . /app
CMD ["poetry", "run", "python", "server.py"]
