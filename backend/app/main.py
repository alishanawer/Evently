from fastapi import FastAPI
from app.core.config import settings
from app.routers import auth, event, registration
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title=f"{settings.project_name} API",
    version="1.0.0",
    debug=settings.debug,
)

# CORS
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://evently-orpin-iota.vercel.app",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers
app.include_router(auth.router)
app.include_router(event.router)
app.include_router(registration.router)


@app.get("/")
def root():
    return {"message": f"{settings.project_name} API is running 🚀"}
