// src/lib/types/product.types.ts
// Fuente única de verdad para tipos del dominio de productos

export const PRODUCT_STATUSES = ['nuevo', 'reacondicionado', 'usado', 'exhibicion'] as const;
export const PAYMENT_METHODS = ['Efectivo', 'Transferencia', 'Nequi', 'Daviplata'] as const;

export type ProductStatus = (typeof PRODUCT_STATUSES)[number];
export type PaymentMethod = (typeof PAYMENT_METHODS)[number];

export interface ProductSpecs {
  [key: string]: string;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  category: string;
  brand?: string;
  model?: string;
  stock: number;
  status: ProductStatus;
  availability: boolean;
  images: string[];
  specs: ProductSpecs;
  payment_methods: string[];
  warranty?: string;
  views: number;
  whatsapp_clicks: number;
  created_at: string;
  updated_at: string;
}

/** Solo los campos permitidos en creacion (sin campos generados por DB). Slug es opcional, se genera desde el titulo. */
export type CreateProductInput = Omit<
  Product,
  'id' | 'slug' | 'views' | 'whatsapp_clicks' | 'created_at' | 'updated_at'
> & {
  slug?: string;
};

/** Todos los campos de Product son opcionales en actualización, excepto los que no deben cambiar */
export type UpdateProductInput = Partial<
  Omit<Product, 'id' | 'views' | 'whatsapp_clicks' | 'created_at' | 'updated_at'>
>;

/** Forma compacta para listas y catálogos */
export interface ProductSummary {
  id: string;
  title: string;
  slug: string;
  price: number;
  category: string;
  brand?: string;
  status: ProductStatus;
  availability: boolean;
  images: string[];
  views: number;
}

/** Resultado paginado genérico */
export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}

/** Filtros para getProducts */
export interface ProductFilters {
  category?: string;
  brand?: string;
  status?: ProductStatus;
  minPrice?: number;
  maxPrice?: number;
  availability?: boolean;
  search?: string;
  page?: number;
  pageSize?: number;
  orderBy?: 'created_at' | 'price' | 'views';
  orderDir?: 'asc' | 'desc';
}
