// src/lib/repositories/product.repository.ts
// Capa de acceso a datos — encapsula Supabase, nunca expuesta directamente al UI

import { supabase } from '@/lib/supabase';
import type { Product, ProductFilters, PaginatedResult } from '@/lib/types';
import type { CreateProductInput, UpdateProductInput } from '@/lib/types';

// ─── helpers privados ────────────────────────────────────────────────────────

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

function assertSupabase(): typeof supabase & {} {
  if (!supabase) throw new Error('Supabase no está configurado');
  return supabase;
}

// ─── Repository ──────────────────────────────────────────────────────────────

/**
 * ProductRepository
 * Responsabilidad única: traduce operaciones de dominio a queries de Supabase.
 * Nunca contiene lógica de negocio ni validación — eso es responsabilidad
 * del service layer.
 */
export const productRepository = {
  /** Lista productos disponibles (públicos) con filtros opcionales */
  async findMany(filters: ProductFilters = {}): Promise<PaginatedResult<Product>> {
    const client = assertSupabase();
    const {
      category,
      brand,
      status,
      minPrice,
      maxPrice,
      availability,
      search,
      page = 1,
      pageSize = 20,
      orderBy = 'created_at',
      orderDir = 'desc',
    } = filters;

    let query = client.from('products').select('*', { count: 'exact' });

    if (typeof availability === 'boolean') query = query.eq('availability', availability);
    if (category) query = query.eq('category', category);
    if (brand) query = query.eq('brand', brand);
    if (status) query = query.eq('status', status);
    if (typeof minPrice === 'number') query = query.gte('price', minPrice);
    if (typeof maxPrice === 'number') query = query.lte('price', maxPrice);
    if (search) query = query.ilike('title', `%${search}%`);

    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    const { data, error, count } = await query
      .order(orderBy, { ascending: orderDir === 'asc' })
      .range(from, to);

    if (error) throw new Error(`Error al obtener productos: ${error.message}`);

    return {
      data: data ?? [],
      total: count ?? 0,
      page,
      pageSize,
    };
  },

  /** Lista todos los productos (admin) */
  async findAll(): Promise<Product[]> {
    const client = assertSupabase();
    const { data, error } = await client
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw new Error(`Error al obtener productos: ${error.message}`);
    return data ?? [];
  },

  /** Busca por slug */
  async findBySlug(slug: string): Promise<Product | null> {
    const client = assertSupabase();
    const { data, error } = await client
      .from('products')
      .select('*')
      .eq('slug', slug)
      .maybeSingle();

    if (error) throw new Error(`Error al obtener producto: ${error.message}`);
    return data;
  },

  /** Busca por ID */
  async findById(id: string): Promise<Product | null> {
    const client = assertSupabase();
    const { data, error } = await client.from('products').select('*').eq('id', id).maybeSingle();

    if (error) throw new Error(`Error al obtener producto: ${error.message}`);
    return data;
  },

  /** Productos relacionados por categoría */
  async findRelated(category: string, excludeId: string, limit = 4): Promise<Product[]> {
    const client = assertSupabase();
    const { data, error } = await client
      .from('products')
      .select('*')
      .eq('category', category)
      .eq('availability', true)
      .neq('id', excludeId)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw new Error(`Error al obtener productos relacionados: ${error.message}`);
    return data ?? [];
  },

  /** Crea un producto */
  async create(input: CreateProductInput): Promise<Product> {
    const client = assertSupabase();
    const now = new Date().toISOString();
    const slug = input.slug || generateSlug(input.title);

    const { data, error } = await client
      .from('products')
      .insert({ ...input, slug, views: 0, whatsapp_clicks: 0, created_at: now, updated_at: now })
      .select()
      .single();

    if (error) throw new Error(`Error al crear producto: ${error.message}`);
    return data;
  },

  /** Actualiza un producto por ID */
  async update(id: string, input: UpdateProductInput): Promise<Product> {
    const client = assertSupabase();

    const payload: UpdateProductInput = {
      ...input,
      updated_at: new Date().toISOString(),
    } as UpdateProductInput;

    if (input.title && !input.slug) {
      (payload as Record<string, unknown>).slug = generateSlug(input.title);
    }

    const { data, error } = await client
      .from('products')
      .update(payload)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(`Error al actualizar producto: ${error.message}`);
    return data;
  },

  /** Elimina un producto */
  async delete(id: string): Promise<void> {
    const client = assertSupabase();
    const { error } = await client.from('products').delete().eq('id', id);
    if (error) throw new Error(`Error al eliminar producto: ${error.message}`);
  },

  /** Incrementa contador de vistas via RPC */
  async incrementViews(productId: string): Promise<void> {
    const client = assertSupabase();
    await client.rpc('increment_views', { product_id: productId });
  },

  /** Incrementa contador de clicks de WhatsApp via RPC */
  async incrementWhatsAppClicks(productId: string): Promise<void> {
    const client = assertSupabase();
    await client.rpc('increment_whatsapp_clicks', { product_id: productId });
  },

  /** Obtiene categorías únicas */
  async getCategories(): Promise<string[]> {
    const client = assertSupabase();
    const { data, error } = await client
      .from('products')
      .select('category')
      .eq('availability', true);

    if (error) throw new Error(`Error al obtener categorías: ${error.message}`);
    const categories = [...new Set((data ?? []).map((p) => p.category))];
    return categories.filter(Boolean).sort();
  },

  /** Obtiene marcas únicas */
  async getBrands(): Promise<string[]> {
    const client = assertSupabase();
    const { data, error } = await client
      .from('products')
      .select('brand')
      .eq('availability', true)
      .not('brand', 'is', null);

    if (error) throw new Error(`Error al obtener marcas: ${error.message}`);
    const brands = [...new Set((data ?? []).map((p) => p.brand).filter(Boolean))];
    return (brands as string[]).sort();
  },
};
