import React from 'react';

export default function LocalBusinessSchema() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "FerchoTecnico - Servicio Técnico de Computadores",
    "description": "Más de 10 años solucionando problemas tecnológicos en Montería. Especialista en reparación, mantenimiento y optimización de equipos.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Montería",
      "addressRegion": "Córdoba",
      "addressCountry": "CO"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "8.7479",
      "longitude": "-75.8814"
    },
    "telephone": "+57-300-8474121",
    "openingHours": "Mo-Sa 08:00-18:00",
    "priceRange": "$$",
    "serviceArea": {
      "@type": "City",
      "name": "Montería"
    },
    "areaServed": "Montería, Córdoba, Colombia",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Servicios Técnicos",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Reparación de PC y Portátiles",
            "description": "Diagnóstico completo y reparación de hardware y software"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Recuperación de Datos",
            "description": "Rescate de información de discos dañados"
          }
        }
      ]
    },
    "review": [
      {
        "@type": "Review",
        "author": "Odalis",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5"
        },
        "reviewBody": "Excelente servicio técnico. Rápido y de buena Calidad."
      }
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "92"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}
