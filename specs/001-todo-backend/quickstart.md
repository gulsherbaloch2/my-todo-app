# Quickstart Guide: Todo Application Backend

## Prerequisites

- Python 3.9 or higher
- pip package manager
- Access to Neon PostgreSQL database
- Better Auth secret and URL

## Setup Instructions

### 1. Clone the Repository
```bash
git clone <repository-url>
cd <repository-directory>
```

### 2. Create Virtual Environment
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### 3. Install Dependencies
```bash
pip install fastapi sqlmodel python-jose[cryptography] psycopg2-binary uvicorn python-multipart python-dotenv
```

### 4. Configure Environment Variables
Create a `.env` file in the project root with the following variables:
```env
BETTER_AUTH_SECRET=NX1sW5Ji6MnDjlA3IO1MOZwGglbm5nlv
BETTER_AUTH_URL=http://localhost:3000
DATABASE_URL=postgresql://neondb_owner:npg_SciUfKP4vB2p@ep-orange-shadow-a7kevwbt-pooler.ap-southeast-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require
```

### 5. Project Structure
Create the following directory and file structure:
```
backend/
├── main.py                 # FastAPI app entry point
├── db.py                   # Neon connection and session handling
├── models.py               # SQLModel entities
├── schemas.py              # Pydantic request/response models
├── auth.py                 # JWT verification logic
├── dependencies.py         # Auth and DB dependencies
└── routes/
    └── tasks.py            # Task endpoints
```

## Running the Application

### 1. Start the Development Server
```bash
cd backend
uvicorn main:app --reload --port 8000
```

### 2. Access the API
- API documentation: http://localhost:8000/docs
- API specification: http://localhost:8000/openapi.json

## Testing the API

### 1. Get User's Tasks
```bash
curl -H "Authorization: Bearer YOUR_JWT_TOKEN" \
     http://localhost:8000/api/user123/tasks
```

### 2. Create a New Task
```bash
curl -X POST -H "Authorization: Bearer YOUR_JWT_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{"title": "New Task", "description": "Task description"}' \
     http://localhost:8000/api/user123/tasks
```

### 3. Update a Task
```bash
curl -X PUT -H "Authorization: Bearer YOUR_JWT_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{"title": "Updated Task", "description": "Updated description", "completed": true}' \
     http://localhost:8000/api/user123/tasks/1
```

### 4. Delete a Task
```bash
curl -X DELETE -H "Authorization: Bearer YOUR_JWT_TOKEN" \
     http://localhost:8000/api/user123/tasks/1
```

## Authentication

The backend verifies JWT tokens issued by Better Auth. To access protected endpoints:
1. Authenticate with the frontend to obtain a JWT token
2. Include the token in the Authorization header as `Bearer {token}`
3. The user_id in the URL must match the user_id in the JWT token

## Troubleshooting

### Common Issues
- **401 Unauthorized**: Check that your JWT token is valid and properly formatted
- **403 Forbidden**: Verify that the user_id in the URL matches the user_id in your JWT token
- **500 Internal Server Error**: Check the server logs for detailed error information
- **Database Connection Issues**: Verify your DATABASE_URL is correct and accessible