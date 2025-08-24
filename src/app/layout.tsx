import ClientLayout from "./ClientLayout";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LocalBusinessSchema from '@/components/LocalBusinessSchema';
import OrganizationSchema from '@/components/OrganizationSchema';


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Servicio Técnico Computadores Montería | FerchoTecnico | 10+ Años Experiencia",
  description: "Servicio técnico de computadores en Montería con más de 10 años de experiencia. Reparación PC y portátiles, recuperación datos, eliminación virus. ¡Diagnóstico GRATIS!",
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
    title: "Servicio Técnico Computadores Montería | 10+ Años",
    description: "Reparación y mantenimiento de computadores en Montería. Diagnóstico gratuito, servicio a domicilio, garantía 30 días.",
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
    title: "Servicio Técnico Computadores Montería",
    description: "Más de 10 años solucionando problemas tecnológicos en Montería",
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
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
  <LocalBusinessSchema />
  <OrganizationSchema />
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
