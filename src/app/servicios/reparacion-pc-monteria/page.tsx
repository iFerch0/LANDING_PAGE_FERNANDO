import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Reparación PC Montería ⭐ | Técnico Computadores a Domicilio 24/7',
  description: '⭐ Reparación PC y portátiles Montería. Diagnóstico GRATIS, servicio domicilio, garantía 30 días. Fernando - Técnico certificado +8 años experiencia 📱',
  keywords: [
    'reparación PC Montería',
    'reparación portátiles Montería', 
    'técnico PC Montería',
    'servicio técnico domicilio Montería',
    'arreglo computadores Montería',
    'reparación hardware Montería',
    'técnico computadores Córdoba',
    'reparación laptop Montería',
    'servicio PC urgente Montería',
    'diagnóstico computadores gratis',
    'reparación motherboard Montería',
    'cambio pantalla portátil',
    'actualización PC Montería'
  ].join(', '),
  alternates: {
    canonical: 'https://www.ferchotecnico.com/servicios/reparacion-pc-monteria'
  },
  openGraph: {
    title: '🔧 Reparación PC Montería | Fernando - Técnico Especialista ⭐',
    description: '⭐ Experto en reparación PC y portátiles Montería. Diagnóstico gratuito, servicio a domicilio 24/7. Garantía 30 días 📱 +573008474121',
    url: 'https://www.ferchotecnico.com/servicios/reparacion-pc-monteria',
    type: 'website'
  }
};

export default function ReparacionPC() {
  const problemas = [
    {
      icon: '💻',
      titulo: 'PC No Enciende',
      descripcion: 'Diagnóstico de fuente de poder, motherboard y componentes'
    },
    {
      icon: '🔥',
      titulo: 'Sobrecalentamiento',
      descripcion: 'Limpieza ventiladores, cambio pasta térmica, optimización'
    },
    {
      icon: '🐌',
      titulo: 'PC Lenta',
      descripcion: 'Optimización sistema, limpieza virus, actualización hardware'
    },
    {
      icon: '🖥️',
      titulo: 'Pantalla No Da Imagen',
      descripcion: 'Reparación tarjeta gráfica, cables, diagnóstico monitor'
    },
    {
      icon: '💾',
      titulo: 'Problemas Disco Duro',
      descripcion: 'Recuperación datos, clonado, instalación SSD'
    },
    {
      icon: '🔌',
      titulo: 'Problemas Eléctricos',
      descripcion: 'Reparación fuentes poder, reguladores, protección eléctrica'
    }
  ];

  const servicios = [
    '✅ Diagnóstico completo GRATUITO',
    '✅ Reparación hardware y software', 
    '✅ Actualización componentes (RAM, SSD, GPU)',
    '✅ Limpieza profunda y mantenimiento',
    '✅ Instalación Windows original',
    '✅ Recuperación de datos',
    '✅ Optimización rendimiento',
    '✅ Garantía 30 días en reparaciones'
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                🔧 Reparación PC y Portátiles
                <span className="block text-yellow-300">en Montería ⭐</span>
              </h1>
              <p className="text-xl mb-8 leading-relaxed">
                Técnico especialista con más de 8 años reparando computadores en Montería. 
                Diagnóstico GRATUITO, servicio a domicilio 24/7 y garantía de 30 días.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="tel:+573008474121"
                  className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors duration-200 text-center"
                >
                  📞 Llamar Ahora
                </Link>
                <Link 
                  href="https://wa.me/573008474121"
                  className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-bold text-lg transition-colors duration-200 text-center"
                >
                  💬 WhatsApp
                </Link>
              </div>
            </div>
            <div className="lg:w-1/2">
              <Image
                src="/hero-poster.jpg"
                alt="Reparación PC Montería - Técnico especialista"
                width={600}
                height={400}
                className="rounded-xl shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Problemas Comunes */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            Problemas Más Comunes que Reparamos
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {problemas.map((problema, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                <div className="text-4xl mb-4">{problema.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{problema.titulo}</h3>
                <p className="text-gray-600">{problema.descripcion}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Servicios Incluidos */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900">
                ¿Qué Incluye Nuestro Servicio?
              </h2>
              <div className="grid gap-4">
                {servicios.map((servicio, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <span className="text-lg">{servicio}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:w-1/2">
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h3 className="text-2xl font-bold mb-6 text-center text-gray-900">
                  💰 Precios Transparentes
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b pb-2">
                    <span>Diagnóstico</span>
                    <span className="font-bold text-green-600">GRATIS</span>
                  </div>
                  <div className="flex justify-between items-center border-b pb-2">
                    <span>Reparación básica</span>
                    <span className="font-bold">Desde $50.000</span>
                  </div>
                  <div className="flex justify-between items-center border-b pb-2">
                    <span>Mantenimiento completo</span>
                    <span className="font-bold">$80.000</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Servicio a domicilio</span>
                    <span className="font-bold text-blue-600">INCLUIDO</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            ¿Tu PC Tiene Problemas? ¡Lo Solucionamos Hoy!
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Contacta ahora para diagnóstico gratuito. Atendemos en toda Montería y municipios cercanos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="tel:+573008474121"
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors duration-200"
            >
              📞 +57 300 847 4121
            </Link>
            <Link 
              href="https://wa.me/573008474121"
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-bold text-lg transition-colors duration-200"
            >
              💬 Enviar WhatsApp
            </Link>
          </div>
          <p className="mt-6 text-blue-200">
            <Link href="/servicios" className="hover:text-white transition-colors">
              ← Ver todos los servicios técnicos
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
