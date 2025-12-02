// src/lib/db.ts
import { supabase } from './supabase';
import type { Product } from './types';

/**
 * Get available products for public store
 */
export async function getProducts(): Promise<Product[]> {
  if (!supabase) {
    console.error('❌ Supabase not configured');
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

/**
 * Get product by slug for product detail page
 */
export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (!supabase) {
    console.error('❌ Supabase not configured');
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

/**
 * Get related products by category (excluding current product)
 */
export async function getRelatedProducts(category: string, excludeId: string, limit = 4): Promise<Product[]> {
  if (!supabase) {
    return [];
  }

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('category', category)
    .eq('availability', true)
    .neq('id', excludeId)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching related products:', error);
    return [];
  }

  return data || [];
}

// ============================================
// CRUD Operations for Admin
// ============================================

/**
 * Get ALL products (including unavailable) - for admin panel
 */
export async function getAllProducts(): Promise<Product[]> {
  if (!supabase) {
    console.error('❌ Supabase not configured');
    return [];
  }

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching all products:', error);
    return [];
  }

  return data || [];
}

/**
 * Get product by ID
 */
export async function getProductById(id: string): Promise<Product | null> {
  if (!supabase) {
    console.error('❌ Supabase not configured');
    return null;
  }

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching product by id:', error);
    return null;
  }

  return data;
}

/**
 * Generate URL-friendly slug from title
 */
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/[^a-z0-9\s-]/g, '') // Remove special chars
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens
    .trim();
}

/**
 * Create new product
 */
export async function createProduct(productData: Partial<Product>): Promise<Product> {
  if (!supabase) {
    throw new Error('Supabase not configured');
  }

  const now = new Date().toISOString();
  const slug = productData.slug || generateSlug(productData.title || 'producto');
  
  const newProduct = {
    title: productData.title || '',
    slug: slug,
    description: productData.description || '',
    price: productData.price || 0,
    category: productData.category || '',
    brand: productData.brand || '',
    model: productData.model || '',
    stock: productData.stock || 0,
    status: productData.status || 'nuevo',
    availability: productData.availability ?? true,
    images: productData.images || [],
    specs: productData.specs || {},
    payment_methods: productData.payment_methods || ['Efectivo', 'Transferencia', 'Nequi'],
    warranty: productData.warranty || '',
    views: 0,
    whatsapp_clicks: 0,
    created_at: now,
    updated_at: now,
  };

  const { data, error } = await supabase
    .from('products')
    .insert(newProduct)
    .select()
    .single();

  if (error) {
    console.error('Error creating product:', error);
    throw new Error(`Error creating product: ${error.message}`);
  }

  return data;
}

/**
 * Update existing product
 */
export async function updateProduct(id: string, productData: Partial<Product>): Promise<Product> {
  if (!supabase) {
    throw new Error('Supabase not configured');
  }

  const updateData: Partial<Product> = {
    ...productData,
    updated_at: new Date().toISOString(),
  };
  
  // Regenerate slug if title changed
  if (productData.title && !productData.slug) {
    updateData.slug = generateSlug(productData.title);
  }

  // Remove fields that shouldn't be updated directly
  delete updateData.id;
  delete updateData.created_at;
  delete updateData.views;
  delete updateData.whatsapp_clicks;

  const { data, error } = await supabase
    .from('products')
    .update(updateData)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating product:', error);
    throw new Error(`Error updating product: ${error.message}`);
  }

  return data;
}

/**
 * Delete product by ID
 */
export async function deleteProduct(id: string): Promise<void> {
  if (!supabase) {
    throw new Error('Supabase not configured');
  }

  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting product:', error);
    throw new Error(`Error deleting product: ${error.message}`);
  }
}

/**
 * Toggle product availability
 */
export async function toggleProductAvailability(id: string): Promise<Product> {
  const product = await getProductById(id);
  
  if (!product) {
    throw new Error('Product not found');
  }

  return updateProduct(id, { availability: !product.availability });
}

/**
 * Get unique categories from products
 */
export async function getCategories(): Promise<string[]> {
  const products = await getAllProducts();
  const categories = [...new Set(products.map(p => p.category))];
  return categories.filter(Boolean).sort();
}
