// src/types/task.ts
export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// src/types/auth.ts
export interface UserSession {
  id: string;
  email: string;
  name?: string;
  token: string;
  expiresAt: Date;
}

// Better Auth user type
export interface BetterAuthUser {
  id: string;
  email: string;
  name?: string;
  emailVerified: boolean;
  image?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface ApiResponse<T> {
  success: true;
  data: T;
  message?: string;
}

export interface ApiErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
  };
  details?: any;
}