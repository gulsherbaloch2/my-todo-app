from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

# Request schemas
class TaskCreateRequest(BaseModel):
    title: str
    description: Optional[str] = None
    completed: bool = False

class TaskUpdateRequest(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    completed: Optional[bool] = None

class TaskCompletionUpdateRequest(BaseModel):
    completed: bool

# Response schemas
class TaskResponse(BaseModel):
    id: int
    user_id: str
    title: str
    description: Optional[str]
    completed: bool
    created_at: datetime
    updated_at: datetime

class TaskListResponse(BaseModel):
    tasks: List[TaskResponse]

# Error response schema
class ErrorResponse(BaseModel):
    detail: str

# JWT Token validation response
class TokenData(BaseModel):
    user_id: str