import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { productService } from '@/lib/services/product.service';
import { ImageGallery } from '@/components/tienda/ImageGallery';
import { ProductCard } from '@/components/tienda/ProductCard';
import { Badge } from '@/components/ui';
import { formatPrice } from '@/lib/utils';
import { ProductActions } from './ProductActions';
import styles from './page.module.css';

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const result = await productService.getProductBySlug(resolvedParams.slug);

  if (!result.success) {
    return { title: 'Producto No Encontrado | Fernando Técnico' };
  }

  const product = result.data;
  const imageUrl = product.images?.[0] || '/logo.png';

  return {
    title: `${product.title} | Fernando Técnico`,
    description: product.description.substring(0, 160),
    openGraph: {
      title: product.title,
      description: product.description.substring(0, 160),
      images: [imageUrl],
      type: 'website',
    },
  };
}

export default async function ProductDetailsPage({ params }: ProductPageProps) {
  const resolvedParams = await params;

  // 1. Fetch data
  const result = await productService.getProductBySlug(resolvedParams.slug);
  if (!result.success) {
    notFound();
  }
  const product = result.data;

  // Track view non-blocking
  productService.trackView(product.id).catch(() => {});

  // Related products
  const relatedResult = await productService.getRelatedProducts(product.category, product.id, 4);
  const relatedProducts = relatedResult.success ? relatedResult.data : [];

  return (
    <div className={styles.container}>
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
        <ol>
          <li>
            <Link href="/">Inicio</Link>
          </li>
          <li className={styles.separator}>/</li>
          <li>
            <Link href="/tienda">Tienda</Link>
          </li>
          <li className={styles.separator}>/</li>
          <li>
            <Link href={`/tienda?category=${encodeURIComponent(product.category)}`}>
              {product.category}
            </Link>
          </li>
          <li className={styles.separator}>/</li>
          <li className={styles.current} aria-current="page">
            {product.title}
          </li>
        </ol>
      </nav>

      <div className={styles.mainLayout}>
        {/* Gallery */}
        <div className={styles.gallerySection}>
          <ImageGallery images={product.images || []} alt={product.title} />
        </div>

        {/* Info Sidebar */}
        <div className={styles.infoSection}>
          <div className={styles.badgesRow}>
            <Badge
              variant={
                product.status === 'nuevo'
                  ? 'success'
                  : product.status === 'usado'
                    ? 'warning'
                    : 'primary'
              }
            >
              {product.status.toUpperCase()}
            </Badge>
            {product.stock <= 3 && product.stock > 0 && (
              <Badge variant="danger" dot>
                ¡Solo quedan {product.stock}!
              </Badge>
            )}
            {!product.availability && <Badge variant="default">AGOTADO</Badge>}
          </div>

          <h1 className={styles.title}>{product.title}</h1>

          {(product.brand || product.model) && (
            <p className={styles.brandModel}>
              {product.brand && (
                <span>
                  Marca: <strong>{product.brand}</strong>
                </span>
              )}
              {product.brand && product.model && <span className={styles.dotSeparator}>•</span>}
              {product.model && (
                <span>
                  Modelo: <strong>{product.model}</strong>
                </span>
              )}
            </p>
          )}

          <div className={styles.priceRow}>
            <span className={styles.price}>{formatPrice(product.price)}</span>
            <span className={styles.currency}>COP</span>
          </div>

          <div className={styles.trustBadges}>
            <span className={styles.trustBadge}>✅ Revisado por experto</span>
            <span className={styles.trustBadge}>🛡️ Garantía técnica</span>
            <span className={styles.trustBadge}>💬 Soporte post-venta</span>
          </div>

          <div className={styles.actions}>
            <ProductActions product={product} />
          </div>

          <div className={styles.metaInfo}>
            {product.payment_methods && product.payment_methods.length > 0 && (
              <div className={styles.metaItem}>
                <strong>Métodos de pago:</strong>
                <span>{product.payment_methods.join(', ')}</span>
              </div>
            )}
            {product.warranty && (
              <div className={styles.metaItem}>
                <strong>Garantía:</strong>
                <span>{product.warranty}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Detail Tabs / Sections */}
      <div className={styles.detailsSection}>
        <div className={styles.description}>
          <h2>Descripción</h2>
          <div className={styles.prose}>
            {product.description
              .split('\n')
              .map((paragraph, i) => (paragraph ? <p key={i}>{paragraph}</p> : <br key={i} />))}
          </div>
        </div>

        {product.specs && Object.keys(product.specs).length > 0 && (
          <div className={styles.specs}>
            <h2>Especificaciones</h2>
            <div className={styles.specsGrid}>
              {Object.entries(product.specs).map(([key, value]) => (
                <div key={key} className={styles.specRow}>
                  <dt className={styles.specKey}>{key}</dt>
                  <dd className={styles.specValue}>{value}</dd>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className={styles.relatedSection}>
          <h2 className={styles.relatedTitle}>También te podría interesar</h2>
          <div className={styles.relatedGrid}>
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Sticky mobile CTA bar — visible only on mobile via CSS */}
      {product.availability && (
        <div className={styles.stickyBar}>
          <div>
            <p className={styles.stickyBarLabel}>Precio</p>
            <p className={styles.stickyBarPrice}>{formatPrice(product.price)}</p>
          </div>
          <div className={styles.stickyBarActions}>
            <ProductActions product={product} />
          </div>
        </div>
      )}
    </div>
  );
}
