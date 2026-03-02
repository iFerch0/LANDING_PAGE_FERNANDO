import Link from 'next/link';
import { productService } from '@/lib/services/product.service';
import { ProductCard } from '@/components/tienda/ProductCard';
import { StoreFilters } from '@/components/tienda/filters/StoreFilters';
import { Pagination } from '@/components/tienda/Pagination';
import { EmptyState } from '@/components/ui';
import type { Metadata } from 'next';
import styles from './page.module.css';

const PAGE_SIZE = 20;

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
  const brand = typeof query.brand === 'string' ? query.brand : undefined;
  const sort = typeof query.sort === 'string' ? query.sort : 'recent';

  const minPriceRaw = typeof query.minPrice === 'string' ? parseInt(query.minPrice, 10) : NaN;
  const maxPriceRaw = typeof query.maxPrice === 'string' ? parseInt(query.maxPrice, 10) : NaN;
  const minPrice = !isNaN(minPriceRaw) && minPriceRaw >= 0 ? minPriceRaw : undefined;
  const maxPrice = !isNaN(maxPriceRaw) && maxPriceRaw >= 0 ? maxPriceRaw : undefined;

  // Validar estatus desde la URL
  let status: 'nuevo' | 'reacondicionado' | 'usado' | 'exhibicion' | undefined;
  if (
    typeof query.status === 'string' &&
    ['nuevo', 'reacondicionado', 'usado', 'exhibicion'].includes(query.status)
  ) {
    status = query.status as 'nuevo' | 'reacondicionado' | 'usado' | 'exhibicion';
  }

  // Mapear sort → orderBy / orderDir
  const sortMap: Record<
    string,
    { orderBy: 'created_at' | 'price' | 'views'; orderDir: 'asc' | 'desc' }
  > = {
    recent: { orderBy: 'created_at', orderDir: 'desc' },
    'price-asc': { orderBy: 'price', orderDir: 'asc' },
    'price-desc': { orderBy: 'price', orderDir: 'desc' },
    popular: { orderBy: 'views', orderDir: 'desc' },
  };
  const { orderBy, orderDir } = sortMap[sort] ?? sortMap.recent;

  const filters = {
    page,
    pageSize: PAGE_SIZE,
    search,
    category,
    brand,
    status,
    minPrice,
    maxPrice,
    orderBy,
    orderDir,
  };

  // Cargamos datos en paralelo (el servicio fuerza availability: true internamente)
  const [productsResult, catResult, brandsResult] = await Promise.all([
    productService.getProducts(filters),
    productService.getCategories(),
    productService.getBrands(),
  ]);

  const products = productsResult.success ? productsResult.data.data : [];
  const total = productsResult.success ? productsResult.data.total : 0;
  const categoriesDb = catResult.success ? catResult.data : [];
  const brandsDb = brandsResult.success ? brandsResult.data : [];

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
          <StoreFilters categories={categoriesDb} brands={brandsDb} />
        </aside>

        {/* Grilla Principal */}
        <main className={styles.main}>
          <div className={styles.filtersWrapper}>
            <p className="text-sm text-gray-500 mb-4 font-medium">
              Mostrando {products.length} de {total} productos
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

          {total > PAGE_SIZE && (
            <Pagination page={page} pageSize={PAGE_SIZE} total={total} searchParams={query} />
          )}
        </main>
      </div>
    </div>
  );
}
