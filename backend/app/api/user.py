from fastapi import APIRouter, Depends, HTTPException
from app.api.deps import get_current_user
from app.models.user import User
from app.schemas.auth import CurrentUserResponse



router = APIRouter(prefix = "/users",tags=["Users"])

@router.get("/me")
def read_current_user(current_user:CurrentUserResponse=Depends(get_current_user)):
    return current_user
    if not current_user:
        raise HTTPException(status_code=404, detail="User not found")
    return current_user