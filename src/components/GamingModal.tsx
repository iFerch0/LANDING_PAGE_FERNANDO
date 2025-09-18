"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./ServiceModal.module.css";

interface GamingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GamingModal: React.FC<GamingModalProps> = ({ isOpen, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [activeTab, setActiveTab] = useState<'hardware' | 'software'>('hardware');

  // Imágenes del slider gaming
  const images = [
    "/img/modal-optimizacion-gamer/1.jpg",
    "/img/modal-optimizacion-gamer/2.jpg",
    "/img/modal-optimizacion-gamer/3.JPG",
    "/img/modal-optimizacion-gamer/4.JPG",
    "/img/modal-optimizacion-gamer/5.JPG",
    "/img/modal-optimizacion-gamer/6.jpg",
    "/img/modal-optimizacion-gamer/7.jpg",
    "/img/modal-optimizacion-gamer/8.jpg",
    "/img/modal-optimizacion-gamer/9.jpg",
    "/img/modal-optimizacion-gamer/10.jpg",
    "/img/modal-optimizacion-gamer/11.jpg",
    "/img/modal-optimizacion-gamer/12.jpg"
  ];

  // Funciones del slider
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  // Auto-play del slider
  useEffect(() => {
    if (!isAutoPlaying || !isOpen) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, isOpen, images.length]);

  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  // Close modal when clicking on backdrop
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles["service-modal"]} onClick={handleBackdropClick}>
      <div className={styles["service-modal__content"]}>
        <button
          className={styles["service-modal__close"]}
          onClick={onClose}
          aria-label="Cerrar modal"
        >
          ✕
        </button>

        {/* Hero Section with Slider */}
        <div className={styles["service-modal__hero"]}>
          <div className={styles["hero-content"]}>
            <div className={styles["hero-badge"]}>
              <span className={styles["badge-icon"]}>🎮</span>
              <span>Gaming Premium</span>
            </div>
            <h2 className={styles["hero-title"]}>
              Optimización Gaming
            </h2>
            <p className={styles["hero-subtitle"]}>
              Maximiza el rendimiento de tu PC gamer con configuraciones profesionales y hardware de última generación
            </p>
            
            {/* Trust Indicators */}
            <div className={styles["trust-indicators"]}>
              <div className={styles["trust-item"]}>
                <span className={styles["trust-icon"]}>🏆</span>
                <span>Especialistas en gaming</span>
              </div>
              <div className={styles["trust-item"]}>
                <span className={styles["trust-icon"]}>⚡</span>
                <span>+60 FPS garantizados</span>
              </div>
              <div className={styles["trust-item"]}>
                <span className={styles["trust-icon"]}>🎯</span>
                <span>Setup personalizado</span>
              </div>
            </div>
          </div>

          {/* Image Slider */}
          <div className={styles["slider-container"]}>
            <div className={styles["slider-wrapper"]}>
              {images.map((image, index) => (
                <div
                  key={index}
                  className={`${styles["slider-slide"]} ${index === currentImageIndex ? styles["active"] : ""}`}
                >
                  <Image
                    src={image}
                    alt={`Setup gaming ${index + 1}`}
                    fill
                    className={styles["slider-image"]}
                    priority={index === 0}
                  />
                  <div className={styles["slider-overlay"]}>
                    <div className={styles["slider-badge"]}>
                      <span className={styles["slider-badge-icon"]}>🎮</span>
                      <span>Setup Gaming #{index + 1}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            <button
              className={`${styles["slider-nav"]} ${styles["slider-nav--prev"]}`}
              onClick={prevImage}
              aria-label="Imagen anterior"
            >
              ‹
            </button>
            <button
              className={`${styles["slider-nav"]} ${styles["slider-nav--next"]}`}
              onClick={nextImage}
              aria-label="Imagen siguiente"
            >
              ›
            </button>

            {/* Dots Indicator */}
            <div className={styles["slider-dots"]}>
              {images.map((_, index) => (
                <button
                  key={index}
                  className={`${styles["slider-dot"]} ${index === currentImageIndex ? styles["active"] : ""}`}
                  onClick={() => goToImage(index)}
                  aria-label={`Ir a imagen ${index + 1}`}
                />
              ))}
            </div>

            {/* Auto-play Toggle */}
            <button
              className={styles["slider-play-pause"]}
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              aria-label={isAutoPlaying ? "Pausar autoplay" : "Iniciar autoplay"}
            >
              {isAutoPlaying ? "⏸️" : "▶️"}
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className={styles["service-modal__tabs"]}>
          <button
            className={`${styles["tab-button"]} ${activeTab === 'hardware' ? styles["active"] : ""}`}
            onClick={() => setActiveTab('hardware')}
          >
            <span className={styles["tab-icon"]}>🔧</span>
            <span>Hardware</span>
          </button>
          <button
            className={`${styles["tab-button"]} ${activeTab === 'software' ? styles["active"] : ""}`}
            onClick={() => setActiveTab('software')}
          >
            <span className={styles["tab-icon"]}>💻</span>
            <span>Software & Red</span>
          </button>
        </div>

        {/* Services Content */}
        <div className={styles["service-modal__body"]}>
          {/* Hardware Services */}
          {activeTab === 'hardware' && (
            <div className={styles["services-content"]}>
              <div className={styles["services-header"]}>
                <h3 className={styles["services-title"]}>
                  <span className={styles["services-icon"]}>🔧</span>
                  Hardware Gaming
                </h3>
                <p className={styles["services-description"]}>
                  Ensamblaje y optimización de componentes para máximo rendimiento en juegos
                </p>
              </div>
              
              <div className={styles["services-grid"]}>
                <div className={styles["service-card"]}>
                  <div className={styles["service-card__icon"]}>🖥️</div>
                  <h4 className={styles["service-card__title"]}>Ensamblaje PC Gamer</h4>
                  <p className={styles["service-card__description"]}>
                    Construcción completa de PC gaming personalizado según tu presupuesto
                  </p>
                  <div className={styles["service-card__features"]}>
                    <span className={styles["feature-tag"]}>A medida</span>
                    <span className={styles["feature-tag"]}>Garantía total</span>
                  </div>
                </div>

                <div className={styles["service-card"]}>
                  <div className={styles["service-card__icon"]}>🎯</div>
                  <h4 className={styles["service-card__title"]}>Actualización GPU/RAM</h4>
                  <p className={styles["service-card__description"]}>
                    Upgrade de tarjetas gráficas, memoria RAM y almacenamiento SSD
                  </p>
                  <div className={styles["service-card__features"]}>
                    <span className={styles["feature-tag"]}>RTX/RX compatible</span>
                    <span className={styles["feature-tag"]}>DDR4/DDR5</span>
                  </div>
                </div>

                <div className={styles["service-card"]}>
                  <div className={styles["service-card__icon"]}>❄️</div>
                  <h4 className={styles["service-card__title"]}>Refrigeración Avanzada</h4>
                  <p className={styles["service-card__description"]}>
                    Sistemas de refrigeración por aire y líquida para overclocking
                  </p>
                  <div className={styles["service-card__features"]}>
                    <span className={styles["feature-tag"]}>AIO coolers</span>
                    <span className={styles["feature-tag"]}>Custom loops</span>
                  </div>
                </div>

                <div className={styles["service-card"]}>
                  <div className={styles["service-card__icon"]}>🖱️</div>
                  <h4 className={styles["service-card__title"]}>Periféricos Gaming</h4>
                  <p className={styles["service-card__description"]}>
                    Instalación de monitores 144/240Hz, teclados mecánicos y audio
                  </p>
                  <div className={styles["service-card__features"]}>
                    <span className={styles["feature-tag"]}>240Hz support</span>
                    <span className={styles["feature-tag"]}>RGB sync</span>
                  </div>
                </div>

                <div className={styles["service-card"]}>
                  <div className={styles["service-card__icon"]}>🌈</div>
                  <h4 className={styles["service-card__title"]}>Setup Estético RGB</h4>
                  <p className={styles["service-card__description"]}>
                    Diseño visual con iluminación RGB sincronizada y cableado limpio
                  </p>
                  <div className={styles["service-card__features"]}>
                    <span className={styles["feature-tag"]}>RGB ecosystem</span>
                    <span className={styles["feature-tag"]}>Cable management</span>
                  </div>
                </div>

                <div className={styles["service-card"]}>
                  <div className={styles["service-card__icon"]}>⚡</div>
                  <h4 className={styles["service-card__title"]}>Fuentes de Poder</h4>
                  <p className={styles["service-card__description"]}>
                    PSU modulares 80+ Gold/Platinum para máxima eficiencia
                  </p>
                  <div className={styles["service-card__features"]}>
                    <span className={styles["feature-tag"]}>80+ certified</span>
                    <span className={styles["feature-tag"]}>Modular cables</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Software & Network Services */}
          {activeTab === 'software' && (
            <div className={styles["services-content"]}>
              <div className={styles["services-header"]}>
                <h3 className={styles["services-title"]}>
                  <span className={styles["services-icon"]}>💻</span>
                  Software & Conectividad
                </h3>
                <p className={styles["services-description"]}>
                  Optimización de sistema operativo, drivers y configuración de red para gaming
                </p>
              </div>
              
              <div className={styles["services-grid"]}>
                <div className={styles["service-card"]}>
                  <div className={styles["service-card__icon"]}>🚀</div>
                  <h4 className={styles["service-card__title"]}>Windows Gaming Optimizado</h4>
                  <p className={styles["service-card__description"]}>
                    Configuración especializada de Windows para máximo rendimiento
                  </p>
                  <div className={styles["service-card__features"]}>
                    <span className={styles["feature-tag"]}>Game Mode</span>
                    <span className={styles["feature-tag"]}>Servicios optimizados</span>
                  </div>
                </div>

                <div className={styles["service-card"]}>
                  <div className={styles["service-card__icon"]}>🎮</div>
                  <h4 className={styles["service-card__title"]}>Drivers y Perfiles GPU</h4>
                  <p className={styles["service-card__description"]}>
                    Configuración avanzada de NVIDIA/AMD con perfiles por juego
                  </p>
                  <div className={styles["service-card__features"]}>
                    <span className={styles["feature-tag"]}>GeForce Experience</span>
                    <span className={styles["feature-tag"]}>Radeon Software</span>
                  </div>
                </div>

                <div className={styles["service-card"]}>
                  <div className={styles["service-card__icon"]}>📹</div>
                  <h4 className={styles["service-card__title"]}>Streaming Setup</h4>
                  <p className={styles["service-card__description"]}>
                    Configuración de OBS, ShadowPlay y software de grabación
                  </p>
                  <div className={styles["service-card__features"]}>
                    <span className={styles["feature-tag"]}>OBS Studio</span>
                    <span className={styles["feature-tag"]}>NVENC/AMF</span>
                  </div>
                </div>

                <div className={styles["service-card"]}>
                  <div className={styles["service-card__icon"]}>📡</div>
                  <h4 className={styles["service-card__title"]}>Red Gaming Optimizada</h4>
                  <p className={styles["service-card__description"]}>
                    Configuración de red para mínima latencia y máxima estabilidad
                  </p>
                  <div className={styles["service-card__features"]}>
                    <span className={styles["feature-tag"]}>QoS gaming</span>
                    <span className={styles["feature-tag"]}>Port forwarding</span>
                  </div>
                </div>

                <div className={styles["service-card"]}>
                  <div className={styles["service-card__icon"]}>🛡️</div>
                  <h4 className={styles["service-card__title"]}>Seguridad Gaming</h4>
                  <p className={styles["service-card__description"]}>
                    Protección contra malware sin impacto en rendimiento
                  </p>
                  <div className={styles["service-card__features"]}>
                    <span className={styles["feature-tag"]}>Gaming antivirus</span>
                    <span className={styles["feature-tag"]}>Zero lag</span>
                  </div>
                </div>

                <div className={styles["service-card"]}>
                  <div className={styles["service-card__icon"]}>🌡️</div>
                  <h4 className={styles["service-card__title"]}>Monitoreo Avanzado</h4>
                  <p className={styles["service-card__description"]}>
                    Control de temperaturas, voltajes y rendimiento en tiempo real
                  </p>
                  <div className={styles["service-card__features"]}>
                    <span className={styles["feature-tag"]}>MSI Afterburner</span>
                    <span className={styles["feature-tag"]}>HWiNFO64</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Value Proposition */}
        <div className={styles["service-modal__value"]}>
          <div className={styles["value-grid"]}>
            <div className={styles["value-item"]}>
              <div className={styles["value-icon"]}>🎯</div>
              <div className={styles["value-content"]}>
                <h4>Performance Garantizado</h4>
                <p>Aumento mínimo de 30% en FPS</p>
              </div>
            </div>
            <div className={styles["value-item"]}>
              <div className={styles["value-icon"]}>🏆</div>
              <div className={styles["value-content"]}>
                <h4>Configuración Pro</h4>
                <p>Settings utilizados por gamers profesionales</p>
              </div>
            </div>
            <div className={styles["value-item"]}>
              <div className={styles["value-icon"]}>🔧</div>
              <div className={styles["value-content"]}>
                <h4>Soporte Especializado</h4>
                <p>Asesoría continua para tu setup gaming</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className={styles["service-modal__footer"]}>
          <div className={styles["cta-content"]}>
            <h3 className={styles["cta-title"]}>¿Listo para dominar tus juegos?</h3>
            <p className={styles["cta-description"]}>
              Optimiza tu PC gaming ahora y experimenta el máximo rendimiento
            </p>
            <div className={styles["cta-actions"]}>
              <a
                href="http://wa.link/n8et4q"
                target="_blank"
                rel="noopener noreferrer"
                className={styles["cta-primary"]}
              >
                <span className={styles["cta-icon"]}>📱</span>
                <div className={styles["cta-text"]}>
                  <span className={styles["cta-main"]}>WhatsApp Gaming</span>
                  <span className={styles["cta-sub"]}>Consulta especializada</span>
                </div>
              </a>
              <a
                href="tel:+573001234567"
                className={styles["cta-secondary"]}
              >
                <span className={styles["cta-icon"]}>📞</span>
                <div className={styles["cta-text"]}>
                  <span className={styles["cta-main"]}>Llamar Ahora</span>
                  <span className={styles["cta-sub"]}>300 123 4567</span>
                </div>
              </a>
            </div>
            
            {/* Urgency Indicator */}
            <div className={styles["urgency-indicator"]}>
              <span className={styles["urgency-dot"]}></span>
              <span className={styles["urgency-text"]}>
                ¡Oferta especial! Diagnóstico gaming gratuito + 15% descuento en upgrades
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamingModal;