import ServiceTemplate from '@/components/ServiceTemplate';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Formateo Windows Montería | FerchoTecnico',
  description: 'Formateo e instalación limpia de Windows con respaldo y migración de datos en Montería.',
};

export default function Page() {
  return (
    <ServiceTemplate
      title="Formateo e instalación de Windows en Montería"
      description="Formateo seguro con respaldo de datos, instalación de drivers y optimización post-instalación."
      priceFrom="$60.000 COP"
      image="/hero-poster.jpg"
      canonical="https://www.ferchotecnico.com/servicios/formateo-windows-monteria"
      serviceName="Formateo Windows"
      cases={[
        { title: 'Restauración completa', text: 'Formateo + recuperación de datos y migración a SSD.' },
        { title: 'Windows optimizado', text: 'Instalación limpia y conjunto de utilidades para performance.' }
      ]}
      faqs={[
        { q: '¿Perderé mis archivos?', a: 'No si solicitas respaldo; ofrecemos migración segura.' },
        { q: '¿Instalan drivers?', a: 'Sí, instalamos y configuramos drivers y utilidades necesarias.' }
      ]}
    />
  );
}
