FROM python:3.11-alpine

RUN wget -O get-poetry.py https://install.python-poetry.org && \
    POETRY_HOME=/root/.poetry python3 get-poetry.py && \
    rm get-poetry.py


ENV PATH="/root/.poetry/bin:${PATH}"

WORKDIR /app

# Install dependencies
COPY poetry.loc[k] ./
COPY pyproject.toml ./
RUN poetry install

COPY . /app
CMD ["poetry", "run", "python", "server.py"]
