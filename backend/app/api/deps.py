from fastapi import Depends, HTTPException, status
# from fastapi.security import 
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session

from app.core.security import decode_access_token
from app.db.deps import get_db
from app.models.user import User

bearer_scheme = HTTPBearer()

# oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")


def get_current_user(
    token: HTTPAuthorizationCredentials = Depends(bearer_scheme),
    db: Session = Depends(get_db),
):
    payload = decode_access_token(token.credentials)

    if payload is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
        )

    email_id = payload.get("sub")
    if email_id is None:
        raise HTTPException(status_code=401, detail="Invalid token payload")

    user = db.query(User).filter(User.email == email_id).first()
    if not user:
        raise HTTPException(status_code=401, detail="User not found")

    return user
