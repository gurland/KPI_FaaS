import datetime

from grpclib import GRPCError, Status
from sqlalchemy.orm import Session

from .contracts.faas import AuthServiceBase, UserCredentialsRequest, User, UserRole, VerifyUserRequest, \
    ChangeUserPasswordRequest
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
                    f"User with username '{request.username}' already exists",
                )

            password_hash = bcrypt.hashpw(request.password.encode(), bcrypt.gensalt(10))
            new_user = UserModel(
                username=request.username,
                password_hash=password_hash.decode(),
                role=UserRole.ADMIN if request.username == "admin" else UserRole.USER
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
                if not existing_user.check_password(password=request.password):
                    raise GRPCError(
                        Status.INVALID_ARGUMENT,
                        f"Entered password for user '{request.username}' is invalid",
                    )

                return existing_user.to_user_message()

        raise GRPCError(
            Status.NOT_FOUND,
            f"User with username '{request.username}' does not exist",
        )

    async def change_user_password(
        self, request: ChangeUserPasswordRequest
    ) -> "User":
        with Session(engine) as session:
            existing_user: UserModel | None = session.query(UserModel).filter(
                UserModel.id == request.user_id
            ).first()
            if request.old_password == request.new_password:
                return existing_user.to_user_message()

            if not existing_user:
                raise GRPCError(
                    Status.NOT_FOUND,
                    f"User with ID '{request.user_id}' does not exist",
                )

            if not existing_user.check_password(request.old_password):
                raise GRPCError(
                    Status.NOT_FOUND,
                    f"Wrong old password for User with ID '{request.user_id}'",
                )

            new_password_hash = bcrypt.hashpw(request.new_password.encode(), bcrypt.gensalt(10))
            existing_user.password_hash = new_password_hash.decode()
            existing_user.updated_at = datetime.datetime.utcnow()
            session.commit()

            return existing_user.to_user_message()

    async def verify_user(self, request: VerifyUserRequest) -> User:
        with Session(engine) as session:
            existing_user: UserModel | None = session.query(UserModel).filter(
                UserModel.id == request.user_id
            ).first()

            if not existing_user:
                raise GRPCError(
                    Status.NOT_FOUND,
                    f"User with ID '{request.user_id}' does not exist",
                )

            return existing_user.to_user_message()
