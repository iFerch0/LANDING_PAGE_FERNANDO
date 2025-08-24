import React from 'react';

export default function Footer() {
  return (
    <footer className="site-footer footer">
      <div className="footer__container">
        <div className="footer__col footer__col--info">
          <h3 className="footer__title">Fernando - Técnico en Computadores</h3>
          <address className="footer__text">
            Servicio de reparación de computadoras en Montería<br />
            <strong>Dg. 7 #7 - 50</strong><br />
            Montería, Córdoba, Colombia
          </address>

          <div className="footer__contact">
            <a className="footer__phone" href="tel:+573008474121">+57 300 847 4121</a>
            <a className="btn btn--whatsapp btn--sm footer__whatsapp" href="https://api.whatsapp.com/send?phone=573008474121&text=Buenas%20%F0%9F%98%80">Enviar WhatsApp</a>
          </div>
        </div>

        <div className="footer__col footer__col--hours">
          <h4 className="footer__subtitle">Horario</h4>
          <table className="footer__hours">
            <tbody>
              <tr><td>Domingo</td><td>9:00–18:00</td></tr>
              <tr><td>Lunes</td><td>9:00–18:00</td></tr>
              <tr><td>Martes</td><td>9:00–18:00</td></tr>
              <tr><td>Miércoles</td><td>9:00–18:00</td></tr>
              <tr><td>Jueves</td><td>9:00–18:00</td></tr>
              <tr><td>Viernes</td><td>9:00–18:00</td></tr>
              <tr><td>Sábado</td><td>9:00–18:00</td></tr>
            </tbody>
          </table>
        </div>

        <div className="footer__col footer__col--map">
          <h4 className="footer__subtitle">Ubicación</h4>
          <div className="footer__map">
            <iframe
              title="Ubicación FerchoTecnico"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.000000000000!2d-75.8895!3d8.7478!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zODfCsDQ0JzU2LjgiTiA3NcKwNTMnMDkuNiJX!5e0!3m2!1ses!2sco!4v0000000000000"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <p className="footer__map-link">
            <a href="https://maps.google.com/?q=Dg.+7+%237+-+50,+Monter%C3%ADa">Ver en Google Maps</a>
          </p>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="footer__copyright">© {new Date().getFullYear()} Fernando - Técnico en Computadores</div>

        <div className="footer__socials" aria-label="Redes sociales">
          <a href="https://www.facebook.com/iFernandoR/" target="_blank" rel="noopener noreferrer" aria-label="Facebook de Fernando">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M22 12.07C22 6.48 17.52 2 11.93 2S2 6.48 2 12.07C2 17.09 5.66 21.2 10.44 22v-7.02H7.9v-2.9h2.54V9.41c0-2.5 1.49-3.88 3.77-3.88 1.09 0 2.23.2 2.23.2v2.46h-1.25c-1.23 0-1.61.77-1.61 1.56v1.88h2.74l-.44 2.9h-2.3V22C18.34 21.2 22 17.09 22 12.07z" fill="currentColor"/>
            </svg>
          </a>

          <a href="https://www.instagram.com/iFerch0/" target="_blank" rel="noopener noreferrer" aria-label="Instagram de Fernando">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 6.5a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm4.8-2.2a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" fill="currentColor"/>
            </svg>
          </a>

          <a href="https://www.linkedin.com/in/iFerch0/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn de Fernando">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M4.98 3.5C4.98 4.88 3.9 6 2.5 6S0 4.88 0 3.5 1.08 1 2.5 1 4.98 2.12 4.98 3.5zM.22 8.98h4.56V24H.22V8.98zM8.97 8.98h4.38v2.05h.06c.61-1.16 2.1-2.38 4.33-2.38C23.74 8.65 24 12 24 16.02V24h-4.56v-7.21c0-1.72-.03-3.93-2.4-3.93-2.4 0-2.77 1.88-2.77 3.81V24H8.97V8.98z" fill="currentColor"/>
            </svg>
          </a>
        </div>

        <div className="footer__privacy"><a href="/privacy">Política de privacidad</a></div>
      </div>
    </footer>
  );
}
