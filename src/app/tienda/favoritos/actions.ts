'use server';

import { productService } from '@/lib/services/product.service';
import type { Product } from '@/lib/types';

export async function getFavoriteProducts(ids: string[]): Promise<Product[]> {
  if (!ids.length) return [];
  const result = await productService.getProductsByIds(ids);
  return result.success ? result.data : [];
}
