from pydantic import BaseModel, ConfigDict
from typing import Optional
from datetime import datetime


class BookBase(BaseModel):
    title: str
    author: Optional[str] = None
    isbn: Optional[str] = None
    description: Optional[str] = None
    notes: Optional[str] = None

class BookCreate(BookBase):
    pass

class BookUpdate(BookBase):
    title: Optional[str] = None
    author: Optional[str] = None
    isbn: Optional[str] = None
    description: Optional[str] = None
    notes: Optional[str] = None

class BookOut(BookBase):
    id: int
    ai_summary: Optional[str] = None
    created_at: Optional[datetime] = None

    model_config = ConfigDict(from_attributes=True)


class LoginRequest(BaseModel):
    email: str
    password: str


class UserOut(BaseModel):
    id: int
    email: str

    model_config = ConfigDict(from_attributes=True)
