from sqlalchemy.orm import Session

from .contracts.faas import AuthServiceBase, UserCredentialsRequest, User, UserRole
from .models import UserModel, engine
import bcrypt


class AuthService(AuthServiceBase):
    async def create_user(self, request: UserCredentialsRequest) -> User:
        with Session(engine) as session:
            existing_user = session.query(UserModel).filter(
                UserModel.username == request.username
            ).first()

            if existing_user:
                raise ValueError(f"User with username {request.username} already exists")

            password_hash = bcrypt.hashpw(request.password.encode(), bcrypt.gensalt(10))
            new_user = UserModel(
                username=request.username,
                password_hash=password_hash
            )
            session.add(new_user)
            session.commit()

        return User(user_id=new_user.id, username=new_user.username, role=new_user.role)
