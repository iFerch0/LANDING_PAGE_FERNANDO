// src/lib/types/order.types.ts

export type OrderStatus = 'pending' | 'paid' | 'failed' | 'cancelled';

export type WompiStatus = 'PENDING' | 'APPROVED' | 'DECLINED' | 'VOIDED' | 'ERROR';

export interface OrderItem {
  productId: string;
  title: string;
  price: number;
  quantity: number;
  imageUrl?: string;
}

export interface Order {
  id: string;
  reference: string;
  buyerName: string;
  buyerEmail: string;
  buyerPhone?: string;
  buyerCity: string;
  items: OrderItem[];
  total: number; // En pesos COP
  status: OrderStatus;
  wompiTxId?: string;
  wompiStatus?: WompiStatus;
  createdAt: string;
  updatedAt: string;
}

export type CreateOrderInput = Omit<Order, 'id' | 'createdAt' | 'updatedAt'>;
