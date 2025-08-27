import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '5 Señales de que tu PC Necesita Servicio Técnico en Córdoba | Fernando Técnico',
  description: 'Identifica las señales tempranas de que tu computador necesita reparación en Córdoba. Guía completa con soluciones y cuándo llamar a un técnico profesional.',
  keywords: 'señales pc dañado córdoba, computador lento montería, reparación pc córdoba, servicio técnico computadores montería',
  openGraph: {
    title: '5 Señales de que tu PC Necesita Servicio Técnico en Córdoba',
    description: 'Identifica las señales tempranas de que tu computador necesita reparación en Córdoba.',
    url: 'https://www.ferchotecnico.com/blog/senales-pc-necesita-servicio-tecnico-cordoba',
    type: 'article'
  }
};

export default function SenalesPCNecesitaServicio() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <article className="prose prose-lg mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">
            5 Señales de que tu PC Necesita Servicio Técnico en Córdoba
          </h1>
          <div className="flex items-center gap-4 text-gray-600 mb-6">
            <span>Por Fernando - Técnico Especialista</span>
            <span>•</span>
            <time dateTime="2025-01-01">Enero 2025</time>
            <span>•</span>
            <span>8 min de lectura</span>
          </div>
          <p className="text-xl text-gray-700 leading-relaxed">
            ¿Tu computador está actuando extraño? En el clima de Córdoba, los equipos enfrentan desafíos únicos. 
            Aprende a identificar las señales tempranas que indican que necesitas servicio técnico profesional.
          </p>
        </header>

        <section className="mb-8">
          <h2 className="text-3xl font-semibold mb-4">🚨 Señal #1: Lentitud Extrema y Cuelgues Frecuentes</h2>
          <div className="bg-red-50 p-6 rounded-lg mb-4">
            <h3 className="text-xl font-semibold mb-3 text-red-800">Síntomas:</h3>
            <ul className="space-y-2">
              <li>• El computador tarda más de 5 minutos en encender</li>
              <li>• Los programas se &quot;cuelgan&quot; constantemente</li>
              <li>• El cursor se queda &quot;pensando&quot; por largos períodos</li>
              <li>• Múltiples ventanas de &quot;No responde&quot;</li>
            </ul>
          </div>
          <p><strong>Posibles causas en Córdoba:</strong></p>
          <ul className="list-disc pl-6 mb-4">
            <li>Sobrecalentamiento por altas temperaturas (35°C+)</li>
            <li>Acumulación de polvo en ventiladores</li>
            <li>Disco duro fragmentado o dañado</li>
            <li>Memoria RAM insuficiente o defectuosa</li>
            <li>Virus o malware</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-3xl font-semibold mb-4">🔥 Señal #2: Sobrecalentamiento Constante</h2>
          <div className="bg-orange-50 p-6 rounded-lg mb-4">
            <h3 className="text-xl font-semibold mb-3 text-orange-800">Síntomas:</h3>
            <ul className="space-y-2">
              <li>• El equipo está muy caliente al tacto</li>
              <li>• Ventiladores funcionan a máxima velocidad constantemente</li>
              <li>• Apagados inesperados por temperatura</li>
              <li>• Rendimiento reducido automáticamente</li>
            </ul>
          </div>
          <div className="bg-yellow-100 p-4 rounded-lg mb-4">
            <p><strong>⚠️ Importante:</strong> En Montería, las temperaturas ambientales de 35°C+ hacen que el sobrecalentamiento sea un problema crítico que puede dañar permanentemente tu equipo.</p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-3xl font-semibold mb-4">💙 Señal #3: Pantalla Azul de la Muerte (BSOD)</h2>
          <div className="bg-blue-50 p-6 rounded-lg mb-4">
            <h3 className="text-xl font-semibold mb-3 text-blue-800">¿Qué es?</h3>
            <p>La temida pantalla azul con texto blanco que aparece cuando Windows detecta un error crítico del sistema.</p>
          </div>
          <p><strong>Códigos de error comunes en Córdoba:</strong></p>
          <ul className="list-disc pl-6 mb-4">
            <li><code>MEMORY_MANAGEMENT</code> - Problemas de RAM por humedad</li>
            <li><code>SYSTEM_THREAD_EXCEPTION</code> - Drivers desactualizados</li>
            <li><code>KERNEL_SECURITY_CHECK_FAILURE</code> - Corrupción del sistema</li>
            <li><code>CRITICAL_PROCESS_DIED</code> - Falla crítica del sistema</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-3xl font-semibold mb-4">🔊 Señal #4: Ruidos Extraños y Anormales</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-red-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-red-800 mb-2">🚨 Ruidos Críticos</h3>
              <ul className="text-sm space-y-1">
                <li>• <strong>Clic-clic repetitivo:</strong> Disco duro fallando</li>
                <li>• <strong>Chirridos agudos:</strong> Ventilador dañado</li>
                <li>• <strong>Zumbido eléctrico:</strong> Fuente de poder</li>
                <li>• <strong>Golpeteo:</strong> Componente suelto</li>
              </ul>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-yellow-800 mb-2">⚠️ Ruidos de Advertencia</h3>
              <ul className="text-sm space-y-1">
                <li>• <strong>Ventiladores más ruidosos:</strong> Polvo acumulado</li>
                <li>• <strong>Vibración excesiva:</strong> Montaje suelto</li>
                <li>• <strong>Silbidos leves:</strong> Flujo de aire obstruido</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-3xl font-semibold mb-4">⚡ Señal #5: Problemas Eléctricos y de Encendido</h2>
          <div className="bg-purple-50 p-6 rounded-lg mb-4">
            <h3 className="text-xl font-semibold mb-3 text-purple-800">Síntomas Eléctricos:</h3>
            <ul className="space-y-2">
              <li>• No enciende al presionar el botón de poder</li>
              <li>• Enciende pero no hay imagen en pantalla</li>
              <li>• Se apaga solo después de unos minutos</li>
              <li>• Luces LED parpadean de forma extraña</li>
              <li>• Olor a quemado o componentes</li>
            </ul>
          </div>
          <p><strong>Factores de riesgo en Córdoba:</strong></p>
          <ul className="list-disc pl-6 mb-4">
            <li>Fluctuaciones de voltaje frecuentes</li>
            <li>Cortes de luz repentinos</li>
            <li>Alta humedad que afecta circuitos</li>
            <li>Sobretensiones por tormentas eléctricas</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-3xl font-semibold mb-4">🛠️ ¿Qué Hacer Cuando Aparecen Estas Señales?</h2>
          <div className="space-y-6">
            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="text-xl font-semibold mb-2">Acciones Inmediatas</h3>
              <ul className="space-y-1">
                <li>• Apaga el equipo inmediatamente si hay sobrecalentamiento</li>
                <li>• Respalda tus datos importantes urgentemente</li>
                <li>• No intentes &quot;arreglos caseros&quot; complicados</li>
                <li>• Documenta los errores y síntomas</li>
              </ul>
            </div>
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="text-xl font-semibold mb-2">Cuándo Llamar a un Profesional</h3>
              <ul className="space-y-1">
                <li>• Múltiples síntomas simultáneos</li>
                <li>• Problemas que empeoran rápidamente</li>
                <li>• Datos importantes en riesgo</li>
                <li>• Falta de conocimiento técnico</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-3xl font-semibold mb-4">💰 Costos de Ignorar Estas Señales</h2>
          <div className="bg-red-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4 text-red-800">Consecuencias Financieras:</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">Reparación Temprana:</h4>
                <ul className="text-sm space-y-1">
                  <li>• Limpieza y mantenimiento: $25.000-40.000</li>
                  <li>• Cambio de pasta térmica: $15.000</li>
                  <li>• Optimización software: $20.000</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Reparación Tardía:</h4>
                <ul className="text-sm space-y-1">
                  <li>• Cambio de disco duro: $150.000-300.000</li>
                  <li>• Reemplazo de motherboard: $200.000-500.000</li>
                  <li>• Recuperación de datos: $80.000-200.000</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-3xl font-semibold mb-4">🎯 Prevención: La Mejor Estrategia</h2>
          <div className="bg-green-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Plan de Mantenimiento para Córdoba:</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <h4 className="font-semibold mb-2">Mensual</h4>
                <ul className="text-sm space-y-1">
                  <li>• Limpieza externa</li>
                  <li>• Verificar temperaturas</li>
                  <li>• Actualizar antivirus</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Trimestral</h4>
                <ul className="text-sm space-y-1">
                  <li>• Limpieza interna básica</li>
                  <li>• Desfragmentación</li>
                  <li>• Actualizar drivers</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Semestral</h4>
                <ul className="text-sm space-y-1">
                  <li>• Mantenimiento profesional</li>
                  <li>• Cambio pasta térmica</li>
                  <li>• Diagnóstico completo</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-8 bg-blue-50 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">🔧 ¿Tu PC Presenta Estas Señales?</h2>
          <p className="mb-4">
            No esperes a que sea demasiado tarde. Con más de 10 años de experiencia atendiendo equipos en Montería y Córdoba, 
            puedo diagnosticar y solucionar estos problemas antes de que se conviertan en reparaciones costosas.
          </p>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="bg-white p-4 rounded-lg">
              <h3 className="font-semibold mb-2">✅ Diagnóstico Gratuito</h3>
              <p className="text-sm">Evaluación completa sin costo</p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <h3 className="font-semibold mb-2">🏠 Servicio a Domicilio</h3>
              <p className="text-sm">Atención en tu hogar u oficina</p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <h3 className="font-semibold mb-2">⭐ 5.0 Estrellas</h3>
              <p className="text-sm">92+ clientes satisfechos</p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <h3 className="font-semibold mb-2">🛡️ Garantía 30 Días</h3>
              <p className="text-sm">Respaldo en todos los servicios</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href="https://wa.me/573008474121?text=Hola, mi PC presenta señales de problemas y necesito diagnóstico" 
              className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors text-center"
              target="_blank" 
              rel="noopener noreferrer"
            >
              💬 Diagnóstico por WhatsApp
            </a>
            <a 
              href="tel:+573008474121" 
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-center"
            >
              📞 Llamar Ahora
            </a>
          </div>
        </section>

        <footer className="border-t pt-6 mt-8">
          <div className="flex justify-between items-center">
            <Link href="/blog" className="text-blue-600 hover:underline">
              ← Volver al Blog
            </Link>
            <div className="text-sm text-gray-600">
              Compartir: 
              <a href="#" className="ml-2 text-blue-600">Facebook</a>
              <a href="#" className="ml-2 text-blue-600">Twitter</a>
              <a href="#" className="ml-2 text-blue-600">WhatsApp</a>
            </div>
          </div>
        </footer>
      </article>
    </div>
  );
}
