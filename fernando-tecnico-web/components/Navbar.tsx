'use client';

import React from "react";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 30);
        };

        window.addEventListener('scroll', handleScroll);

        // Limpiar el evento al desmontar el componente
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`} id="navbar">
            <div className="navbar__container">
                <div className="navbar__brand">
                    <Image src="/logo.png" alt="Logo Fernando" width={50} height={50} className="navbar__logo" />
                    <div className="navbar__text">
                        <span className="navbar__name">Fernando</span>
                        <span className="navbar__title">Técnico en Computadores</span>
                    </div>
                </div>

                <ul className={`navbar__menu ${isMenuOpen ? 'mobile-open' : ''}`} id="navbar-menu">
                    <li className="navbar__item">
                        <a href="#inicio" className="navbar__link" data-section="inicio">
                            <span className="navbar__icon">🏠</span>
                            <span className="navbar__text">Inicio</span>
                        </a>
                    </li>
                    <li className="navbar__item">
                        <a href="#servicios" className="navbar__link" data-section="servicios">
                            <span className="navbar__icon">🛠️</span>
                            <span className="navbar__text">Servicios</span>
                        </a>
                    </li>
                    <li className="navbar__item">
                        <a href="#proceso" className="navbar__link" data-section="proceso">
                            <span className="navbar__icon">⚙️</span>
                            <span className="navbar__text">Proceso</span>
                        </a>
                    </li>
                    <li className="navbar__item">
                        <a href="#casos" className="navbar__link" data-section="casos">
                            <span className="navbar__icon">📊</span>
                            <span className="navbar__text">Casos</span>
                        </a>
                    </li>
                    <li className="navbar__item">
                        <a href="#testimonios" className="navbar__link" data-section="testimonios">
                            <span className="navbar__icon">💬</span>
                            <span className="navbar__text">Testimonios</span>
                        </a>
                    </li>
                    <li className="navbar__item">
                        <a href="#faq" className="navbar__link" data-section="faq">
                            <span className="navbar__icon">❓</span>
                            <span className="navbar__text">FAQ</span>
                        </a>
                    </li>
                    <li className="navbar__item">
                        <a href="#contacto" className="navbar__link" data-section="contacto">
                            <span className="navbar__icon">📞</span>
                            <span className="navbar__text">Contacto</span>
                        </a>
                    </li>
                </ul>

                <div className="navbar__cta">
                    <a href="http://wa.link/n8et4q" target="_blank" className="btn--whatsapp-nav">
                        <span className="whatsapp-icon">📱</span>
                        WhatsApp
                    </a>
                    <div className="navbar__rating">
                        <span className="rating-stars">⭐⭐⭐⭐⭐</span>
                        <span className="rating-text">5.0 (92 reseñas)</span>
                    </div>
                </div>

                <button
                    className={`navbar__toggle ${isMenuOpen ? 'active' : ''}`}
                    id="navbar-toggle"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >                    <span className="navbar__hamburger"></span>
                    <span className="navbar__hamburger"></span>
                    <span className="navbar__hamburger"></span>
                </button>
            </div>
        </nav>
    );
};

export default Navbar;