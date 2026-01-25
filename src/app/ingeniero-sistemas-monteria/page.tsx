import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Ingeniero de Sistemas Montería ⭐ | Consultoría IT y Desarrollo de Software',
  description:
    '⭐ Ingeniero de sistemas Montería especializado en consultoría IT, desarrollo de software, soporte técnico y soluciones tecnológicas. Más de 8 años de experiencia en Córdoba 📱',
  keywords: [
    'ingeniero de sistemas montería',
    'ingeniero sistemas montería',
    'consultor it montería',
    'desarrollo software montería',
    'consultoría tecnológica montería',
    'ingeniero informático montería',
    'especialista sistemas montería',
    'programador montería',
    'desarrollador software montería',
    'consultor informático montería',
    'ingeniero de sistemas córdoba',
    'consultoría it montería',
    'desarrollo aplicaciones montería',
    'ingeniero sistemas montería colombia',
  ].join(', '),
  alternates: {
    canonical: 'https://www.ferchotecnico.com/ingeniero-sistemas-monteria',
  },
  openGraph: {
    title: '🔧 Ingeniero de Sistemas Montería | Fernando - Consultor IT ⭐',
    description:
      '⭐ Ingeniero de sistemas Montería con 8+ años experiencia. Consultoría IT, desarrollo software, soporte técnico especializado 📱 +573008474121',
    url: 'https://www.ferchotecnico.com/ingeniero-sistemas-monteria',
    type: 'website',
  },
};

export default function IngenieroSistemasMonteria() {
  const servicios = [
    {
      icon: '💻',
      titulo: 'Consultoría IT',
      descripcion:
        'Asesoría especializada en infraestructura tecnológica, migración a la nube y optimización de sistemas',
    },
    {
      icon: '⚙️',
      titulo: 'Desarrollo de Software',
      descripcion:
        'Creación de aplicaciones personalizadas, sistemas web y soluciones empresariales',
    },
    {
      icon: '🔧',
      titulo: 'Soporte Técnico Avanzado',
      descripcion: 'Resolución de problemas complejos de hardware, software y redes',
    },
    {
      icon: '📊',
      titulo: 'Análisis de Sistemas',
      descripcion: 'Evaluación y optimización de procesos tecnológicos empresariales',
    },
    {
      icon: '🛡️',
      titulo: 'Seguridad Informática',
      descripcion: 'Implementación de medidas de ciberseguridad y protección de datos',
    },
    {
      icon: '☁️',
      titulo: 'Migración a la Nube',
      descripcion: 'Transición segura a servicios cloud y optimización de recursos',
    },
  ];

  const tecnologias = [
    'Desarrollo Web (React, Next.js, Node.js)',
    'Bases de Datos (MySQL, PostgreSQL, MongoDB)',
    'Lenguajes (JavaScript, Python, PHP, Java)',
    'Cloud Computing (AWS, Azure, Google Cloud)',
    'DevOps (Docker, Kubernetes, CI/CD)',
    'Ciberseguridad (Firewalls, Antivirus, VPN)',
    'Redes (Cisco, Mikrotik, configuración avanzada)',
    'Sistemas Operativos (Windows Server, Linux, macOS)',
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                🔧 Ingeniero de Sistemas
                <span className="block text-yellow-300">Montería, Córdoba</span>
              </h1>
              <p className="text-xl mb-8 leading-relaxed">
                Ingeniero de sistemas Montería con más de 8 años de experiencia en consultoría IT,
                desarrollo de software y soporte técnico especializado. Soluciones tecnológicas
                integrales para empresas y particulares.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="tel:+573008474121"
                  className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors duration-200 text-center"
                >
                  📞 Consultar Ahora
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
                alt="Ingeniero de sistemas Montería - Consultoría IT"
                width={600}
                height={400}
                className="rounded-xl shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Servicios */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            Servicios de Ingeniería de Sistemas
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicios.map((servicio, index) => (
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

      {/* Tecnologías */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              Tecnologías y Especialidades
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Como ingeniero de sistemas Montería, domino las tecnologías más actuales para ofrecer
              soluciones completas
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tecnologias.map((tech, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <span className="text-blue-600 font-semibold">{tech}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experiencia */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900">
                +8 Años de Experiencia en Ingeniería de Sistemas
              </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <span className="text-2xl">🎓</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Formación Académica</h3>
                    <p className="text-gray-600">
                      Ingeniero de Sistemas graduado con especialización en Tecnologías de
                      Información
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-green-100 p-3 rounded-full">
                    <span className="text-2xl">💼</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Experiencia Profesional</h3>
                    <p className="text-gray-600">
                      Más de 8 años desarrollando soluciones tecnológicas para empresas en Córdoba
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-yellow-100 p-3 rounded-full">
                    <span className="text-2xl">🏆</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Certificaciones</h3>
                    <p className="text-gray-600">
                      Certificado en ciberseguridad, cloud computing y desarrollo de software
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2">
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h3 className="text-2xl font-bold mb-6 text-center text-gray-900">
                  ¿Necesitas un Ingeniero de Sistemas?
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b pb-2">
                    <span>Consultoría IT</span>
                    <span className="font-bold text-blue-600">Desde $80.000</span>
                  </div>
                  <div className="flex justify-between items-center border-b pb-2">
                    <span>Desarrollo Software</span>
                    <span className="font-bold text-blue-600">Desde $150.000</span>
                  </div>
                  <div className="flex justify-between items-center border-b pb-2">
                    <span>Soporte Técnico</span>
                    <span className="font-bold text-blue-600">Desde $50.000</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Mantenimiento Sistemas</span>
                    <span className="font-bold text-blue-600">Desde $100.000</span>
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
            ¿Buscas un Ingeniero de Sistemas en Montería?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Contacta ahora para consultoría IT especializada, desarrollo de software o soporte
            técnico avanzado.
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
              💬 WhatsApp
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
