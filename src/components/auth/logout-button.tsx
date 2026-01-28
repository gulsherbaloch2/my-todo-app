// src/components/auth/logout-button.tsx
import React from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/providers/auth-provider';
import { useRouter } from 'next/navigation';

interface LogoutButtonProps {
  children?: React.ReactNode;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ 
  children = 'Logout', 
  variant = 'outline',
  size = 'default'
}) => {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    // Redirect to login page after logout
    router.push('/auth/login');
    router.refresh(); // Refresh to update the UI after logout
  };

  return (
    <Button 
      variant={variant} 
      size={size} 
      onClick={handleLogout}
    >
      {children}
    </Button>
  );
};

export { LogoutButton };