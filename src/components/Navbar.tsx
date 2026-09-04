'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Navbar.module.css';
import { whatsappUrl } from '@/data/contact';
import {
  WhatsAppIcon,
  HomeIcon,
  CpuIcon,
  WrenchIcon,
  CodeIcon,
  StarOutlineIcon,
  UserIcon,
  ContactIcon,
} from './Icons';

type IconComponent = React.FC<{ size?: number | string }>;

const navItems: { id: string; label: string; href: string; icon: IconComponent }[] = [
  { id: 'inicio', label: 'Inicio', href: '#inicio', icon: HomeIcon },
  { id: 'ensambles', label: 'Ensambles', href: '#ensambles', icon: CpuIcon },
  { id: 'servicios', label: 'Servicios', href: '#servicios', icon: WrenchIcon },
  { id: 'desarrollo-web', label: 'Web', href: '#desarrollo-web', icon: CodeIcon },
  { id: 'testimonios', label: 'Testimonios', href: '#testimonios', icon: StarOutlineIcon },
  { id: 'sobre-mi', label: 'Sobre mí', href: '#sobre-mi', icon: UserIcon },
  { id: 'contacto', label: 'Contacto', href: '#contacto', icon: ContactIcon },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);

      // ScrollSpy: highlight the currently active section
      const sectionIds = navItems.map((item) => item.id);
      const scrollPosition = window.scrollY + 140;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sectionIds[i]);
          return;
        }
      }
      if (window.scrollY < 100) {
        setActiveSection('inicio');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(`.${styles.navbar}`)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMenuOpen]);

  // Prevent body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

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
          <Image
            src="/logo_new.png"
            alt="Fernando"
            width={36}
            height={36}
            className={styles.logo}
            priority
            unoptimized
          />
          <div className={styles.brandText}>
            <span className={styles.brandName}>Fernando Rhenals</span>
            <span className={styles.brandTitle}>Ingeniero de Sistemas</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <ul
          className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ''}`}
          role="menubar"
          id="main-nav"
        >
          {navItems.map((item) => (
            <li key={item.id} className={styles.navItem} role="none">
              <Link
                href={item.href}
                className={`${styles.navLink} ${activeSection === item.id ? styles.navLinkActive : ''}`}
                onClick={(e) => handleNavClick(e, item.href, item.id)}
                role="menuitem"
              >
                <span className={styles.navIcon}>
                  <item.icon size={16} />
                </span>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className={styles.actions}>
          <Link
            href={whatsappUrl('Hola, necesito ayuda con mi computador')}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.ctaButton}
            aria-label="Contactar por WhatsApp"
          >
            <span className={styles.ctaIcon}>
              <WhatsAppIcon size={16} />
            </span>
            <span className={styles.ctaText}>WhatsApp</span>
            <span className={styles.ctaPulse} aria-hidden="true" />
          </Link>

          {/* Mobile Toggle */}
          <button
            className={`${styles.toggle} ${isMenuOpen ? styles.toggleActive : ''}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-controls="main-nav"
            aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            <span className={styles.toggleBar} aria-hidden="true" />
            <span className={styles.toggleBar} aria-hidden="true" />
            <span className={styles.toggleBar} aria-hidden="true" />
          </button>
        </div>
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
