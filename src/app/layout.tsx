import ClientLayout from "./ClientLayout";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LocalBusinessSchema from '@/components/LocalBusinessSchema';


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
  keywords: [
    "servicio técnico computadores Montería",
    "reparación PC Montería",
    "técnico computadores Córdoba",
    "mantenimiento computadores Montería",
    "recuperación datos Montería",
    "servicio domicilio computadores"
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
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
