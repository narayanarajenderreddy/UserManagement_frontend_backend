from pydantic import BaseModel, EmailStr


class UserCreate(BaseModel):
    email: EmailStr
    password: str
    mobile_number:str


class UserLogin(BaseModel):
    email: str
    password: str


class UserMobileLogin(BaseModel):
    mobile_number: str
    password: str
    
    
class UserResponse(BaseModel):
    id:int
    email:EmailStr
    is_active:bool
    mobile_number:str

class CurrentUserResponse(BaseModel):
    id:int
    email: EmailStr
    


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
