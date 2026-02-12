import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Soporte Técnico Computadores Montería ⭐ | Asistencia PC Profesional',
  description:
    '⭐ Soporte técnico computadores Montería especializado. Asistencia remota y en taller, resolución problemas PC, instalación software. Técnico certificado +8 años experiencia 📱',
  keywords: [
    'soporte técnico computadores montería',
    'soporte tecnico computadores monteria',
    'asistencia técnica pc montería',
    'soporte informático montería',
    'ayuda técnica computadores montería',
    'soporte pc montería',
    'técnico soporte montería',
    'asistencia computador montería',
    'soporte técnico taller montería',
    'ayuda pc montería',
    'soporte técnico remoto montería',
    'técnico asistencia montería',
    'soporte computadores montería profesional',
    'ayuda técnica pc montería urgente',
  ].join(', '),
  alternates: {
    canonical: 'https://www.ferchotecnico.com/soporte-tecnico-computadores-monteria',
  },
  openGraph: {
    title: '🛠️ Soporte Técnico Computadores Montería | Fernando ⭐ 5.0',
    description:
      '⭐ Soporte técnico computadores Montería profesional. Asistencia remota y en taller. Resolvemos cualquier problema PC 📱 +573008474121',
    url: 'https://www.ferchotecnico.com/soporte-tecnico-computadores-monteria',
    type: 'website',
  },
};

export default function SoporteTecnicoComputadoresMonteria() {
  const serviciosSoporte = [
    {
      icon: '🔧',
      titulo: 'Soporte Técnico Remoto',
      descripcion: 'Resolución de problemas desde cualquier lugar mediante conexión segura',
    },
    {
      icon: '📍',
      titulo: 'Atención en Taller',
      descripcion: 'Trae tu equipo al taller para diagnóstico y reparación',
    },
    {
      icon: '💻',
      titulo: 'Instalación de Software',
      descripcion: 'Instalación y configuración de programas, antivirus y herramientas',
    },
    {
      icon: '🛡️',
      titulo: 'Limpieza y Optimización',
      descripcion: 'Limpieza de virus, optimización del sistema y mejora de rendimiento',
    },
    {
      icon: '🔄',
      titulo: 'Actualizaciones y Mantenimiento',
      descripcion: 'Actualización de sistema operativo y programas de seguridad',
    },
    {
      icon: '📞',
      titulo: 'Soporte Telefónico',
      descripcion: 'Asistencia técnica por teléfono para consultas rápidas',
    },
  ];

  const problemasComunes = [
    'Computador lento o con rendimiento bajo',
    'Errores del sistema operativo Windows',
    'Problemas de conexión a internet',
    'Virus y malware detectados',
    'Programas que no responden',
    'Pantalla azul o errores críticos',
    'Problemas de impresión',
    'Configuración de redes WiFi',
    'Actualizaciones pendientes',
    'Archivos corruptos o perdidos',
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                🛠️ Soporte Técnico
                <span className="block text-yellow-300">Computadores Montería</span>
              </h1>
              <p className="text-xl mb-8 leading-relaxed">
                Soporte técnico computadores Montería especializado con más de 8 años de
                experiencia. Asistencia remota y en taller para resolver cualquier problema con tu
                PC. Horario: Lun-Vie 8AM-6PM, Sáb 8AM-2PM.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="tel:+573008474121"
                  className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors duration-200 text-center"
                >
                  📞 Soporte Ahora
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
                alt="Soporte técnico computadores Montería"
                width={600}
                height={400}
                className="rounded-xl shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Servicios de Soporte */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            Tipos de Soporte Técnico Disponibles
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {serviciosSoporte.map((servicio, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="text-4xl mb-4">{servicio.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{servicio.titulo}</h3>
                <p className="text-gray-600">{servicio.descripcion}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problemas Comunes */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              Problemas que Resolvemos
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Como soporte técnico computadores Montería, resolvemos los problemas más comunes que
              afectan el rendimiento de tu PC
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {problemasComunes.map((problema, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-center gap-3">
                  <span className="text-red-500">⚠️</span>
                  <span className="text-gray-700">{problema}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Precios y Disponibilidad */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900">
                Soporte Técnico Computadores Montería - Precios Transparentes
              </h2>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="bg-green-100 p-3 rounded-full">
                    <span className="text-2xl">⏰</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Horario de Atención</h3>
                    <p className="text-gray-600">
                      Lun-Vie 8AM-6PM, Sáb 8AM-2PM. Contacta por WhatsApp para agendar
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <span className="text-2xl">📍</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Atención en Taller</h3>
                    <p className="text-gray-600">
                      Trae tu equipo al taller en Montería para diagnóstico gratuito
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-yellow-100 p-3 rounded-full">
                    <span className="text-2xl">⭐</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Garantía de Servicio</h3>
                    <p className="text-gray-600">
                      30 días de garantía en todos nuestros servicios técnicos
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2">
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h3 className="text-2xl font-bold mb-6 text-center text-gray-900">
                  💰 Precios de Soporte Técnico
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b pb-2">
                    <span>Soporte Remoto Básico</span>
                    <span className="font-bold text-green-600">GRATIS (primer consulta)</span>
                  </div>
                  <div className="flex justify-between items-center border-b pb-2">
                    <span>Soporte Remoto Avanzado</span>
                    <span className="font-bold">Desde $30.000</span>
                  </div>
                  <div className="flex justify-between items-center border-b pb-2">
                    <span>Soporte en Taller</span>
                    <span className="font-bold">Desde $50.000</span>
                  </div>
                  <div className="flex justify-between items-center border-b pb-2">
                    <span>Mantenimiento Completo</span>
                    <span className="font-bold">Desde $80.000</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Soporte Empresarial</span>
                    <span className="font-bold text-blue-600">Cotización personalizada</span>
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
            ¿Necesitas Soporte Técnico Computadores Montería?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Contacta ahora para recibir soporte técnico especializado. Resolvemos tu problema de PC
            de manera rápida y profesional.
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
              💬 WhatsApp de Emergencia
            </Link>
          </div>
          <p className="mt-6 text-blue-200">
            <Link href="/" className="hover:text-white transition-colors">
              ← Volver al inicio
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
