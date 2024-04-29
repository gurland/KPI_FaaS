from sqlalchemy import create_engine
from sqlalchemy.sql.sqltypes import String, Text
from sqlalchemy.orm import DeclarativeBase
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column
from .contracts.faas import BriefRuntime, DetailedRuntime

engine = create_engine("sqlite+pysqlite:///:memory:", echo=True)


class Base(DeclarativeBase):
    pass


class RuntimeModel(Base):
    __tablename__ = "runtimes"

    tag: Mapped[str] = mapped_column(String(255), primary_key=True)
    user_id: Mapped[int] = mapped_column()

    registry_url: Mapped[str] = mapped_column(String(255))
    dockerfile: Mapped[str] = mapped_column(Text())

    def __repr__(self):
        return f"<RuntimeModel(id={self.id}, tag={self.tag})>"

    def to_brief_runtime(self) -> BriefRuntime:
        return BriefRuntime(
            tag=self.tag,
            registry_url=self.registry_url
        )

    def to_deatiled_runtime(self) -> DetailedRuntime:
        return DetailedRuntime(
            tag=self.tag,
            registry_url=self.registry_url,
            dockerfile=self.dockerfile
        )


Base.metadata.create_all(engine)
