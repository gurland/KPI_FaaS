import bcrypt
from sqlalchemy import create_engine
from sqlalchemy import Column
from sqlalchemy.sql.sqltypes import String, Enum
from sqlalchemy.orm import DeclarativeBase
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column
from .contracts.faas import UserRole, User


engine = create_engine("sqlite+pysqlite:///:memory:", echo=True)


class Base(DeclarativeBase):
    pass


class UserModel(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True)
    username: Mapped[str] = mapped_column(String(50), unique=True, nullable=False)
    password_hash: Mapped[str] = Column(String(200), nullable=False)
    role = Column(Enum(UserRole), default=UserRole.USER)

    def __repr__(self):
        return f"<User(id={self.id}, username={self.username})>"

    def check_password(self, password: str) -> bool:
        return bcrypt.checkpw(
            password.encode(),
            self.password_hash.encode()
        )

    def to_user_message(self) -> User:
        return User(
            user_id=self.id, username=self.username, role=self.role
        )


Base.metadata.create_all(engine)
