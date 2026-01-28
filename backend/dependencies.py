from fastapi import Depends, HTTPException, status, Request
from typing import Generator
from sqlmodel import Session
from auth import extract_user_id_from_token
from db import get_session
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

# Security scheme for JWT
security = HTTPBearer()

def get_current_user_id(credentials: HTTPAuthorizationCredentials = Depends(security)) -> str:
    """
    Dependency to get the current user ID from the JWT token
    """
    token = credentials.credentials
    return extract_user_id_from_token(token)

def validate_user_id_match(request_user_id: str, url_user_id: str) -> bool:
    """
    Validate that the user_id in the URL matches the user_id in the JWT token
    """
    if request_user_id != url_user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access forbidden: user_id mismatch"
        )
    return True

def get_db_session() -> Generator[Session, None, None]:
    """
    Dependency to get database session
    """
    yield from get_session()