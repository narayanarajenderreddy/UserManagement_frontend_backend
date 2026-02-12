from fastapi import APIRouter, Depends, HTTPException
from app.api.deps import get_current_user
from app.db.deps import get_db
from app.models.user import User
from app.api.permission import require_role
from app.core.roles import Roles
from app.schemas.auth import CurrentUserResponse
from sqlalchemy.orm import Session
from app.schemas.user import UserUpdate
from fastapi import Query



router = APIRouter(prefix = "/users",tags=["Users"])

@router.get("/me")
def read_current_user(current_user:CurrentUserResponse = Depends(get_current_user)):
    if not current_user:
        raise HTTPException(status_code=404, detail="User not found")
    return current_user

@router.get("/admin-only")
def admin_endpoint(admin_user = Depends(require_role(Roles.ADMIN))):
    return {
        "message": "Welcome Admin",
        "id": admin_user.id
    }


@router.get("",response_model = list[CurrentUserResponse])
def get_user_list(dp:Session=Depends(get_db),admin_role = Depends(require_role(Roles.ADMIN))):
    user_details = dp.query(User).all()
    return user_details


@router.put("/{user_id}",response_model = CurrentUserResponse)
def update_user(db:Session = Depends(get_db),admin = Depends(require_role(Roles.ADMIN)), payload:UserUpdate = None, user_id:int = None):
    if(user_id != "null" and user_id is not None):
        user = db.query(User).filter(User.id == user_id).first()
        if not user:
            raise HTTPException(status_code = 404,detail="user not found")
        if payload.role is not None and payload.role not in [Roles.ADMIN,Roles.USER]:
            raise HTTPException(status_code = 400,detail="Invalid role")
        if payload.role is not None:
            user.role = payload.role
            
        if payload.is_active is not None:
            user.is_active = payload.is_active
        db.commit()
        db.refresh(user)
        
        return {
            "user_details":user,
            "message":"User has been updated Successfully"
        }
@router.get("/search")
def get_all_user(db:Session = Depends(get_db),
                    admin = Depends(require_role(Roles.ADMIN)),
                    limit:int = Query(10,ge=1,le=100),
                    offset:int = Query(0,ge=0),
                    search:str|None = None,
                    role:str|None = None,
                    is_active:bool|None = None,): 
    query = db.query(User)
    if search:
        query = query.filter(User.email.ilike(f"%{search}%"))
    if role:
        query= query.filter(User.role == role)
    if is_active is not None:
        query = query.filter(User.is_active == is_active)
    
    
    usercount = query.count()
    users = query.offset(offset).limit(limit).all()
    
    return {
        "user_total":usercount,
        "limit":limit,
        "users_data":users,
        "offset":offset,
        "message":"User retrieved successfully"
    }        
            
        
            
            
    