// src/lib/services/order.service.ts
// Capa de negocio para órdenes de compra

import { orderRepository } from '@/lib/repositories';
import type { Order, CreateOrderInput, OrderItem, OrderStatus, WompiStatus } from '@/lib/types';

// Mapeo de estados Wompi → estados internos
const WOMPI_TO_ORDER_STATUS: Record<string, OrderStatus> = {
  APPROVED: 'paid',
  PENDING: 'pending',
  DECLINED: 'failed',
  VOIDED: 'cancelled',
  ERROR: 'failed',
};

function generateReference(): string {
  const random = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `FT-${Date.now()}-${random}`;
}

export const orderService = {
  /**
   * Crea una nueva orden con estado 'pending'.
   * Genera la referencia única FT-{timestamp}-{random}.
   */
  async createOrder(
    items: OrderItem[],
    buyer: {
      buyerName: string;
      buyerEmail: string;
      buyerPhone?: string;
      buyerCity: string;
      total: number;
    }
  ): Promise<Order> {
    const reference = generateReference();
    const input: CreateOrderInput = {
      reference,
      buyerName: buyer.buyerName,
      buyerEmail: buyer.buyerEmail,
      buyerPhone: buyer.buyerPhone,
      buyerCity: buyer.buyerCity,
      items,
      total: buyer.total,
      status: 'pending',
    };
    return orderRepository.create(input);
  },

  /** Obtiene una orden por su referencia */
  async getOrderByReference(reference: string): Promise<Order | null> {
    return orderRepository.findByReference(reference);
  },

  /** Obtiene una orden por su ID */
  async getOrderById(id: string): Promise<Order | null> {
    return orderRepository.findById(id);
  },

  /**
   * Confirma o rechaza un pago según el estado recibido del webhook de Wompi.
   * Mapea WompiStatus → OrderStatus y persiste en DB.
   */
  async confirmPayment(txId: string, wompiStatus: string, reference: string): Promise<void> {
    const order = await orderRepository.findByReference(reference);
    if (!order) return;

    const status = WOMPI_TO_ORDER_STATUS[wompiStatus] ?? 'failed';
    await orderRepository.updateStatus(order.id, {
      status,
      wompiTxId: txId,
      wompiStatus: wompiStatus as WompiStatus,
    });
  },

  /** Lista órdenes para el panel de admin */
  async getAllOrders(limit = 50, status?: OrderStatus): Promise<Order[]> {
    return orderRepository.findAll(limit, status);
  },
};
