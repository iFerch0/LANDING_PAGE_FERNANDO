// src/lib/services/product.service.ts
// Service layer de productos.
// Coordina validators + repository. No conoce Supabase directamente.

import { productRepository } from '@/lib/repositories';
import { createProductSchema, updateProductSchema, productFiltersSchema } from '@/lib/validators';
import type { Product, ProductFilters, PaginatedResult, ServiceResult } from '@/lib/types';
import type { CreateProductDto, UpdateProductDto } from '@/lib/validators';

// Convierte cualquier error desconocido a string
function toError(err: unknown): string {
  if (err instanceof Error) return err.message;
  return 'Error inesperado. Intenta de nuevo.';
}

export const productService = {
  /** Obtiene productos disponibles (publico) con filtros y paginacion */
  async getProducts(
    rawFilters: ProductFilters = {}
  ): Promise<ServiceResult<PaginatedResult<Product>>> {
    try {
      const parsed = productFiltersSchema.safeParse({ ...rawFilters, availability: true });
      if (!parsed.success) {
        // Zod v4: usa .issues en lugar de .errors
        return { success: false, error: parsed.error.issues[0]?.message ?? 'Filtros invalidos' };
      }
      const data = await productRepository.findMany(parsed.data);
      return { success: true, data };
    } catch (err) {
      return { success: false, error: toError(err) };
    }
  },

  /** Obtiene todos los productos (admin) */
  async getAllProducts(): Promise<ServiceResult<Product[]>> {
    try {
      const data = await productRepository.findAll();
      return { success: true, data };
    } catch (err) {
      return { success: false, error: toError(err) };
    }
  },

  /** Obtiene un producto por slug */
  async getProductBySlug(slug: string): Promise<ServiceResult<Product>> {
    if (!slug?.trim()) {
      return { success: false, error: 'Slug invalido' };
    }
    try {
      const data = await productRepository.findBySlug(slug.trim());
      if (!data) return { success: false, error: 'Producto no encontrado', code: 'NOT_FOUND' };
      return { success: true, data };
    } catch (err) {
      return { success: false, error: toError(err) };
    }
  },

  /** Obtiene un producto por ID */
  async getProductById(id: string): Promise<ServiceResult<Product>> {
    if (!id?.trim()) {
      return { success: false, error: 'ID invalido' };
    }
    try {
      const data = await productRepository.findById(id.trim());
      if (!data) return { success: false, error: 'Producto no encontrado', code: 'NOT_FOUND' };
      return { success: true, data };
    } catch (err) {
      return { success: false, error: toError(err) };
    }
  },

  /** Obtiene productos por lista de IDs (favoritos) */
  async getProductsByIds(ids: string[]): Promise<ServiceResult<Product[]>> {
    if (!ids.length) return { success: true, data: [] };
    try {
      const data = await productRepository.findByIds(ids);
      return { success: true, data };
    } catch (err) {
      return { success: false, error: toError(err) };
    }
  },

  /** Obtiene productos relacionados */
  async getRelatedProducts(
    category: string,
    excludeId: string,
    limit = 4
  ): Promise<ServiceResult<Product[]>> {
    try {
      const data = await productRepository.findRelated(category, excludeId, limit);
      return { success: true, data };
    } catch (err) {
      return { success: false, error: toError(err) };
    }
  },

  /** Crea un producto con validacion */
  async createProduct(input: CreateProductDto): Promise<ServiceResult<Product>> {
    const parsed = createProductSchema.safeParse(input);
    if (!parsed.success) {
      return { success: false, error: parsed.error.issues[0]?.message ?? 'Datos invalidos' };
    }
    try {
      const data = await productRepository.create(parsed.data);
      return { success: true, data };
    } catch (err) {
      return { success: false, error: toError(err) };
    }
  },

  /** Actualiza un producto con validacion parcial */
  async updateProduct(id: string, input: UpdateProductDto): Promise<ServiceResult<Product>> {
    if (!id?.trim()) {
      return { success: false, error: 'ID invalido' };
    }
    const parsed = updateProductSchema.safeParse(input);
    if (!parsed.success) {
      return { success: false, error: parsed.error.issues[0]?.message ?? 'Datos invalidos' };
    }
    try {
      const data = await productRepository.update(id, parsed.data);
      return { success: true, data };
    } catch (err) {
      return { success: false, error: toError(err) };
    }
  },

  /** Elimina un producto */
  async deleteProduct(id: string): Promise<ServiceResult<void>> {
    if (!id?.trim()) {
      return { success: false, error: 'ID invalido' };
    }
    try {
      await productRepository.delete(id);
      return { success: true, data: undefined };
    } catch (err) {
      return { success: false, error: toError(err) };
    }
  },

  /** Alterna disponibilidad */
  async toggleAvailability(id: string): Promise<ServiceResult<Product>> {
    const result = await productService.getProductById(id);
    if (!result.success) return result;
    return productService.updateProduct(id, { availability: !result.data.availability });
  },

  /** Registra vista (fire-and-forget, no bloquea render) */
  async trackView(productId: string): Promise<void> {
    try {
      await productRepository.incrementViews(productId);
    } catch {
      // Silencioso: analytics no critico
    }
  },

  /** Registra click en WhatsApp */
  async trackWhatsAppClick(productId: string): Promise<void> {
    try {
      await productRepository.incrementWhatsAppClicks(productId);
    } catch {
      // Silencioso: analytics no critico
    }
  },

  /** Obtiene categorias disponibles */
  async getCategories(): Promise<ServiceResult<string[]>> {
    try {
      const data = await productRepository.getCategories();
      return { success: true, data };
    } catch (err) {
      return { success: false, error: toError(err) };
    }
  },

  /** Obtiene marcas disponibles */
  async getBrands(): Promise<ServiceResult<string[]>> {
    try {
      const data = await productRepository.getBrands();
      return { success: true, data };
    } catch (err) {
      return { success: false, error: toError(err) };
    }
  },
};
