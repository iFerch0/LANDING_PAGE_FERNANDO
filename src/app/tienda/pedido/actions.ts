'use server';

// src/app/tienda/pedido/actions.ts
// Server actions para la página de confirmación de pedido

import { orderService } from '@/lib/services';
import type { OrderStatus, OrderItem } from '@/lib/types';

export interface OrderStatusResult {
  status: OrderStatus;
  total: number;
  items: OrderItem[];
  buyerName: string;
  reference: string;
}

export async function getOrderStatus(reference: string): Promise<OrderStatusResult | null> {
  if (!reference) return null;

  try {
    const order = await orderService.getOrderByReference(reference);
    if (!order) return null;

    return {
      status: order.status,
      total: order.total,
      items: order.items,
      buyerName: order.buyerName,
      reference: order.reference,
    };
  } catch {
    return null;
  }
}
