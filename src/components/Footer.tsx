import React from 'react';
import styles from './Footer.module.css';
import { FacebookIcon, InstagramIcon, LinkedInIcon, WhatsAppIcon } from './Icons';
import {
  PHONE_DISPLAY,
  PHONE_TEL,
  ADDRESS,
  WA_SHORT_LINK,
  FACEBOOK_URL,
  INSTAGRAM_URL,
  LINKEDIN_URL,
  BUSINESS_HOURS,
} from '@/constants/contact';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.main}>
        <div className="container">
          <div className={styles.grid}>
            {/* Brand Section */}
            <div className={styles.brand}>
              <div className={styles.brandHeader}>
                <div className={styles.brandIcon}>
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                    <line x1="8" y1="21" x2="16" y2="21" />
                    <line x1="12" y1="17" x2="12" y2="21" />
                  </svg>
                </div>
                <div>
                  <h3 className={styles.brandTitle}>Fernando Rhenals</h3>
                  <p className={styles.brandSubtitle}>Ingeniero de Sistemas</p>
                </div>
              </div>

              <p className={styles.brandDescription}>
                Soluciones tecnológicas confiables en Montería. Tu computador en las mejores manos.
              </p>

              <div className={styles.socialLinks}>
                <a
                  href={FACEBOOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className={styles.socialLink}
                >
                  <FacebookIcon size={18} />
                </a>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className={styles.socialLink}
                >
                  <InstagramIcon size={18} />
                </a>
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className={styles.socialLink}
                >
                  <LinkedInIcon size={18} />
                </a>
                <a
                  href={WA_SHORT_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className={`${styles.socialLink} ${styles.socialWhatsapp}`}
                >
                  <WhatsAppIcon size={18} />
                </a>
              </div>
            </div>

            {/* Contact Section */}
            <div className={styles.contact}>
              <h4 className={styles.sectionTitle}>Contacto</h4>

              <div className={styles.contactGrid}>
                <a href={PHONE_TEL} className={styles.contactItem}>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <span>{PHONE_DISPLAY}</span>
                </a>

                <a
                  href={WA_SHORT_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.contactItem} ${styles.whatsappItem}`}
                >
                  <WhatsAppIcon size={18} />
                  <span>WhatsApp</span>
                </a>

                <div className={styles.contactItem}>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span>{ADDRESS}</span>
                </div>
              </div>

              {/* Hours */}
              <div className={styles.hours}>
                <h5 className={styles.hoursTitle}>Horarios</h5>
                <div className={styles.hoursList}>
                  {BUSINESS_HOURS.map((schedule) => (
                    <div key={schedule.day} className={styles.hoursItem}>
                      <span className={styles.hoursDay}>{schedule.day}</span>
                      <span className={styles.hoursTime}>{schedule.hours}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Location Links */}
              <div className={styles.locationLinks}>
                <a
                  href="https://www.google.com/maps/search/Montería,+Córdoba,+Colombia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.locationLink}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15,3 21,3 21,9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                  Google Maps
                </a>
                <a
                  href="https://www.waze.com/ul?q=Montería%20Córdoba%20Colombia&navigate=yes"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.locationLink}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M3 11l19-9-9 19-2-8-8-2z" />
                  </svg>
                  Waze
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className={styles.bottom}>
        <div className="container">
          <div className={styles.bottomContent}>
            <p className={styles.copyright}>© {currentYear} Fernando Rhenals</p>
            <div className={styles.links}>
              <a href="#contacto" className={styles.link}>
                Contacto
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
