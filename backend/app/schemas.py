from pydantic import BaseModel, ConfigDict, Field
from typing import Optional
from datetime import datetime


class BookBase(BaseModel):
    title: str
    author: Optional[str] = None
    isbn: Optional[str] = None
    description: Optional[str] = None
    notes: Optional[str] = None

class BookCreate(BookBase):
    is_public: Optional[bool] = False

class BookUpdate(BookBase):
    title: Optional[str] = None
    author: Optional[str] = None
    isbn: Optional[str] = None
    description: Optional[str] = None
    notes: Optional[str] = None
    is_public: Optional[bool] = None

class BookOut(BookBase):
    id: int
    ai_summary: Optional[str] = None
    created_at: Optional[datetime] = None
    owner_id: int
    is_public: bool

    model_config = ConfigDict(from_attributes=True)


class LoginRequest(BaseModel):
    email: str
    password: str


class RegisterRequest(BaseModel):
    email: str
    password: str = Field(min_length=8)


class UserOut(BaseModel):
    id: int
    email: str
    is_admin: bool

    model_config = ConfigDict(from_attributes=True)
