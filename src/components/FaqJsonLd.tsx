import React from 'react';
import { FAQ_ITEMS } from '@/data/faq';

export default function FaqJsonLd() {
  const faqStructured = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": FAQ_ITEMS.map((it) => ({
      "@type": "Question",
      "name": it.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": it.answer
      }
    }))
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructured) }} />
  );
}
