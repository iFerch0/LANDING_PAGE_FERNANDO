import Link from 'next/link';
import { productService } from '@/lib/services/product.service';
import { ProductCard } from '@/components/tienda/ProductCard';
import { StoreFilters } from '@/components/tienda/filters/StoreFilters';
import { EmptyState } from '@/components/ui';
import type { Metadata } from 'next';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Tienda | Fernando Técnico',
  description: 'Proyectos, repuestos y computadores revisados y garantizados.',
};

export default async function TiendaPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const query = await searchParams;
  const page = typeof query.page === 'string' ? parseInt(query.page, 10) : 1;
  const search = typeof query.search === 'string' ? query.search : undefined;
  const category = typeof query.category === 'string' ? query.category : undefined;

  // Validar el estatus desde la URL
  let status: 'nuevo' | 'reacondicionado' | 'usado' | 'exhibicion' | undefined;
  if (
    typeof query.status === 'string' &&
    ['nuevo', 'reacondicionado', 'usado', 'exhibicion'].includes(query.status)
  ) {
    status = query.status as 'nuevo' | 'reacondicionado' | 'usado' | 'exhibicion';
  }

  const filters = {
    page,
    pageSize: 20, // Cantidad generosa p/ catálogos
    search,
    category,
    status,
    availability: true, // Por defecto mostrar lo disponible primero o filtrarlo
  };

  // Cargamos data directa del Service (Single Source of Truth) paralelamente
  const [productsResult, catResult] = await Promise.all([
    productService.getProducts(filters),
    productService.getCategories(),
  ]);

  const products = productsResult.success ? productsResult.data.data : [];
  const categoriesDb = catResult.success ? catResult.data : [];

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <span className={styles.overline}>FerchoTécnico Store</span>
          <h1 className={styles.title}>Equipos y Tecnología</h1>
          <p className={styles.description}>
            Computadores, componentes y repuestos revisados y garantizados. Cada equipo probado por
            un técnico experto antes de la venta.
          </p>
          <div className={styles.trustBadges}>
            <span className={styles.trustBadge}>
              <span aria-hidden="true">✅</span> Garantía técnica incluida
            </span>
            <span className={styles.trustBadge}>
              <span aria-hidden="true">🔍</span> Revisado por experto
            </span>
            <span className={styles.trustBadge}>
              <span aria-hidden="true">💬</span> Soporte post-venta
            </span>
          </div>
        </div>

        {categoriesDb.length > 0 && (
          <nav className={styles.categoryPills} aria-label="Filtrar por categoría">
            <Link href="/tienda" className={`${styles.pill} ${!category ? styles.pillActive : ''}`}>
              Todos
            </Link>
            {categoriesDb.map((cat) => (
              <Link
                key={cat}
                href={`/tienda?category=${encodeURIComponent(cat)}`}
                className={`${styles.pill} ${category === cat ? styles.pillActive : ''}`}
              >
                {cat}
              </Link>
            ))}
          </nav>
        )}
      </header>

      <div className={styles.layout}>
        {/* Sidebar de Filtros Server->Client */}
        <aside className={styles.sidebar}>
          <StoreFilters categories={categoriesDb} />
        </aside>

        {/* Grilla Principal */}
        <main className={styles.main}>
          <div className={styles.filtersWrapper}>
            <p className="text-sm text-gray-500 mb-4 font-medium">
              Mostrando {products.length} productos
            </p>
          </div>

          <section className={styles.grid}>
            {products.length > 0 ? (
              products.map((product) => <ProductCard key={product.id} product={product} />)
            ) : (
              <div className={styles.emptyStateWrapper}>
                <EmptyState
                  title="No hay productos disponibles"
                  description="Ajusta los filtros o intenta con otra búsqueda."
                  icon="📦"
                />
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}
