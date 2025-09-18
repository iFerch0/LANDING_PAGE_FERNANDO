"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./ServiceModal.module.css";

interface DataRecoveryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DataRecoveryModal: React.FC<DataRecoveryModalProps> = ({ isOpen, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [activeTab, setActiveTab] = useState<'recovery' | 'backup'>('recovery');

  // Imágenes del slider para recuperación de datos
  const images = [
    "/img/modal-recuperacion/1.webp",
    "/img/modal-recuperacion/2.webp",
    "/img/modal-recuperacion/4.jpg"
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
              <span>Recuperación de Datos</span>
            </div>
            <h2 className={styles["hero-title"]}>
              Recuperación y Respaldo de Datos
            </h2>
            <p className={styles["hero-subtitle"]}>
              Servicios especializados en recuperación de archivos perdidos y sistemas de respaldo preventivo para proteger tu información
            </p>
            
            {/* Trust Indicators */}
            <div className={styles["trust-indicators"]}>
              <div className={styles["trust-item"]}>
                <span className={styles["trust-icon"]}>🔒</span>
                <span>Manejo Confidencial</span>
              </div>
              <div className={styles["trust-item"]}>
                <span className={styles["trust-icon"]}>📊</span>
                <span>Informe Detallado</span>
              </div>
              <div className={styles["trust-item"]}>
                <span className={styles["trust-icon"]}>🛡️</span>
                <span>Garantía de Seguridad</span>
              </div>
            </div>

            {/* Data Recovery Emphasis */}
            <div className={styles["license-emphasis"]}>
              <div className={styles["license-badge"]}>
                <span className={styles["license-icon"]}>🔄</span>
                <div className={styles["license-content"]}>
                  <h4>Recuperación Profesional Garantizada</h4>
                  <p>Técnicas avanzadas para recuperar datos críticos perdidos</p>
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
                    alt={`Recuperación de datos profesional - Imagen ${index + 1}`}
                    fill
                    className={styles["slider-image"]}
                    priority={index === 0}
                  />
                  <div className={styles["slider-overlay"]}>
                    <div className={styles["slider-badge"]}>
                      <span className={styles["slider-badge-icon"]}>💿</span>
                      <span>Recuperación Datos #{index + 1}</span>
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
            className={`${styles["tab-button"]} ${activeTab === 'recovery' ? styles["active"] : ""}`}
            onClick={() => setActiveTab('recovery')}
          >
            <span className={styles["tab-icon"]}>🔄</span>
            <span>Recuperación de Datos</span>
          </button>
          <button
            className={`${styles["tab-button"]} ${activeTab === 'backup' ? styles["active"] : ""}`}
            onClick={() => setActiveTab('backup')}
          >
            <span className={styles["tab-icon"]}>💾</span>
            <span>Respaldo Preventivo</span>
          </button>
        </div>

        {/* Services Content */}
        <div className={styles["service-modal__body"]}>
          {/* Data Recovery */}
          {activeTab === 'recovery' && (
            <div className={styles["services-content"]}>
              <div className={styles["services-header"]}>
                <h3 className={styles["services-title"]}>
                  <span className={styles["services-icon"]}>🔄</span>
                  Recuperación de Datos Perdidos
                </h3>
                <p className={styles["services-description"]}>
                  Restauración profesional de archivos eliminados, particiones dañadas y datos corruptos
                </p>
              </div>
              
              <div className={styles["services-grid"]}>
                <div className={styles["service-card"]}>
                  <div className={styles["service-card__icon"]}>🗂️</div>
                  <h4 className={styles["service-card__title"]}>Archivos Eliminados</h4>
                  <p className={styles["service-card__description"]}>
                    Restauración de archivos eliminados accidentalmente del disco duro o papelera
                  </p>
                  <div className={styles["service-card__features"]}>
                    <span className={styles["feature-tag"]}>Eliminación accidental</span>
                    <span className={styles["feature-tag"]}>Papelera vaciada</span>
                  </div>
                </div>

                <div className={styles["service-card"]}>
                  <div className={styles["service-card__icon"]}>💾</div>
                  <h4 className={styles["service-card__title"]}>Memorias USB y SD</h4>
                  <p className={styles["service-card__description"]}>
                    Extracción de datos de memorias USB y tarjetas SD corruptas o dañadas
                  </p>
                  <div className={styles["service-card__features"]}>
                    <span className={styles["feature-tag"]}>USB corrupta</span>
                    <span className={styles["feature-tag"]}>SD dañada</span>
                  </div>
                </div>

                <div className={styles["service-card"]}>
                  <div className={styles["service-card__icon"]}>🔧</div>
                  <h4 className={styles["service-card__title"]}>Particiones Perdidas</h4>
                  <p className={styles["service-card__description"]}>
                    Reconstrucción de particiones perdidas o dañadas por errores del sistema
                  </p>
                  <div className={styles["service-card__features"]}>
                    <span className={styles["feature-tag"]}>Partición perdida</span>
                    <span className={styles["feature-tag"]}>Tabla dañada</span>
                  </div>
                </div>

                <div className={styles["service-card"]}>
                  <div className={styles["service-card__icon"]}>💻</div>
                  <h4 className={styles["service-card__title"]}>Sistemas Formateados</h4>
                  <p className={styles["service-card__description"]}>
                    Recuperación de datos en equipos que han sido formateados accidentalmente
                  </p>
                  <div className={styles["service-card__features"]}>
                    <span className={styles["feature-tag"]}>Formateo accidental</span>
                    <span className={styles["feature-tag"]}>Datos críticos</span>
                  </div>
                </div>

                <div className={styles["service-card"]}>
                  <div className={styles["service-card__icon"]}>📸</div>
                  <h4 className={styles["service-card__title"]}>Fotos y Documentos</h4>
                  <p className={styles["service-card__description"]}>
                    Recuperación especializada de fotos familiares y documentos importantes
                  </p>
                  <div className={styles["service-card__features"]}>
                    <span className={styles["feature-tag"]}>Fotos familiares</span>
                    <span className={styles["feature-tag"]}>Documentos únicos</span>
                  </div>
                </div>

                <div className={styles["service-card"]}>
                  <div className={styles["service-card__icon"]}>🏢</div>
                  <h4 className={styles["service-card__title"]}>Soluciones Empresariales</h4>
                  <p className={styles["service-card__description"]}>
                    Recuperación de datos críticos en servidores y sistemas empresariales
                  </p>
                  <div className={styles["service-card__features"]}>
                    <span className={styles["feature-tag"]}>Servidores</span>
                    <span className={styles["feature-tag"]}>Sistemas críticos</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Preventive Backup */}
          {activeTab === 'backup' && (
            <div className={styles["services-content"]}>
              <div className={styles["services-header"]}>
                <h3 className={styles["services-title"]}>
                  <span className={styles["services-icon"]}>💾</span>
                  Respaldo Preventivo y Protección de Datos
                </h3>
                <p className={styles["services-description"]}>
                  Sistemas de respaldo automático y estrategias preventivas para proteger tu información
                </p>
              </div>
              
              <div className={styles["services-grid"]}>
                <div className={styles["service-card"]}>
                  <div className={styles["service-card__icon"]}>⚙️</div>
                  <h4 className={styles["service-card__title"]}>Respaldo Automático</h4>
                  <p className={styles["service-card__description"]}>
                    Configuración de copias de seguridad automáticas locales y en la nube
                  </p>
                  <div className={styles["service-card__features"]}>
                    <span className={styles["feature-tag"]}>Local + Nube</span>
                    <span className={styles["feature-tag"]}>Automático</span>
                  </div>
                </div>

                <div className={styles["service-card"]}>
                  <div className={styles["service-card__icon"]}>💿</div>
                  <h4 className={styles["service-card__title"]}>Clonación de Discos</h4>
                  <p className={styles["service-card__description"]}>
                    Clonación completa de discos duros para migración segura de datos
                  </p>
                  <div className={styles["service-card__features"]}>
                    <span className={styles["feature-tag"]}>Clonación completa</span>
                    <span className={styles["feature-tag"]}>Migración segura</span>
                  </div>
                </div>

                <div className={styles["service-card"]}>
                  <div className={styles["service-card__icon"]}>🛡️</div>
                  <h4 className={styles["service-card__title"]}>Sistemas RAID</h4>
                  <p className={styles["service-card__description"]}>
                    Implementación de sistemas RAID para mayor seguridad y redundancia
                  </p>
                  <div className={styles["service-card__features"]}>
                    <span className={styles["feature-tag"]}>RAID 1/5/10</span>
                    <span className={styles["feature-tag"]}>Redundancia</span>
                  </div>
                </div>

                <div className={styles["service-card"]}>
                  <div className={styles["service-card__icon"]}>📊</div>
                  <h4 className={styles["service-card__title"]}>Respaldos Incrementales</h4>
                  <p className={styles["service-card__description"]}>
                    Programación de respaldos incrementales y diferenciales optimizados
                  </p>
                  <div className={styles["service-card__features"]}>
                    <span className={styles["feature-tag"]}>Incremental</span>
                    <span className={styles["feature-tag"]}>Diferencial</span>
                  </div>
                </div>

                <div className={styles["service-card"]}>
                  <div className={styles["service-card__icon"]}>🌐</div>
                  <h4 className={styles["service-card__title"]}>Almacenamiento NAS</h4>
                  <p className={styles["service-card__description"]}>
                    Configuración de NAS, servidores y servicios en la nube para respaldo
                  </p>
                  <div className={styles["service-card__features"]}>
                    <span className={styles["feature-tag"]}>NAS/Servidor</span>
                    <span className={styles["feature-tag"]}>Cloud storage</span>
                  </div>
                </div>

                <div className={styles["service-card"]}>
                  <div className={styles["service-card__icon"]}>🏢</div>
                  <h4 className={styles["service-card__title"]}>Backup Empresarial</h4>
                  <p className={styles["service-card__description"]}>
                    Soluciones de respaldo para empresas con servidores y sistemas críticos
                  </p>
                  <div className={styles["service-card__features"]}>
                    <span className={styles["feature-tag"]}>Servidores</span>
                    <span className={styles["feature-tag"]}>Sistemas críticos</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Data Security Guarantee Section */}
        <div className={styles["license-guarantee"]}>
          <div className={styles["guarantee-content"]}>
            <div className={styles["guarantee-icon"]}>🔒</div>
            <div className={styles["guarantee-text"]}>
              <h3>Garantía y Seguridad de Datos</h3>
              <p>
                Manejamos tu información con la máxima confidencialidad y seguridad. 
                Proporcionamos informes detallados del estado de los archivos y porcentaje de éxito. 
                Ofrecemos múltiples opciones de entrega para tu comodidad y seguridad.
              </p>
            </div>
          </div>
          
          <div className={styles["license-benefits"]}>
            <div className={styles["benefit-item"]}>
              <span className={styles["benefit-icon"]}>🔒</span>
              <span>Manejo confidencial</span>
            </div>
            <div className={styles["benefit-item"]}>
              <span className={styles["benefit-icon"]}>📊</span>
              <span>Informe detallado</span>
            </div>
            <div className={styles["benefit-item"]}>
              <span className={styles["benefit-icon"]}>💾</span>
              <span>Múltiples opciones de entrega</span>
            </div>
            <div className={styles["benefit-item"]}>
              <span className={styles["benefit-icon"]}>✅</span>
              <span>Porcentaje de éxito garantizado</span>
            </div>
          </div>
        </div>

        {/* Value Proposition */}
        <div className={styles["service-modal__value"]}>
          <div className={styles["value-grid"]}>
            <div className={styles["value-item"]}>
              <div className={styles["value-icon"]}>🔄</div>
              <div className={styles["value-content"]}>
                <h4>Recuperación Avanzada</h4>
                <p>Técnicas especializadas para casos complejos de pérdida de datos</p>
              </div>
            </div>
            <div className={styles["value-item"]}>
              <div className={styles["value-icon"]}>🛡️</div>
              <div className={styles["value-content"]}>
                <h4>Prevención Inteligente</h4>
                <p>Sistemas de respaldo automatizados para evitar pérdidas futuras</p>
              </div>
            </div>
            <div className={styles["value-item"]}>
              <div className={styles["value-icon"]}>🔒</div>
              <div className={styles["value-content"]}>
                <h4>Seguridad Total</h4>
                <p>Manejo confidencial y seguro de toda tu información</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className={styles["service-modal__footer"]}>
          <div className={styles["cta-content"]}>
            <h3 className={styles["cta-title"]}>¿Perdiste datos importantes?</h3>
            <p className={styles["cta-description"]}>
              No te preocupes, nuestros expertos pueden recuperar tu información valiosa
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
                  <span className={styles["cta-main"]}>WhatsApp Urgente</span>
                  <span className={styles["cta-sub"]}>Recuperación inmediata</span>
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
                ¡Tiempo crítico! Mientras más rápido actúes, mayor probabilidad de recuperación
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataRecoveryModal;