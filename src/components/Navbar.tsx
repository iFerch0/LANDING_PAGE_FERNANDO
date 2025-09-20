"use client";
import React from "react";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isServicesOpen, setIsServicesOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 30);
        };

        window.addEventListener('scroll', handleScroll);

        // Limpiar el evento al desmontar el componente
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Cerrar el submenú cuando se cierre el menú principal
    useEffect(() => {
        if (!isMenuOpen) {
            setIsServicesOpen(false);
        }
    }, [isMenuOpen]);

    return (
        <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`} id="navbar">
            <div className="navbar__container">
                <div className="navbar__brand">
                    <Image src="/logo.png" alt="Logo Fernando" width={50} height={50} className="navbar__logo" priority />
                    <div className="navbar__text">
                        <span className="navbar__name">Fernando</span>
                        <span className="navbar__title">Técnico en Computadores — Montería</span>
                    </div>
                </div>

                <ul className={`navbar__menu ${isMenuOpen ? 'mobile-open' : ''}`} id="navbar-menu">
                    <li className="navbar__item">
                        <Link href="/" className="navbar__link" data-section="inicio">
                            <span className="navbar__icon">🏠</span>
                            <span className="navbar__text">Inicio</span>
                        </Link>
                    </li>
                    <li className={`navbar__item navbar__item--dropdown ${isServicesOpen ? 'mobile-open' : ''}`}>
                        <div 
                            className="navbar__link navbar__link--dropdown" 
                            data-section="servicios"
                            onClick={() => setIsServicesOpen(!isServicesOpen)}
                        >
                            <span className="navbar__icon">🛠️</span>
                            <span className="navbar__text">Servicios</span>
                            <span className="navbar__dropdown-arrow">▼</span>
                        </div>
                        <ul className="navbar__submenu">
                            <li className="navbar__submenu-item">
                                <Link href="/en-construccion" className="navbar__submenu-link">
                                    <span className="navbar__submenu-icon">🏠💼</span>
                                    <div className="navbar__submenu-content">
                                        <span className="navbar__submenu-title">Mantenimiento Doméstico y Corporativo</span>
                                        <span className="navbar__submenu-desc">Limpieza y optimización de equipos en casa y oficina</span>
                                    </div>
                                </Link>
                            </li>
                            <li className="navbar__submenu-item">
                                <Link href="/en-construccion" className="navbar__submenu-link">
                                    <span className="navbar__submenu-icon">🎮⚡</span>
                                    <div className="navbar__submenu-content">
                                        <span className="navbar__submenu-title">Optimización Gaming</span>
                                        <span className="navbar__submenu-desc">Mejora de rendimiento para equipos de juegos</span>
                                    </div>
                                </Link>
                            </li>
                            <li className="navbar__submenu-item">
                                <Link href="/en-construccion" className="navbar__submenu-link">
                                    <span className="navbar__submenu-icon">💾📋</span>
                                    <div className="navbar__submenu-content">
                                        <span className="navbar__submenu-title">Instalación de Software</span>
                                        <span className="navbar__submenu-desc">Programas, drivers y actualizaciones del sistema</span>
                                    </div>
                                </Link>
                            </li>
                            <li className="navbar__submenu-item">
                                <Link href="/en-construccion" className="navbar__submenu-link">
                                    <span className="navbar__submenu-icon">🌐🔧</span>
                                    <div className="navbar__submenu-content">
                                        <span className="navbar__submenu-title">Soporte Remoto</span>
                                        <span className="navbar__submenu-desc">Asistencia técnica a distancia nacional e internacional</span>
                                    </div>
                                </Link>
                            </li>
                            <li className="navbar__submenu-item">
                                <Link href="/en-construccion" className="navbar__submenu-link">
                                    <span className="navbar__submenu-icon">🔧⚙️</span>
                                    <div className="navbar__submenu-content">
                                        <span className="navbar__submenu-title">Ensamble Personalizado</span>
                                        <span className="navbar__submenu-desc">Construcción de equipos a medida según necesidades</span>
                                    </div>
                                </Link>
                            </li>
                            <li className="navbar__submenu-item">
                                <Link href="/en-construccion" className="navbar__submenu-link">
                                    <span className="navbar__submenu-icon">💿🔄</span>
                                    <div className="navbar__submenu-content">
                                        <span className="navbar__submenu-title">Recuperación de Datos</span>
                                        <span className="navbar__submenu-desc">Restauración de archivos perdidos o dañados</span>
                                    </div>
                                </Link>
                            </li>
                            <li className="navbar__submenu-item">
                                <Link href="/en-construccion" className="navbar__submenu-link">
                                    <span className="navbar__submenu-icon">🔨🖥️</span>
                                    <div className="navbar__submenu-content">
                                        <span className="navbar__submenu-title">Reparación Física</span>
                                        <span className="navbar__submenu-desc">Arreglo de carcasas, bisagras y componentes físicos</span>
                                    </div>
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li className="navbar__item">
                        <Link href="#proceso" className="navbar__link" data-section="proceso">
                            <span className="navbar__icon">⚙️</span>
                            <span className="navbar__text">Proceso</span>
                        </Link>
                    </li>
                    <li className="navbar__item">
                        <Link href="#casos" className="navbar__link" data-section="casos">
                            <span className="navbar__icon">📊</span>
                            <span className="navbar__text">Casos</span>
                        </Link>
                    </li>
                    <li className="navbar__item">
                        <Link href="#testimonios" className="navbar__link" data-section="testimonios">
                            <span className="navbar__icon">💬</span>
                            <span className="navbar__text">Testimonios</span>
                        </Link>
                    </li>
                    <li className="navbar__item">
                        <Link href="#faq" className="navbar__link" data-section="faq">
                            <span className="navbar__icon">❓</span>
                            <span className="navbar__text">FAQ</span>
                        </Link>
                    </li>
                    <li className="navbar__item">
                        <Link href="#contacto" className="navbar__link" data-section="contacto">
                            <span className="navbar__icon">📞</span>
                            <span className="navbar__text">Contacto</span>
                        </Link>
                    </li>
                </ul>

                <div className="navbar__cta">
                    <Link href="http://wa.link/n8et4q" target="_blank" rel="noopener noreferrer" className="btn--whatsapp-nav" aria-label="Contactar por WhatsApp">
                        <span className="whatsapp-icon">📱</span>
                        WhatsApp
                    </Link>
                    <div className="navbar__rating" aria-hidden="true">
                        <span className="rating-stars">⭐⭐⭐⭐⭐</span>
                        <span className="rating-text">5.0 (92 reseñas)</span>
                    </div>
                </div>

                <button
                    className={`navbar__toggle ${isMenuOpen ? 'active' : ''}`}
                    id="navbar-toggle"
                    aria-expanded={isMenuOpen}
                    aria-controls="navbar-menu"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
                >
                    <span className="navbar__hamburger" aria-hidden="true"></span>
                    <span className="navbar__hamburger" aria-hidden="true"></span>
                    <span className="navbar__hamburger" aria-hidden="true"></span>
                </button>
            </div>
        </nav>
    );
};

export default Navbar;