import type { Metadata } from 'next';
import Link from 'next/link';
import { services } from '@/data/services';

export const metadata: Metadata = {
  title: 'Servicios Técnicos en Computadores Montería | Soporte PC a Domicilio',
  description:
    'Servicios técnicos computadores Montería: reparación PC, mantenimiento, eliminación virus, formateo Windows, recuperación datos. Domicilio 24/7',
  keywords: [
    'servicios técnicos computadores Montería',
    'reparación computadores Montería',
    'mantenimiento PC Montería',
    'soporte técnico Montería',
    'servicio a domicilio Montería',
    'eliminación virus Montería',
    'formateo Windows Montería',
    'recuperación datos Montería',
    'técnico computadores Córdoba',
    'reparación portátiles Montería',
    'servicio técnico domicilio',
    'mantenimiento preventivo PC',
    'soporte computadores Montería',
  ].join(', '),
  alternates: {
    canonical: 'https://www.ferchotecnico.com/servicios',
  },
  openGraph: {
    title: 'Servicios Técnicos Computadores Montería | Fernando Tech',
    description:
      'Todos los servicios técnicos para computadores en Montería. Reparación, mantenimiento, soporte a domicilio. Diagnóstico GRATIS',
    url: 'https://www.ferchotecnico.com/servicios',
    type: 'website',
  },
};

export default function ServiciosIndex() {
  // Use centralized data - show top 7 services
  const mainServices = services.slice(0, 7).map((service) => ({
    href: `/servicios/${service.slug}`,
    title: service.serviceName,
    description: service.description.split('.')[0] + '.',
  }));

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            🔧 Servicios Técnicos en Computadores
            <span className="block text-blue-600">Montería, Córdoba</span>
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            ⭐ Ofrecemos servicios técnicos especializados en computadores y portátiles en Montería.
            Soporte a domicilio 24/7 con diagnóstico gratuito. Más de 8 años de experiencia.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold">
              📞 +57 300 847 4121
            </span>
            <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold">
              🏠 Servicio a Domicilio
            </span>
            <span className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-semibold">
              🔍 Diagnóstico GRATIS
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mainServices.map((servicio) => (
            <div
              key={servicio.href}
              className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 border border-gray-100"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-3">{servicio.title}</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">{servicio.description}</p>
              <Link
                href={servicio.href}
                className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold transition-colors duration-200"
              >
                Ver detalles →
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-blue-600 text-white rounded-xl p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">¿Necesitas Ayuda Técnica Inmediata?</h2>
          <p className="text-xl mb-6">
            Contáctanos ahora para recibir soporte técnico especializado en Montería
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="tel:+573008474121"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors duration-200"
            >
              📞 Llamar Ahora
            </Link>
            <Link
              href="https://wa.me/573008474121"
              className="bg-green-500 text-white px-8 py-3 rounded-lg font-bold hover:bg-green-600 transition-colors duration-200"
            >
              💬 WhatsApp
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
