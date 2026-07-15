'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Navbar.module.css';
import { whatsappUrl } from '@/data/contact';
import {
  HomeIcon,
  WrenchIcon,
  StarOutlineIcon,
  UserIcon,
  ContactIcon,
  WhatsAppIcon,
} from './Icons';

type IconComponent = React.FC<{ size?: number | string }>;

const navItems: { id: string; label: string; href: string; icon: IconComponent }[] = [
  { id: 'inicio', label: 'Inicio', href: '/', icon: HomeIcon },
  { id: 'servicios', label: 'Servicios', href: '#servicios', icon: WrenchIcon },
  { id: 'testimonios', label: 'Testimonios', href: '#testimonios', icon: StarOutlineIcon },
  { id: 'sobre-mi', label: 'Sobre mí', href: '#sobre-mi', icon: UserIcon },
  { id: 'contacto', label: 'Contacto', href: '#contacto', icon: ContactIcon },
];

/**
 * Navbar - Main navigation bar with responsive mobile menu.
 *
 * Features:
 * - Sticky header with scroll-aware background transition
 * - Desktop navigation with section links and icons
 * - Mobile hamburger menu with overlay
 * - WhatsApp CTA button with pulse animation
 * - Smooth scroll to anchor sections on nav click
 * - Active section tracking
 * - Keyboard support: Escape closes mobile menu
 * - Click-outside-to-close for mobile menu
 *
 * @example
 * ```tsx
 * <Navbar />
 * ```
 *
 * @remarks
 * Uses `role="banner"`, `role="menubar"`, and `role="menuitem"` for accessibility.
 * Brand logo loaded via Next.js Image with `priority` for LCP optimization.
 * Nav items are defined as a static array with id, label, href, and icon.
 */
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
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
            <span className={styles.brandTitle}>
              Ing. de Sistemas | Full-Stack Dev | IT Support
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <ul className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ''}`} role="menubar">
          {navItems.map((item) => (
            <li key={item.id} className={styles.navItem} role="none">
              <Link
                href={item.href}
                className={`${styles.navLink} ${activeSection === item.id ? styles.navLinkActive : ''}`}
                onClick={(e) => handleNavClick(e, item.href, item.id)}
                role="menuitem"
              >
                <span className={styles.navIcon}>
                  <item.icon size={18} />
                </span>
                <span className={styles.navText}>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA Section */}
        <div className={styles.actions}>
          {/* WhatsApp CTA */}
          <Link
            href={whatsappUrl('Hola, necesito ayuda con mi computador')}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.ctaButton}
            aria-label="Contactar por WhatsApp"
          >
            <span className={styles.ctaIcon}>
              <WhatsAppIcon size={18} />
            </span>
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
