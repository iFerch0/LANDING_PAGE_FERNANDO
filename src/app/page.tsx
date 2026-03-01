import { Suspense } from 'react';
import Navbar from '@/components/Navbar';
import FaqJsonLd from '@/components/FaqJsonLd';
import Hero from '@/components/Hero';
import TiendaPreview from '@/components/TiendaPreview';
import { TiendaPreviewSkeleton } from '@/components/TiendaPreviewSkeleton';
import Features from '@/components/Features';
import SuccessCases from '@/components/SuccessCases';
import Process from '@/components/Process';
import ServicesGrid from '@/components/ServicesGrid';
import BusinessPlans from '@/components/BusinessPlans';
import WebDevBanner from '@/components/WebDevBanner';
import Stats from '@/components/Stats';
import TrustedBy from '@/components/TrustedBy';
import Testimonials from '@/components/Testimonials';
import AboutFernando from '@/components/AboutFernando';
import Faq from '@/components/Faq';
import CtaFinal from '@/components/CtaFinal';
import ContactForm from '@/components/ContactForm';
import { Metadata } from 'next';
import { PHONE_DISPLAY } from '@/constants/contact';

export const metadata: Metadata = {
  title: 'Técnico en Computadores Montería | Servicio Técnico PC',
  description:
    'Fernando - Técnico especialista en computadores Montería. Reparación PC, soporte técnico, mantenimiento. Atención en taller Lun-Sáb. Diagnóstico gratuito.',
  alternates: {
    canonical: 'https://www.ferchotecnico.com',
  },
  openGraph: {
    title: 'Técnico en Computadores Montería | Fernando',
    description: `Servicio técnico computadores Montería. Reparación PC, soporte técnico, mantenimiento. Diagnóstico gratuito ${PHONE_DISPLAY}`,
    url: 'https://www.ferchotecnico.com',
    type: 'website',
  },
};

export default function HomePage() {
  return (
    <>
      <FaqJsonLd />
      <Navbar />
      <main>
        <div data-aos="fade-up">
          <Hero />
        </div>
        <Suspense fallback={<TiendaPreviewSkeleton />}>
          <TiendaPreview />
        </Suspense>
        <Features />
        <SuccessCases />
        <Process />
        <ServicesGrid />
        <BusinessPlans />
        <WebDevBanner />
        <Stats />
        <TrustedBy />
        <Testimonials />
        <AboutFernando />
        <Faq />
        <CtaFinal />
        <ContactForm />
      </main>
    </>
  );
}
