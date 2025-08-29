import Link from 'next/link';
import Navbar from '@/components/Navbar';

export default function EnConstruccionPage() {
  return (
    <>
      <Navbar />
      <main className="hero construccion-hero" aria-labelledby="construccion-title">
        <div className="container">
          <div className="hero__content hero__layout">
            <div className="hero__copy">
              <div className="badge">Próximamente</div>
              <h1 id="construccion-title" className="hero__title">Estamos construyendo algo increíble</h1>
              <p className="hero__subtitle">Nuestro equipo está trabajando para traerte una experiencia excepcional. Esta sección estará disponible pronto con contenido especializado.</p>

              <div className="hero__actions" style={{marginTop: '24px'}}>
                <Link href="/" className="btn btn--primary">
                  <span className="btn__icon">🏠</span>
                  <span>Volver al Inicio</span>
                </Link>

                <a href="http://wa.link/n8et4q" target="_blank" rel="noopener noreferrer" className="btn btn--whatsapp">
                  <span className="btn__icon">📱</span>
                  <span>Contactar por WhatsApp</span>
                </a>
              </div>

              <div className="construccion-meta" style={{marginTop: '28px'}}>
                <div className="construccion-progress" aria-hidden>
                  <div className="construccion-progress-label">
                    <span>Progreso</span>
                    <strong>75%</strong>
                  </div>
                  <div className="construccion-progress-bar" style={{height: '8px', background: 'rgba(255,255,255,0.08)', borderRadius: '999px', overflow: 'hidden'}}>
                    <div style={{width: '75%', height: '100%', background: 'linear-gradient(90deg,#64ffda,#00bcd4)'}}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="hero__media" aria-hidden>
              <div className="construccion-visual" style={{width: 420, height: 300, margin: '0 auto', borderRadius: 20, background: 'linear-gradient(135deg,#ffffff08,#ffffff03)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <div style={{fontSize: 64}}>🛠️</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
