// src/lib/repositories/order.repository.ts
// Capa de acceso a datos para órdenes — encapsula Supabase

import { supabaseAdmin } from '@/lib/supabase';
import type { Order, CreateOrderInput, OrderStatus, WompiStatus } from '@/lib/types';

// Fila tal como llega de Supabase (snake_case)
interface OrderRow {
  id: string;
  reference: string;
  buyer_name: string;
  buyer_email: string;
  buyer_phone?: string | null;
  buyer_city: string;
  items: Order['items'];
  total: number;
  status: OrderStatus;
  wompi_tx_id?: string | null;
  wompi_status?: string | null;
  created_at: string;
  updated_at: string;
}

function assertAdmin() {
  if (!supabaseAdmin) throw new Error('Supabase service role no está configurado');
  return supabaseAdmin;
}

function mapRow(row: OrderRow): Order {
  return {
    id: row.id,
    reference: row.reference,
    buyerName: row.buyer_name,
    buyerEmail: row.buyer_email,
    buyerPhone: row.buyer_phone ?? undefined,
    buyerCity: row.buyer_city,
    items: row.items,
    total: row.total,
    status: row.status,
    wompiTxId: row.wompi_tx_id ?? undefined,
    wompiStatus: (row.wompi_status as WompiStatus) ?? undefined,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export const orderRepository = {
  /** Crea una nueva orden en Supabase */
  async create(input: CreateOrderInput): Promise<Order> {
    const client = assertAdmin();
    const now = new Date().toISOString();

    const { data, error } = await client
      .from('orders')
      .insert({
        reference: input.reference,
        buyer_name: input.buyerName,
        buyer_email: input.buyerEmail,
        buyer_phone: input.buyerPhone ?? null,
        buyer_city: input.buyerCity,
        items: input.items,
        total: input.total,
        status: input.status,
        created_at: now,
        updated_at: now,
      })
      .select()
      .single();

    if (error) throw new Error(`Error al crear orden: ${error.message}`);
    return mapRow(data as OrderRow);
  },

  /** Busca una orden por su referencia única (FT-xxx) */
  async findByReference(reference: string): Promise<Order | null> {
    const client = assertAdmin();
    const { data, error } = await client
      .from('orders')
      .select('*')
      .eq('reference', reference)
      .maybeSingle();

    if (error) throw new Error(`Error al buscar orden: ${error.message}`);
    return data ? mapRow(data as OrderRow) : null;
  },

  /** Busca una orden por su ID */
  async findById(id: string): Promise<Order | null> {
    const client = assertAdmin();
    const { data, error } = await client.from('orders').select('*').eq('id', id).maybeSingle();

    if (error) throw new Error(`Error al buscar orden: ${error.message}`);
    return data ? mapRow(data as OrderRow) : null;
  },

  /** Lista órdenes para admin, ordenadas por created_at DESC */
  async findAll(limit = 50, status?: OrderStatus): Promise<Order[]> {
    const client = assertAdmin();
    let query = client
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (status) query = query.eq('status', status);

    const { data, error } = await query;
    if (error) throw new Error(`Error al obtener órdenes: ${error.message}`);
    return (data ?? []).map((row) => mapRow(row as OrderRow));
  },

  /** Actualiza el estado de una orden (llamado por webhook Wompi) */
  async updateStatus(
    id: string,
    update: { status: OrderStatus; wompiTxId?: string; wompiStatus?: WompiStatus }
  ): Promise<void> {
    const client = assertAdmin();
    const { error } = await client
      .from('orders')
      .update({
        status: update.status,
        wompi_tx_id: update.wompiTxId ?? null,
        wompi_status: update.wompiStatus ?? null,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id);

    if (error) throw new Error(`Error al actualizar orden: ${error.message}`);
  },
};
