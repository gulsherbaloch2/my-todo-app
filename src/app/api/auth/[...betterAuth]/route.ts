// src/app/api/auth/[...betterAuth]/route.ts
import { auth } from '@/lib/better-auth-config';
import { NextRequest } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
  const url = request.nextUrl;
  const response = await auth.handler({
    request: {
      url: url.toString(),
      method: 'GET',
      headers: Object.fromEntries(request.headers.entries()),
    },
    cookies: {
      get: (name: string) => {
        const cookie = cookies().get(name);
        return cookie ? { value: cookie.value } : null;
      },
    },
  });

  const { status, headers } = response;
  const body = await response.text();

  return new Response(body, {
    status,
    headers,
  });
}

export async function POST(request: NextRequest) {
  const url = request.nextUrl;
  const body = await request.text();
  const response = await auth.handler({
    request: {
      url: url.toString(),
      method: 'POST',
      headers: Object.fromEntries(request.headers.entries()),
      body,
    },
    cookies: {
      get: (name: string) => {
        const cookie = cookies().get(name);
        return cookie ? { value: cookie.value } : null;
      },
    },
  });

  const { status, headers } = response;

  return new Response(await response.text(), {
    status,
    headers,
  });
}