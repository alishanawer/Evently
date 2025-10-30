from app.db.database import Base
from datetime import datetime, timezone
from sqlalchemy import Column, Integer, DateTime, ForeignKey


class Registration(Base):
    __tablename__ = "registration"

    reg_id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("user.user_id"), nullable=False)
    event_id = Column(Integer, ForeignKey("event.event_id"), nullable=False)
    reg_date = Column(DateTime, default=lambda: datetime.now(timezone.utc))
