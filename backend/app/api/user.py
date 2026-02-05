from fastapi import APIRouter, Depends, HTTPException
from app.api.deps import get_current_user
from app.models.user import User
from app.api.permission import require_role
from app.core.roles import Roles
from app.schemas.auth import CurrentUserResponse



router = APIRouter(prefix = "/users",tags=["Users"])

@router.get("/me")
def read_current_user(current_user:CurrentUserResponse=Depends(get_current_user)):
    if not current_user:
        raise HTTPException(status_code=404, detail="User not found")
    return current_user

@router.get("/admin-only")
def admin_endpoint(
    admin_user: User = Depends(require_role(Roles.ADMIN))
):
    return {
        "message": "Welcome Admin",
        "admin_id": admin_user.id
    }