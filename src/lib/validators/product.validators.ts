// src/lib/validators/product.validators.ts
// Schemas Zod v4 para validacion de entrada en operaciones de producto

import { z } from 'zod';

// Constantes locales para evitar dependencia circular con types
const PRODUCT_STATUSES = ['nuevo', 'reacondicionado', 'usado', 'exhibicion'] as const;

// Primitivas reutilizables
// Zod v4 usa  'error' en lugar de 'invalid_type_error'
const positiveNumber = z
  .number({ error: 'Debe ser un numero' })
  .nonnegative('No puede ser negativo');

const nonEmptyString = (field: string) => z.string().trim().min(1, `${field} es obligatorio`);

// Schema de creacion

export const createProductSchema = z.object({
  title: nonEmptyString('El titulo').max(200, 'Maximo 200 caracteres'),
  slug: z
    .string()
    .trim()
    .optional()
    .refine(
      (val) => !val || /^[a-z0-9-]+$/.test(val),
      'Slug solo puede contener letras minusculas, numeros y guiones'
    ),
  description: nonEmptyString('La descripcion').max(5000, 'Maximo 5000 caracteres'),
  price: positiveNumber,
  category: nonEmptyString('La categoria'),
  brand: z.string().trim().optional(),
  model: z.string().trim().optional(),
  stock: z
    .number({ error: 'Debe ser un numero' })
    .int('Debe ser entero')
    .nonnegative('No puede ser negativo'),
  status: z.enum(PRODUCT_STATUSES, {
    error: 'Estado invalido. Opciones: nuevo, reacondicionado, usado, exhibicion',
  }),
  availability: z.boolean(),
  images: z.array(z.string().url('URL de imagen invalida')).default([]),
  specs: z.record(z.string(), z.string()).default({}),
  payment_methods: z.array(z.string()).min(1, 'Selecciona al menos un metodo de pago'),
  warranty: z.string().trim().optional(),
});

// Schema de actualizacion (todos los campos opcionales)

export const updateProductSchema = createProductSchema
  .partial()
  .omit({ slug: true })
  .extend({
    slug: z
      .string()
      .trim()
      .optional()
      .refine(
        (val) => !val || /^[a-z0-9-]+$/.test(val),
        'Slug solo puede contener letras minusculas, numeros y guiones'
      ),
  });

// Schema de filtros para listado

export const productFiltersSchema = z.object({
  category: z.string().optional(),
  brand: z.string().optional(),
  status: z.enum(PRODUCT_STATUSES).optional(),
  minPrice: z.coerce.number().nonnegative().optional(),
  maxPrice: z.coerce.number().nonnegative().optional(),
  availability: z.coerce.boolean().optional(),
  search: z.string().trim().optional(),
  page: z.coerce.number().int().positive().default(1),
  pageSize: z.coerce.number().int().positive().max(100).default(20),
  orderBy: z.enum(['created_at', 'price', 'views']).default('created_at'),
  orderDir: z.enum(['asc', 'desc']).default('desc'),
});

// Tipos inferidos desde los schemas

export type CreateProductDto = z.infer<typeof createProductSchema>;
export type UpdateProductDto = z.infer<typeof updateProductSchema>;
export type ProductFiltersDto = z.infer<typeof productFiltersSchema>;
