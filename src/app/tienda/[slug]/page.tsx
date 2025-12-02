import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getProductBySlug, getProducts, incrementViews } from '@/lib/db';
import { ImageGallery } from '@/components/tienda/ImageGallery';
import { WhatsAppButton } from '@/components/tienda/WhatsAppButton';
import { Breadcrumbs } from '@/components/tienda/Breadcrumbs';
import { ProductJsonLd } from '@/components/tienda/ProductJsonLd';
import styles from './page.module.css';

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params for all products at build time
export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({
    slug: product.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: 'Producto no encontrado | FerchoTécnico',
    };
  }

  const imageUrl = product.images[0] || '/images/default-product.jpg';
  const description = product.description.slice(0, 160);

  return {
    title: `${product.title} - ${product.price.toLocaleString('es-CO')} COP | FerchoTécnico`,
    description,
    openGraph: {
      title: product.title,
      description,
      images: [imageUrl],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: product.title,
      description,
      images: [imageUrl],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  // Increment views (fire and forget)
  incrementViews(product.id).catch(console.error);

  const STATUS_LABELS = {
    nuevo: 'Nuevo',
    reacondicionado: 'Reacondicionado',
    usado: 'Usado',
    exhibicion: 'Exhibición',
  } as const;

  return (
    <>
      <ProductJsonLd product={product} />

      <div className={styles.container}>
        <div className="container">
          <Breadcrumbs
            items={[
              { label: 'Inicio', href: '/' },
              { label: 'Tienda', href: '/tienda' },
              { label: product.title, href: `/tienda/${product.slug}` },
            ]}
          />

          <div className={styles.productLayout}>
            {/* Image Gallery */}
            <div className={styles.gallerySection}>
              <ImageGallery images={product.images} alt={product.title} />
            </div>

            {/* Product Info */}
            <div className={styles.infoSection}>
              {/* Status Badge */}
              <div className={styles.badges}>
                <span className={`${styles.statusBadge} ${styles[product.status]}`}>
                  {STATUS_LABELS[product.status]}
                </span>
                {product.stock <= 3 && product.stock > 0 && (
                  <span className={styles.stockWarning}>
                    ⚠️ Últimas {product.stock} unidades
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className={styles.title}>{product.title}</h1>

              {/* Brand and Model */}
              {(product.brand || product.model) && (
                <div className={styles.brandModel}>
                  {product.brand && <span className={styles.brand}>{product.brand}</span>}
                  {product.model && <span className={styles.model}>Modelo: {product.model}</span>}
                </div>
              )}

              {/* Price */}
              <div className={styles.priceSection}>
                <div className={styles.price}>
                  <span className={styles.amount}>
                    ${product.price.toLocaleString('es-CO')}
                  </span>
                  <span className={styles.currency}>COP</span>
                </div>
                {product.warranty && (
                  <div className={styles.warranty}>
                    🛡️ Garantía: {product.warranty}
                  </div>
                )}
              </div>

              {/* Availability */}
              <div className={styles.availability}>
                {product.availability ? (
                  <div className={styles.inStock}>
                    <span className={styles.indicator}>✓</span>
                    Disponible - {product.stock} en stock
                  </div>
                ) : (
                  <div className={styles.outOfStock}>
                    <span className={styles.indicator}>✕</span>
                    Agotado
                  </div>
                )}
              </div>

              {/* Description */}
              <div className={styles.description}>
                <h2 className={styles.sectionTitle}>Descripción</h2>
                <p>{product.description}</p>
              </div>

              {/* Specifications */}
              {Object.keys(product.specs).length > 0 && (
                <div className={styles.specs}>
                  <h2 className={styles.sectionTitle}>Especificaciones</h2>
                  <dl className={styles.specsList}>
                    {Object.entries(product.specs).map(([key, value]) => (
                      <div key={key} className={styles.specItem}>
                        <dt className={styles.specKey}>{key}</dt>
                        <dd className={styles.specValue}>{value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}

              {/* Payment Methods */}
              {product.payment_methods.length > 0 && (
                <div className={styles.payment}>
                  <h2 className={styles.sectionTitle}>Métodos de pago</h2>
                  <div className={styles.paymentMethods}>
                    {product.payment_methods.map((method) => (
                      <span key={method} className={styles.paymentMethod}>
                        {method}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* WhatsApp CTA */}
              {product.availability && (
                <WhatsAppButton product={product} />
              )}

              {/* Additional Info */}
              <div className={styles.additionalInfo}>
                <div className={styles.infoItem}>
                  <span className={styles.infoIcon}>📍</span>
                  <span className={styles.infoText}>
                    Entrega disponible en Montería y municipios cercanos
                  </span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoIcon}>💬</span>
                  <span className={styles.infoText}>
                    Asesoría técnica personalizada incluida
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
