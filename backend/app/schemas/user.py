from typing import Literal
from datetime import datetime
from pydantic import BaseModel, EmailStr


class UserBase(BaseModel):
    name: str
    email: EmailStr


class UserCreate(UserBase):
    password: str
    role: Literal["user", "admin"] = "user"  # default user role


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserOut(UserBase):
    user_id: int
    role: str
    created_at: datetime

    class Config:
        from_attributes = True
