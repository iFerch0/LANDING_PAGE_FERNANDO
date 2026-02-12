import ClientLayout from './ClientLayout';
import type { Metadata } from 'next';
import './globals.css';
import LocalBusinessSchema from '@/components/LocalBusinessSchema';
import OrganizationSchema from '@/components/OrganizationSchema';
import WebVitalsReporter from '@/components/WebVitalsReporter';
import PWAInstaller from '@/components/PWAInstaller';
import { GoogleAnalytics } from '@/components/GoogleAnalytics';
import Footer from '@/components/Footer';

// Using system fonts as fallback for better performance and offline support
const fontVariables = 'font-sans';

export const metadata: Metadata = {
  title: 'Técnico en Computadores Montería | Servicio Técnico PC',
  description:
    'Técnico en computadores Montería especializado en reparación PC, soporte técnico, mantenimiento y recuperación de datos. Atención en taller Lun-Sáb. Diagnóstico gratuito.',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/icon-192x192.png',
  },
  keywords: [
    'técnico computadores montería',
    'reparación pc montería',
    'servicio técnico montería',
    'mantenimiento computadores',
    'soporte técnico montería',
    'ingeniero sistemas montería',
    'formateo windows montería',
    'recuperación datos',
    'reparación laptops',
    'técnico pc córdoba',
    'instalación software',
    'eliminación virus',
    'optimización pc',
    'mantenimiento preventivo',
    'servicio técnico computadores',
  ],
  authors: [{ name: 'Fernando - FerchoTécnico Montería' }],
  creator: 'FerchoTécnico - Servicio Técnico Computadores Montería',
  publisher: 'FerchoTécnico',
  alternates: {
    canonical: 'https://www.ferchotecnico.com',
  },
  openGraph: {
    title: 'Técnico en Computadores Montería | Servicio Técnico PC',
    description:
      'Fernando - Técnico especialista en reparación de computadores en Montería. Soporte técnico PC, mantenimiento, recuperación datos. Diagnóstico gratuito +573008474121',
    url: 'https://www.ferchotecnico.com',
    siteName: 'FerchoTécnico - Servicio Técnico Computadores Montería',
    images: [
      {
        url: 'https://www.ferchotecnico.com/hero-poster.jpg',
        width: 1200,
        height: 630,
        alt: 'Fernando - Técnico en Computadores Montería - Servicio Técnico PC',
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
        {/* Preload recursos críticos */}
        <link rel="preload" href="/logo.png" as="image" />
        <link rel="preload" href="/hero-poster.jpg" as="image" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://api.whatsapp.com" />

        {/* Geo-targeting específico */}
        <meta name="geo.region" content="CO-COR" />
        <meta name="geo.placename" content="Montería, Córdoba, Colombia" />
        <meta name="geo.position" content="8.7574;-75.8781" />
        <meta name="ICBM" content="8.7574, -75.8781" />
        <meta name="locality" content="Montería" />
        <meta name="region" content="Córdoba" />
        <meta name="country-name" content="Colombia" />

        {/* Business-specific meta tags */}
        <meta property="business:contact_data:street_address" content="Montería, Córdoba" />
        <meta property="business:contact_data:locality" content="Montería" />
        <meta property="business:contact_data:region" content="Córdoba" />
        <meta property="business:contact_data:postal_code" content="230001" />
        <meta property="business:contact_data:country_name" content="Colombia" />
        <meta property="business:contact_data:phone_number" content="+573008474121" />
        <meta name="rating" content="5.0" />
        <meta name="price-range" content="$" />
        <meta name="availability" content="Lun-Vie 8AM-6PM, Sáb 8AM-2PM" />
        <meta name="service-area" content="Montería, Córdoba, Colombia" />
      </head>
      <body className={fontVariables} suppressHydrationWarning={true}>
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
