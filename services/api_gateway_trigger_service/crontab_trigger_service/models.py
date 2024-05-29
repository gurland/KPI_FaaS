from sqlalchemy import create_engine
from sqlalchemy.sql.sqltypes import String
from sqlalchemy.orm import DeclarativeBase
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column

from .cfg import BASE_API_GATEWAY_URL
from .contracts.faas import DetailedApiGatewayTrigger

engine = create_engine("sqlite+pysqlite:///:memory:", echo=True)


class Base(DeclarativeBase):
    pass


class APIGatewayTriggerModel(Base):
    __tablename__ = "api_gateway_triggers"

    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column()
    function_id: Mapped[int] = mapped_column()

    name: Mapped[str] = mapped_column(String(250))

    def __repr__(self):
        return f"<APIGatewayTriggerModel(id={self.id}, function_id={self.function_id}, endpoint={self.endpoint}>"

    def to_gateway_trigger_message(self) -> DetailedApiGatewayTrigger:
        return DetailedApiGatewayTrigger(
            trigger_id=self.id,
            name=self.name,
            url=f"{BASE_API_GATEWAY_URL}/{self.function_id}/{self.name}",
        )


Base.metadata.create_all(engine)
