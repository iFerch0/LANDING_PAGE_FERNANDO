import Navbar from '@/components/Navbar';
import FaqJsonLd from '@/components/FaqJsonLd';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
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
  <FaqJsonLd />
      <Navbar />
      <main>
          <div data-aos="fade-down">
            <Hero />
          </div>
          <div data-aos="zoom-in-up">
            <Features />
          </div>
          <div data-aos="fade-left">
            <Process />
          </div>
          <div data-aos="flip-up">
            <SuccessCases />
          </div>
          <div data-aos="zoom-in">
            <Stats />
          </div>
          <div data-aos="fade-up">
            <Testimonials />
          </div>
          <div data-aos="fade-down">
            <Faq />
          </div>
          <div data-aos="zoom-in-up">
            <CtaFinal />
          </div>
          <div data-aos="fade-up">
            <ContactForm />
          </div>
          {/* ...existing code... */}
      </main>
    </>
  );
}