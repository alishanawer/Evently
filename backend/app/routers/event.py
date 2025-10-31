from sqlalchemy.orm import Session
from app.models.event import Event
from fastapi import APIRouter, Depends, HTTPException, status
from app.schemas.event import EventCreate, EventOut, EventUpdate
from app.api.deps import get_db, get_current_user, admin_required

router = APIRouter(prefix="/events", tags=["Events"])


# Create Event — Admin Only
@router.post("/", response_model=EventOut, status_code=status.HTTP_201_CREATED)
def create_event(
    event: EventCreate,
    db: Session = Depends(get_db),
    current_admin=Depends(admin_required)
):
    new_event = Event(
        title=event.title,
        description=event.description,
        date=event.date,
        time=event.time,
        venue=event.venue,
        price=event.price,
        created_by=current_admin.user_id
    )
    db.add(new_event)
    db.commit()
    db.refresh(new_event)
    return new_event


# Get All Events — Authenticated Users (user/admin)
@router.get("/", response_model=list[EventOut])
def get_all_events(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    events = db.query(Event).order_by(Event.date).all()
    return events


# Get Single Event — Authenticated Users (user/admin)
@router.get("/{event_id}", response_model=EventOut)
def get_event(
    event_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    event = db.query(Event).filter(Event.event_id == event_id).first()
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    return event


# Update Event — Admin Only
@router.put("/{event_id}", response_model=EventOut)
def update_event(
    event_id: int,
    update_data: EventUpdate,
    db: Session = Depends(get_db),
    current_admin=Depends(admin_required)
):
    event = db.query(Event).filter(Event.event_id == event_id).first()
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")

    for key, value in update_data.model_dump(exclude_unset=True).items():
        setattr(event, key, value)

    db.commit()
    db.refresh(event)
    return event


# Delete Event — Admin Only
@router.delete("/{event_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_event(
    event_id: int,
    db: Session = Depends(get_db),
    current_admin=Depends(admin_required)
):
    event = db.query(Event).filter(Event.event_id == event_id).first()
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")

    db.delete(event)
    db.commit()
    return
