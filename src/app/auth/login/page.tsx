// src/app/(auth)/login/page.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/providers/auth-provider';
import { AuthLayout } from '@/components/auth/auth-layout';
import { LoginForm } from '@/components/auth/login-form';

const LoginPage: React.FC = () => {
  const { login, isLoading } = useAuth();
  const router = useRouter();

  const handleLogin = async (email: string, password: string) => {
    try {
      await login(email, password);
      // Redirect to dashboard after successful login
      router.push('/dashboard');
      router.refresh(); // Refresh to update the UI after login
    } catch (error) {
      console.error('Login failed:', error);
      // Error is handled in the LoginForm component
    }
  };

  return (
    <AuthLayout 
      title="Welcome Back" 
      description="Sign in to your account to continue"
    >
      <LoginForm 
        onLogin={handleLogin} 
        loading={isLoading} 
      />
      
      <div className="mt-6 text-center text-sm text-gray-600">
        Don't have an account?{' '}
        <Link href="/auth/signup" className="font-semibold text-blue-600 hover:underline">
          Sign up
        </Link>
      </div>
    </AuthLayout>
  );
};

export default LoginPage;