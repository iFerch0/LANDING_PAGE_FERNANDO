// src/lib/validators/order.validators.ts
// Schemas Zod v4 para validación de checkout y órdenes

import { z } from 'zod';

// Schema para el formulario de checkout (Paso 1)
export const checkoutFormSchema = z.object({
  name: z.string().trim().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().trim().email('Ingresa un email válido'),
  phone: z
    .string()
    .trim()
    .optional()
    .refine(
      (val) => !val || /^(\+57)?[0-9]{10}$/.test(val.replace(/[\s-]/g, '')),
      'Ingresa un teléfono colombiano válido (10 dígitos)'
    ),
  city: z.string().trim().min(2, 'La ciudad debe tener al menos 2 caracteres'),
});

// Schema de item de orden (snapshot del carrito)
const orderItemSchema = z.object({
  productId: z.string(),
  title: z.string(),
  price: z.number().positive(),
  quantity: z.number().int().positive(),
  imageUrl: z.string().optional(),
});

// Schema completo de creación de orden
export const createOrderSchema = z.object({
  buyerName: z.string().trim().min(2),
  buyerEmail: z.string().trim().email(),
  buyerPhone: z.string().trim().optional(),
  buyerCity: z.string().trim().min(2),
  items: z.array(orderItemSchema).min(1, 'El carrito no puede estar vacío'),
  total: z.number().positive('El total debe ser mayor a 0'),
});

// Tipos inferidos
export type CheckoutFormData = z.infer<typeof checkoutFormSchema>;
export type CreateOrderDto = z.infer<typeof createOrderSchema>;
