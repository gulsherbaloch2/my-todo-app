// src/lib/auth-client.ts
import { createAuthClient } from 'better-auth/react';

// Initialize better-auth client with proper configuration
export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
  fetchOptions: {
    headers: {
      'API-Key': process.env.KRO_API_KEY || '', // Include KRO API key in auth requests
    },
  },
});