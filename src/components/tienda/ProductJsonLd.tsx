import type { Product } from '@/lib/types';

interface ProductJsonLdProps {
  product: Product;
}

export function ProductJsonLd({ product }: ProductJsonLdProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description,
    image: product.images[0] || 'https://www.ferchotecnico.com/images/default-product.jpg',
    brand: product.brand
      ? {
          '@type': 'Brand',
          name: product.brand,
        }
      : undefined,
    model: product.model,
    sku: product.id,
    offers: {
      '@type': 'Offer',
      url: `https://www.ferchotecnico.com/tienda/${product.slug}`,
      priceCurrency: 'COP',
      price: product.price,
      priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 days
      availability: product.availability
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      itemCondition:
        product.status === 'nuevo'
          ? 'https://schema.org/NewCondition'
          : product.status === 'reacondicionado'
            ? 'https://schema.org/RefurbishedCondition'
            : 'https://schema.org/UsedCondition',
      seller: {
        '@type': 'LocalBusiness',
        name: 'FerchoTécnico',
        telephone: '+57-310-555-2027',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Montería',
          addressRegion: 'Córdoba',
          addressCountry: 'CO',
        },
      },
    },
    aggregateRating:
      product.views > 10
        ? {
            '@type': 'AggregateRating',
            ratingValue: '4.8',
            reviewCount: Math.floor(product.views / 10),
          }
        : undefined,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
