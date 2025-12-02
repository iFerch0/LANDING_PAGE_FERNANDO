// src/lib/db.ts
import { supabase } from './supabase';
import type { Product } from './types';

export async function getProducts(): Promise<Product[]> {
  // Return empty array if Supabase is not configured
  if (!supabase) {
    return [];
  }

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('availability', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching products:', error);
    return [];
  }

  return data || [];
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    console.error('Error fetching product:', error);
    return null;
  }

  return data;
}

export async function incrementViews(productId: string): Promise<void> {
  if (!supabase) {
    return;
  }

  const { error } = await supabase.rpc('increment_views', { product_id: productId });

  if (error) {
    console.error('Error incrementing views:', error);
  }
}

export async function incrementWhatsAppClicks(productId: string): Promise<void> {
  if (!supabase) {
    return;
  }

  const { error } = await supabase.rpc('increment_whatsapp_clicks', { product_id: productId });

  if (error) {
    console.error('Error incrementing WhatsApp clicks:', error);
  }
}
