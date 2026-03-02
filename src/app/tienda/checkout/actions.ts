'use server';

// src/app/tienda/checkout/actions.ts
// Server action: crea la orden en DB, obtiene acceptance_token de Wompi y firma la transacción

import { createHash } from 'crypto';
import { orderService } from '@/lib/services';
import type { OrderItem } from '@/lib/types';
import type { CheckoutFormData } from '@/lib/validators';

// Tipo mínimo necesario para serializar desde el cliente
interface CartItemInput {
  product: {
    id: string;
    title: string;
    price: number;
    images?: string[] | null;
  };
  quantity: number;
}

export interface WompiCheckoutData {
  reference: string;
  amountInCents: number;
  publicKey: string;
  signature: string;
  acceptanceToken: string;
  redirectUrl: string;
}

export async function createOrderAndSign(
  formData: CheckoutFormData,
  cartItems: CartItemInput[],
  total: number
): Promise<WompiCheckoutData> {
  const publicKey = process.env.NEXT_PUBLIC_WOMPI_PUBLIC_KEY;
  const integritySecret = process.env.WOMPI_INTEGRITY_SECRET;

  if (!publicKey || !integritySecret) {
    throw new Error('Variables de entorno de Wompi no configuradas');
  }

  // Mapear items del carrito al formato de la orden
  const items: OrderItem[] = cartItems.map((ci) => ({
    productId: ci.product.id,
    title: ci.product.title,
    price: ci.product.price,
    quantity: ci.quantity,
    imageUrl: ci.product.images?.[0] ?? undefined,
  }));

  // Crear la orden en Supabase con status 'pending'
  const order = await orderService.createOrder(items, {
    buyerName: formData.name.trim(),
    buyerEmail: formData.email.trim(),
    buyerPhone: formData.phone?.trim() || undefined,
    buyerCity: formData.city.trim(),
    total,
  });

  // Wompi usa centavos como unidad mínima (1 COP = 100 centavos)
  const amountInCents = total * 100;

  // Determinar URL base de Wompi según entorno
  const wompiBase =
    process.env.NEXT_PUBLIC_WOMPI_ENV === 'sandbox'
      ? 'https://sandbox.wompi.co/v1'
      : 'https://production.wompi.co/v1';

  // Obtener acceptance_token (requerido para mostrar el widget)
  const merchantRes = await fetch(`${wompiBase}/merchants/${publicKey}`);
  if (!merchantRes.ok) {
    throw new Error('No se pudo obtener el token de aceptación de Wompi');
  }
  const merchantData = await merchantRes.json();
  const acceptanceToken: string = merchantData.data.presigned_acceptance.acceptance_token;

  // Firma SHA256: reference + amountInCents + currency + integritySecret
  const raw = `${order.reference}${amountInCents}COP${integritySecret}`;
  const signature = createHash('sha256').update(raw).digest('hex');

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const redirectUrl = `${siteUrl}/tienda/pedido?ref=${order.reference}`;

  return {
    reference: order.reference,
    amountInCents,
    publicKey,
    signature,
    acceptanceToken,
    redirectUrl,
  };
}
