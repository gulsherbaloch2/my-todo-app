# Feature Specification: Todo Application Backend

**Feature Branch**: `001-todo-backend`
**Created**: 2026-01-29
**Status**: Draft
**Input**: User description: "Project: Hackathon Todo App – Phase II (Backend) Scope: Design and specify the complete backend system for the Todo application. This backend must fully support and integrate with the already implemented frontend. Tech Stack (Fixed): - Backend Framework: Python FastAPI - ORM: SQLModel - Database: Neon Serverless PostgreSQL - Authentication: Better Auth (JWT verification) - API Style: REST - Deployment Target: Local + Production-ready structure Environment Variables (authoritative): - BETTER_AUTH_SECRET=NX1sW5Ji6MnDjlA3IO1MOZwGglbm5nlv - BETTER_AUTH_URL=http://localhost:3000 - Neon_db_url=postgresql://neondb_owner:npg_SciUfKP4vB2p@ep-orange-shadow-a7kevwbt-pooler.ap-southeast-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require High-Level Goals: - Fully functional backend API - Secure JWT-based user isolation - Persistent storage in Neon PostgreSQL - Seamless integration with existing frontend - Production-usable (not demo-level) Backend Responsibilities: 1. Authentication & Security - Verify JWT tokens issued by Better Auth - Extract authenticated user ID from JWT - Reject unauthenticated requests with 401 - Reject cross-user access with 403 - Stateless auth (no session storage) 2. API Endpoints (Mandatory) Implement REST endpoints under `/api`: - GET /api/{user_id}/tasks - POST /api/{user_id}/tasks - GET /api/{user_id}/tasks/{id} - PUT /api/{user_id}/tasks/{id} - DELETE /api/{user_id}/tasks/{id} - PATCH /api/{user_id}/tasks/{id}/complete Rules: - All endpoints require valid JWT - user_id in URL must match JWT user_id - Only return tasks belonging to authenticated user 3. Database Design Use SQLModel models: Table: tasks - id (int, primary key) - user_id (string, indexed) - title (string, required, 1–200 chars) - description (text, optional) - completed (boolean, default false) - created_at (timestamp) - updated_at (timestamp) Indexes: - user_id - completed 4. Backend Architecture Required structure: - main.py (FastAPI app entry) - db.py (Neon connection + session handling) - models.py (SQLModel entities) - schemas.py (Pydantic request/response models) - auth.py (JWT verification logic) - routes/tasks.py (task endpoints) - dependencies.py (auth + db dependencies) 5. Validation & Error Handling - Input validation via Pydantic - Clear HTTP errors: - 400 invalid input - 401 unauthenticated - 403 unauthorized - 404 not found - Consistent JSON error responses 6. Integration Contract - API responses must match frontend expectations - Use JSON only - CORS configured for frontend origin - Support optimistic UI updates 7. Non-Goals (Explicitly Out of Scope) - Frontend implementation - OAuth providers - Admin or multi-tenant features - Real-time sync (WebSockets) Deliverables: - Complete backend feature specification - Clear acceptance criteria for each endpoint - Edge cases and failure scenarios - Security guarantees - Ready for `/sp.plan` and `/sp.tasks` Quality Bar: - Production-usable - Secure by default - Clean architecture - No placeholder logic Status: COMPLETED"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Manage Personal Tasks (Priority: P1)

As an authenticated user, I want to create, view, update, and delete my personal tasks so that I can organize my daily activities effectively.

**Why this priority**: This is the core functionality of the todo application. Without the ability to manage tasks, the application has no value to users.

**Independent Test**: Can be fully tested by creating a task, viewing it, updating it, and deleting it while ensuring that only the authenticated user can access their own tasks.

**Acceptance Scenarios**:

1. **Given** I am an authenticated user with a valid JWT token, **When** I create a new task, **Then** the task is saved to my account and I receive a success response
2. **Given** I am an authenticated user with existing tasks, **When** I request my tasks list, **Then** I only see tasks associated with my user ID
3. **Given** I am an authenticated user with a task, **When** I update the task details, **Then** the changes are saved and reflected in the system
4. **Given** I am an authenticated user with a task, **When** I delete the task, **Then** the task is removed from my account

---

### User Story 2 - Secure Task Access (Priority: P2)

As an authenticated user, I want to ensure that my tasks are secure and that I cannot access other users' tasks, so that my personal information remains private.

