// src/app/(auth)/signup/page.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/providers/auth-provider';
import { AuthLayout } from '@/components/auth/auth-layout';
import { SignupForm } from '@/components/auth/signup-form';

const SignupPage: React.FC = () => {
  const { signup, isLoading } = useAuth();
  const router = useRouter();

  const handleSignup = async (email: string, password: string, name: string) => {
    try {
      await signup(email, password, name);

      // Small delay to ensure session is properly established
      await new Promise(resolve => setTimeout(resolve, 500));

      // Redirect to dashboard after successful signup
      router.push('/dashboard');
    } catch (error) {
      console.error('Signup failed:', error);
      // Error is handled in the SignupForm component
    }
  };

  return (
    <AuthLayout 
      title="Create an Account" 
      description="Sign up to get started with our task management app"
    >
      <SignupForm 
        onSignup={handleSignup} 
        loading={isLoading} 
      />
      
      <div className="mt-6 text-center text-sm text-gray-600">
        Already have an account?{' '}
        <Link href="/auth/login" className="font-semibold text-blue-600 hover:underline">
          Sign in
        </Link>
      </div>
    </AuthLayout>
  );
};

export default SignupPage;