from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class RegistrationBase(BaseModel):
    event_id: int


class RegistrationCreate(RegistrationBase):
    pass


class RegistrationOut(BaseModel):
    reg_id: int
    user_id: int
    event_id: int
    reg_date: datetime
    ticket_id: Optional[int] = None
    ticket_status: Optional[str] = None

    class Config:
        from_attributes = True
