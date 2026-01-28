# Data Model: Frontend Task Management and Authentication UI

**Feature**: Frontend Task Management and Authentication UI  
**Date**: 2026-01-28

## Task Entity

### Fields
- `id: string` - Unique identifier for the task
- `title: string` - Title of the task (required, max 255 chars)
- `description?: string` - Optional description of the task (max 1000 chars)
- `completed: boolean` - Status indicating if task is completed (default: false)
- `createdAt: Date` - Timestamp when task was created
- `updatedAt: Date` - Timestamp when task was last updated

### Validation Rules
- Title must be between 1 and 255 characters
- Description, if provided, must be between 1 and 1000 characters
- Completed must be a boolean value
- createdAt and updatedAt must be valid ISO date strings

### State Transitions
- Pending (completed: false) → Completed (completed: true) when user marks task as done
- Completed (completed: true) → Pending (completed: false) when user unmarks task

## User Session Entity

### Fields
- `id: string` - Unique identifier for the user
- `email: string` - User's email address
- `name?: string` - Optional user name
- `token: string` - JWT token for authentication
- `expiresAt: Date` - Expiration timestamp for the token

### Validation Rules
- Email must be a valid email format
- Name, if provided, must be between 1 and 100 characters
- Token must be a valid JWT string
- expiresAt must be a future date

## API Response Format

### Success Response
```typescript
{
  success: true,
  data: any, // The actual data payload
  message?: string // Optional success message
}
```

### Error Response
```typescript
{
  success: false,
  error: {
    code: string, // Error code
    message: string // Human-readable error message
  },
  details?: any // Optional additional error details
}
```

## Form Validation Rules

### Task Creation/Update
- Title is required and must be 1-255 characters
- Description, if provided, must be 0-1000 characters
- Form submission disabled while request is pending

### Authentication Forms
- Email must be valid email format
- Password must meet minimum strength requirements (8+ chars, 1 uppercase, 1 number)
- Form submission disabled while request is pending