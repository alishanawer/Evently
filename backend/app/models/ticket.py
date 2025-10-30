from app.db.database import Base
from datetime import datetime, timezone
from sqlalchemy import Column, Integer, DateTime, String, ForeignKey


class Ticket(Base):
    __tablename__ = "ticket"

    ticket_id = Column(Integer, primary_key=True, index=True)
    reg_id = Column(Integer, ForeignKey("registration.reg_id"), nullable=False)
    issue_date = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    status = Column(String(20), default="Active")
