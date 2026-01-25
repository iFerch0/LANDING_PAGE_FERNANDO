'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Navbar.module.css';

// Iconos SVG profesionales inline
const Icons = {
  home: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  services: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  ),
  process: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  cases: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  ),
  contact: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),
  whatsapp: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  ),
  star: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  chevronDown: (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  ),
  computer: (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  ),
  laptop: (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16" />
    </svg>
  ),
  shield: (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  zap: (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  database: (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </svg>
  ),
  shoppingBag: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  ),
};

// Datos de navegación
const navItems = [
  { id: 'inicio', label: 'Inicio', href: '/', icon: Icons.home },
  {
    id: 'servicios',
    label: 'Servicios',
    href: '#servicios',
    icon: Icons.services,
    hasDropdown: true,
  },
  { id: 'proceso', label: 'Proceso', href: '#proceso', icon: Icons.process },
  { id: 'casos', label: 'Casos', href: '#casos', icon: Icons.cases },
  { id: 'contacto', label: 'Contacto', href: '#contacto', icon: Icons.contact },
];

// Servicios del dropdown
const serviceItems = [
  {
    icon: Icons.computer,
    title: 'Reparación de PCs',
    desc: 'Diagnóstico y solución de problemas',
    href: '#servicios',
  },
  {
    icon: Icons.laptop,
    title: 'Mantenimiento',
    desc: 'Limpieza y optimización preventiva',
    href: '#servicios',
  },
  {
    icon: Icons.shield,
    title: 'Eliminación de Virus',
    desc: 'Protección y limpieza de malware',
    href: '#servicios',
  },
  {
    icon: Icons.zap,
    title: 'Formateo Windows',
    desc: 'Instalación limpia del sistema',
    href: '#servicios',
  },
  {
    icon: Icons.database,
    title: 'Recuperación de Datos',
    desc: 'Rescate de archivos perdidos',
    href: '#servicios',
  },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when menu closes
  useEffect(() => {
    if (!isMenuOpen) {
      setIsServicesOpen(false);
    }
  }, [isMenuOpen]);

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
        setIsServicesOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    if (!isMenuOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(`.${styles.navbar}`)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMenuOpen]);

  // Smooth scroll handler
  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string, id: string) => {
      if (href.startsWith('#')) {
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          setActiveSection(id);
        }
        setIsMenuOpen(false);
      }
    },
    []
  );

  return (
    <header className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`} role="banner">
      <nav className={styles.container} aria-label="Navegación principal">
        {/* Brand */}
        <Link href="/" className={styles.brand} aria-label="Ir al inicio">
          <div className={styles.logoWrapper}>
            <Image
              src="/logo.png"
              alt="Fernando Técnico"
              width={44}
              height={44}
              className={styles.logo}
              priority
            />
          </div>
          <div className={styles.brandText}>
            <span className={styles.brandName}>Fernando</span>
            <span className={styles.brandTitle}>Técnico en Computadores</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <ul className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ''}`} role="menubar">
          {navItems.map((item) => (
            <li
              key={item.id}
              className={`${styles.navItem} ${item.hasDropdown ? styles.navItemDropdown : ''}`}
              role="none"
              onMouseEnter={() => item.hasDropdown && setIsServicesOpen(true)}
              onMouseLeave={() => item.hasDropdown && setIsServicesOpen(false)}
            >
              {item.hasDropdown ? (
                <>
                  <button
                    className={`${styles.navLink} ${activeSection === item.id ? styles.navLinkActive : ''}`}
                    onClick={() => setIsServicesOpen(!isServicesOpen)}
                    aria-expanded={isServicesOpen}
                    aria-haspopup="true"
                    role="menuitem"
                  >
                    <span className={styles.navIcon}>{item.icon}</span>
                    <span className={styles.navText}>{item.label}</span>
                    <span
                      className={`${styles.navChevron} ${isServicesOpen ? styles.navChevronOpen : ''}`}
                    >
                      {Icons.chevronDown}
                    </span>
                  </button>

                  {/* Dropdown */}
                  <div
                    className={`${styles.dropdown} ${isServicesOpen ? styles.dropdownOpen : ''}`}
                    role="menu"
                  >
                    <div className={styles.dropdownContent}>
                      {serviceItems.map((service, index) => (
                        <Link
                          key={index}
                          href={service.href}
                          className={styles.dropdownItem}
                          role="menuitem"
                          onClick={(e) => {
                            handleNavClick(e, service.href, 'servicios');
                            setIsServicesOpen(false);
                          }}
                        >
                          <span className={styles.dropdownIcon}>{service.icon}</span>
                          <div className={styles.dropdownText}>
                            <span className={styles.dropdownTitle}>{service.title}</span>
                            <span className={styles.dropdownDesc}>{service.desc}</span>
                          </div>
                        </Link>
                      ))}
                    </div>
                    <div className={styles.dropdownFooter}>
                      <Link
                        href="#servicios"
                        className={styles.dropdownCta}
                        onClick={(e) => {
                          handleNavClick(e, '#servicios', 'servicios');
                          setIsServicesOpen(false);
                        }}
                      >
                        Ver todos los servicios
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <line x1="5" y1="12" x2="19" y2="12" />
                          <polyline points="12 5 19 12 12 19" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </>
              ) : (
                <Link
                  href={item.href}
                  className={`${styles.navLink} ${activeSection === item.id ? styles.navLinkActive : ''}`}
                  onClick={(e) => handleNavClick(e, item.href, item.id)}
                  role="menuitem"
                >
                  <span className={styles.navIcon}>{item.icon}</span>
                  <span className={styles.navText}>{item.label}</span>
                </Link>
              )}
            </li>
          ))}
        </ul>

        {/* CTA Section */}
        <div className={styles.actions}>
          {/* Tienda CTA */}
          <Link href="/tienda" className={styles.tiendaButton} aria-label="Ver tienda de productos">
            <span className={styles.tiendaIcon}>{Icons.shoppingBag}</span>
            <span className={styles.tiendaText}>Ver Tienda</span>
            <span className={styles.tiendaBadge}>Nuevo</span>
          </Link>

          {/* WhatsApp CTA */}
          <Link
            href="https://wa.link/n8et4q"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.ctaButton}
            aria-label="Contactar por WhatsApp"
          >
            <span className={styles.ctaIcon}>{Icons.whatsapp}</span>
            <span className={styles.ctaText}>WhatsApp</span>
            <span className={styles.ctaPulse} aria-hidden="true" />
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className={`${styles.toggle} ${isMenuOpen ? styles.toggleActive : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
        >
          <span className={styles.toggleBar} aria-hidden="true" />
          <span className={styles.toggleBar} aria-hidden="true" />
          <span className={styles.toggleBar} aria-hidden="true" />
        </button>
      </nav>

      {/* Mobile Overlay */}
      <div
        className={`${styles.overlay} ${isMenuOpen ? styles.overlayVisible : ''}`}
        onClick={() => setIsMenuOpen(false)}
        aria-hidden="true"
      />
    </header>
  );
};

export default Navbar;
