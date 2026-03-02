'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCartStore } from '@/store';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { WA_SHORT_LINK } from '@/constants/contact';
import styles from './Navbar.module.css';
import NavIcons from './navbar/navIcons';
import { navItems, serviceItems } from './navbar/navData';
import { NavbarCartButton } from './navbar/NavbarCartButton';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Hydration sync for cart
  const cartItems = useCartStore((state) => state.getTotalItems());
  const [mounted, setMounted] = useState(false);

  // Nuevo: detectar pathname para Next 15 (tienda page) y hash (landing page)
  const pathname = typeof window !== 'undefined' ? window.location.pathname : '/';
  const [activeSection, setActiveSection] = useState(pathname === '/tienda' ? 'tienda' : 'inicio');

  // Evaluar pathname en cambio cliente (esto previene el state 'inicio' cuando navegamos a /tienda puro)
  useEffect(() => {
    if (pathname.startsWith('/tienda')) {
      setActiveSection('tienda');
    } else if (pathname === '/' && activeSection === 'tienda') {
      setActiveSection('inicio');
    }
  }, [pathname, activeSection]);

  // Handle scroll effect
  useEffect(() => {
    setMounted(true);
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
                      {NavIcons.chevronDown}
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
                  className={`${styles.navLink} ${activeSection === item.id ? styles.navLinkActive : ''} ${'isStore' in item && item.isStore ? styles.navLinkStore : ''}`}
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
          {/* Cart Button */}
          <NavbarCartButton
            cartItems={cartItems}
            mounted={mounted}
            onClick={() => setIsCartOpen(true)}
          />

          {/* Tienda CTA */}
          <Link href="/tienda" className={styles.tiendaButton} aria-label="Ver tienda de productos">
            <span className={styles.tiendaText}>Tienda</span>
            <span className={styles.tiendaBadge}>Sale!</span>
          </Link>

          {/* WhatsApp CTA */}
          <Link
            href={WA_SHORT_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.ctaButton}
            aria-label="Contactar por WhatsApp"
          >
            <span className={styles.ctaIcon}>{NavIcons.whatsapp}</span>
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

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </header>
  );
};

export default Navbar;
