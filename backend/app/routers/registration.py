from sqlalchemy.orm import Session
from app.models.event import Event
from app.models.ticket import Ticket
from datetime import datetime, timezone
from app.models.registration import Registration
from app.schemas.registration import RegistrationOut
from fastapi import APIRouter, Depends, HTTPException, status
from app.api.deps import get_db, get_current_user, admin_required

router = APIRouter(prefix="/registrations", tags=["Registrations"])


# Register for an Event — User Only
@router.post("/{event_id}", response_model=RegistrationOut, status_code=status.HTTP_201_CREATED)
def register_for_event(
    event_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    # Check event exists
    event = db.query(Event).filter(Event.event_id == event_id).first()
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")

    # Check already registered
    existing = db.query(Registration).filter(
        Registration.user_id == current_user.user_id,
        Registration.event_id == event_id
    ).first()
    if existing:
        raise HTTPException(
            status_code=400, detail="Already registered for this event")

    # Create new registration
    new_reg = Registration(
        user_id=current_user.user_id,
        event_id=event_id,
        reg_date=datetime.now(timezone.utc)
    )
    db.add(new_reg)
    db.commit()
    db.refresh(new_reg)

    # Create ticket for registration
    new_ticket = Ticket(
        reg_id=new_reg.reg_id,
        issue_date=datetime.now(timezone.utc),
        status="Active"
    )
    db.add(new_ticket)
    db.commit()
    db.refresh(new_ticket)

    return {
        "reg_id": new_reg.reg_id,
        "user_id": new_reg.user_id,
        "event_id": new_reg.event_id,
        "reg_date": new_reg.reg_date,
        "ticket_id": new_ticket.ticket_id,
        "ticket_status": new_ticket.status
    }


# View My Registrations — User Only
@router.get("/me", response_model=list[RegistrationOut])
def view_my_registrations(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    registrations = db.query(Registration).filter(
        Registration.user_id == current_user.user_id
    ).all()

    result = []
    for reg in registrations:
        ticket = db.query(Ticket).filter(Ticket.reg_id == reg.reg_id).first()
        result.append({
            "reg_id": reg.reg_id,
            "user_id": reg.user_id,
            "event_id": reg.event_id,
            "reg_date": reg.reg_date,
            "ticket_id": ticket.ticket_id if ticket else None,
            "ticket_status": ticket.status if ticket else None
        })

    return result


# View Registrations by Event — Admin Only
@router.get("/event/{event_id}", response_model=list[RegistrationOut])
def view_event_registrations(
    event_id: int,
    db: Session = Depends(get_db),
    current_admin=Depends(admin_required)
):
    regs = db.query(Registration).filter(
        Registration.event_id == event_id).all()
    result = []
    for reg in regs:
        ticket = db.query(Ticket).filter(Ticket.reg_id == reg.reg_id).first()
        result.append({
            "reg_id": reg.reg_id,
            "user_id": reg.user_id,
            "event_id": reg.event_id,
            "reg_date": reg.reg_date,
            "ticket_id": ticket.ticket_id if ticket else None,
            "ticket_status": ticket.status if ticket else None
        })
    return result