**Why this priority**: Security is critical for user trust. Without proper isolation, users could access others' data, leading to privacy violations.

**Independent Test**: Can be tested by attempting to access another user's tasks with a valid JWT token and verifying that access is denied.

**Acceptance Scenarios**:

1. **Given** I am an authenticated user with a valid JWT token, **When** I try to access another user's tasks, **Then** I receive a 403 Forbidden error
2. **Given** I am an unauthenticated user, **When** I try to access any task data, **Then** I receive a 401 Unauthorized error

---

### User Story 3 - Track Task Completion (Priority: P3)

As an authenticated user, I want to mark my tasks as complete or incomplete so that I can track my progress and productivity.

**Why this priority**: This enhances the core functionality by allowing users to manage their task lifecycle effectively.

**Independent Test**: Can be tested by creating a task, marking it as complete, then marking it as incomplete again, verifying the status updates correctly.

**Acceptance Scenarios**:

1. **Given** I am an authenticated user with an incomplete task, **When** I mark the task as complete, **Then** the task's completion status is updated to true
2. **Given** I am an authenticated user with a completed task, **When** I mark the task as incomplete, **Then** the task's completion status is updated to false

---

### Edge Cases

- What happens when a user attempts to access a task that doesn't exist? The system should return a 404 Not Found error.
- How does the system handle malformed JWT tokens? The system should reject the request with a 401 Unauthorized error.
- What happens when a user tries to create a task with a title exceeding 200 characters? The system should return a 400 Bad Request error.
- How does the system handle database connection failures? The system should return appropriate error responses to the client.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST verify JWT tokens issued by Better Auth to authenticate users
- **FR-002**: System MUST extract authenticated user ID from JWT and enforce user isolation
- **FR-003**: System MUST reject unauthenticated requests with HTTP 401 status code
- **FR-004**: System MUST reject cross-user access attempts with HTTP 403 status code
- **FR-005**: System MUST implement REST endpoints under `/api` for task management
- **FR-006**: System MUST provide GET /api/{user_id}/tasks endpoint to retrieve all tasks for a user
- **FR-007**: System MUST provide POST /api/{user_id}/tasks endpoint to create new tasks
- **FR-008**: System MUST provide GET /api/{user_id}/tasks/{id} endpoint to retrieve a specific task
- **FR-009**: System MUST provide PUT /api/{user_id}/tasks/{id} endpoint to update a task
- **FR-010**: System MUST provide DELETE /api/{user_id}/tasks/{id} endpoint to delete a task
- **FR-011**: System MUST provide PATCH /api/{user_id}/tasks/{id}/complete endpoint to update task completion status
- **FR-012**: System MUST validate that the user_id in the URL matches the user_id in the JWT token
- **FR-013**: System MUST only return tasks belonging to the authenticated user
- **FR-014**: System MUST store tasks in Neon PostgreSQL database using SQLModel
- **FR-015**: Task entity MUST have id (int, primary key), user_id (string, indexed), title (string, required, 1-200 chars), description (text, optional), completed (boolean, default false), created_at (timestamp), updated_at (timestamp)
- **FR-016**: System MUST validate all inputs using Pydantic models
- **FR-017**: System MUST return appropriate HTTP error codes: 400 for invalid input, 401 for unauthenticated, 403 for unauthorized, 404 for not found
- **FR-018**: System MUST return consistent JSON error responses
- **FR-019**: System MUST configure CORS to allow requests from the frontend origin
- **FR-020**: System MUST support optimistic UI updates by returning updated data after mutations

### Key Entities

- **Task**: Represents a user's task with properties including id, title, description, completion status, and timestamps. Belongs to a single user.
- **User**: Identified by user_id extracted from JWT token. Owns multiple tasks and can only access their own tasks.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Authenticated users can successfully create, read, update, and delete their own tasks with 99.9% success rate
- **SC-002**: Unauthenticated users are consistently rejected with 401 errors when attempting to access protected endpoints
- **SC-003**: Cross-user access attempts are consistently blocked with 403 errors, ensuring data isolation
- **SC-004**: API endpoints respond within 500ms for 95% of requests under normal load conditions
- **SC-005**: System maintains 99.9% uptime during peak usage periods
- **SC-006**: All API responses conform to documented JSON schema with 100% accuracy
