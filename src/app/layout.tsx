import ClientLayout from "./ClientLayout";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LocalBusinessSchema from '@/components/LocalBusinessSchema';
import OrganizationSchema from '@/components/OrganizationSchema';
import WebVitalsReporter from '@/components/WebVitalsReporter';
import PWAInstaller from '@/components/PWAInstaller';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import Footer from '@/components/Footer';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Técnico en computadores en Montería | Reparación y mantenimiento a domicilio",
  description: "Servicio técnico de PC y laptops en Montería. Formateo, limpieza, cambio de partes y recuperación de datos. Agenda por WhatsApp.",
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/icon-192x192.png',
  },
  "keywords": [
    "servicio técnico computadores Montería",
    "técnico computadores Montería",
    "reparación de computadores Montería",
    "técnico de computadores Córdoba",
    "técnico de PC Montería",
    "soporte técnico computadores Montería",
    "arreglo de computadores Montería",
    "reparación portátiles Montería",
    "mantenimiento de computadores Montería",
    "servicio domicilio computadores Montería",
    "técnico computación a domicilio Montería",
    "servicio técnico laptops Montería",
    "técnico PC a domicilio Montería",
    "soporte informático Montería",
    "reparación de computadores Córdoba",

    "formateo de computadores Montería",
    "instalación de Windows Montería",
    "reparación Windows Montería",
    "instalación de programas Montería",
    "limpieza de virus Montería",
    "eliminación de malware Montería",
    "mantenimiento preventivo computadores Montería",
    "optimización de PC Montería",
    "cambio de disco duro Montería",
    "cambio de memoria RAM Montería",
    "cambio de pantalla portátil Montería",
    "cambio de teclado laptop Montería",
    "reparación cargador laptop Montería",
    "reparación software Montería",
    "reinstalación sistema operativo Montería",

    "recuperación de datos Montería",
    "recuperación de disco duro Montería",
    "recuperación USB dañada Montería",
    "copia de seguridad Montería",
    "respaldo de información Montería",

    "reparación computadores HP Montería",
    "técnico computadores Dell Montería",
    "reparación laptops Lenovo Montería",
    "arreglo portátiles Acer Montería",
    "técnico computadores Asus Montería",
    "servicio Mac Montería",
    "reparación MacBook Montería",
    "técnico Apple Montería",

    "técnico en informática Montería",
    "técnico de redes Montería",
    "soporte técnico Montería",
    "arreglo computadores cerca de mí Montería",
    "técnico de PC barato Montería",
    "servicio técnico urgente Montería",
    "técnico 24 horas computadores Montería",

    "reseñas servicio técnico Montería",
    "mejor técnico computadores Montería",
    "recomendado técnico PC Montería",
    "confiable servicio técnico Montería"
  ],
  authors: [{ name: "Fernando - FerchoTecnico" }],
  creator: "FerchoTecnico",
  publisher: "FerchoTecnico",
  alternates: {
    canonical: "https://www.ferchotecnico.com"
  },
  openGraph: {
  title: "Técnico en computadores en Montería | Reparación y mantenimiento a domicilio",
  description: "Servicio técnico de PC y laptops en Montería. Formateo, limpieza, cambio de partes y recuperación de datos. Agenda por WhatsApp.",
    url: "https://www.ferchotecnico.com",
    siteName: "FerchoTecnico",
    images: [
      {
  url: "https://www.ferchotecnico.com/hero-poster.jpg",
        width: 1200,
        height: 630,
        alt: "Servicio técnico computadores Montería"
      }
    ],
    locale: "es_CO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  title: "Técnico en computadores en Montería",
  description: "Servicio técnico de PC y laptops en Montería. Formateo, limpieza, cambio de partes y recuperación de datos. Agenda por WhatsApp.",
  images: ["https://www.ferchotecnico.com/hero-poster.jpg"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  },
  verification: {
    google: "32gCZO4fJwy0MIBY6vxxwViOjZebX-XWBvC8quXBg8I"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <meta name="keywords" content="servicio técnico computadores montería, reparación pc montería, técnico domicilio córdoba, mantenimiento portátiles, fernando técnico, diagnóstico gratuito" />
        <link rel="canonical" href="https://www.ferchotecnico.com" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#3a6e93" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="FerchoTécnico" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
        <meta property="og:title" content="Fernando - Técnico Computadores Montería | Servicio a Domicilio" />
        <meta property="og:description" content="⭐ 5.0 estrellas - Técnico especialista en reparación de computadores en Montería. Diagnóstico gratuito, garantía 30 días. +573008474121" />
        <meta property="og:image" content="https://www.ferchotecnico.com/fernando-tecnico-monteria.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Fernando - Técnico Computadores Montería" />
        <meta name="twitter:description" content="⭐ 5.0 estrellas - Servicio técnico a domicilio en Montería. Diagnóstico gratuito +573008474121" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
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
