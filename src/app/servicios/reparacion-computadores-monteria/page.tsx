import ServiceTemplate from '@/components/ServiceTemplate';
import TechnicalServiceSchema from '@/components/TechnicalServiceSchema';
import ReviewSchema from '@/components/ReviewSchema';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Reparación Computadores Montería ⭐ | Técnico PC a Domicilio 24/7',
  description: '⭐ Reparación computadores Montería especializada. Diagnóstico GRATIS, servicio a domicilio, garantía 30 días. Técnico certificado con 8+ años experiencia 📱',
  keywords: [
    'reparación computadores Montería',
    'reparación PC Montería',
    'técnico computadores Montería',
    'reparación portátiles Montería',
    'servicio técnico PC domicilio',
    'reparación hardware Montería',
    'arreglo computadores Córdoba',
    'técnico PC Montería centro',
    'reparación motherboard Montería',
    'cambio fuente poder Montería',
    'reparación disco duro',
    'actualización RAM Montería',
    'servicio computadores urgente'
  ].join(', '),
  alternates: {
    canonical: 'https://www.ferchotecnico.com/servicios/reparacion-computadores-monteria'
  },
  openGraph: {
    title: '🔧 Reparación Computadores Montería | Fernando Tech ⭐ 5.0',
    description: '⭐ Especialista en reparación computadores y portátiles Montería. Diagnóstico gratuito, servicio domicilio 24/7. +8 años experiencia 📱',
    url: 'https://www.ferchotecnico.com/servicios/reparacion-computadores-monteria',
    type: 'website'
  }
};

export default function Page() {
  return (
    <>
      <TechnicalServiceSchema
        serviceName="Reparación de Computadores en Montería"
        serviceDescription="Servicio técnico especializado en reparación de computadores y portátiles en Montería. Diagnóstico gratuito, garantía 30 días, servicio a domicilio."
        priceRange="50000-200000"
        serviceUrl="https://www.ferchotecnico.com/servicios/reparacion-computadores-monteria"
      />
      <ReviewSchema
        name="FerchoTécnico - Reparación de Computadores Montería"
        url="https://www.ferchotecnico.com/servicios/reparacion-computadores-monteria"
        ratingValue={5}
        ratingCount={48}
      />
      <ServiceTemplate
        title="🔧 Reparación de Computadores en Montería — Técnico Especialista ⭐"
        description="Reparación profesional de computadores y portátiles en Montería. Diagnóstico GRATIS, servicio a domicilio 24/7, garantía 30 días. Más de 8 años reparando PCs en Córdoba."
        priceFrom="Desde $50.000 COP"
        image="/hero-poster.jpg"
        canonical="https://www.ferchotecnico.com/servicios/reparacion-computadores-monteria"
        serviceName="Reparación de Computadores Montería"
        cases={[
          { 
            title: '💻 Reparación Motherboard Dell Inspiron', 
            text: 'Diagnóstico y reparación de motherboard con componentes dañados. Cliente en Villa Margarita, Montería. Tiempo: 48h, garantía 30 días.' 
          },
          { 
            title: '🔋 Reemplazo Fuente de Poder HP Pavilion', 
            text: 'Cambio de fuente de poder defectuosa en PC de escritorio. Servicio a domicilio en centro de Montería. Instalación y pruebas completas en 24h.' 
          },
          { 
            title: '💾 Recuperación y Reparación Disco Duro', 
            text: 'Reparación de sectores dañados y recuperación de datos importantes. Cliente empresarial en zona norte Montería. 100% de datos recuperados.' 
          },
          {
            title: '⚡ Actualización RAM y SSD Lenovo',
            text: 'Upgrade completo: RAM de 4GB a 16GB + instalación SSD 500GB. Portátil 5x más rápido. Cliente satisfecho en barrio La Granja.'
          }
        ]}
        faqs={[
          { 
            q: '¿Cuánto tiempo tarda la reparación de computadores en Montería?', 
            a: 'El tiempo promedio es 24-48 horas para reparaciones comunes. Diagnóstico gratuito en el mismo día. Para reparaciones complejas pueden ser 72 horas máximo.' 
          },
          { 
            q: '¿Qué garantía ofrecen en las reparaciones?', 
            a: 'Ofrecemos 30 días de garantía en mano de obra y según garantía del fabricante en repuestos nuevos. Si el problema persiste, lo arreglamos sin costo adicional.' 
          },
          { 
            q: '¿Atienden a domicilio en toda Montería?', 
            a: 'Sí, atendemos en toda Montería y municipios cercanos: Cereté, Lorica, San Pelayo. Servicio a domicilio incluido sin costo adicional en perímetro urbano.' 
          },
          {
            q: '¿Qué tipos de computadores reparan?',
            a: 'Reparamos todas las marcas: HP, Dell, Lenovo, Acer, Asus, MSI, Compaq. PCs de escritorio, portátiles, All-in-One. Hardware y software.'
          },
          {
            q: '¿Cuánto cuesta la reparación de computadores?',
            a: 'Diagnóstico GRATIS. Reparaciones desde $50.000. Precios fijos sin sorpresas. Cotización gratuita vía WhatsApp al +57 300 847 4121.'
          }
        ]}
      />
    </>
  );
}
