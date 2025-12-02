// src/lib/auth.ts
import { supabase } from './supabase';

export interface AdminUser {
  id: string;
  email: string;
}

/**
 * Sign in with email and password
 */
export async function signIn(email: string, password: string) {
  if (!supabase) {
    throw new Error('Supabase not configured');
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw error;
  }

  return data;
}

/**
 * Sign out the current user
 */
export async function signOut() {
  if (!supabase) {
    throw new Error('Supabase not configured');
  }

  const { error } = await supabase.auth.signOut();

  if (error) {
    throw error;
  }
}

/**
 * Get the current session
 */
export async function getSession() {
  if (!supabase) {
    return null;
  }

  const { data: { session }, error } = await supabase.auth.getSession();

  if (error) {
    console.error('Error getting session:', error);
    return null;
  }

  return session;
}

/**
 * Get the current user
 */
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

/**
 * Check if user is authenticated
 */
export async function isAuthenticated(): Promise<boolean> {
  const session = await getSession();
  return !!session;
}
