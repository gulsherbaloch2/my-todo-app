from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import os
from dotenv import load_dotenv
from sqlmodel import SQLModel
from db import engine

# Load environment variables
load_dotenv()

# Create database tables on startup
@asynccontextmanager
async def lifespan(app: FastAPI):
    # Create database tables
    try:
        SQLModel.metadata.create_all(engine)
    except Exception as e:
        print(f"Error creating tables: {e}")
    yield
    # Shutdown logic would go here if needed

app = FastAPI(
    title="Todo Application Backend",
    version="1.0.0",
    lifespan=lifespan
)

# Configure CORS for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific frontend origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Welcome to the Todo Application Backend"}

# Include routes
from routes import tasks
app.include_router(tasks.router)