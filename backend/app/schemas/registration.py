from pydantic import BaseModel
from datetime import datetime, date, time
from typing import Optional


class RegistrationBase(BaseModel):
    event_id: int


class RegistrationCreate(RegistrationBase):
    pass


class RegistrationOut(BaseModel):
    reg_id: int
    user_id: int
    event_id: int
    event_title: Optional[str] = None
    event_date: Optional[date] = None
    event_time: Optional[time] = None
    event_venue: Optional[str] = None
    event_price: Optional[float] = None
    reg_date: datetime
    ticket_id: Optional[int] = None
    ticket_status: Optional[str] = None

    class Config:
        from_attributes = True
