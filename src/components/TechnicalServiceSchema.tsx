'use client';

import { useEffect } from 'react';

interface TechnicalServiceSchemaProps {
  serviceName: string;
  serviceDescription: string;
  priceRange?: string;
  serviceUrl: string;
}

export default function TechnicalServiceSchema({
  serviceName,
  serviceDescription,
  priceRange = '50000-200000',
  serviceUrl,
}: TechnicalServiceSchemaProps) {
  useEffect(() => {
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: serviceName,
      description: serviceDescription,
      provider: {
        '@type': 'LocalBusiness',
        name: 'Fernando - Técnico en Computadores',
        alternateName: 'FerchoTecnico',
        description:
          'Servicio técnico especializado en computadores y portátiles en Montería, Córdoba',
        url: 'https://www.ferchotecnico.com',
        telephone: '+573008474121',
        email: 'contacto@ferchotecnico.com',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Montería',
          addressRegion: 'Córdoba',
          addressCountry: 'CO',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: '8.7479',
          longitude: '-75.8814',
        },
        areaServed: [
          {
            '@type': 'City',
            name: 'Montería',
            containedInPlace: {
              '@type': 'State',
              name: 'Córdoba',
            },
          },
          {
            '@type': 'City',
            name: 'Cereté',
          },
          {
            '@type': 'City',
            name: 'Lorica',
          },
          {
            '@type': 'City',
            name: 'San Pelayo',
          },
        ],
        serviceType: 'Computer Repair Service',
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Servicios Técnicos Computadores',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Reparación de Computadores',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Mantenimiento Preventivo',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Soporte Técnico',
              },
            },
          ],
        },
        openingHours: ['Mo-Su 08:00-20:00'],
        priceRange: '$$',
        paymentAccepted: ['Cash', 'Credit Card', 'Transfer'],
        currenciesAccepted: 'COP',
      },
      serviceType: 'Computer Technical Service',
      category: 'Computer Repair',
      offers: {
        '@type': 'Offer',
        priceCurrency: 'COP',
        price: priceRange,
        priceValidUntil: '2025-12-31',
        availability: 'https://schema.org/InStock',
        validFrom: '2024-01-01',
        seller: {
          '@type': 'Person',
          name: 'Fernando',
          jobTitle: 'Técnico en Computadores',
          telephone: '+573008474121',
          knowsAbout: [
            'Reparación Hardware',
            'Instalación Software',
            'Mantenimiento PC',
            'Recuperación Datos',
            'Eliminación Virus',
          ],
        },
      },
      areaServed: {
        '@type': 'GeoCircle',
        geoMidpoint: {
          '@type': 'GeoCoordinates',
          latitude: '8.7479',
          longitude: '-75.8814',
        },
        geoRadius: '50000',
      },
      availableChannel: [
        {
          '@type': 'ServiceChannel',
          servicePhone: '+573008474121',
          serviceUrl: serviceUrl,
        },
      ],
      hoursAvailable: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          opens: '08:00',
          closes: '20:00',
        },
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Servicios Técnicos',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: serviceName,
              description: serviceDescription,
            },
            priceCurrency: 'COP',
            price: priceRange,
            availability: 'https://schema.org/InStock',
          },
        ],
      },
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [serviceName, serviceDescription, priceRange, serviceUrl]);

  return null;
}
