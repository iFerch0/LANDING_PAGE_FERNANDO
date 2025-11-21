"use client";
import React from "react";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from './Navbar.module.css';

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
        <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`} id="navbar">
            <div className={styles.container}>
                <div className={styles.brand}>
                    <Image src="/logo.png" alt="Logo Fernando" width={50} height={50} className={styles.logo} priority />
                    <div className={styles.brandText}>
                        <span className={styles.name}>Fernando</span>
                        <span className={styles.title}>Técnico en Computadores — Montería</span>
                    </div>
                </div>

                <ul className={`${styles.menu} ${isMenuOpen ? styles.menuOpen : ''}`} id="navbar-menu">
                    <li className={styles.item}>
                        <Link href="/" className={styles.link} data-section="inicio">
                            <span className={styles.icon}>🏠</span>
                            <span className={styles.text}>Inicio</span>
                        </Link>
                    </li>
                    <li className={`${styles.item} ${styles.itemDropdown} ${isServicesOpen ? styles.itemDropdownOpen : ''}`}>
                        <div
                            className={`${styles.link} ${styles.linkDropdown}`}
                            data-section="servicios"
                            onClick={() => setIsServicesOpen(!isServicesOpen)}
                        >
                            <span className={styles.icon}>🛠️</span>
                            <span className={styles.text}>Servicios</span>
                            <span className={styles.dropdownArrow}>▼</span>
                        </div>
                        <ul className={styles.submenu}>
                            <li className={styles.submenuItem}>
                                <div className={styles.submenuLink} style={{cursor: 'default', opacity: 0.6}}>
                                    <span className={styles.submenuIcon}>🏠💼</span>
                                    <div className={styles.submenuContent}>
                                        <span className={styles.submenuTitle}>Mantenimiento Doméstico y Corporativo</span>
                                        <span className={styles.submenuDesc}>Proximamente disponible - Contáctanos por WhatsApp</span>
                                    </div>
                                </div>
                            </li>
                            {/* Servicios temporalmente ocultos - activar cuando estén disponibles */}
                        </ul>
                    </li>
                    <li className={styles.item}>
                        <Link href="#proceso" className={styles.link} data-section="proceso">
                            <span className={styles.icon}>⚙️</span>
                            <span className={styles.text}>Proceso</span>
                        </Link>
                    </li>
                    <li className={styles.item}>
                        <Link href="#casos" className={styles.link} data-section="casos">
                            <span className={styles.icon}>📊</span>
                            <span className={styles.text}>Casos</span>
                        </Link>
                    </li>
                    <li className={styles.item}>
                        <Link href="#testimonios" className={styles.link} data-section="testimonios">
                            <span className={styles.icon}>💬</span>
                            <span className={styles.text}>Testimonios</span>
                        </Link>
                    </li>
                    <li className={styles.item}>
                        <Link href="#faq" className={styles.link} data-section="faq">
                            <span className={styles.icon}>❓</span>
                            <span className={styles.text}>FAQ</span>
                        </Link>
                    </li>
                    <li className={styles.item}>
                        <Link href="#contacto" className={styles.link} data-section="contacto">
                            <span className={styles.icon}>📞</span>
                            <span className={styles.text}>Contacto</span>
                        </Link>
                    </li>
                </ul>

                <div className={styles.cta}>
                    <Link href="http://wa.link/n8et4q" target="_blank" rel="noopener noreferrer" className={styles.whatsappBtn} aria-label="Contactar por WhatsApp">
                        <span className={styles.whatsappIcon}>📱</span>
                        WhatsApp
                    </Link>
                    <div className={styles.rating} aria-hidden="true">
                        <span className={styles.ratingStars}>⭐⭐⭐⭐⭐</span>
                        <span className={styles.ratingText}>5.0 (92 reseñas)</span>
                    </div>
                </div>

                <button
                    className={`${styles.toggle} ${isMenuOpen ? styles.toggleActive : ''}`}
                    id="navbar-toggle"
                    aria-expanded={isMenuOpen}
                    aria-controls="navbar-menu"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
                >
                    <span className={styles.hamburger} aria-hidden="true"></span>
                    <span className={styles.hamburger} aria-hidden="true"></span>
                    <span className={styles.hamburger} aria-hidden="true"></span>
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
