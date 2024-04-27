from grpclib import GRPCError, Status
from sqlalchemy.orm import Session

from .contracts.faas import AuthServiceBase, UserCredentialsRequest, User
from .models import UserModel, engine
import bcrypt


class AuthService(AuthServiceBase):
    async def create_user(
            self, request: UserCredentialsRequest
    ) -> User:
        with Session(engine) as session:
            existing_user: UserModel | None = session.query(UserModel).filter(
                UserModel.username == request.username
            ).first()

            if existing_user:
                raise GRPCError(
                    Status.ALREADY_EXISTS,
                    f"User with username {request.username} already exists",
                )

            password_hash = bcrypt.hashpw(request.password.encode(), bcrypt.gensalt(10))
            new_user = UserModel(
                username=request.username,
                password_hash=password_hash
            )
            session.add(new_user)
            session.commit()

            return new_user.to_user_message()

    async def get_user(
        self, request: UserCredentialsRequest
    ) -> User:
        with Session(engine) as session:
            existing_user: UserModel | None = session.query(UserModel).filter(
                UserModel.username == request.username
            ).first()

            if existing_user:
                return existing_user.to_user_message()

        raise GRPCError(
            Status.NOT_FOUND,
            f"User with username {request.username} does not exist",
        )
