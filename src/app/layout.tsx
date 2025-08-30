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
  title: "Técnico en Computadores Montería | Servicio Técnico PC a Domicilio ⭐",
  description: "⭐ Técnico en computadores Montería especializado en reparación PC, soporte técnico, mantenimiento y recuperación de datos. Servicio a domicilio 24/7. Diagnóstico gratuito ✅",
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/icon-192x192.png',
  },
  "keywords": [
    // Palabras clave principales priorizadas (basado en posiciones actuales)
    "técnico en computadores montería",
    "servicio técnico computadores montería", 
    "reparación de computadores montería",
    "técnico pc montería",
    "servicio técnico de computadores montería",
    "soporte técnico computadores montería",
    "mantenimiento de computadores montería",
    "ingeniero de sistemas montería",
    
    // Variaciones exactas de las palabras clave principales
    "técnico computadores montería",
    "técnico en computadores en montería",
    "servicio técnico pc montería",
    "reparación computadores montería",
    "técnico de computadores montería",
    "soporte técnico de computadores montería",
    "mantenimiento computadores montería",
    "técnico sistemas montería",
    "ingeniero sistemas montería",
    
    // Palabras clave con posiciones bajas - optimización agresiva
    "servicio tecnico computadores monteria",
    "servicio tecnico de computadores monteria", 
    "tecnico pc monteria",
    "soporte tecnico computadores monteria",
    "ingeniero de sistemas monteria",
    
    // Variaciones adicionales para mejorar posiciones
    "tecnico en computadores monteria",
    "reparacion de computadores monteria",
    "tecnico pc monteria",
    "servicio tecnico de computadores monteria",
    "soporte tecnico computadores monteria",
    "mantenimiento de computadores monteria",
    "ingeniero de sistemas monteria",
    
    // Palabras con modifiers de localización agresivos
    "técnico computadores montería córdoba",
    "servicio técnico computadores montería colombia",
    "reparación pc montería costa atlántica",
    "técnico informática montería",
    "soporte computadores montería centro",
    "técnico pc a domicilio montería",
    "servicio técnico domicilio montería",
    "técnico computadores montería zona norte",
    "técnico pc montería centro histórico",
    "servicio técnico montería villa hermosa",
    "técnico computadores montería barrio la granja",
    
    // Servicios específicos prioritarios con variaciones
    "reparación de computadores córdoba",
    "técnico de PC montería",
    "arreglo de computadores montería",
    "reparación portátiles montería",
    "servicio domicilio computadores montería",
    "técnico computación a domicilio montería",
    "servicio técnico laptops montería",
    "soporte informático montería",
    "técnico hardware montería",
    "especialista computadores montería",
    "técnico software montería",
    "ingeniero informático montería",
    
    // Long tail keywords específicos para posiciones bajas
    "formateo de computadores montería",
    "instalación de windows montería",
    "reparación windows montería",
    "instalación de programas montería",
    "limpieza de virus montería",
    "eliminación de malware montería",
    "mantenimiento preventivo computadores montería",
    "optimización de pc montería",
    "cambio de disco duro montería",
    "cambio de memoria ram montería",
    "cambio de pantalla portátil montería",
    "reparación cargador laptop montería",
    "reinstalación sistema operativo montería",
    "técnico computadores montería urgente",
    "servicio técnico computadores montería 24 horas",
    "técnico pc montería barato",
    "reparación computadores montería económico",
    
    // Recuperación de datos con variaciones
    "recuperación de datos montería",
    "recuperación de disco duro montería",
    "recuperación usb dañada montería",
    "copia de seguridad montería",
    "respaldo de información montería",
    "recuperación archivos montería",
    "recuperación datos pc montería",
    "recuperación información computador montería",
    
    // Marcas específicas con variaciones
    "reparación computadores hp montería",
    "técnico computadores dell montería", 
    "reparación laptops lenovo montería",
    "arreglo portátiles acer montería",
    "técnico computadores asus montería",
    "servicio mac montería",
    "reparación macbook montería",
    "técnico apple montería",
    "reparación toshiba montería",
    "servicio samsung montería",
    "técnico computadores hp montería",
    "reparación dell montería",
    "técnico lenovo montería",
    "servicio técnico acer montería",
    
    // Servicios profesionales con variaciones
    "técnico en informática montería",
    "técnico de redes montería",
    "soporte técnico montería",
    "consultor informático montería",
    "especialista it montería",
    "técnico software montería",
    "programador montería",
    "analista sistemas montería",
    "ingeniero de sistemas montería",
    "técnico en sistemas montería",
    "especialista en computación montería",
    
    // Búsquedas locales agresivas
    "arreglo computadores cerca de mí montería",
    "técnico de pc barato montería",
    "servicio técnico urgente montería",
    "técnico 24 horas computadores montería",
    "técnico computadores económico montería",
    "servicio técnico confiable montería",
    "técnico pc zona norte montería",
    "técnico computadores centro montería",
    "técnico pc montería sur",
    "servicio técnico montería norte",
    "técnico computadores montería oriental",
    "reparación pc montería occidental",
    
    // Social proof y confianza con variaciones
    "reseñas servicio técnico montería",
    "mejor técnico computadores montería",
    "recomendado técnico pc montería",
    "confiable servicio técnico montería",
    "técnico certificado montería",
    "técnico experiente montería",
    "garantía reparación computadores montería",
    "técnico computadores montería 5 estrellas",
    "servicio técnico montería recomendado",
    
    // Servicios empresariales con variaciones
    "soporte técnico empresarial montería",
    "mantenimiento equipos oficina montería",
    "técnico computadores corporativo montería",
    "servicio técnico pymes montería",
    "soporte it empresas montería",
    "consultoría tecnológica montería",
    "técnico computadores montería empresas",
    "servicio técnico montería negocios",
    
    // Emergencias y urgencias con variaciones
    "técnico computadores emergencia montería",
    "reparación urgente pc montería",
    "servicio técnico inmediato montería",
    "técnico computadores fin semana montería",
    "soporte técnico nocturno montería",
    "técnico pc montería fines de semana",
    "servicio técnico montería domingos",
    
    // Gaming y especializados con variaciones
    "optimización pc gaming montería",
    "técnico computadores gamer montería",
    "mejora rendimiento pc montería",
    "actualizacion hardware montería",
    "overclocking montería",
    "técnico pc gaming montería",
    "optimización juegos montería",
    
    // Educativo e institucional con variaciones
    "soporte técnico colegios montería",
    "técnico computadores universidades montería",
    "mantenimiento equipos educativos montería",
    "servicio técnico institucional montería",
    "técnico pc montería escuelas",
    "soporte informático montería colegios",
    
    // Nuevas palabras clave para mejorar posiciones
    "técnico en computadores montería córdoba",
    "servicio técnico pc montería colombia",
    "reparación computadores montería urgente",
    "técnico pc montería a domicilio",
    "soporte técnico computadores montería 24/7",
    "mantenimiento computadores montería preventivo",
    "ingeniero de sistemas montería consultoría",
    "técnico informático montería freelance",
    "servicio técnico montería profesional",
    "reparación pc montería garantizada",
    
    // Variaciones geográficas específicas
    "técnico computadores montería sinú",
    "servicio técnico pc montería centro",
    "reparación computadores montería norte",
    "técnico pc montería sur",
    "soporte técnico montería oriental",
    "mantenimiento pc montería occidental",
    "ingeniero sistemas montería villa hermosa",
    "técnico computadores montería la granja",
    "servicio técnico montería el recreo",
    "reparación pc montería el centro",
    
    // Términos técnicos específicos
    "diagnóstico pc montería",
    "reparación motherboard montería",
    "cambio fuente poder montería",
    "actualización ram montería",
    "instalación ssd montería",
    "reparación tarjeta gráfica montería",
    "cambio pantalla laptop montería",
    "reparación teclado montería",
    "limpieza pc montería",
    "optimización windows montería",
    
    // Términos de búsqueda conversacional
    "donde encontrar técnico computadores montería",
    "mejor servicio técnico pc montería",
    "cuanto cuesta reparar pc montería",
    "técnico computadores montería precio",
    "servicio técnico montería confiable",
    "técnico pc montería economico",
    "reparación computadores montería garantia",
    "soporte técnico montería 24 horas",
    "técnico computadores montería urgente",
    "servicio técnico montería a domicilio"
  ],
  authors: [{ name: "Fernando - FerchoTécnico Montería" }],
  creator: "FerchoTécnico - Servicio Técnico Computadores Montería",
  publisher: "FerchoTécnico",
  alternates: {
    canonical: "https://www.ferchotecnico.com"
  },
  openGraph: {
    title: "🔧 Técnico en Computadores Montería | Servicio a Domicilio ⭐ 5.0",
    description: "⭐ Fernando - Técnico especialista en reparación de computadores en Montería. Soporte técnico PC, mantenimiento, recuperación datos. Diagnóstico GRATIS 📱 +573008474121",
    url: "https://www.ferchotecnico.com",
    siteName: "FerchoTécnico - Servicio Técnico Computadores Montería",
    images: [
      {
        url: "https://www.ferchotecnico.com/hero-poster.jpg",
        width: 1200,
        height: 630,
        alt: "Fernando - Técnico en Computadores Montería - Servicio a Domicilio"
      }
    ],
    locale: "es_CO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "🔧 Técnico Computadores Montería | Fernando ⭐",
    description: "⭐ Servicio técnico PC a domicilio en Montería. Reparación, mantenimiento, soporte. Diagnóstico gratuito 📱 +573008474121",
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
        <meta name="keywords" content="técnico en computadores montería, servicio técnico computadores montería, reparación de computadores montería, técnico pc montería, soporte técnico computadores montería, mantenimiento de computadores montería, ingeniero de sistemas montería, fernando técnico, diagnóstico gratuito, servicio a domicilio" />
        <meta name="description" content="⭐ Técnico en computadores Montería especializado en reparación PC, soporte técnico, mantenimiento y recuperación de datos. Servicio a domicilio 24/7. Diagnóstico gratuito ✅" />
        <meta name="geo.region" content="CO-COR" />
        <meta name="geo.placename" content="Montería, Córdoba, Colombia" />
        <meta name="geo.position" content="8.7574;-75.8781" />
        <meta name="ICBM" content="8.7574, -75.8781" />
        <meta name="author" content="Fernando - FerchoTécnico Montería" />
        <meta name="locality" content="Montería" />
        <meta name="region" content="Córdoba" />
        <meta name="country-name" content="Colombia" />
        <link rel="canonical" href="https://www.ferchotecnico.com" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#3a6e93" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="FerchoTécnico Montería" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
        <meta property="og:title" content="🔧 Fernando - Técnico Computadores Montería | Servicio a Domicilio ⭐" />
        <meta property="og:description" content="⭐ 5.0 estrellas - Técnico especialista en reparación de computadores en Montería. Soporte técnico PC, diagnóstico gratuito, garantía 30 días. 📱 +573008474121" />
        <meta property="og:image" content="https://www.ferchotecnico.com/hero-poster.jpg" />
        <meta property="og:type" content="local_business" />
        <meta property="og:locale" content="es_CO" />
        <meta property="og:site_name" content="FerchoTécnico - Servicio Técnico Computadores Montería" />
        <meta property="business:contact_data:street_address" content="Montería, Córdoba" />
        <meta property="business:contact_data:locality" content="Montería" />
        <meta property="business:contact_data:region" content="Córdoba" />
        <meta property="business:contact_data:postal_code" content="230001" />
        <meta property="business:contact_data:country_name" content="Colombia" />
        <meta property="business:contact_data:phone_number" content="+573008474121" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="🔧 Fernando - Técnico Computadores Montería ⭐" />
        <meta name="twitter:description" content="⭐ 5.0 estrellas - Servicio técnico PC a domicilio en Montería. Diagnóstico gratuito 📱 +573008474121" />
        <meta name="twitter:image" content="https://www.ferchotecnico.com/hero-poster.jpg" />
        <meta name="rating" content="5.0" />
        <meta name="price-range" content="$" />
        <meta name="availability" content="24/7" />
        <meta name="service-area" content="Montería, Córdoba, Colombia" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning={true}>
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
