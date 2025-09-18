"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ChevronDown, WhatsAppIcon } from "./Icons";
import { trackEvent, trackServiceView } from "./GAEventTracker";

type ServiceKey =
  | "mantenimiento"
  | "gaming"
  | "software"
  | "remoto"
  | "ensamble"
  | "recuperacion"
  | "reparacion"
  | "combos";

const ServiceModal = dynamic(() => import("./ServiceModal"), { ssr: false });

const serviceItems: { key: ServiceKey; title: string; desc: string; icon?: string }[] = [
  { key: "mantenimiento", title: "Mantenimiento Doméstico y Corporativo", desc: "Limpieza y optimización de equipos en casa y oficina", icon: "🧰" },
  { key: "gaming", title: "Optimización Gaming", desc: "Mejora de rendimiento para equipos de juegos", icon: "🎮" },
  { key: "software", title: "Instalación de Software", desc: "Sistemas operativos, drivers y programas esenciales", icon: "💿" },
  { key: "remoto", title: "Soporte Remoto", desc: "Asistencia técnica a distancia 24/7", icon: "🖥️" },
  { key: "ensamble", title: "Ensamble Personalizado", desc: "PC a medida según tus necesidades", icon: "🛠️" },
  { key: "recuperacion", title: "Recuperación de Datos", desc: "Archivos perdidos o dañados", icon: "💾" },
  { key: "reparacion", title: "Reparación Física", desc: "Carcasas, bisagras y componentes", icon: "🔧" },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState<ServiceKey | null>(null);
  const [activeSection, setActiveSection] = useState<string>("inicio");

  const navRef = useRef<HTMLElement | null>(null);
  const servicesButtonRef = useRef<HTMLButtonElement | null>(null);
  const submenuItemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  // Scroll: sticky + auto-hide on scroll down (rAF throttled)
  useEffect(() => {
    const onScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const y = window.scrollY;
          setIsScrolled(y > 30);
          setIsHidden(y > lastScrollY.current && y > 80);
          lastScrollY.current = y;
          ticking.current = false;
        });
        ticking.current = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true } as AddEventListenerOptions);
    return () => window.removeEventListener("scroll", onScroll as EventListener);
  }, []);

  // Cerrar el submenú cuando se cierre el menú principal
  useEffect(() => {
    if (!isMenuOpen) {
      setIsServicesOpen(false);
    }
  }, [isMenuOpen]);

  // Clic afuera para cerrar menús
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!navRef.current) return;
      if (!navRef.current.contains(e.target as Node)) {
        if (isMenuOpen) setIsMenuOpen(false);
        if (isServicesOpen) setIsServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [isMenuOpen, isServicesOpen]);

  // Sección activa por IntersectionObserver
  useEffect(() => {
    const ids = ["inicio", "proceso", "casos", "testimonios", "faq", "contacto"];
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0.1 }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleServiceClick = useCallback((serviceType: ServiceKey, e: React.MouseEvent) => {
    e.preventDefault();
    setIsMenuOpen(false);
    setIsServicesOpen(false);
    trackServiceView(serviceType);
    // Pequeño delay para que se cierre el menú antes de abrir el modal
    setTimeout(() => {
      setModalOpen(serviceType);
    }, 100);
  }, []);

  const closeModal = () => {
    setModalOpen(null);
  };

  // Teclado (ESC para cerrar, flechas para navegar submenu)
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isServicesOpen) setIsServicesOpen(false);
        if (isMenuOpen) setIsMenuOpen(false);
      }
    },
    [isMenuOpen, isServicesOpen]
  );

  const handleSubmenuKeyDown = useCallback((e: React.KeyboardEvent<HTMLUListElement>) => {
    const items = submenuItemRefs.current.filter(Boolean) as HTMLButtonElement[];
    const currentIndex = items.findIndex((el) => el === document.activeElement);
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = items[(currentIndex + 1 + items.length) % items.length];
      next?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const prev = items[(currentIndex - 1 + items.length) % items.length];
      prev?.focus();
    } else if (e.key === "Home") {
      e.preventDefault();
      items[0]?.focus();
    } else if (e.key === "End") {
      e.preventDefault();
      items[items.length - 1]?.focus();
    }
  }, []);

  // Foco al abrir submenú
  useEffect(() => {
    if (isServicesOpen) {
      trackEvent("submenu_toggle", { value: 1 });
      setTimeout(() => submenuItemRefs.current[0]?.focus(), 0);
    }
  }, [isServicesOpen]);

  return (
    <nav
      ref={navRef}
      className={`navbar ${isScrolled ? "scrolled" : ""}`}
      id="navbar"
      role="navigation"
      aria-label="Navegación principal"
      onKeyDown={handleKeyDown}
      style={{ transform: isHidden ? "translateY(-120%)" : "translateY(0)", transition: "transform 0.3s ease" }}
    >
      <div className="navbar__container">
        <Link href="/" className="navbar__brand" aria-label="Ir al inicio">
          <Image src="/logo.png" alt="Logo Fernando" width={50} height={50} className="navbar__logo" priority />
          <div className="navbar__text">
            <span className="navbar__name">Fernando</span>
            <span className="navbar__title">Técnico en Computadores - Montería</span>
          </div>
        </Link>

        <ul className={`navbar__menu ${isMenuOpen ? "mobile-open" : ""}`} id="navbar-menu">
          <li className="navbar__item">
            <Link href="/" className={`navbar__link ${activeSection === "inicio" ? "navbar__link--active" : ""}`} data-section="inicio" aria-current={activeSection === "inicio" ? "page" : undefined}>
              <span className="navbar__icon" aria-hidden="true">🏠</span>
              <span className="navbar__text">Inicio</span>
            </Link>
          </li>
          <li className={`navbar__item navbar__item--dropdown ${isServicesOpen ? "mobile-open" : ""}`}>
            <button
              ref={servicesButtonRef}
              className="navbar__link navbar__link--dropdown"
              data-section="servicios"
              aria-haspopup="true"
              aria-expanded={isServicesOpen}
              aria-controls="navbar-services-submenu"
              id="navbar-services-button"
              onClick={() => setIsServicesOpen(!isServicesOpen)}
              onMouseEnter={() => {
                if (typeof window !== 'undefined' && window.matchMedia('(hover:hover) and (pointer:fine)').matches) {
                  setIsServicesOpen(true);
                }
              }}
              onMouseLeave={() => {
                if (typeof window !== 'undefined' && window.matchMedia('(hover:hover) and (pointer:fine)').matches) {
                  setIsServicesOpen(false);
                }
              }}
            >
              <span className="navbar__icon" aria-hidden="true"><ChevronDown /></span>
              <span className="navbar__text">Servicios</span>
            </button>
            <ul
              id="navbar-services-submenu"
              className="navbar__submenu"
              role="menu"
              aria-labelledby="navbar-services-button"
              onKeyDown={handleSubmenuKeyDown}
            >
              {serviceItems.map((item, idx) => (
                <li className="navbar__submenu-item" role="none" key={item.key}>
                  <button
                    ref={(el) => (submenuItemRefs.current[idx] = el)}
                    onClick={(e) => handleServiceClick(item.key, e)}
                    className="navbar__submenu-link navbar__submenu-button"
                    role="menuitem"
                  >
                    <span className="navbar__submenu-icon" aria-hidden="true">{item.icon ?? "•"}</span>
                    <div className="navbar__submenu-content">
                      <span className="navbar__submenu-title">{item.title}</span>
                      <span className="navbar__submenu-desc">{item.desc}</span>
                    </div>
                  </button>
                </li>
              ))}
              <li className="navbar__submenu-item" role="none">
                <button
                  ref={(el) => (submenuItemRefs.current[serviceItems.length] = el)}
                  onClick={(e) => handleServiceClick("combos", e)}
                  className="navbar__submenu-link navbar__submenu-button"
                  role="menuitem"
                >
                  <span className="navbar__submenu-icon" aria-hidden="true">🔥</span>
                  <div className="navbar__submenu-content">
                    <span className="navbar__submenu-title">Combos Especiales</span>
                    <span className="navbar__submenu-desc">Ahorra hasta 30% en packs</span>
                  </div>
                </button>
              </li>
            </ul>
          </li>
          <li className="navbar__item">
            <Link href="#proceso" className={`navbar__link ${activeSection === "proceso" ? "navbar__link--active" : ""}`} data-section="proceso" aria-current={activeSection === "proceso" ? "page" : undefined}>
              <span className="navbar__icon" aria-hidden="true">⚙️</span>
              <span className="navbar__text">Proceso</span>
            </Link>
          </li>
          <li className="navbar__item">
            <button
              onClick={(e) => {
                e.preventDefault();
                handleServiceClick("combos", e);
              }}
              className="navbar__link navbar__link--button navbar__link--combos"
            >
              <span className="navbar__icon" aria-hidden="true">💥</span>
              <span className="navbar__text">Combos</span>
            </button>
          </li>
          <li className="navbar__item">
            <Link href="#casos" className={`navbar__link ${activeSection === "casos" ? "navbar__link--active" : ""}`} data-section="casos" aria-current={activeSection === "casos" ? "page" : undefined}>
              <span className="navbar__icon" aria-hidden="true">📂</span>
              <span className="navbar__text">Casos</span>
            </Link>
          </li>
          <li className="navbar__item">
            <Link href="#testimonios" className={`navbar__link ${activeSection === "testimonios" ? "navbar__link--active" : ""}`} data-section="testimonios" aria-current={activeSection === "testimonios" ? "page" : undefined}>
              <span className="navbar__icon" aria-hidden="true">⭐</span>
              <span className="navbar__text">Testimonios</span>
            </Link>
          </li>
          <li className="navbar__item">
            <Link href="#faq" className={`navbar__link ${activeSection === "faq" ? "navbar__link--active" : ""}`} data-section="faq" aria-current={activeSection === "faq" ? "page" : undefined}>
              <span className="navbar__icon" aria-hidden="true">❓</span>
              <span className="navbar__text">FAQ</span>
            </Link>
          </li>
          <li className="navbar__item">
            <Link href="#contacto" className={`navbar__link ${activeSection === "contacto" ? "navbar__link--active" : ""}`} data-section="contacto" aria-current={activeSection === "contacto" ? "page" : undefined}>
              <span className="navbar__icon" aria-hidden="true">✉️</span>
              <span className="navbar__text">Contacto</span>
            </Link>
          </li>
        </ul>

        <div className="navbar__cta">
          <Link href="http://wa.link/n8et4q" target="_blank" rel="noopener noreferrer" className="btn--whatsapp-nav" aria-label="Contactar por WhatsApp">
            <WhatsAppIcon className="whatsapp-icon" size={18} />
            WhatsApp
          </Link>
        </div>

        <button
          className={`navbar__toggle ${isMenuOpen ? "active" : ""}`}
          id="navbar-toggle"
          aria-expanded={isMenuOpen}
          aria-controls="navbar-menu"
          onClick={() => {
            const willOpen = !isMenuOpen;
            setIsMenuOpen(willOpen);
            trackEvent(willOpen ? "nav_open" : "nav_close", { value: willOpen ? 1 : 0 });
          }}
          aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
        >
          <span className="navbar__hamburger" aria-hidden="true"></span>
          <span className="navbar__hamburger" aria-hidden="true"></span>
          <span className="navbar__hamburger" aria-hidden="true"></span>
        </button>
      </div>

      {/* Service Modal */}
      {modalOpen && (
        <ServiceModal
          isOpen={!!modalOpen}
          onClose={closeModal}
          serviceType={modalOpen}
        />
      )}
    </nav>
  );
};

export default Navbar;
