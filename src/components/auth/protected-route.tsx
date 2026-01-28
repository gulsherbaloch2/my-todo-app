// src/components/auth/protected-route.tsx
import React from 'react';
import { useAuth } from '@/providers/auth-provider';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Spinner } from '../ui/spinner'; // Assuming we have a spinner component

interface ProtectedRouteProps {
  children: React.ReactNode;
  fallback?: React.ReactNode; // Component to show while checking auth status
  redirectTo?: string; // Where to redirect if not authenticated
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  fallback = <div><Spinner /> Redirecting...</div>, // Simple fallback while checking auth
  redirectTo = '/auth/login',
}) => {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push(redirectTo);
    }
  }, [isAuthenticated, isLoading, router, redirectTo]);

  // Show fallback while checking authentication status
  if (isLoading) {
    return fallback;
  }

  // If authenticated, render the protected content
  if (isAuthenticated) {
    return <>{children}</>;
  }

  // If not authenticated and not loading, return nothing (fallback should have redirected)
  return null;
};

export { ProtectedRoute };