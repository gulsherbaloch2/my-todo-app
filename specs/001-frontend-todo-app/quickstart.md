# Quickstart Guide: Frontend Task Management and Authentication UI

**Feature**: Frontend Task Management and Authentication UI  
**Date**: 2026-01-28

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Git for version control

## Setup Instructions

### 1. Clone the Repository
```bash
git clone <repository-url>
cd <project-directory>
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

### 3. Environment Configuration
Create a `.env.local` file in the root directory with the following variables:

```env
NEXT_PUBLIC_BASE_URL=http://localhost:3000
AUTH_SECRET=your-auth-secret-here
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api
```

### 4. Run the Development Server
```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:3000`

## Key Scripts

- `npm run dev` - Start development server with hot reloading
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint to check for code issues
- `npm run test` - Run unit tests

## Project Structure

```
app/
├── (auth)/              # Authentication pages
│   ├── login/page.tsx
│   ├── signup/page.tsx
│   └── layout.tsx
├── dashboard/           # Protected task management pages
│   ├── page.tsx
│   └── layout.tsx
├── globals.css          # Global styles
├── layout.tsx           # Root layout
├── page.tsx             # Home page (redirects to auth or dashboard)
├── providers/           # Context providers
│   └── auth-provider.tsx
└── components/          # Reusable UI components
    ├── ui/              # Atomic UI components
    │   ├── button.tsx
    │   ├── input.tsx
    │   └── ...
    ├── task/            # Task-specific components
    │   ├── task-list.tsx
    │   └── ...
    └── auth/            # Authentication components
        ├── login-form.tsx
        └── ...
```

## Key Technologies Used

- **Next.js 16+** with App Router for the frontend framework
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Better Auth** for authentication
- **Axios** for API requests

## Common Development Tasks

### Creating a New Component
1. Create the component file in the appropriate directory under `components/`
2. Export the component as a default export
3. Add proper TypeScript typing
4. Include JSDoc comments for props

### Adding a New Page
1. Create a new directory under `app/` with the route name
2. Add a `page.tsx` file in that directory
3. Implement the page component with proper TypeScript typing

### Making API Requests
1. Use the centralized API client in `lib/api-client.ts`
2. Create specific service functions for each API endpoint
3. Handle loading and error states appropriately

### Adding Authentication Protection
1. Wrap protected components/pages with the `ProtectedRoute` component
2. Use the `useAuth` hook to access authentication state
3. Implement proper redirect logic for unauthorized access