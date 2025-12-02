// src/lib/types.ts
export type ProductStatus = 'nuevo' | 'reacondicionado' | 'usado' | 'exhibicion';

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
  specs: Record<string, string>;
  payment_methods: string[];
  warranty?: string;
  views: number;
  whatsapp_clicks: number;
  created_at: string;
  updated_at: string;
}
