from datetime import datetime

import bcrypt
from sqlalchemy import create_engine
from sqlalchemy import Column
from sqlalchemy.sql.sqltypes import String, Enum, DateTime
from sqlalchemy.orm import DeclarativeBase
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column
from .contracts.faas import UserRole, User
from sqlalchemy.sql import func


engine = create_engine("sqlite+pysqlite:///:memory:", echo=True)


class Base(DeclarativeBase):
    pass


class UserModel(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True)
    username: Mapped[str] = mapped_column(String(50), unique=True, nullable=False)
    password_hash: Mapped[str] = Column(String(200), nullable=False)
    role = Column(Enum(UserRole), default=UserRole.USER)
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=datetime.utcnow
    )

    def __repr__(self):
        return f"<User(id={self.id}, username={self.username})>"

    def check_password(self, password: str) -> bool:
        return bcrypt.checkpw(
            password.encode(),
            self.password_hash.encode()
        )

    def to_user_message(self) -> User:
        return User(
            user_id=self.id,
            username=self.username,
            role=self.role,
            updated_at_timestamp=self.unix_timestamp
        )

    @property
    def unix_timestamp(self) -> int:
        return int(self.updated_at.timestamp())


Base.metadata.create_all(engine)
