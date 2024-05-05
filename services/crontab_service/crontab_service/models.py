from sqlalchemy import create_engine
from sqlalchemy.sql.sqltypes import String
from sqlalchemy.orm import DeclarativeBase
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column
from .contracts.faas import CrontabTrigger

engine = create_engine("sqlite+pysqlite:///:memory:", echo=True)


class Base(DeclarativeBase):
    pass


class CrontabTriggerModel(Base):
    __tablename__ = "crontab_triggers"

    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column()

    cron_expression: Mapped[str] = mapped_column(String(50))
    function_id: Mapped[int] = mapped_column()
    description: Mapped[str] = mapped_column(String(255))

    def __repr__(self):
        return f"<CrontabTrigger(id={self.id}, cron_expression={self.cron_expression}, function_id={self.function_id})>"

    def to_crontab_message(self) -> CrontabTrigger:
        return CrontabTrigger(
            trigger_id=self.id,
            function_id=self.function_id,
            description=self.description,
            cron_expression=self.cron_expression
        )


Base.metadata.create_all(engine)
