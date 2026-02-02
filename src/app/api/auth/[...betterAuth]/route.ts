// src/app/api/auth/[...betterAuth]/route.ts
import { auth } from '@/lib/better-auth-config';
import { toNextJsHandler } from 'better-auth/next-js';

export const { GET, POST } = toNextJsHandler(auth);