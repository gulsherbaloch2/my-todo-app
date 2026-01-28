# Implementation Plan: Todo Application Backend

**Branch**: `001-todo-backend` | **Date**: 2026-01-29 | **Spec**: [link to spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-todo-backend/spec.md`

**Note**: This template is filled in by the `/sp.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Implementation of a complete backend system for the Todo application using Python FastAPI, SQLModel ORM, and Neon PostgreSQL. The system will provide secure JWT-based authentication and authorization, with REST API endpoints for full CRUD operations on user tasks. The backend will enforce user isolation, ensuring users can only access their own tasks, and will integrate seamlessly with the existing frontend.

## Technical Context

**Language/Version**: Python 3.9+
**Primary Dependencies**: FastAPI, SQLModel, Neon PostgreSQL, Better Auth (JWT verification), Pydantic, python-jose[cryptography], uvicorn
**Storage**: Neon Serverless PostgreSQL database with SQLModel ORM
**Testing**: pytest for backend
**Target Platform**: Web application backend API
**Project Type**: Backend API service with JWT authentication
**Performance Goals**: API response times under 500ms, handle 1000+ concurrent users
**Constraints**: JWT authentication with Better Auth, user isolation, secure data handling, CORS configuration for frontend integration
**Scale/Scope**: Individual user focus with potential for scaling to 10k+ users

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- ✅ Full-Stack Architecture: Adheres to backend portion of architecture (FastAPI + SQLModel + Neon PostgreSQL)
- ✅ Type Safety & Validation: Using Pydantic models for request/response validation
- ✅ Test-First (NON-NEGOTIABLE): Will implement with pytest for backend testing
- ✅ Authentication-First Design: JWT verification with Better Auth integration
- ✅ API-First Development: Following RESTful principles with proper error handling
- ✅ Security Standards: JWT validation, user isolation, input sanitization
- ✅ Performance Standards: Optimized database queries with proper indexing

*Post-design verification:*
- ✅ Full-Stack Architecture: API contracts designed to integrate seamlessly with existing frontend
- ✅ Type Safety & Validation: All API endpoints have Pydantic request/response models
- ✅ Test-First (NON-NEGOTIABLE): Testing strategy included in implementation milestones
- ✅ Authentication-First Design: Authentication layer planned as M2 milestone
- ✅ API-First Development: Complete API contracts created with OpenAPI specification
- ✅ Security Standards: User isolation and ownership enforcement built into design
- ✅ Performance Standards: Database indexes specified in data model

## Project Structure

### Documentation (this feature)

```text
specs/001-todo-backend/
├── plan.md              # This file (/sp.plan command output)
├── research.md          # Phase 0 output (/sp.plan command)
├── data-model.md        # Phase 1 output (/sp.plan command)
├── quickstart.md        # Phase 1 output (/sp.plan command)
├── contracts/           # Phase 1 output (/sp.plan command)
└── tasks.md             # Phase 2 output (/sp.tasks command - NOT created by /sp.plan)
```

### Source Code (repository root)
```text
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

**Structure Decision**: Backend-only structure with separate modules for different concerns. The backend will be implemented as a separate service with a clean architecture separating concerns into different modules (authentication, database, models, schemas, routes).

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |

## Phase 0: Outline & Research

Completed research on key implementation aspects:
- JWT verification implementation using python-jose
- Database connection pooling with SQLModel and Neon PostgreSQL
- CORS configuration for frontend integration
- Request/response validation with Pydantic
- Dependency injection pattern for auth and DB management
- Error handling strategy with consistent responses
- Environment variable management for security
- Task ownership validation approach

## Phase 1: Design & Contracts

### Data Model
- Defined Task entity with required fields (id, user_id, title, description, completed, timestamps)
- Established relationships and validation rules
- Specified indexes for performance optimization

### API Contracts
Created comprehensive API contracts for all required endpoints:
- GET /api/{user_id}/tasks
- POST /api/{user_id}/tasks
- GET /api/{user_id}/tasks/{id}
- PUT /api/{user_id}/tasks/{id}
- DELETE /api/{user_id}/tasks/{id}
- PATCH /api/{user_id}/tasks/{id}/complete

Each contract specifies request/response formats, status codes, and error handling.

### Quickstart Guide
Created detailed quickstart guide covering:
- Prerequisites and setup instructions
- Environment configuration
- Running the application
- Testing the API endpoints
- Authentication requirements
- Troubleshooting tips

## Implementation Milestones

### M1: Project Setup & DB Connection
- Set up project structure with all required files
- Configure database connection to Neon PostgreSQL
- Implement basic SQLModel setup with Task model
- Create initial FastAPI application

### M2: Authentication Layer
- Implement JWT verification logic
- Create authentication dependency
- Add user identity extraction from JWT
- Implement user_id validation against URL parameter

### M3: Models & Schemas
- Define Pydantic schemas for requests/responses
- Implement input validation
- Create error response models
- Establish consistent API patterns

### M4: Task CRUD Endpoints
- Implement GET /api/{user_id}/tasks
- Implement POST /api/{user_id}/tasks
- Implement GET /api/{user_id}/tasks/{id}
- Implement PUT /api/{user_id}/tasks/{id}
- Implement DELETE /api/{user_id}/tasks/{id}

### M5: Completion Endpoint & Ownership Enforcement
- Implement PATCH /api/{user_id}/tasks/{id}/complete
- Add comprehensive ownership validation
- Ensure all endpoints enforce user isolation
- Add proper error handling and status codes

### M6: Testing & Validation
- Write pytest tests for all endpoints
- Validate API contracts
- Test authentication and authorization
- Perform integration testing with frontend
