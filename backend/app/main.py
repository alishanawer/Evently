from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.db.database import Base, engine

# Import routers (add actual ones later)
# from app.routers import events, tickets, users

app = FastAPI(
    title=f"{settings.project_name} API",
    version="1.0.0",
    debug=settings.debug,
)

# CORS
origins = ["http://localhost:5173", "http://127.0.0.1:5173"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# DB tables
Base.metadata.create_all(bind=engine)

# Register routers
# app.include_router(events.router, prefix="/events", tags=["Events"])
# app.include_router(tickets.router, prefix="/tickets", tags=["Tickets"])


@app.get("/")
def root():
    return {"message": f"{settings.project_name} API is running 🚀"}
