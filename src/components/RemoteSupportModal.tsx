"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./ServiceModal.module.css";

interface RemoteSupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RemoteSupportModal: React.FC<RemoteSupportModalProps> = ({ isOpen, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [activeTab, setActiveTab] = useState<'assistance' | 'maintenance'>('assistance');

  // Imágenes del slider para soporte remoto
  const images = [
    "/img/modal-asistencia-remota/1.jpg",
    "/img/modal-asistencia-remota/3.webp"
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
              <span className={styles["badge-icon"]}>🌐</span>
              <span>Soporte Remoto</span>
            </div>
            <h2 className={styles["hero-title"]}>
              Asistencia Técnica en Línea
            </h2>
            <p className={styles["hero-subtitle"]}>
              Resolución de problemas técnicos desde cualquier lugar con conexión remota segura y profesional
            </p>
            
            {/* Trust Indicators */}
            <div className={styles["trust-indicators"]}>
              <div className={styles["trust-item"]}>
                <span className={styles["trust-icon"]}>🔒</span>
                <span>Conexión Segura</span>
              </div>
              <div className={styles["trust-item"]}>
                <span className={styles["trust-icon"]}>⚡</span>
                <span>Respuesta Inmediata</span>
              </div>
              <div className={styles["trust-item"]}>
                <span className={styles["trust-icon"]}>🌍</span>
                <span>Nacional e Internacional</span>
              </div>
            </div>

            {/* Remote Support Emphasis */}
            <div className={styles["license-emphasis"]}>
              <div className={styles["license-badge"]}>
                <span className={styles["license-icon"]}>🎯</span>
                <div className={styles["license-content"]}>
                  <h4>Atención Personalizada 24/7</h4>
                  <p>Soporte técnico especializado en horarios extendidos</p>
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
                    alt={`Soporte remoto profesional - Imagen ${index + 1}`}
                    fill
                    className={styles["slider-image"]}
                    priority={index === 0}
                  />
                  <div className={styles["slider-overlay"]}>
                    <div className={styles["slider-badge"]}>
                      <span className={styles["slider-badge-icon"]}>🌐</span>
                      <span>Soporte Remoto #{index + 1}</span>
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
            className={`${styles["tab-button"]} ${activeTab === 'assistance' ? styles["active"] : ""}`}
            onClick={() => setActiveTab('assistance')}
          >
            <span className={styles["tab-icon"]}>🛠️</span>
            <span>Asistencia & Diagnóstico</span>
          </button>
          <button
            className={`${styles["tab-button"]} ${activeTab === 'maintenance' ? styles["active"] : ""}`}
            onClick={() => setActiveTab('maintenance')}
          >
            <span className={styles["tab-icon"]}>🔧</span>
            <span>Mantenimiento & Prevención</span>
          </button>
        </div>

        {/* Services Content */}
        <div className={styles["service-modal__body"]}>
          {/* Assistance & Diagnostic */}
          {activeTab === 'assistance' && (
            <div className={styles["services-content"]}>
              <div className={styles["services-header"]}>
                <h3 className={styles["services-title"]}>
                  <span className={styles["services-icon"]}>🛠️</span>
                  Asistencia Técnica & Diagnóstico
                </h3>
                <p className={styles["services-description"]}>
                  Resolución inmediata de problemas técnicos mediante conexión remota segura
                </p>
              </div>
              
              <div className={styles["services-grid"]}>
                <div className={styles["service-card"]}>
                  <div className={styles["service-card__icon"]}>🌐</div>
                  <h4 className={styles["service-card__title"]}>Asistencia Técnica en Línea</h4>
                  <p className={styles["service-card__description"]}>
                    Resolución de problemas de software mediante conexión remota segura
                  </p>
                  <div className={styles["service-card__features"]}>
                    <span className={styles["feature-tag"]}>Conexión segura</span>
                    <span className={styles["feature-tag"]}>Tiempo real</span>
                  </div>
                </div>

                <div className={styles["service-card"]}>
                  <div className={styles["service-card__icon"]}>⚡</div>
                  <h4 className={styles["service-card__title"]}>Optimización de Rendimiento</h4>
                  <p className={styles["service-card__description"]}>
                    Revisión y optimización del rendimiento del sistema en tiempo real
                  </p>
                  <div className={styles["service-card__features"]}>
                    <span className={styles["feature-tag"]}>Análisis completo</span>
                    <span className={styles["feature-tag"]}>Mejora inmediata</span>
                  </div>
                </div>

                <div className={styles["service-card"]}>
                  <div className={styles["service-card__icon"]}>⚙️</div>
                  <h4 className={styles["service-card__title"]}>Configuración de Aplicaciones</h4>
                  <p className={styles["service-card__description"]}>
                    Configuración de aplicaciones y programas bajo demanda del cliente
                  </p>
                  <div className={styles["service-card__features"]}>
                    <span className={styles["feature-tag"]}>Personalizado</span>
                    <span className={styles["feature-tag"]}>Bajo demanda</span>
                  </div>
                </div>

                <div className={styles["service-card"]}>
                  <div className={styles["service-card__icon"]}>📧</div>
                  <h4 className={styles["service-card__title"]}>Configuración de Email</h4>
                  <p className={styles["service-card__description"]}>
                    Configuración de correo electrónico y cuentas en la nube
                  </p>
                  <div className={styles["service-card__features"]}>
                    <span className={styles["feature-tag"]}>Outlook/Gmail</span>
                    <span className={styles["feature-tag"]}>Cloud sync</span>
                  </div>
                </div>

                <div className={styles["service-card"]}>
                  <div className={styles["service-card__icon"]}>🎓</div>
                  <h4 className={styles["service-card__title"]}>Tutoriales en Tiempo Real</h4>
                  <p className={styles["service-card__description"]}>
                    Tutoriales guiados en tiempo real para el usuario
                  </p>
                  <div className={styles["service-card__features"]}>
                    <span className={styles["feature-tag"]}>Interactivo</span>
                    <span className={styles["feature-tag"]}>Paso a paso</span>
                  </div>
                </div>

                <div className={styles["service-card"]}>
                  <div className={styles["service-card__icon"]}>🎯</div>
                  <h4 className={styles["service-card__title"]}>Capacitación Rápida</h4>
                  <p className={styles["service-card__description"]}>
                    Capacitación rápida en uso de aplicaciones o herramientas
                  </p>
                  <div className={styles["service-card__features"]}>
                    <span className={styles["feature-tag"]}>Personalizada</span>
                    <span className={styles["feature-tag"]}>Práctica</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Maintenance & Prevention */}
          {activeTab === 'maintenance' && (
            <div className={styles["services-content"]}>
              <div className={styles["services-header"]}>
                <h3 className={styles["services-title"]}>
                  <span className={styles["services-icon"]}>🔧</span>
                  Mantenimiento & Servicios Preventivos
                </h3>
                <p className={styles["services-description"]}>
                  Mantenimiento preventivo y monitoreo continuo para óptimo rendimiento
                </p>
              </div>
              
              <div className={styles["services-grid"]}>
                <div className={styles["service-card"]}>
                  <div className={styles["service-card__icon"]}>🛡️</div>
                  <h4 className={styles["service-card__title"]}>Diagnóstico y Mantenimiento</h4>
                  <p className={styles["service-card__description"]}>
                    Escaneo y eliminación de virus y malware de forma remota
                  </p>
                  <div className={styles["service-card__features"]}>
                    <span className={styles["feature-tag"]}>Antivirus completo</span>
                    <span className={styles["feature-tag"]}>Malware removal</span>
                  </div>
                </div>

                <div className={styles["service-card"]}>
                  <div className={styles["service-card__icon"]}>🧹</div>
                  <h4 className={styles["service-card__title"]}>Limpieza Digital</h4>
                  <p className={styles["service-card__description"]}>
                    Limpieza de archivos temporales y basura digital del sistema
                  </p>
                  <div className={styles["service-card__features"]}>
                    <span className={styles["feature-tag"]}>Temp files</span>
                    <span className={styles["feature-tag"]}>Registry clean</span>
                  </div>
                </div>

                <div className={styles["service-card"]}>
                  <div className={styles["service-card__icon"]}>🔄</div>
                  <h4 className={styles["service-card__title"]}>Actualizaciones</h4>
                  <p className={styles["service-card__description"]}>
                    Actualización de controladores y parches de seguridad
                  </p>
                  <div className={styles["service-card__features"]}>
                    <span className={styles["feature-tag"]}>Drivers update</span>
                    <span className={styles["feature-tag"]}>Security patches</span>
                  </div>
                </div>

                <div className={styles["service-card"]}>
                  <div className={styles["service-card__icon"]}>📊</div>
                  <h4 className={styles["service-card__title"]}>Monitoreo Periódico</h4>
                  <p className={styles["service-card__description"]}>
                    Monitoreo periódico del estado de los equipos
                  </p>
                  <div className={styles["service-card__features"]}>
                    <span className={styles["feature-tag"]}>Health check</span>
                    <span className={styles["feature-tag"]}>Performance</span>
                  </div>
                </div>

                <div className={styles["service-card"]}>
                  <div className={styles["service-card__icon"]}>💾</div>
                  <h4 className={styles["service-card__title"]}>Respaldo Remoto</h4>
                  <p className={styles["service-card__description"]}>
                    Respaldo remoto de archivos importantes del usuario
                  </p>
                  <div className={styles["service-card__features"]}>
                    <span className={styles["feature-tag"]}>Cloud backup</span>
                    <span className={styles["feature-tag"]}>Automático</span>
                  </div>
                </div>

                <div className={styles["service-card"]}>
                  <div className={styles["service-card__icon"]}>📋</div>
                  <h4 className={styles["service-card__title"]}>Revisión de Logs</h4>
                  <p className={styles["service-card__description"]}>
                    Revisión de logs y alertas del sistema para prevenir problemas
                  </p>
                  <div className={styles["service-card__features"]}>
                    <span className={styles["feature-tag"]}>System logs</span>
                    <span className={styles["feature-tag"]}>Alertas</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Remote Support Guarantee Section */}
        <div className={styles["license-guarantee"]}>
          <div className={styles["guarantee-content"]}>
            <div className={styles["guarantee-icon"]}>🌐</div>
            <div className={styles["guarantee-text"]}>
              <h3>Soporte Remoto Profesional</h3>
              <p>
                Ofrecemos asistencia técnica remota segura y confiable desde cualquier lugar del mundo. 
                Nuestro equipo especializado resuelve problemas técnicos sin necesidad de visitas presenciales, 
                ahorrando tiempo y costos.
              </p>
            </div>
          </div>
          
          <div className={styles["license-benefits"]}>
            <div className={styles["benefit-item"]}>
              <span className={styles["benefit-icon"]}>🔒</span>
              <span>Conexión 100% segura</span>
            </div>
            <div className={styles["benefit-item"]}>
              <span className={styles["benefit-icon"]}>⚡</span>
              <span>Respuesta inmediata</span>
            </div>
            <div className={styles["benefit-item"]}>
              <span className={styles["benefit-icon"]}>🌍</span>
              <span>Cobertura internacional</span>
            </div>
            <div className={styles["benefit-item"]}>
              <span className={styles["benefit-icon"]}>💰</span>
              <span>Ahorro en desplazamientos</span>
            </div>
          </div>
        </div>

        {/* Value Proposition */}
        <div className={styles["service-modal__value"]}>
          <div className={styles["value-grid"]}>
            <div className={styles["value-item"]}>
              <div className={styles["value-icon"]}>🌐</div>
              <div className={styles["value-content"]}>
                <h4>Acceso Remoto Seguro</h4>
                <p>Conexión encriptada y protocolos de seguridad avanzados</p>
              </div>
            </div>
            <div className={styles["value-item"]}>
              <div className={styles["value-icon"]}>⏰</div>
              <div className={styles["value-content"]}>
                <h4>Horarios Extendidos</h4>
                <p>Disponibilidad según acuerdo y urgencia del problema</p>
              </div>
            </div>
            <div className={styles["value-item"]}>
              <div className={styles["value-icon"]}>🎯</div>
              <div className={styles["value-content"]}>
                <h4>Solución Inmediata</h4>
                <p>Resolución de problemas en tiempo real sin esperas</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className={styles["service-modal__footer"]}>
          <div className={styles["cta-content"]}>
            <h3 className={styles["cta-title"]}>¿Necesitas soporte técnico remoto?</h3>
            <p className={styles["cta-description"]}>
              Conecta con nuestros expertos desde cualquier lugar y resuelve tus problemas técnicos al instante
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
                  <span className={styles["cta-main"]}>WhatsApp Soporte</span>
                  <span className={styles["cta-sub"]}>Conexión inmediata</span>
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
                ¡Disponible ahora! Soporte remoto 24/7 para emergencias técnicas
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RemoteSupportModal;