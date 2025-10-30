from app.db.database import Base
from datetime import datetime, timezone
from sqlalchemy import Column, Integer, String, Text, Date, Time, DECIMAL, DateTime, ForeignKey


class Event(Base):
    __tablename__ = "event"

    event_id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), nullable=False)
    description = Column(Text)
    date = Column(Date, nullable=False)
    time = Column(Time, nullable=False)
    venue = Column(String(100))
    price = Column(DECIMAL(10, 2))
    created_by = Column(Integer, ForeignKey("user.user_id"), nullable=False)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
