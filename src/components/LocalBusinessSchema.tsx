import React from 'react';
import { PHONE_DISPLAY } from '@/constants/contact';

export default function LocalBusinessSchema() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Fernando - Técnico en Computadores',
    description:
      'Servicio de reparación de computadoras en Montería. Más de 10 años de experiencia en diagnóstico, reparación y mantenimiento.',
    url: 'https://ferchotecnico.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Dg. 7 #7 - 50',
      addressLocality: 'Montería',
      addressRegion: 'Córdoba',
      addressCountry: 'CO',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '8.7478',
      longitude: '-75.8895',
    },
    telephone: PHONE_DISPLAY,
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Sunday',
        opens: '09:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Monday',
        opens: '09:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Tuesday',
        opens: '09:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Wednesday',
        opens: '09:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Thursday',
        opens: '09:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Friday',
        opens: '09:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '09:00',
        closes: '18:00',
      },
    ],
    priceRange: '$$',
    serviceArea: 'Montería, Córdoba, Colombia',
    areaServed: 'Montería, Córdoba, Colombia',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      reviewCount: '92',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Servicios Técnicos',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Reparación de PC y Portátiles',
            description: 'Diagnóstico completo y reparación de hardware y software',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Recuperación de Datos',
            description: 'Rescate de información de discos dañados',
          },
        },
      ],
    },
    // Intentionally not including Review or AggregateRating schema here.
    // Google Business reviews should remain on the GBP profile and be shown on
    // the site visually (widgets) without marking them with JSON-LD review schema
    // to avoid inconsistency or self-declared review markup.
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}
