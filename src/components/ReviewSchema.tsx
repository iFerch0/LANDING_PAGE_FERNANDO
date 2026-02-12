interface ReviewSchemaProps {
  name: string;
  url: string;
  ratingValue?: number;
  ratingCount?: number;
  bestRating?: number;
}

export default function ReviewSchema({
  name,
  url,
  ratingValue = 5,
  ratingCount = 48,
  bestRating = 5,
}: ReviewSchemaProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: name,
    url: url,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: ratingValue,
      reviewCount: ratingCount,
      bestRating: bestRating,
    },
    review: [
      {
        '@type': 'Review',
        author: { '@type': 'Person', name: 'Andrés' },
        datePublished: '2025-06-10',
        reviewBody: 'Servicio rápido y profesional. Diagnóstico gratuito y solución el mismo día.',
        reviewRating: { '@type': 'Rating', ratingValue: 5 },
      },
      {
        '@type': 'Review',
        author: { '@type': 'Person', name: 'María' },
        datePublished: '2025-05-02',
        reviewBody: 'Excelente atención y servicio rápido. Recomiendo 100%.',
        reviewRating: { '@type': 'Rating', ratingValue: 5 },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
