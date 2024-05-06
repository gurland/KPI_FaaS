from datetime import datetime

from sqlalchemy import create_engine
from sqlalchemy import Column
from sqlalchemy.sql.sqltypes import String, Enum, DateTime, Text
from sqlalchemy.orm import DeclarativeBase
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column
from .contracts.faas import UserRole, User, DetailedFunction, BriefFunction
from sqlalchemy.sql import func


engine = create_engine("sqlite+pysqlite:///:memory:", echo=True)


class Base(DeclarativeBase):
    pass


class FunctionModel(Base):
    __tablename__ = "functions"

    id: Mapped[int] = mapped_column(primary_key=True)
    runtime_tag: Mapped[str] = mapped_column(String(255))
    user_id: Mapped[int] = mapped_column()

    name: Mapped[str] = mapped_column(String(255))
    code: Mapped[str] = mapped_column(Text())

    def __repr__(self):
        return f"<Function(id={self.id}, name={self.name})>"

    def to_detailed_function(self) -> DetailedFunction:
        return DetailedFunction(
            function_id=self.id,
            runtime_tag=self.runtime_tag,
            function_name=self.name,
            code=self.code
        )

    def to_brief_function(self) -> BriefFunction:
        return BriefFunction(
            function_id=self.id,
            runtime_tag=self.runtime_tag,
            function_name=self.name
        )


Base.metadata.create_all(engine)
