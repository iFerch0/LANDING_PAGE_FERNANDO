"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./ServiceModal.module.css";

interface CustomBuildModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CustomBuildModal: React.FC<CustomBuildModalProps> = ({ isOpen, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [activeTab, setActiveTab] = useState<'consultation' | 'assembly'>('consultation');

  // Imágenes del slider para ensamble personalizado
  const images = [
    "/img/antes-despues/2-ensamble-antes.jpg",
    "/img/antes-despues/2-ensamble-despues.jpg",
    "/img/pc-hogar-oficina/1.jpg",
    "/img/pc-hogar-oficina/2.jpg",
    "/img/pc-hogar-oficina/3.JPG",
    "/img/pc-hogar-oficina/4.JPG"
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
              <span className={styles["badge-icon"]}>🔧</span>
              <span>Ensamble Personalizado</span>
            </div>
            <h2 className={styles["hero-title"]}>
              Computadores a Medida
            </h2>
            <p className={styles["hero-subtitle"]}>
              Construcción de equipos personalizados según tus necesidades específicas con componentes de alta calidad
            </p>
            
            {/* Trust Indicators */}
            <div className={styles["trust-indicators"]}>
              <div className={styles["trust-item"]}>
                <span className={styles["trust-icon"]}>🎯</span>
                <span>Asesoría Especializada</span>
              </div>
              <div className={styles["trust-item"]}>
                <span className={styles["trust-icon"]}>⚙️</span>
                <span>Componentes Premium</span>
              </div>
              <div className={styles["trust-item"]}>
                <span className={styles["trust-icon"]}>🛡️</span>
                <span>Garantía Completa</span>
              </div>
            </div>

            {/* Custom Build Emphasis */}
            <div className={styles["license-emphasis"]}>
              <div className={styles["license-badge"]}>
                <span className={styles["license-icon"]}>🏆</span>
                <div className={styles["license-content"]}>
                  <h4>Equipos Únicos y Personalizados</h4>
                  <p>Cada build es diseñado específicamente para tus necesidades</p>
                </div>
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
                    alt={`Ensamble personalizado de computadores - Imagen ${index + 1}`}
                    fill
                    className={styles["slider-image"]}
                    priority={index === 0}
                  />
                  <div className={styles["slider-overlay"]}>
                    <div className={styles["slider-badge"]}>
                      <span className={styles["slider-badge-icon"]}>🔧</span>
                      <span>Build Personalizado #{index + 1}</span>
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
            className={`${styles["tab-button"]} ${activeTab === 'consultation' ? styles["active"] : ""}`}
            onClick={() => setActiveTab('consultation')}
          >
            <span className={styles["tab-icon"]}>💡</span>
            <span>Asesoría & Selección</span>
          </button>
          <button
            className={`${styles["tab-button"]} ${activeTab === 'assembly' ? styles["active"] : ""}`}
            onClick={() => setActiveTab('assembly')}
          >
            <span className={styles["tab-icon"]}>🔧</span>
            <span>Ensamble & Configuración</span>
          </button>
        </div>

        {/* Services Content */}
        <div className={styles["service-modal__body"]}>
          {/* Consultation & Selection */}
          {activeTab === 'consultation' && (
            <div className={styles["services-content"]}>
              <div className={styles["services-header"]}>
                <h3 className={styles["services-title"]}>
                  <span className={styles["services-icon"]}>💡</span>
                  Asesoría Previa & Selección de Componentes
                </h3>
                <p className={styles["services-description"]}>
                  Evaluación completa de necesidades y selección de los mejores componentes para tu presupuesto
                </p>
              </div>
              
              <div className={styles["services-grid"]}>
                <div className={styles["service-card"]}>
                  <div className={styles["service-card__icon"]}>🎯</div>
                  <h4 className={styles["service-card__title"]}>Evaluación de Necesidades</h4>
                  <p className={styles["service-card__description"]}>
                    Análisis detallado del uso previsto: oficina, gaming, diseño, programación o servidores
                  </p>
                  <div className={styles["service-card__features"]}>
                    <span className={styles["feature-tag"]}>Análisis personalizado</span>
                    <span className={styles["feature-tag"]}>Uso específico</span>
                  </div>
                </div>

                <div className={styles["service-card"]}>
                  <div className={styles["service-card__icon"]}>💰</div>
                  <h4 className={styles["service-card__title"]}>Recomendación por Presupuesto</h4>
                  <p className={styles["service-card__description"]}>
                    Selección de hardware optimizada según tu presupuesto y necesidades de rendimiento
                  </p>
                  <div className={styles["service-card__features"]}>
                    <span className={styles["feature-tag"]}>Mejor precio/rendimiento</span>
                    <span className={styles["feature-tag"]}>Presupuesto flexible</span>
                  </div>
                </div>

                <div className={styles["service-card"]}>
                  <div className={styles["service-card__icon"]}>⚖️</div>
                  <h4 className={styles["service-card__title"]}>Comparación de Marcas</h4>
                  <p className={styles["service-card__description"]}>
                    Análisis comparativo de marcas y componentes para mejor relación costo/beneficio
                  </p>
                  <div className={styles["service-card__features"]}>
                    <span className={styles["feature-tag"]}>Marcas premium</span>
                    <span className={styles["feature-tag"]}>Costo/beneficio</span>
                  </div>
                </div>

                <div className={styles["service-card"]}>
                  <div className={styles["service-card__icon"]}>🖥️</div>
                  <h4 className={styles["service-card__title"]}>Componentes Principales</h4>
                  <p className={styles["service-card__description"]}>
                    Selección de procesador, placa base, RAM, GPU y almacenamiento SSD/HDD
                  </p>
                  <div className={styles["service-card__features"]}>
                    <span className={styles["feature-tag"]}>CPU/GPU premium</span>
                    <span className={styles["feature-tag"]}>SSD rápido</span>
                  </div>
                </div>

                <div className={styles["service-card"]}>
                  <div className={styles["service-card__icon"]}>⚡</div>
                  <h4 className={styles["service-card__title"]}>Fuente de Poder Certificada</h4>
                  <p className={styles["service-card__description"]}>
                    Selección de PSU adecuada y certificada para garantizar estabilidad y eficiencia
                  </p>
                  <div className={styles["service-card__features"]}>
                    <span className={styles["feature-tag"]}>80+ Certified</span>
                    <span className={styles["feature-tag"]}>Modular</span>
                  </div>
                </div>

                <div className={styles["service-card"]}>
                  <div className={styles["service-card__icon"]}>🎨</div>
                  <h4 className={styles["service-card__title"]}>Gabinete & Periféricos</h4>
                  <p className={styles["service-card__description"]}>
                    Selección de case con buena ventilación, monitores, teclados, mouse y UPS
                  </p>
                  <div className={styles["service-card__features"]}>
                    <span className={styles["feature-tag"]}>Ventilación óptima</span>
                    <span className={styles["feature-tag"]}>Estética premium</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Assembly & Configuration */}
          {activeTab === 'assembly' && (
            <div className={styles["services-content"]}>
              <div className={styles["services-header"]}>
                <h3 className={styles["services-title"]}>
                  <span className={styles["services-icon"]}>🔧</span>
                  Ensamble Físico & Configuración Inicial
                </h3>
                <p className={styles["services-description"]}>
                  Montaje profesional con normas de seguridad y configuración optimizada para máximo rendimiento
                </p>
              </div>
              
              <div className={styles["services-grid"]}>
                <div className={styles["service-card"]}>
                  <div className={styles["service-card__icon"]}>🔧</div>
                  <h4 className={styles["service-card__title"]}>Armado Físico Profesional</h4>
                  <p className={styles["service-card__description"]}>
                    Montaje de componentes con normas de seguridad antiestática y técnicas profesionales
                  </p>
                  <div className={styles["service-card__features"]}>
                    <span className={styles["feature-tag"]}>Antiestático</span>
                    <span className={styles["feature-tag"]}>Técnicas pro</span>
                  </div>
                </div>

                <div className={styles["service-card"]}>
                  <div className={styles["service-card__icon"]}>🌊</div>
                  <h4 className={styles["service-card__title"]}>Cable Management</h4>
                  <p className={styles["service-card__description"]}>
                    Gestión profesional de cables para mejor flujo de aire y estética impecable
                  </p>
                  <div className={styles["service-card__features"]}>
                    <span className={styles["feature-tag"]}>Flujo de aire</span>
                    <span className={styles["feature-tag"]}>Estética limpia</span>
                  </div>
                </div>

                <div className={styles["service-card"]}>
                  <div className={styles["service-card__icon"]}>❄️</div>
                  <h4 className={styles["service-card__title"]}>Sistema de Refrigeración</h4>
                  <p className={styles["service-card__description"]}>
                    Instalación de sistemas de refrigeración por aire o líquida según necesidades
                  </p>
                  <div className={styles["service-card__features"]}>
                    <span className={styles["feature-tag"]}>Aire/Líquida</span>
                    <span className={styles["feature-tag"]}>Temperaturas óptimas</span>
                  </div>
                </div>

                <div className={styles["service-card"]}>
                  <div className={styles["service-card__icon"]}>🌈</div>
                  <h4 className={styles["service-card__title"]}>Iluminación RGB</h4>
                  <p className={styles["service-card__description"]}>
                    Integración de iluminación RGB y accesorios personalizados para un look único
                  </p>
                  <div className={styles["service-card__features"]}>
                    <span className={styles["feature-tag"]}>RGB sincronizado</span>
                    <span className={styles["feature-tag"]}>Personalizable</span>
                  </div>
                </div>

                <div className={styles["service-card"]}>
                  <div className={styles["service-card__icon"]}>💻</div>
                  <h4 className={styles["service-card__title"]}>Configuración Inicial</h4>
                  <p className={styles["service-card__description"]}>
                    Instalación de SO, drivers actualizados y configuración de BIOS/UEFI
                  </p>
                  <div className={styles["service-card__features"]}>
                    <span className={styles["feature-tag"]}>SO optimizado</span>
                    <span className={styles["feature-tag"]}>BIOS tuning</span>
                  </div>
                </div>

                <div className={styles["service-card"]}>
                  <div className={styles["service-card__icon"]}>📊</div>
                  <h4 className={styles["service-card__title"]}>Pruebas de Rendimiento</h4>
                  <p className={styles["service-card__description"]}>
                    Benchmarks, stress tests y pruebas de estabilidad y temperatura
                  </p>
                  <div className={styles["service-card__features"]}>
                    <span className={styles["feature-tag"]}>Stress tests</span>
                    <span className={styles["feature-tag"]}>Benchmarks</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Custom Build Guarantee Section */}
        <div className={styles["license-guarantee"]}>
          <div className={styles["guarantee-content"]}>
            <div className={styles["guarantee-icon"]}>🏆</div>
            <div className={styles["guarantee-text"]}>
              <h3>Garantía de Ensamblaje Profesional</h3>
              <p>
                Cada computador es ensamblado con los más altos estándares de calidad y precisión. 
                Ofrecemos garantía completa del ensamblaje, soporte postventa y documentación 
                detallada de las especificaciones finales del equipo.
              </p>
            </div>
          </div>
          
          <div className={styles["license-benefits"]}>
            <div className={styles["benefit-item"]}>
              <span className={styles["benefit-icon"]}>🛡️</span>
              <span>Garantía de ensamblaje</span>
            </div>
            <div className={styles["benefit-item"]}>
              <span className={styles["benefit-icon"]}>🔄</span>
              <span>Migración de datos</span>
            </div>
            <div className={styles["benefit-item"]}>
              <span className={styles["benefit-icon"]}>📋</span>
              <span>Documentación completa</span>
            </div>
            <div className={styles["benefit-item"]}>
              <span className={styles["benefit-icon"]}>🎯</span>
              <span>Soporte postventa</span>
            </div>
          </div>
        </div>

        {/* Value Proposition */}
        <div className={styles["service-modal__value"]}>
          <div className={styles["value-grid"]}>
            <div className={styles["value-item"]}>
              <div className={styles["value-icon"]}>🎯</div>
              <div className={styles["value-content"]}>
                <h4>Diseño Personalizado</h4>
                <p>Cada equipo diseñado específicamente para tus necesidades</p>
              </div>
            </div>
            <div className={styles["value-item"]}>
              <div className={styles["value-icon"]}>⚙️</div>
              <div className={styles["value-content"]}>
                <h4>Componentes Premium</h4>
                <p>Solo utilizamos componentes de marcas reconocidas y confiables</p>
              </div>
            </div>
            <div className={styles["value-item"]}>
              <div className={styles["value-icon"]}>🔧</div>
              <div className={styles["value-content"]}>
                <h4>Ensamblaje Profesional</h4>
                <p>Técnicas avanzadas y normas de seguridad en cada build</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className={styles["service-modal__footer"]}>
          <div className={styles["cta-content"]}>
            <h3 className={styles["cta-title"]}>¿Listo para tu computador ideal?</h3>
            <p className={styles["cta-description"]}>
              Construyamos juntos el equipo perfecto para tus necesidades específicas
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
                  <span className={styles["cta-main"]}>WhatsApp Build</span>
                  <span className={styles["cta-sub"]}>Asesoría personalizada</span>
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
                ¡Consulta gratuita! Diseña tu build personalizado sin compromiso
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomBuildModal;