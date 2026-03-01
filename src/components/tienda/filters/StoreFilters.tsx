'use client';

import { useTransition, useState, useEffect, useCallback } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Input, Card } from '@/components/ui';
import type { ProductStatus } from '@/lib/types';
import styles from './StoreFilters.module.css';

const STATUS_OPTIONS: { value: ProductStatus | 'all'; label: string }[] = [
  { value: 'all', label: 'Todos los estados' },
  { value: 'nuevo', label: 'Nuevo' },
  { value: 'reacondicionado', label: 'Reacondicionado' },
  { value: 'usado', label: 'Usado' },
  { value: 'exhibicion', label: 'Exhibición' },
];

const SORT_OPTIONS = [
  { value: 'recent', label: 'Más recientes' },
  { value: 'price-asc', label: 'Precio: menor a mayor' },
  { value: 'price-desc', label: 'Precio: mayor a menor' },
  { value: 'popular', label: 'Más vistos' },
] as const;

type SortValue = (typeof SORT_OPTIONS)[number]['value'];

interface StoreFiltersProps {
  categories?: string[];
  brands?: string[];
}

export function StoreFilters({ categories = [], brands = [] }: StoreFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  // Estados locales debounced
  const [search, setSearch] = useState(searchParams.get('search') ?? '');
  const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') ?? '');
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') ?? '');

  // Sincronizar con back/forward
  useEffect(() => {
    setSearch(searchParams.get('search') ?? '');
    setMinPrice(searchParams.get('minPrice') ?? '');
    setMaxPrice(searchParams.get('maxPrice') ?? '');
  }, [searchParams]);

  const updateParams = useCallback(
    (updates: Record<string, string>) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(updates).forEach(([name, value]) => {
        if (value && value !== 'all') {
          params.set(name, value);
        } else {
          params.delete(name);
        }
      });
      params.delete('page');
      startTransition(() => {
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
      });
    },
    [searchParams, pathname, router]
  );

  // Debounce para texto de búsqueda
  useEffect(() => {
    const timer = setTimeout(() => {
      if (search !== (searchParams.get('search') ?? '')) {
        updateParams({ search });
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [search, searchParams, updateParams]);

  // Debounce para precio
  useEffect(() => {
    const timer = setTimeout(() => {
      const currentMin = searchParams.get('minPrice') ?? '';
      const currentMax = searchParams.get('maxPrice') ?? '';
      if (minPrice !== currentMin || maxPrice !== currentMax) {
        updateParams({ minPrice, maxPrice });
      }
    }, 700);
    return () => clearTimeout(timer);
  }, [minPrice, maxPrice, searchParams, updateParams]);

  const activeCategory = searchParams.get('category') || 'all';
  const activeStatus = searchParams.get('status') || 'all';
  const activeBrand = searchParams.get('brand') || 'all';
  const activeSort = (searchParams.get('sort') as SortValue) || 'recent';
  const onlyAvailable = searchParams.get('onlyAvailable') === 'true';

  const hasActiveFilters =
    searchParams.toString().length > 0 && searchParams.toString() !== 'page=1';

  const clearFilters = () => {
    setSearch('');
    setMinPrice('');
    setMaxPrice('');
    startTransition(() => {
      router.push(pathname, { scroll: false });
    });
  };

  return (
    <Card className={styles.wrapper} padding="md">
      <div className={styles.header}>
        <h3 className={styles.title}>Filtros</h3>
        {hasActiveFilters && (
          <button onClick={clearFilters} className={styles.clearBtn} disabled={isPending}>
            Limpiar todo
          </button>
        )}
      </div>

      <div className={styles.body}>
        {/* Búsqueda — ahora busca en título, marca y descripción */}
        <div className={styles.filterGroup}>
          <label className={styles.label}>Buscar</label>
          <Input
            placeholder="Nombre, marca, descripción…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            disabled={isPending}
            fullWidth
          />
        </div>

        {/* Ordenamiento */}
        <div className={styles.filterGroup}>
          <label className={styles.label}>Ordenar por</label>
          <div className={styles.selectWrapper}>
            <select
              value={activeSort}
              onChange={(e) => updateParams({ sort: e.target.value })}
              disabled={isPending}
              className={styles.select}
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Rango de precio */}
        <div className={styles.filterGroup}>
          <label className={styles.label}>Precio (COP)</label>
          <div className={styles.priceRange}>
            <input
              type="number"
              className={styles.priceInput}
              placeholder="Mínimo"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              disabled={isPending}
              min={0}
              step={50000}
            />
            <span className={styles.priceSep}>—</span>
            <input
              type="number"
              className={styles.priceInput}
              placeholder="Máximo"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              disabled={isPending}
              min={0}
              step={50000}
            />
          </div>
        </div>

        {/* Categorías */}
        {categories.length > 0 && (
          <div className={styles.filterGroup}>
            <label className={styles.label}>Categoría</label>
            <div className={styles.selectWrapper}>
              <select
                value={activeCategory}
                onChange={(e) => updateParams({ category: e.target.value })}
                disabled={isPending}
                className={styles.select}
              >
                <option value="all">Todas las categorías</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* Marcas */}
        {brands.length > 0 && (
          <div className={styles.filterGroup}>
            <label className={styles.label}>Marca</label>
            <div className={styles.selectWrapper}>
              <select
                value={activeBrand}
                onChange={(e) => updateParams({ brand: e.target.value })}
                disabled={isPending}
                className={styles.select}
              >
                <option value="all">Todas las marcas</option>
                {brands.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* Estado físico */}
        <div className={styles.filterGroup}>
          <label className={styles.label}>Estado</label>
          <div className={styles.selectWrapper}>
            <select
              value={activeStatus}
              onChange={(e) => updateParams({ status: e.target.value })}
              disabled={isPending}
              className={styles.select}
            >
              {STATUS_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Toggle: solo disponibles */}
        <div className={styles.filterGroup}>
          <label className={styles.toggleLabel}>
            <input
              type="checkbox"
              className={styles.toggleInput}
              checked={onlyAvailable}
              onChange={(e) => updateParams({ onlyAvailable: e.target.checked ? 'true' : '' })}
              disabled={isPending}
            />
            <span className={styles.toggleTrack} />
            <span className={styles.toggleText}>Solo con stock disponible</span>
          </label>
        </div>

        {isPending && <div className={styles.loaderLine} />}
      </div>
    </Card>
  );
}
