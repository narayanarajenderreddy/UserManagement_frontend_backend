from sqlalchemy.orm import Session
from app.models.user import User
from app.core.security import hash_password


def create_user(db: Session, email: str, password: str,mobilenumber:str):
    user = User(
        email=email,
        hashed_password=hash_password(password),
        mobile_number=mobilenumber
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()

def get_user_by_mobile_number(db:Session,mobile_number:str):
    return db.query(User).filter(User.mobile_number == mobile_number and User.is_active == True).first()