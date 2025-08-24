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
  title: "Fernando — Técnico en Computadores",
  description: "Reparación, mantenimiento y soporte técnico de computadores. Diagnóstico gratuito y garantía de servicio.",
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
