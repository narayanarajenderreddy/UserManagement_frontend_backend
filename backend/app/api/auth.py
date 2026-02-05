from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.schemas.auth import UserCreate, UserLogin, Token,UserResponse
from app.services.user_service import create_user, get_user_by_email,get_user_by_mobile_number
from app.core.security import verify_password, create_access_token
from app.db.deps import get_db

router = APIRouter(prefix="/auth", tags=["Auth"])

@router.post("/userregister",response_model=UserResponse,status_code=201)
def register(userdetails:UserCreate,db:Session=Depends(get_db)):
    if(get_user_by_email(db,userdetails.email)):
        raise HTTPException(status_code=400, detail="Email already registered")
    if(get_user_by_mobile_number(db,userdetails.mobile_number)):
        raise HTTPException(status_code=400, detail="Mobile number already registered")
    return create_user(db,email=userdetails.email,password=userdetails.password,mobilenumber=userdetails.mobile_number)

@router.post("/login")
def login(credentials:UserLogin,db:Session=Depends(get_db)):
    user = (
            get_user_by_email(db,credentials.email)
            or
            get_user_by_mobile_number(db,credentials.email)
        )
    if not user or not verify_password(credentials.password,user.hashed_password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,detail="Invalid credentials")
    token = create_access_token(data={"sub":user.email})
    return {"access_token":token,
            "token_type":"bearer"}