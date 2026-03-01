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

export function StoreFilters({ categories = [] }: { categories?: string[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  // Estados locales para los inputs (controled components debounced)
  const [search, setSearch] = useState(searchParams.get('search') ?? '');

  // Sincronizar estado local si cambia la URL por back/forward
  useEffect(() => {
    setSearch(searchParams.get('search') ?? '');
  }, [searchParams]);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value && value !== 'all') {
        params.set(name, value);
      } else {
        params.delete(name);
      }
      // Si reseteo cualquier search parameter (excepto sort/pag), vuelvo a página 1
      if (name !== 'page') params.delete('page');
      return params.toString();
    },
    [searchParams]
  );

  const updateUrl = useCallback(
    (name: string, value: string) => {
      startTransition(() => {
        router.push(`${pathname}?${createQueryString(name, value)}`, { scroll: false });
      });
    },
    [pathname, router, createQueryString]
  );

  // Debounce simple para búsquedas de texto
  useEffect(() => {
    const timer = setTimeout(() => {
      if (search !== (searchParams.get('search') ?? '')) {
        updateUrl('search', search);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [search, searchParams, updateUrl]);

  const activeCategory = searchParams.get('category') || 'all';
  const activeStatus = searchParams.get('status') || 'all';

  const hasActiveFilters =
    searchParams.toString().length > 0 && searchParams.toString() !== 'page=1';

  const clearFilters = () => {
    setSearch('');
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
        {/* Búsqueda */}
        <div className={styles.filterGroup}>
          <Input
            placeholder="Buscar..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            disabled={isPending}
            fullWidth
          />
        </div>

        {/* Categorías */}
        <div className={styles.filterGroup}>
          <label className={styles.label}>Categoría</label>
          <div className={styles.selectWrapper}>
            <select
              value={activeCategory}
              onChange={(e) => updateUrl('category', e.target.value)}
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

        {/* Estado Físico */}
        <div className={styles.filterGroup}>
          <label className={styles.label}>Estado</label>
          <div className={styles.selectWrapper}>
            <select
              value={activeStatus}
              onChange={(e) => updateUrl('status', e.target.value)}
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

        {/* Loader inline para indicar fetching server-side */}
        {isPending && <div className={styles.loaderLine} />}
      </div>
    </Card>
  );
}
