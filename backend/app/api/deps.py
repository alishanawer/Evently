from app import models
from jose import JWTError, jwt
from sqlalchemy.orm import Session
from app.core.config import settings
from datetime import datetime, timezone
from app.db.database import SessionLocal
from fastapi.security import OAuth2PasswordBearer
from fastapi import Depends, HTTPException, status


SECRET_KEY = settings.secret_key
ALGORITHM = settings.algorithm


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# --- Auth dependencies ---
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")


def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("sub")
        if user_id is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception

    user = db.query(models.user.User).filter(
        models.user.User.user_id == user_id).first()
    if user is None:
        raise credentials_exception

    return user


def admin_required(current_user: models.user.User = Depends(get_current_user)):
    if current_user.role != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="Admins only")
    return current_user
