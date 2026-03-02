'use server';

// src/app/admin/pedidos/actions.ts
// Server actions para el panel de administración de pedidos

import { orderService } from '@/lib/services';
import type { Order, OrderStatus } from '@/lib/types';

export async function getOrders(status?: OrderStatus, limit = 50): Promise<Order[]> {
  try {
    return await orderService.getAllOrders(limit, status);
  } catch {
    return [];
  }
}

export async function getOrderById(id: string): Promise<Order | null> {
  try {
    return await orderService.getOrderById(id);
  } catch {
    return null;
  }
}
