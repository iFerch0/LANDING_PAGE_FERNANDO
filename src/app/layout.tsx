import ClientLayout from './ClientLayout';
import type { Metadata } from 'next';
import './globals.css';
import LocalBusinessSchema from '@/components/LocalBusinessSchema';
import OrganizationSchema from '@/components/OrganizationSchema';
import WebVitalsReporter from '@/components/WebVitalsReporter';
import PWAInstaller from '@/components/PWAInstaller';
import { GoogleAnalytics } from '@/components/GoogleAnalytics';
import Footer from '@/components/Footer';
import { CONTACT } from '@/data/contact';

export const metadata: Metadata = {
  title: 'Ensamble de PC Gamer & Servicio Técnico en Montería | Fernando Rhenals',
  description:
    'Ingeniero de Sistemas especialista en ensamble de PC Gamer, armado de workstations a medida y servicio técnico de computadores en Montería, Córdoba. Cotización personalizada y garantía.',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/icon-192x192.png',
  },
  keywords: [
    'ensamble pc gamer montería',
    'armado de computadores montería',
    'armar pc gamer córdoba',
    'cotización pc gamer montería',
    'workstation arquitectura edición montería',
    'técnico computadores montería',
    'reparación pc montería',
    'servicio técnico montería',
    'mantenimiento computadores montería',
    'soporte técnico computadores córdoba',
    'ingeniero sistemas montería',
    'reparación laptops montería',
    'mantenimiento térmico pc',
  ],
  authors: [{ name: 'Fernando Rhenals - Ingeniero de Sistemas' }],
  creator: 'Fernando Rhenals - Ensamble de PC & Servicio Técnico Montería',
  publisher: 'Fernando Rhenals',
  alternates: {
    canonical: 'https://www.ferchotecnico.com',
  },
  openGraph: {
    title: 'Ensamble de PC Gamer & Servicio Técnico en Montería | Fernando Rhenals',
    description:
      'Especialista en armado y ensamble de computadores Gamer, Workstations profesionales y soporte técnico en Montería, Córdoba. Diagnóstico y cotización directa.',
    url: 'https://www.ferchotecnico.com',
    siteName: 'Fernando Rhenals - Ensamble de PC & Servicio Técnico',
    images: [
      {
        url: 'https://www.ferchotecnico.com/hero-poster.jpg',
        width: 1200,
        height: 630,
        alt: 'Fernando Rhenals - Ensamble de PC Gamer y Servicio Técnico en Montería',
      },
    ],
    locale: 'es_CO',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Técnico Computadores Montería | Fernando',
    description:
      'Servicio técnico PC en Montería. Reparación, mantenimiento, soporte. Diagnóstico gratuito +573008474121',
    images: ['https://www.ferchotecnico.com/hero-poster.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: '32gCZO4fJwy0MIBY6vxxwViOjZebX-XWBvC8quXBg8I',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        {/* Google Fonts preconnect */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Preload recursos críticos */}
        <link rel="preload" href="/logo_new.png" as="image" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://api.whatsapp.com" />

        {/* Geo-targeting específico */}
        <meta name="geo.region" content="CO-COR" />
        <meta name="geo.placename" content="Montería, Córdoba, Colombia" />
        <meta name="geo.position" content="8.7352034;-75.8903534" />
        <meta name="ICBM" content="8.7352034, -75.8903534" />
        <meta name="locality" content="Montería" />
        <meta name="region" content="Córdoba" />
        <meta name="country-name" content="Colombia" />

        {/* Business-specific meta tags */}
        <meta property="business:contact_data:street_address" content="Montería, Córdoba" />
        <meta property="business:contact_data:locality" content="Montería" />
        <meta property="business:contact_data:region" content="Córdoba" />
        <meta property="business:contact_data:postal_code" content="230001" />
        <meta property="business:contact_data:country_name" content="Colombia" />
        <meta property="business:contact_data:phone_number" content={CONTACT.phone} />
        <meta name="rating" content="5.0" />
        <meta name="price-range" content="$" />
        <meta name="availability" content="Lun-Vie 8AM-6PM, Sáb 8AM-2PM" />
        <meta name="service-area" content="Montería, Córdoba, Colombia" />

        {/* Forced OpenGraph meta to fix rigid SEO auditors */}
        <meta property="og:image" content="https://www.ferchotecnico.com/hero-poster.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/jpeg" />
      </head>
      {/*
       * suppressHydrationWarning: browser extensions (e.g. Grammarly, Dark Reader)
       * inject attributes into <body>, causing hydration mismatches.
       * See ClientLayout.tsx cleanupBrowserExtensions for the runtime cleanup.
       */}
      <body suppressHydrationWarning={true}>
        <GoogleAnalytics />
        <LocalBusinessSchema />
        <OrganizationSchema />
        <ClientLayout>{children}</ClientLayout>
        <Footer />
        <PWAInstaller />
        <WebVitalsReporter />
      </body>
    </html>
  );
}
