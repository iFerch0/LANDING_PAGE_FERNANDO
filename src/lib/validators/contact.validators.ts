// src/lib/validators/contact.validators.ts
// Schemas Zod para validación del formulario de contacto

import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(100, 'El nombre es demasiado largo'),
  email: z.string().trim().email('Ingresa un email válido').max(200, 'El email es demasiado largo'),
  phone: z
    .string()
    .trim()
    .optional()
    .refine((val) => !val || /^[+\d\s()-]{7,20}$/.test(val), 'Número de teléfono inválido'),
  message: z
    .string()
    .trim()
    .min(10, 'El mensaje debe tener al menos 10 caracteres')
    .max(2000, 'El mensaje es demasiado largo'),
  service: z.string().optional(),
});

export type ContactFormDto = z.infer<typeof contactFormSchema>;
