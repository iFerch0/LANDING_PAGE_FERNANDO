import FaqJsonLd from '@/components/FaqJsonLd';
import Navbar from '@/components/Navbar';
import CtaFinal from '@/components/CtaFinal';
import ContactForm from '@/components/ContactForm';
import SliderSimple from '@/components/SliderSimple';

export default function MantenimientoDomesticoCorporativoPage() {
  return (
    <>
      <FaqJsonLd />
      <Navbar />
      <main>
        {/* Hero profesional específico para este servicio */}
        <section className="hero service-hero" aria-labelledby="mantenimiento-title">
          <div className="container">
            <div className="hero__content hero__layout">
              <div className="hero__copy">
                <span className="eyebrow">Servicio</span>
                <h1 id="mantenimiento-title" className="hero__title">Mantenimiento y reparación de computadores — Hogar y oficina</h1>
                <p className="hero__subtitle">Servicios profesionales en Montería: diagnóstico, limpieza, actualizaciones y soporte con garantía.</p>

                <ul className="service-features" aria-hidden>
                  <li>🔍 Diagnóstico completo</li>
                  <li>🧹 Limpieza interna y optimización</li>
                  <li>⚙️ Actualizaciones y reparación</li>
                </ul>

                <div className="hero__stats" aria-hidden>
                  <div className="stat">📈 <strong>75%</strong> equipos optimizados</div>
                  <div className="stat">🕒 <strong>10+</strong> años de experiencia</div>
                  <div className="stat">🛡️ <strong>30 días</strong> garantía</div>
                </div>

                <div className="hero__actions">
                  <a href="http://wa.link/n8et4q" target="_blank" rel="noopener noreferrer" className="btn btn--whatsapp cta-pulse">
                    <span className="btn__icon">📱</span>
                    <span>Contactar por WhatsApp</span>
                  </a>

                  <a href="#servicios-list" className="btn btn--call">
                    <span className="btn__icon">🛠️</span>
                    <span>Ver Servicios</span>
                  </a>
                </div>
              </div>

              <div className="hero__media" data-aos="zoom-in" aria-hidden>
                <div style={{position: 'relative', width: 680, height: 480}}>
                  <SliderSimple images={[
                    '/img/pc-hogar-oficina/1.jpg',
                    '/img/pc-hogar-oficina/2.jpg',
                    '/img/pc-hogar-oficina/3.JPG',
                    '/img/pc-hogar-oficina/4.JPG',
                    '/img/pc-hogar-oficina/5.JPG',
                  ]} height={480} />

                  <div className="service-card" aria-hidden>
                    <div className="service-card__title">Diagnóstico Gratis</div>
                    <div className="service-card__list">Garantía 30 días · Soporte remoto</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Servicios listados con iconos */}
        <section id="servicios-list" className="container" style={{paddingTop: '48px'}}>
          <h2 className="section-title">Nuestros Servicios</h2>
          <div className="grid grid--3" data-aos="fade-up" style={{gap: '20px', marginTop: '20px'}}>
            <article className="card">
              <div className="card__icon">🔍</div>
              <h3>Mantenimiento Preventivo</h3>
              <p>Revisión, limpieza interna, optimización de sistema y verificación de componentes para evitar fallas.</p>
            </article>

            <article className="card">
              <div className="card__icon">🛠️</div>
              <h3>Mantenimiento Correctivo</h3>
              <p>Diagnóstico y reparación de fallas de hardware y software para devolver funcionalidad a su equipo.</p>
            </article>

            <article className="card">
              <div className="card__icon">💾</div>
              <h3>Instalación y Configuración de Software</h3>
              <p>Instalación de sistemas operativos, drivers, antivirus y software necesario para su operación.</p>
            </article>

            <article className="card">
              <div className="card__icon">⚙️</div>
              <h3>Actualizaciones de Hardware</h3>
              <p>Mejoras de RAM, almacenamiento y componentes para aumentar rendimiento.</p>
            </article>

            <article className="card">
              <div className="card__icon">🛒</div>
              <h3>Venta de Suministros</h3>
              <p>Piezas, accesorios y consumibles originales y compatibles.</p>
            </article>

            <article className="card">
              <div className="card__icon">🌐</div>
              <h3>Soporte Remoto</h3>
              <p>Asistencia a distancia para solucionar problemas de forma rápida y efectiva.</p>
            </article>
          </div>
        </section>

        {/* Galería rápida */}
        <section className="container" style={{paddingTop: '40px'}}>
          <h2 className="section-title">Galería</h2>
          <div className="grid grid--3" style={{gap: '12px', marginTop: '16px'}}>
            <img src="/illustration-hero.svg" alt="Ilustración mantenimiento" style={{width: '100%', borderRadius: 12}} />
            <img src="/hero-poster.png" alt="Técnico trabajando" style={{width: '100%', borderRadius: 12}} />
            <img src="/logo.png" alt="Logo" style={{width: '100%', borderRadius: 12, background: '#fff', padding: 12}} />
          </div>
        </section>

        {/* Beneficios */}
        <section className="container" style={{paddingTop: '40px'}}>
          <h2 className="section-title">Por qué elegirnos</h2>
          <ul className="list list--icons" style={{marginTop: '18px'}}>
            <li>✅ Técnicos certificados y experiencia comprobada</li>
            <li>✅ Diagnóstico gratuito y presupuesto claro</li>
            <li>✅ Garantía en las reparaciones</li>
            <li>✅ Servicio a domicilio y para empresas</li>
          </ul>
        </section>

        {/* CTA final y contacto */}
        <div data-aos="zoom-in-up" style={{marginTop: '48px'}}>
          <CtaFinal />
        </div>

        <div data-aos="fade-up" style={{marginTop: '24px'}}>
          <ContactForm />
        </div>
      </main>
    </>
  );
}
