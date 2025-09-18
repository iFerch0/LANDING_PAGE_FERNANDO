"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./ServiceModal.module.css";

interface SoftwareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SoftwareModal: React.FC<SoftwareModalProps> = ({ isOpen, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [activeTab, setActiveTab] = useState<'systems' | 'professional'>('systems');

  // Imágenes del slider para instalación de software
  const images = [
    "/img/modal-software/1.jpg",
    "/img/modal-software/2.jpg",
    "/img/modal-software/4.jpg",
    "/img/modal-software/5.jpg",
    "/img/modal-software/6.webp"
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
              <span className={styles["badge-icon"]}>💿</span>
              <span>Software Original</span>
            </div>
            <h2 className={styles["hero-title"]}>
              Instalación de Software
            </h2>
            <p className={styles["hero-subtitle"]}>
              Instalación profesional de software original con licencias auténticas y configuración optimizada
            </p>
            
            {/* Trust Indicators */}
            <div className={styles["trust-indicators"]}>
              <div className={styles["trust-item"]}>
                <span className={styles["trust-icon"]}>✅</span>
                <span>100% Software Original</span>
              </div>
              <div className={styles["trust-item"]}>
                <span className={styles["trust-icon"]}>🔐</span>
                <span>Licencias Auténticas</span>
              </div>
              <div className={styles["trust-item"]}>
                <span className={styles["trust-icon"]}>🛡️</span>
                <span>Seguridad Garantizada</span>
              </div>
            </div>

            {/* License Emphasis */}
            <div className={styles["license-emphasis"]}>
              <div className={styles["license-badge"]}>
                <span className={styles["license-icon"]}>🏅</span>
                <div className={styles["license-content"]}>
                  <h4>Licencias Originales Disponibles</h4>
                  <p>Ofrecemos licencias auténticas de Microsoft, Adobe y más</p>
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
                    alt={`Instalación profesional de software - Imagen ${index + 1}`}
                    fill
                    className={styles["slider-image"]}
                    priority={index === 0}
                  />
                  <div className={styles["slider-overlay"]}>
                    <div className={styles["slider-badge"]}>
                      <span className={styles["slider-badge-icon"]}>💿</span>
                      <span>Instalación Profesional #{index + 1}</span>
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
            className={`${styles["tab-button"]} ${activeTab === 'systems' ? styles["active"] : ""}`}
            onClick={() => setActiveTab('systems')}
          >
            <span className={styles["tab-icon"]}>💻</span>
            <span>Sistemas & Productividad</span>
          </button>
          <button
            className={`${styles["tab-button"]} ${activeTab === 'professional' ? styles["active"] : ""}`}
            onClick={() => setActiveTab('professional')}
          >
            <span className={styles["tab-icon"]}>🎨</span>
            <span>Profesional & Multimedia</span>
          </button>
        </div>

        {/* Services Content */}
        <div className={styles["service-modal__body"]}>
          {/* Systems & Productivity */}
          {activeTab === 'systems' && (
            <div className={styles["services-content"]}>
              <div className={styles["services-header"]}>
                <h3 className={styles["services-title"]}>
                  <span className={styles["services-icon"]}>💻</span>
                  Sistemas & Productividad
                </h3>
                <p className={styles["services-description"]}>
                  Instalación de sistemas operativos y software esencial con licencias originales
                </p>
              </div>
              
              <div className={styles["services-grid"]}>
                <div className={styles["service-card"]}>
                  <div className={styles["service-card__icon"]}>🖥️</div>
                  <h4 className={styles["service-card__title"]}>Sistemas Operativos</h4>
                  <p className={styles["service-card__description"]}>
                    Windows, Linux y macOS con licencias originales y configuración completa
                  </p>
                  <div className={styles["service-card__features"]}>
                    <span className={styles["feature-tag"]}>Licencia original</span>
                    <span className={styles["feature-tag"]}>Drivers incluidos</span>
                  </div>
                </div>

                <div className={styles["service-card"]}>
                  <div className={styles["service-card__icon"]}>📊</div>
                  <h4 className={styles["service-card__title"]}>Microsoft Office</h4>
                  <p className={styles["service-card__description"]}>
                    Suite completa de Office con licencia original y configuración
                  </p>
                  <div className={styles["service-card__features"]}>
                    <span className={styles["feature-tag"]}>Office 365</span>
                    <span className={styles["feature-tag"]}>Licencia auténtica</span>
                  </div>
                </div>

                <div className={styles["service-card"]}>
                  <div className={styles["service-card__icon"]}>🛡️</div>
                  <h4 className={styles["service-card__title"]}>Seguridad Completa</h4>
                  <p className={styles["service-card__description"]}>
                    Antivirus premium, firewall y protección contra malware
                  </p>
                  <div className={styles["service-card__features"]}>
                    <span className={styles["feature-tag"]}>Antivirus premium</span>
                    <span className={styles["feature-tag"]}>Firewall avanzado</span>
                  </div>
                </div>

                <div className={styles["service-card"]}>
                  <div className={styles["service-card__icon"]}>🌐</div>
                  <h4 className={styles["service-card__title"]}>Navegadores & Email</h4>
                  <p className={styles["service-card__description"]}>
                    Chrome, Firefox, Edge y configuración de correo electrónico
                  </p>
                  <div className={styles["service-card__features"]}>
                    <span className={styles["feature-tag"]}>Outlook configurado</span>
                    <span className={styles["feature-tag"]}>Sincronización</span>
                  </div>
                </div>

                <div className={styles["service-card"]}>
                  <div className={styles["service-card__icon"]}>💾</div>
                  <h4 className={styles["service-card__title"]}>Respaldo & Recuperación</h4>
                  <p className={styles["service-card__description"]}>
                    Software de backup automático y recuperación de datos
                  </p>
                  <div className={styles["service-card__features"]}>
                    <span className={styles["feature-tag"]}>Backup automático</span>
                    <span className={styles["feature-tag"]}>Cloud sync</span>
                  </div>
                </div>

                <div className={styles["service-card"]}>
                  <div className={styles["service-card__icon"]}>⚙️</div>
                  <h4 className={styles["service-card__title"]}>Optimización Sistema</h4>
                  <p className={styles["service-card__description"]}>
                    Configuración de arranque, actualizaciones y rendimiento
                  </p>
                  <div className={styles["service-card__features"]}>
                    <span className={styles["feature-tag"]}>Auto-updates</span>
                    <span className={styles["feature-tag"]}>Boot optimizado</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Professional & Multimedia */}
          {activeTab === 'professional' && (
            <div className={styles["services-content"]}>
              <div className={styles["services-header"]}>
                <h3 className={styles["services-title"]}>
                  <span className={styles["services-icon"]}>🎨</span>
                  Software Profesional & Multimedia
                </h3>
                <p className={styles["services-description"]}>
                  Herramientas especializadas para diseño, desarrollo y entretenimiento
                </p>
              </div>
              
              <div className={styles["services-grid"]}>
                <div className={styles["service-card"]}>
                  <div className={styles["service-card__icon"]}>🎨</div>
                  <h4 className={styles["service-card__title"]}>Adobe Creative Cloud</h4>
                  <p className={styles["service-card__description"]}>
                    Photoshop, Illustrator, Premiere Pro con licencias originales
                  </p>
                  <div className={styles["service-card__features"]}>
                    <span className={styles["feature-tag"]}>Licencia original</span>
                    <span className={styles["feature-tag"]}>Cloud sync</span>
                  </div>
                </div>

                <div className={styles["service-card"]}>
                  <div className={styles["service-card__icon"]}>📐</div>
                  <h4 className={styles["service-card__title"]}>AutoCAD & Diseño</h4>
                  <p className={styles["service-card__description"]}>
                    Software de diseño técnico y arquitectónico profesional
                  </p>
                  <div className={styles["service-card__features"]}>
                    <span className={styles["feature-tag"]}>AutoCAD original</span>
                    <span className={styles["feature-tag"]}>CorelDraw</span>
                  </div>
                </div>

                <div className={styles["service-card"]}>
                  <div className={styles["service-card__icon"]}>💻</div>
                  <h4 className={styles["service-card__title"]}>Desarrollo & IDEs</h4>
                  <p className={styles["service-card__description"]}>
                    Visual Studio, Eclipse, entornos de programación completos
                  </p>
                  <div className={styles["service-card__features"]}>
                    <span className={styles["feature-tag"]}>VS Code Pro</span>
                    <span className={styles["feature-tag"]}>Node.js/Python</span>
                  </div>
                </div>

                <div className={styles["service-card"]}>
                  <div className={styles["service-card__icon"]}>🖥️</div>
                  <h4 className={styles["service-card__title"]}>Virtualización</h4>
                  <p className={styles["service-card__description"]}>
                    VMware, VirtualBox, Hyper-V para entornos virtuales
                  </p>
                  <div className={styles["service-card__features"]}>
                    <span className={styles["feature-tag"]}>VMware Pro</span>
                    <span className={styles["feature-tag"]}>Multi-OS</span>
                  </div>
                </div>

                <div className={styles["service-card"]}>
                  <div className={styles["service-card__icon"]}>🎵</div>
                  <h4 className={styles["service-card__title"]}>Multimedia & Streaming</h4>
                  <p className={styles["service-card__description"]}>
                    Editores de video, audio y plataformas de entretenimiento
                  </p>
                  <div className={styles["service-card__features"]}>
                    <span className={styles["feature-tag"]}>Video editing</span>
                    <span className={styles["feature-tag"]}>Audio pro</span>
                  </div>
                </div>

                <div className={styles["service-card"]}>
                  <div className={styles["service-card__icon"]}>🎓</div>
                  <h4 className={styles["service-card__title"]}>Capacitación Incluida</h4>
                  <p className={styles["service-card__description"]}>
                    Entrenamiento básico en el uso del software instalado
                  </p>
                  <div className={styles["service-card__features"]}>
                    <span className={styles["feature-tag"]}>Tutorial personal</span>
                    <span className={styles["feature-tag"]}>Documentación</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* License Guarantee Section */}
        <div className={styles["license-guarantee"]}>
          <div className={styles["guarantee-content"]}>
            <div className={styles["guarantee-icon"]}>🏆</div>
            <div className={styles["guarantee-text"]}>
              <h3>Garantía de Software Original</h3>
              <p>
                Todos nuestros software incluyen licencias auténticas y originales. 
                No utilizamos software pirata ni crackeado. Protege tu equipo y datos 
                con software legítimo y actualizaciones oficiales.
              </p>
            </div>
          </div>
          
          <div className={styles["license-benefits"]}>
            <div className={styles["benefit-item"]}>
              <span className={styles["benefit-icon"]}>✅</span>
              <span>Actualizaciones oficiales</span>
            </div>
            <div className={styles["benefit-item"]}>
              <span className={styles["benefit-icon"]}>🛡️</span>
              <span>Soporte técnico del fabricante</span>
            </div>
            <div className={styles["benefit-item"]}>
              <span className={styles["benefit-icon"]}>🔒</span>
              <span>Sin riesgos de malware</span>
            </div>
            <div className={styles["benefit-item"]}>
              <span className={styles["benefit-icon"]}>⚖️</span>
              <span>Cumplimiento legal total</span>
            </div>
          </div>
        </div>

        {/* Value Proposition */}
        <div className={styles["service-modal__value"]}>
          <div className={styles["value-grid"]}>
            <div className={styles["value-item"]}>
              <div className={styles["value-icon"]}>💿</div>
              <div className={styles["value-content"]}>
                <h4>Software Original</h4>
                <p>Solo utilizamos licencias auténticas y legales</p>
              </div>
            </div>
            <div className={styles["value-item"]}>
              <div className={styles["value-icon"]}>🔧</div>
              <div className={styles["value-content"]}>
                <h4>Configuración Experta</h4>
                <p>Optimización profesional para máximo rendimiento</p>
              </div>
            </div>
            <div className={styles["value-item"]}>
              <div className={styles["value-icon"]}>🎓</div>
              <div className={styles["value-content"]}>
                <h4>Capacitación Incluida</h4>
                <p>Te enseñamos a usar el software instalado</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className={styles["service-modal__footer"]}>
          <div className={styles["cta-content"]}>
            <h3 className={styles["cta-title"]}>¿Necesitas software profesional?</h3>
            <p className={styles["cta-description"]}>
              Instala software original con licencias auténticas y configuración experta
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
                  <span className={styles["cta-main"]}>WhatsApp Software</span>
                  <span className={styles["cta-sub"]}>Consulta de licencias</span>
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
                ¡Promoción especial! Licencias originales con 20% descuento este mes
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoftwareModal;