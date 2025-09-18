import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const businessHours = [
    { day: "Lunes - Viernes", hours: "8:00 AM - 6:00 PM" },
    { day: "Sábados", hours: "9:00 AM - 4:00 PM" },
    { day: "Domingos", hours: "10:00 AM - 2:00 PM" }
  ];

  const services = [
    "Reparación de Computadores",
    "Mantenimiento Preventivo",
    "Instalación de Software",
    "Recuperación de Datos",
    "Optimización de Sistema"
  ];

  const contactInfo = {
    phone: "+57 300 847 4121",
    whatsapp: "573008474121",
    email: "info@fernandotecnico.com",
    address: "Dg. 7 #7 - 50, Montería, Córdoba"
  };

  return (
    <footer className="modern-footer">
      {/* Main Footer Content */}
      <div className="footer-main">
        <div className="container">
          <div className="footer-grid">
            
            {/* Company Info Section */}
            <div className="footer-section footer-brand" data-aos="fade-up" data-aos-delay="100">
              <div className="brand-header">
                <div className="brand-icon">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                    <line x1="8" y1="21" x2="16" y2="21"/>
                    <line x1="12" y1="17" x2="12" y2="21"/>
                  </svg>
                </div>
                <div>
                  <h3 className="brand-title">Fernando Rhenals</h3>
                  <p className="brand-subtitle">Ingeniero de Sistemas</p>
                </div>
              </div>
              
              <p className="brand-description">
                Más de 10 años de experiencia ofreciendo soluciones tecnológicas 
                confiables en Montería. Tu computador en las mejores manos profesionales.
              </p>
              
              <div className="certifications">
                <div className="cert-badge">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 12l2 2 4-4"/>
                    <circle cx="12" cy="12" r="9"/>
                  </svg>
                  <span>Técnico Certificado</span>
                </div>
                <div className="cert-badge">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                  <span>Garantía Extendida</span>
                </div>
              </div>
            </div>

            {/* Services Section */}
            <div className="footer-section" data-aos="fade-up" data-aos-delay="200">
              <h4 className="section-title">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                  <path d="M2 17l10 5 10-5"/>
                  <path d="M2 12l10 5 10-5"/>
                </svg>
                Nuestros Servicios
              </h4>
              <ul className="services-list">
                {services.map((service, index) => (
                  <li key={index} className="service-item">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="9,11 12,14 22,4"/>
                      <path d="M21,12v7a2,2 0 0,1 -2,2H5a2,2 0 0,1 -2,-2V5a2,2 0 0,1 2,-2h11"/>
                    </svg>
                    {service}
                  </li>
                ))}
              </ul>
              
              <div className="emergency-service">
                <div className="emergency-badge">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12,6 12,12 16,14"/>
                  </svg>
                  <div>
                    <strong>Servicio de Emergencia</strong>
                    <p>Disponible 24/7 para casos críticos</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact & Hours Section */}
            <div className="footer-section" data-aos="fade-up" data-aos-delay="300">
              <h4 className="section-title">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                Contacto
              </h4>
              
              <div className="contact-methods">
                <a href={`tel:${contactInfo.phone}`} className="contact-item contact-phone">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                  <div>
                    <span className="contact-label">Teléfono</span>
                    <span className="contact-value">{contactInfo.phone}</span>
                  </div>
                </a>

                <a 
                  href={`https://api.whatsapp.com/send?phone=${contactInfo.whatsapp}&text=🖥️ Hola Fernando! Necesito ayuda con mi computador`} 
                  className="contact-item contact-whatsapp"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.525 3.488"/>
                  </svg>
                  <div>
                    <span className="contact-label">WhatsApp</span>
                    <span className="contact-value">Mensaje Directo</span>
                  </div>
                </a>

                <div className="contact-item contact-address">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                  <div>
                    <span className="contact-label">Dirección</span>
                    <span className="contact-value">{contactInfo.address}</span>
                  </div>
                </div>
              </div>

              <div className="business-hours">
                <h5 className="hours-title">Horarios de Atención</h5>
                <div className="hours-list">
                  {businessHours.map((schedule, index) => (
                    <div key={index} className="hours-item">
                      <span className="hours-day">{schedule.day}</span>
                      <span className="hours-time">{schedule.hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Location Section */}
            <div className="footer-section" data-aos="fade-up" data-aos-delay="400">
              <h4 className="section-title">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                Nuestra Ubicación
              </h4>
            
              <div className="location-actions">
                <a 
                  href="https://maps.app.goo.gl/Conw4aWkYd7m1Pf79" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="location-link"
                  aria-label="Ver ubicación en Google Maps"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                    <polyline points="15,3 21,3 21,9"/>
                    <line x1="10" y1="14" x2="21" y2="3"/>
                  </svg>
                  Ver en Google Maps
                </a>
                
                <a 
                  href="https://www.waze.com/ul?q=Montería%20Córdoba%20Colombia&navigate=yes" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="location-link"
                  aria-label="Navegar a Montería con Waze"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 11l19-9-9 19-2-8-8-2z"/>
                  </svg>
                  Navegar con Waze
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-content">
            
            <div className="footer-left">
              <p className="copyright">
                © {currentYear} <strong>Fernando Ingeniero de Sistemas</strong>. Todos los derechos reservados.
              </p>
              <p className="legal-text">
                Ingeniero de sistemas certificado en desarrollo y soporte tecnológico
              </p>
            </div>

            <div className="footer-center">
              <div className="social-links">
                <a 
                  href="https://www.facebook.com/iFernandoR/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label="Síguenos en Facebook"
                  className="social-link social-facebook"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                
                <a 
                  href="https://www.instagram.com/iFerch0/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label="Síguenos en Instagram"
                  className="social-link social-instagram"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                
                <a 
                  href="https://www.linkedin.com/in/iFerch0/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label="Conecta en LinkedIn"
                  className="social-link social-linkedin"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>

                <a 
                  href={`https://api.whatsapp.com/send?phone=${contactInfo.whatsapp}&text=🖥️ Hola Fernando! Necesito ayuda con mi computador`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label="Contáctanos por WhatsApp"
                  className="social-link social-whatsapp"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.525 3.488"/>
                  </svg>
                </a>
              </div>
            </div>

            <div className="footer-right">
              <div className="footer-links">
                <a href="/privacy" className="footer-link">Política de Privacidad</a>
                <a href="/terms" className="footer-link">Términos de Servicio</a>
                <a href="https://maps.app.goo.gl/Conw4aWkYd7m1Pf79" target="_blank" rel="noopener noreferrer" className="footer-link">Mapa del Sitio</a>
              </div>
              
              <div className="certifications-mini">
                <div className="cert-mini">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                  <span>Servicio Garantizado</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
