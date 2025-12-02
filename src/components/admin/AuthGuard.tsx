'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getSession } from '@/lib/auth';

interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const session = await getSession();

      if (!session) {
        router.push('/admin/login');
      } else {
        setIsAuthenticated(true);
      }

      setIsLoading(false);
    };

    checkAuth();
  }, [router]);

  if (isLoading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f9fafb',
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem',
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            border: '4px solid rgba(102, 126, 234, 0.3)',
            borderTopColor: '#667eea',
            borderRadius: '50%',
            animation: 'spin 0.8s linear infinite',
          }}></div>
          <p style={{ color: '#6b7280', margin: 0 }}>Verificando autenticación...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
