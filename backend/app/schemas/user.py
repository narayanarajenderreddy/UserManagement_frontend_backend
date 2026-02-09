from pydantic import BaseModel,EmailStr
from typing import Optional

class UserUpdate(BaseModel):
    role:Optional[str] = None
    is_active:Optional[bool] = None