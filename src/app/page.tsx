'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/providers/auth-provider';
import { Spinner } from '@/components/ui/spinner';

export default function Home() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const handleRedirect = async () => {
      // Small delay to ensure auth state is properly loaded
      await new Promise(resolve => setTimeout(resolve, 300));

      if (isAuthenticated) {
        // If user is authenticated, redirect to dashboard
        router.replace('/dashboard');
      } else {
        // If user is not authenticated, redirect to login
        router.replace('/auth/login');
      }
    };

    if (!isLoading) {
      handleRedirect();
    }
  }, [isAuthenticated, isLoading, router]);

  // Show a loading spinner while determining auth status
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <Spinner />
        <p className="mt-4">Redirecting...</p>
      </div>
    </div>
  );
}
