import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ServicesGrid from '@/components/ServicesGrid';
import Testimonials from '@/components/Testimonials';
import AboutFernando from '@/components/AboutFernando';
import ContactForm from '@/components/ContactForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Técnico en Computadores Montería | Servicio Técnico PC',
  description:
    'Fernando - Técnico especialista en computadores Montería. Reparación PC, soporte técnico, mantenimiento. Atención en taller Lun-Sáb. Diagnóstico gratuito.',
  alternates: {
    canonical: 'https://www.ferchotecnico.com',
  },
  openGraph: {
    title: 'Técnico en Computadores Montería | Fernando',
    description:
      'Servicio técnico computadores Montería. Reparación PC, soporte técnico, mantenimiento. Diagnóstico gratuito +573008474121',
    url: 'https://www.ferchotecnico.com',
    type: 'website',
  },
};

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero - Primera impresión con headline mejorado */}
        <div data-aos="fade-up">
          <Hero />
        </div>

        {/* ServicesGrid - Qué ofrecemos */}
        <ServicesGrid />

        {/* Testimonials - Reviews verificadas */}
        <Testimonials />

        {/* AboutFernando - Credibilidad personal */}
        <AboutFernando />

        {/* ContactForm - Captura de leads */}
        <ContactForm />
      </main>
    </>
  );
}
