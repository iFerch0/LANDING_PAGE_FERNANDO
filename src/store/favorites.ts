import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FavoritesState {
  ids: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  clearFavorites: () => void;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      ids: [],

      toggleFavorite: (id) => {
        set((state) => ({
          ids: state.ids.includes(id) ? state.ids.filter((fId) => fId !== id) : [...state.ids, id],
        }));
      },

      isFavorite: (id) => get().ids.includes(id),

      clearFavorites: () => set({ ids: [] }),
    }),
    {
      name: 'ferchotecnico-favorites',
    }
  )
);
