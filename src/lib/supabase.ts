import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

// Cliente público (anon) — para componentes cliente y admin autenticado
export const supabase: SupabaseClient | null =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey, {
        auth: {
          persistSession: true,
          storageKey: 'fercho-admin-auth',
          autoRefreshToken: true,
          detectSessionInUrl: true,
        },
      })
    : null;

// Cliente admin (service_role) — solo para server actions, bypasea RLS
export const supabaseAdmin: SupabaseClient | null =
  supabaseUrl && supabaseServiceRoleKey
    ? createClient(supabaseUrl, supabaseServiceRoleKey, {
        auth: { persistSession: false, autoRefreshToken: false },
      })
    : null;

if (!supabase) {
  console.warn('⚠️ Supabase credentials not configured. Using empty product catalog.');
}
