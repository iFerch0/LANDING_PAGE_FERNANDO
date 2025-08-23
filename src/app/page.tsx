import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Services from '@/components/Services';
import Process from '@/components/Process';
import SuccessCases from '@/components/SuccessCases';
import Stats from '@/components/Stats';
import Testimonials from '@/components/Testimonials';
import Faq from '@/components/Faq';
import CtaFinal from '@/components/CtaFinal';
import ContactForm from '@/components/ContactForm';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Services />
        <Process />
        <SuccessCases />
        <Stats />
        <Testimonials />
        <Faq />
        <CtaFinal />
        <ContactForm />
      </main>
    </>
  );
}