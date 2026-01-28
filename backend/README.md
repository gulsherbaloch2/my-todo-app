# Todo Application Backend

This is the backend implementation for the Todo Application, built with Python FastAPI, SQLModel, and Neon PostgreSQL.

## Features

- JWT-based authentication and authorization
- Full CRUD operations for user tasks
- Secure user isolation (users can only access their own tasks)
- REST API endpoints following best practices
- Input validation and error handling

## Tech Stack

- **Framework**: FastAPI
- **ORM**: SQLModel
- **Database**: Neon Serverless PostgreSQL
- **Authentication**: JWT verification using python-jose
- **Validation**: Pydantic models

## Prerequisites

- Python 3.9+
- pip package manager
- Access to Neon PostgreSQL database

## Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. Navigate to the backend directory:
   ```bash
   cd backend
   ```

3. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

4. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

5. Configure environment variables by creating a `.env` file:
   ```env
   BETTER_AUTH_SECRET=your_secret_here
   BETTER_AUTH_URL=http://localhost:3000
   DATABASE_URL=postgresql://your_neon_db_url
   ```

## Running the Application

Start the development server:

```bash
uvicorn main:app --reload --port 8000
```

The API will be available at `http://localhost:8000`.

API documentation will be available at `http://localhost:8000/docs`.

## API Endpoints

All endpoints require a valid JWT token in the Authorization header as `Bearer {token}`.

- `GET /api/{user_id}/tasks` - Get all tasks for a user
- `POST /api/{user_id}/tasks` - Create a new task for a user
- `GET /api/{user_id}/tasks/{id}` - Get a specific task
- `PUT /api/{user_id}/tasks/{id}` - Update a specific task
- `DELETE /api/{user_id}/tasks/{id}` - Delete a specific task
- `PATCH /api/{user_id}/tasks/{id}/complete` - Update task completion status

## Security

- JWT tokens are verified using the BETTER_AUTH_SECRET
- User ID in the URL must match the user ID in the JWT token
- Users can only access their own tasks
- Input validation is performed on all requests

## Project Structure

```
backend/
├── main.py                 # FastAPI app entry point
├── db.py                   # Database connection and session handling
├── models.py               # SQLModel entities
├── schemas.py              # Pydantic request/response models
├── auth.py                 # JWT verification logic
├── dependencies.py         # Auth and DB dependencies
├── routes/
│   └── tasks.py            # Task endpoints
├── requirements.txt        # Project dependencies
└── .env                    # Environment variables
```

## Testing

To run the basic functionality tests:

```bash
python ../test_backend.py
```