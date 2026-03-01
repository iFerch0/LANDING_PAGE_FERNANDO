// src/lib/utils/whatsapp.ts
// Utilidades para generar links de WhatsApp con mensajes contextuales

import { WA_BASE_URL } from '@/constants/contact';
import { formatPrice } from './format';
import type { CartItem } from '@/store/cart';

/**
 * Genera un link de WhatsApp con mensaje preformateado para consulta de producto.
 */
export function getProductWhatsAppLink(productTitle: string, productSlug: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.ferchotecnico.com';
  const productUrl = `${baseUrl}/tienda/${productSlug}`;
  const message = `Hola Fernando 👋 Estoy interesado en este producto:\n\n*${productTitle}*\n${productUrl}\n\n¿Está disponible?`;
  return `${WA_BASE_URL}?text=${encodeURIComponent(message)}`;
}

/**
 * Genera un link de WhatsApp para solicitar servicio técnico.
 */
export function getServiceWhatsAppLink(serviceName?: string): string {
  const base = serviceName
    ? `Hola Fernando 👋 Necesito información sobre el servicio de *${serviceName}*.`
    : 'Hola Fernando 👋 Quiero solicitar un servicio técnico para mi computador.';
  return `${WA_BASE_URL}?text=${encodeURIComponent(base)}`;
}

/**
 * Genera un link de WhatsApp genérico con un mensaje personalizado.
 */
export function getCustomWhatsAppLink(message: string): string {
  return `${WA_BASE_URL}?text=${encodeURIComponent(message)}`;
}

export interface CheckoutBuyerInfo {
  name: string;
  city: string;
  paymentMethod: string;
}

/**
 * Genera el string para realizar un pedido desde el carrito de compras a WA.
 * Si se pasan datos del comprador, el mensaje incluye nombre, ciudad y método de pago.
 */
export function getCheckoutWhatsAppLink(
  items: CartItem[],
  total: number,
  buyer?: CheckoutBuyerInfo
): string {
  let message = `Hola Fernando 👋 ¡Quiero realizar el siguiente pedido!\n\n*Resumen de mi carrito:*\n`;

  items.forEach((item, index) => {
    message += `\n${index + 1}. *${item.product.title}*`;
    message += `\n   ├ Cantidad: ${item.quantity}`;
    message += `\n   └ Precio und: ${formatPrice(item.product.price)}`;
  });

  message += `\n\n*Total a pagar: ${formatPrice(total)}* (sin envío)`;

  if (buyer) {
    message += `\n\n*Datos de entrega:*`;
    message += `\n👤 Nombre: ${buyer.name}`;
    message += `\n📍 Ciudad: ${buyer.city}`;
    message += `\n💳 Pago: ${buyer.paymentMethod}`;
  }

  message += `\n\n¿Me podrías confirmar disponibilidad y costo de envío por favor?`;

  return `${WA_BASE_URL}?text=${encodeURIComponent(message)}`;
}
