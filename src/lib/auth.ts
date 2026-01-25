// src/lib/auth.ts
import { supabase } from './supabase';
import type { Session, User, AuthError } from '@supabase/supabase-js';

export interface AdminUser {
  id: string;
  email: string;
}

export interface AuthResult {
  success: boolean;
  error?: string;
  user?: AdminUser;
}

export async function signIn(email: string, password: string): Promise<AuthResult> {
  if (!supabase) {
    return { success: false, error: 'Sistema no configurado' };
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim().toLowerCase(),
      password,
    });

    if (error) {
      return {
        success: false,
        error: getAuthErrorMessage(error),
      };
    }

    if (!data.user) {
      return { success: false, error: 'No se pudo obtener información del usuario' };
    }

    return {
      success: true,
      user: {
        id: data.user.id,
        email: data.user.email || '',
      },
    };
  } catch (err) {
    console.error('Sign in error:', err);
    return { success: false, error: 'Error de conexión. Intenta de nuevo.' };
  }
}

export async function signOut(): Promise<{ success: boolean; error?: string }> {
  if (!supabase) {
    return { success: false, error: 'Sistema no configurado' };
  }

  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err) {
    console.error('Sign out error:', err);
    return { success: false, error: 'Error al cerrar sesión' };
  }
}

export async function getSession(): Promise<Session | null> {
  if (!supabase) {
    return null;
  }

  try {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (error) {
      console.error('Error getting session:', error);
      return null;
    }

    return session;
  } catch (err) {
    console.error('Session check error:', err);
    return null;
  }
}

export async function getCurrentUser(): Promise<AdminUser | null> {
  const session = await getSession();

  if (!session?.user) {
    return null;
  }

  return {
    id: session.user.id,
    email: session.user.email || '',
  };
}

export async function isAuthenticated(): Promise<boolean> {
  const session = await getSession();
  return !!session;
}

export async function refreshSession(): Promise<Session | null> {
  if (!supabase) {
    return null;
  }

  try {
    const {
      data: { session },
      error,
    } = await supabase.auth.refreshSession();

    if (error) {
      console.error('Error refreshing session:', error);
      return null;
    }

    return session;
  } catch (err) {
    console.error('Session refresh error:', err);
    return null;
  }
}

export function onAuthStateChange(callback: (user: User | null) => void) {
  if (!supabase) {
    return { unsubscribe: () => {} };
  }

  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange((event, session) => {
    callback(session?.user || null);
  });

  return { unsubscribe: () => subscription.unsubscribe() };
}

function getAuthErrorMessage(error: AuthError): string {
  const errorMessages: Record<string, string> = {
    'Invalid login credentials': 'Credenciales inválidas. Verifica tu email y contraseña.',
    'Email not confirmed': 'Tu email no ha sido confirmado.',
    'User not found': 'Usuario no encontrado.',
    'Invalid email or password': 'Email o contraseña incorrectos.',
    'Too many requests': 'Demasiados intentos. Espera unos minutos.',
    'Email rate limit exceeded': 'Has excedido el límite de intentos. Intenta más tarde.',
    'User already registered': 'Este email ya está registrado.',
  };

  return errorMessages[error.message] || error.message || 'Error al iniciar sesión';
}
