from pathlib import Path

from sqlalchemy import create_engine
from sqlalchemy.exc import IntegrityError
from sqlalchemy.sql.sqltypes import String, Text
from sqlalchemy.orm import DeclarativeBase, Session
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column
from .contracts.faas import BriefRuntime, DetailedRuntime
from .cfg import DOCKER_REGISTRY_URL, logger
from .docker_image import DockerImage

engine = create_engine("sqlite+pysqlite:///:memory:")


class Base(DeclarativeBase):
    pass


class RuntimeModel(Base):
    __tablename__ = "runtimes"

    tag: Mapped[str] = mapped_column(String(255), primary_key=True)
    user_id: Mapped[int] = mapped_column()

    registry_url: Mapped[str] = mapped_column(String(255))
    dockerfile: Mapped[str] = mapped_column(Text())

    invoker_script: Mapped[str] = mapped_column(Text())
    function_example: Mapped[str] = mapped_column(Text())
    syntax: Mapped[str] = mapped_column(String(255))

    def __repr__(self):
        return f"<RuntimeModel(id={self.tag}, tag={self.tag})>"

    def to_brief_runtime(self) -> BriefRuntime:
        return BriefRuntime(
            tag=self.tag,
            registry_url=self.registry_url
        )

    def to_detailed_runtime(self) -> DetailedRuntime:
        return DetailedRuntime(
            tag=self.tag,
            registry_url=self.registry_url,
            dockerfile=self.dockerfile,
            invoker_script=self.invoker_script,
            syntax=self.syntax,
            function_example=self.function_example
        )


def seed_runtimes():
    base_dir = Path(__file__).parent
    runtimes_to_seed = [
        ("base", 'FROM hello-world\nCMD ["/hello"]', "print(1)", "print(2)"),
        (
            "runtimes/python:3.11", 
            (base_dir / "demo/Dockerfile").read_text(), 
            (base_dir / "demo/demo_invoker.py").read_text(),
            (base_dir / "demo/demo_function.py").read_text()
        ),
    ]

    for tag, dockerfile, invoker, function in runtimes_to_seed:
        image = DockerImage(
            tag=tag,
            base_registry_url=DOCKER_REGISTRY_URL,
            invoker=invoker,
            dockerfile=dockerfile
        )
        image.build()
        image_url = image.push()

        with Session(engine) as session:
            try:
                session.add(
                    RuntimeModel(
                        tag=tag,
                        registry_url=image_url,
                        dockerfile=dockerfile,
                        user_id=-1
                    )
                )
                session.commit()
            except IntegrityError as e:
                logger.info(f"Seeding of image {tag} skipped! E: {e}")


Base.metadata.create_all(engine)
seed_runtimes()
