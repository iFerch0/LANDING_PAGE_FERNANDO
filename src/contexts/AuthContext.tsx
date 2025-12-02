'use client';

import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import type { User } from '@supabase/supabase-js';
import { 
  signIn as authSignIn, 
  signOut as authSignOut, 
  getSession, 
  onAuthStateChange,
  type AuthResult 
} from '@/lib/auth';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<AuthResult>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Check initial session
  useEffect(() => {
    const initAuth = async () => {
      try {
        const session = await getSession();
        setUser(session?.user || null);
      } catch (error) {
        console.error('Auth init error:', error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  // Subscribe to auth changes
  useEffect(() => {
    const { unsubscribe } = onAuthStateChange((newUser) => {
      setUser(newUser);
      
      // If user logged out, redirect to login
      if (!newUser && !isLoading) {
        router.push('/admin/login');
      }
    });

    return () => {
      unsubscribe();
    };
  }, [router, isLoading]);

  const signIn = useCallback(async (email: string, password: string): Promise<AuthResult> => {
    setIsLoading(true);
    try {
      const result = await authSignIn(email, password);
      if (result.success) {
        // The onAuthStateChange will update the user
        router.push('/admin');
        router.refresh();
      }
      return result;
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  const signOut = useCallback(async () => {
    setIsLoading(true);
    try {
      await authSignOut();
      setUser(null);
      router.push('/admin/login');
      router.refresh();
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    signIn,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook para usar el contexto de autenticación
export function useAuth() {
  const context = useContext(AuthContext);
  
  // En SSR o cuando el provider no está montado, devolver valores por defecto
  if (context === undefined) {
    // Solo mostrar warning en desarrollo para debugging
    if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
      console.warn('useAuth was called outside of AuthProvider. Returning default values.');
    }
    
    // Devolver valores por defecto seguros para SSR
    return {
      user: null,
      session: null,
      isLoading: true,
      isAuthenticated: false,
      signIn: async () => ({ success: false, error: 'AuthProvider not mounted' }),
      logout: async () => {},
      refreshSession: async () => null,
    };
  }
  
  return context;
}
