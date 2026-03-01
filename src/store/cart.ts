import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product } from '@/lib/types';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product, quantity = 1) => {
        set((state) => {
          const existingItem = state.items.find((item) => item.product.id === product.id);

          if (existingItem) {
            // Asegurar que no excedamos el stock
            const newQuantity = Math.min(existingItem.quantity + quantity, product.stock);
            return {
              items: state.items.map((item) =>
                item.product.id === product.id ? { ...item, quantity: newQuantity } : item
              ),
            };
          }

          return {
            items: [...state.items, { product, quantity: Math.min(quantity, product.stock) }],
          };
        });
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.product.id !== productId),
        }));
      },

      updateQuantity: (productId, quantity) => {
        set((state) => ({
          items: state.items.map((item) => {
            if (item.product.id === productId) {
              const safeQuantity = Math.max(1, Math.min(quantity, item.product.stock));
              return { ...item, quantity: safeQuantity };
            }
            return item;
          }),
        }));
      },

      clearCart: () => set({ items: [] }),

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + item.product.price * item.quantity, 0);
      },
    }),
    {
      name: 'ferchotecnico-cart', // Clave en localStorage
    }
  )
);
