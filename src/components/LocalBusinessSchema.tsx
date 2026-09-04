import React from 'react';
import { CONTACT, SITE_URL } from '@/data/contact';

export default function LocalBusinessSchema() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'ComputerRepairService'],
    name: 'Fernando Rhenals - Ensamble de PC Gamer & Servicio Técnico',
    alternateName: 'Fernando - Armado y Reparación de Computadores Montería',
    description:
      'Ingeniero de Sistemas especialista en ensamble y armado de PC Gamer, Workstations de alto rendimiento para arquitectura/edición y servicio técnico especializado en Montería, Córdoba.',
    url: SITE_URL,
    image: `${SITE_URL}/hero-poster.jpg`,
    logo: `${SITE_URL}/logo_new.png`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: CONTACT.address,
      addressLocality: CONTACT.city,
      addressRegion: CONTACT.region,
      addressCountry: 'CO',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: CONTACT.latitude,
      longitude: CONTACT.longitude,
    },
    telephone: CONTACT.phone,
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday'],
        opens: '08:00',
        closes: '14:00',
      },
    ],
    priceRange: '$$',
    serviceArea: 'Montería, Córdoba, Colombia',
    areaServed: [
      {
        '@type': 'City',
        name: 'Montería',
      },
      {
        '@type': 'AdministrativeArea',
        name: 'Córdoba',
      },
    ],
    knowsAbout: [
      'Ensamble de PC Gamer',
      'Armado de Computadores a Medida',
      'Workstations de Alto Rendimiento',
      'Hardware Gaming y Componentes',
      'Gestión de Cableado y Flujo de Aire',
      'Optimización Térmica y Repaste',
      'Refrigeración Líquida AIO',
      'Mantenimiento Preventivo de Computadores',
      'Reparación de Laptops y PC de Escritorio',
      'Diagnóstico de Hardware y Software',
      'Recuperación de Datos',
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      reviewCount: '92',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Catálogo de Servicios y Ensambles',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Ensamble y Armado de PC Gamer & Workstations',
            description:
              'Montaje profesional de computadores personalizados para gaming, streaming, arquitectura y edición de video con gestión de cables y pruebas de estabilidad.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Asesoría y Cotización de Componentes de Hardware',
            description:
              'Guía y selección de componentes equilibrados (CPU, GPU, RAM, Motherboard, Fuente y Chasis) según presupuesto y necesidades.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Mantenimiento Preventivo & Optimización Térmica',
            description:
              'Limpieza profunda por ultrasonido/aire comprimido, cambio de pasta térmica de alta conductividad y thermal pads.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Reparación de PC y Portátiles',
            description: 'Diagnóstico completo y reparación de hardware y software.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Recuperación de Datos',
            description: 'Rescate de información de discos mecánicos dañados y unidades SSD.',
          },
        },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}
