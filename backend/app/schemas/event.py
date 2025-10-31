from pydantic import BaseModel
from datetime import date, time, datetime
from typing import Optional


class EventBase(BaseModel):
    title: str
    description: Optional[str] = None
    date: date
    time: time
    venue: Optional[str] = None
    price: Optional[float] = None


class EventCreate(EventBase):
    pass


class EventUpdate(BaseModel):
    title: str
    description: str
    date: date
    time: time
    venue: str
    price: float


class EventOut(EventBase):
    event_id: int
    created_by: int
    created_at: datetime

    class Config:
        from_attributes = True
