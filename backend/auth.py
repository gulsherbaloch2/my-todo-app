from datetime import datetime, timedelta
from typing import Optional
import os
from dotenv import load_dotenv
from jose import JWTError, jwt
from fastapi import HTTPException, status

# Load environment variables
load_dotenv()

SECRET_KEY = os.getenv("BETTER_AUTH_SECRET")
ALGORITHM = "HS256"

def verify_jwt_token(token: str) -> Optional[dict]:
    """
    Verify the JWT token and return the payload if valid
    """
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("userId")
        
        if user_id is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Could not validate credentials"
            )
        
        return payload
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials"
        )

def extract_user_id_from_token(token: str) -> str:
    """
    Extract user_id from JWT token
    """
    payload = verify_jwt_token(token)
    user_id = payload.get("userId")
    
    if user_id is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials"
        )
    
    return user_id