"use client";
import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';

interface ServiceData {
  icon: string;
  title: string;
  subtitle: string;
  description: string;
  services: Array<{
    icon: string;
    title: string;
    description: string;
    details: string[];
  }>;
  benefits: string[];
  pricing: {
    domestic: {
      title: string;
      price: string;
      frequency: string;
      includes: string[];
    };
    corporate: {
      title: string;
      price: string;
      frequency: string;
      includes: string[];
    };
  };
}

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceType: 'mantenimiento' | 'gaming' | 'software' | 'remoto' | 'ensamble' | 'recuperacion' | 'reparacion' | 'combos';
}

const ServiceModal: React.FC<ServiceModalProps> = ({ isOpen, onClose, serviceType }) => {
  // Cerrar modal con Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const serviceContent: Record<string, ServiceData> = {
    mantenimiento: {
      icon: '🏠💼',
      title: 'Mantenimiento Doméstico y Corporativo',
      subtitle: 'Cuidado preventivo y correctivo para hogares y empresas',
      description: 'Servicios especializados de mantenimiento para equipos de cómputo en entornos domésticos y corporativos, garantizando el óptimo funcionamiento y prolongando la vida útil de tus dispositivos.',
      services: [
        {
          icon: '🧹',
          title: 'Limpieza Profunda',
          description: 'Limpieza interna y externa completa de equipos',
          details: ['Remoción de polvo y suciedad', 'Limpieza de ventiladores', 'Aplicación de pasta térmica', 'Desinfección de periféricos']
        },
        {
          icon: '⚙️',
          title: 'Mantenimiento Preventivo',
          description: 'Revisiones programadas para evitar problemas futuros',
          details: ['Análisis de temperaturas', 'Verificación de componentes', 'Actualización de drivers', 'Optimización del sistema']
        },
        {
          icon: '🔧',
          title: 'Mantenimiento Correctivo',
          description: 'Solución de problemas existentes y fallas detectadas',
          details: ['Diagnóstico de fallas', 'Optimización de componentes', 'Reemplazo de piezas', 'Pruebas de funcionamiento']
        },
        {
          icon: '🏢',
          title: 'Soporte Corporativo',
          description: 'Mantenimiento especializado para entornos empresariales',
          details: ['Contratos de mantenimiento', 'Soporte en sitio', 'Gestión de inventario', 'Reportes detallados']
        }
      ],
      benefits: [
        'Aumento de la vida útil de equipos',
        'Reducción de costos de reparación',
        'Mejor rendimiento y velocidad',
        'Prevención de pérdida de datos',
        'Garantía de 30 días en servicios'
      ],
      pricing: {
        domestic: {
          title: 'Plan Equipo Doméstico',
          price: 'Desde $60.000',
          frequency: 'Cada 6 meses',
          includes: ['Limpieza completa', 'Optimización básica', 'Diagnóstico', 'Garantía 30 días']
        },
        corporate: {
          title: 'Plan Corporativo',
          price: 'Desde $80.000',
          frequency: 'Personalizable',
          includes: ['Mantenimiento en sitio', 'Soporte prioritario', 'Reportes detallados', 'Contrato anual disponible']
        }
      }
    },
    gaming: {
      icon: '🎮⚡',
      title: 'Optimización Gaming',
      subtitle: 'Maximiza el rendimiento de tu PC para juegos',
      description: 'Servicios especializados para gamers que buscan el máximo rendimiento en sus equipos. Optimización completa para experiencias de juego fluidas y competitivas.',
      services: [
        {
          icon: '⚡',
          title: 'Overclocking Seguro',
          description: 'Aumento controlado de velocidades de CPU y GPU',
          details: ['Análisis de estabilidad', 'Pruebas de estrés', 'Configuración de voltajes', 'Monitoreo de temperaturas']
        },
        {
          icon: '🌡️',
          title: 'Sistema de Refrigeración',
          description: 'Optimización del sistema de enfriamiento',
          details: ['Configuración de ventiladores', 'Aplicación de pasta térmica premium', 'Limpieza de radiadores', 'Mejora del flujo de aire']
        },
        {
          icon: '💾',
          title: 'Optimización de Storage',
          description: 'Configuración para máxima velocidad de carga',
          details: ['Instalación de SSD NVMe', 'Configuración RAID', 'Optimización de particiones', 'Game Mode activation']
        },
        {
          icon: '🖥️',
          title: 'Configuración de Drivers',
          description: 'Drivers optimizados para gaming',
          details: ['Drivers GPU más recientes', 'Configuración de perfiles', 'Eliminación de bloatware', 'Game Ready optimization']
        }
      ],
      benefits: [
        'Aumento de FPS hasta 40%',
        'Reducción de latencia',
        'Temperaturas optimizadas',
        'Experiencia gaming fluida',
        'Configuración personalizada por juego'
      ],
      pricing: {
        domestic: {
          title: 'Optimización Básica',
          price: '$80.000',
          frequency: 'Una vez',
          includes: ['Limpieza completa', 'Drivers actualizados', 'Configuración básica', 'Pruebas de rendimiento']
        },
        corporate: {
          title: 'Gaming Pro',
          price: '$150.000',
          frequency: 'Servicio completo',
          includes: ['Overclocking profesional', 'Sistema refrigeración', 'SSD optimization', 'Garantía 60 días']
        }
      }
    },
    software: {
      icon: '💾📋',
      title: 'Instalación de Software',
      subtitle: 'Programas, drivers y actualizaciones del sistema',
      description: 'Instalación profesional de software, sistemas operativos, drivers y programas especializados. Configuración optimizada para máximo rendimiento y estabilidad.',
      services: [
        {
          icon: '🖥️',
          title: 'Sistemas Operativos',
          description: 'Instalación y configuración de SO',
          details: ['Windows 10/11 original', 'Linux Ubuntu/Mint', 'Dual boot configuration', 'Activación genuina']
        },
        {
          icon: '🔧',
          title: 'Drivers y Controladores',
          description: 'Drivers optimizados para cada componente',
          details: ['Detección automática', 'Drivers más recientes', 'Eliminación de conflictos', 'Backup de drivers']
        },
        {
          icon: '💼',
          title: 'Software Profesional',
          description: 'Programas especializados y de oficina',
          details: ['Office Suite completo', 'Adobe Creative Suite', 'Software contable', 'Antivirus premium']
        },
        {
          icon: '🎯',
          title: 'Programas Especializados',
          description: 'Software específico según necesidades',
          details: ['Software de diseño', 'Programas de ingeniería', 'Herramientas development', 'Aplicaciones multimedia']
        }
      ],
      benefits: [
        'Software original y licenciado',
        'Configuración optimizada',
        'Sin bloatware innecesario',
        'Actualizaciones automáticas',
        'Soporte post-instalación'
      ],
      pricing: {
        domestic: {
          title: 'Paquete Básico',
          price: '$40.000',
          frequency: 'Por instalación',
          includes: ['SO + Drivers básicos', 'Antivirus gratuito', 'Navegadores web', 'Programas esenciales']
        },
        corporate: {
          title: 'Paquete Profesional',
          price: '$100.000',
          frequency: 'Instalación completa',
          includes: ['SO + Office original', 'Drivers premium', 'Software especializado', 'Configuración avanzada']
        }
      }
    },
    remoto: {
      icon: '🌐🔧',
      title: 'Soporte Remoto',
      subtitle: 'Asistencia técnica a distancia nacional e internacional',
      description: 'Servicio de soporte técnico remoto profesional que te permite recibir asistencia especializada desde cualquier lugar. Soluciones rápidas y efectivas sin salir de casa.',
      services: [
        {
          icon: '🔗',
          title: 'Conexión Segura',
          description: 'Acceso remoto protegido y cifrado',
          details: ['Protocolo VPN seguro', 'Conexión cifrada end-to-end', 'Autenticación multifactor', 'Sin acceso a datos personales']
        },
        {
          icon: '⚡',
          title: 'Diagnóstico Rápido',
          description: 'Identificación inmediata de problemas',
          details: ['Análisis automático del sistema', 'Detección de malware', 'Verificación de hardware', 'Reporte detallado de estado']
        },
        {
          icon: '🛠️',
          title: 'Reparación Online',
          description: 'Solución de problemas en tiempo real',
          details: ['Eliminación de virus', 'Optimización del sistema', 'Configuración de software', 'Actualización de drivers']
        },
        {
          icon: '📞',
          title: 'Soporte 24/7',
          description: 'Asistencia disponible cualquier día y hora',
          details: ['Chat en vivo', 'Videollamada técnica', 'Soporte por WhatsApp', 'Seguimiento post-servicio']
        }
      ],
      benefits: [
        'Solución inmediata sin salir de casa',
        'Disponible 24 horas los 7 días',
        'Cobertura nacional e internacional',
        'Conexión 100% segura',
        'Seguimiento completo del caso'
      ],
      pricing: {
        domestic: {
          title: 'Soporte Básico',
          price: '$25.000',
          frequency: 'Por sesión',
          includes: ['Diagnóstico remoto', 'Solución básica', 'Guía paso a paso', 'Soporte 2 horas']
        },
        corporate: {
          title: 'Soporte Premium',
          price: '$50.000',
          frequency: 'Sesión extendida',
          includes: ['Acceso prioritario', 'Soporte ilimitado 24h', 'Configuración avanzada', 'Seguimiento 48h']
        }
      }
    },
    ensamble: {
      icon: '🔧⚙️',
      title: 'Ensamble Personalizado',
      subtitle: 'Construcción de equipos a medida según necesidades',
      description: 'Diseño y construcción de computadores personalizados adaptados a tus necesidades específicas. Desde gaming de alto rendimiento hasta workstations profesionales.',
      services: [
        {
          icon: '🎯',
          title: 'Consultoría Técnica',
          description: 'Análisis de necesidades y presupuesto',
          details: ['Evaluación de requerimientos', 'Recomendación de componentes', 'Análisis costo-beneficio', 'Roadmap de actualizaciones']
        },
        {
          icon: '🛒',
          title: 'Selección de Componentes',
          description: 'Componentes premium compatibles',
          details: ['CPU y GPU de última generación', 'Motherboards profesionales', 'RAM de alta velocidad', 'Storage NVMe premium']
        },
        {
          icon: '🔨',
          title: 'Ensamble Profesional',
          description: 'Construcción especializada y testing',
          details: ['Ensamble anti-estático', 'Cable management profesional', 'Pruebas de estabilidad', 'Configuración de BIOS/UEFI']
        },
        {
          icon: '⚡',
          title: 'Optimización Final',
          description: 'Setup completo y entrega lista para usar',
          details: ['Instalación de SO', 'Drivers optimizados', 'Software básico', 'Transferencia de datos']
        }
      ],
      benefits: [
        'Componentes seleccionados específicamente',
        'Garantía en ensamble y componentes',
        'Optimización personalizada',
        'Soporte técnico incluido',
        'Actualizaciones futuras planificadas'
      ],
      pricing: {
        domestic: {
          title: 'PC Gaming/Hogar',
          price: 'Desde $1.500.000',
          frequency: 'Proyecto completo',
          includes: ['Consultoría', 'Ensamble profesional', 'Setup completo', 'Garantía 12 meses']
        },
        corporate: {
          title: 'Workstation Pro',
          price: 'Desde $3.000.000',
          frequency: 'Equipo especializado',
          includes: ['Componentes enterprise', 'Certificaciones', 'Soporte prioritario', 'Garantía extendida']
        }
      }
    },
    recuperacion: {
      icon: '💿🔄',
      title: 'Recuperación de Datos',
      subtitle: 'Restauración de archivos perdidos o dañados',
      description: 'Servicio especializado en recuperación de datos de discos duros, SSDs, USBs y otros dispositivos de almacenamiento. Utilizamos tecnología avanzada para recuperar información valiosa.',
      services: [
        {
          icon: '🔍',
          title: 'Diagnóstico Avanzado',
          description: 'Evaluación completa del dispositivo dañado',
          details: ['Análisis del tipo de daño', 'Escaneo de sectores', 'Evaluación de recuperabilidad', 'Reporte detallado de estado']
        },
        {
          icon: '💾',
          title: 'Recuperación Lógica',
          description: 'Datos eliminados o corruptos por software',
          details: ['Archivos eliminados accidentalmente', 'Particiones corruptas', 'Formateo accidental', 'Sistemas de archivos dañados']
        },
        {
          icon: '🔧',
          title: 'Recuperación Física',
          description: 'Dispositivos con daño físico',
          details: ['Discos con sectores defectuosos', 'Cabezales dañados', 'PCB quemados', 'Motores defectuosos']
        },
        {
          icon: '🛡️',
          title: 'Recuperación Segura',
          description: 'Proceso sin riesgo para datos existentes',
          details: ['Clonación previa', 'Ambiente limpio', 'Herramientas especializadas', 'Confidencialidad garantizada']
        }
      ],
      benefits: [
        'Tasa de éxito hasta 95%',
        'Confidencialidad total',
        'Sin datos recuperados, no hay costo',
        'Múltiples formatos soportados',
        'Entrega en dispositivo nuevo'
      ],
      pricing: {
        domestic: {
          title: 'Recuperación Básica',
          price: '$100.000',
          frequency: 'Diagnóstico incluido',
          includes: ['Evaluación gratuita', 'Recuperación lógica', 'Hasta 100GB datos', 'Entrega en USB']
        },
        corporate: {
          title: 'Recuperación Enterprise',
          price: 'Desde $300.000',
          frequency: 'Según complejidad',
          includes: ['Recuperación física', 'Datos ilimitados', 'Servicio urgente', 'Certificado de destrucción']
        }
      }
    },
    reparacion: {
      icon: '🔨🖥️',
      title: 'Reparación Física',
      subtitle: 'Arreglo de carcasas, bisagras y componentes físicos',
      description: 'Reparación especializada de componentes físicos de laptops y computadores. Desde bisagras rotas hasta reemplazo de pantallas y teclados.',
      services: [
        {
          icon: '💻',
          title: 'Reparación de Laptops',
          description: 'Arreglo completo de portátiles',
          details: ['Reemplazo de pantallas LCD/LED', 'Reparación de bisagras', 'Cambio de teclados', 'Arreglo de puertos USB/HDMI']
        },
        {
          icon: '🔌',
          title: 'Problemas de Carga',
          description: 'Solución de problemas eléctricos',
          details: ['Reparación de jack de carga', 'Reemplazo de baterías', 'Arreglo de circuitos', 'Diagnóstico eléctrico']
        },
        {
          icon: '🖱️',
          title: 'Periféricos',
          description: 'Reparación de dispositivos externos',
          details: ['Mouse y teclados', 'Monitores y pantallas', 'Impresoras', 'Dispositivos USB']
        },
        {
          icon: '🏠',
          title: 'Carcasas y Estructura',
          description: 'Reparación estética y estructural',
          details: ['Arreglo de carcasas agrietadas', 'Reemplazo de covers', 'Soldadura de componentes', 'Refuerzo estructural']
        }
      ],
      benefits: [
        'Repuestos originales disponibles',
        'Reparación mientras esperas',
        'Garantía en todas las reparaciones',
        'Presupuesto sin compromiso',
        'Servicio a domicilio disponible'
      ],
      pricing: {
        domestic: {
          title: 'Reparación Básica',
          price: 'Desde $40.000',
          frequency: 'Por reparación',
          includes: ['Diagnóstico gratuito', 'Mano de obra', 'Garantía 30 días', 'Presupuesto sin costo']
        },
        corporate: {
          title: 'Reparación Premium',
          price: 'Desde $80.000',
          frequency: 'Según complejidad',
          includes: ['Repuestos originales', 'Servicio prioritario', 'Garantía extendida', 'Soporte en sitio']
        }
      }
    },
    combos: {
      icon: '🎁💯',
      title: 'Combos de Servicio',
      subtitle: 'Paquetes combinados con descuentos especiales',
      description: 'Aprovecha nuestros combos de servicios diseñados para ofrecerte soluciones completas a precios preferenciales. Combina múltiples servicios y ahorra hasta un 30% comparado con servicios individuales.',
      services: [
        {
          icon: '🧹⚡',
          title: 'Combo Mantenimiento Plus',
          description: 'Mantenimiento completo + Optimización + Antivirus',
          details: ['Limpieza profunda interna/externa', 'Optimización del sistema operativo', 'Instalación antivirus premium', 'Actualización de drivers', 'Configuración de rendimiento', 'Respaldo de archivos importantes']
        },
        {
          icon: '💾🔧',
          title: 'Combo Instalación Pro',
          description: 'Formateo + SO + Software profesional + Configuración',
          details: ['Formateo completo del disco', 'Instalación Windows 10/11 original', 'Office Suite completo', 'Software especializado según necesidad', 'Configuración personalizada', 'Transferencia de datos']
        },
        {
          icon: '🎮💻',
          title: 'Combo Gaming Master',
          description: 'Mantenimiento + Optimización Gaming + Hardware upgrade',
          details: ['Limpieza profunda y pasta térmica', 'Overclocking seguro CPU/GPU', 'Optimización para gaming', 'Upgrade de RAM/SSD (según presupuesto)', 'Configuración de drivers gaming', 'Benchmarks y pruebas']
        },
        {
          icon: '💼🛡️',
          title: 'Combo Empresarial',
          description: 'Mantenimiento + Backup + Seguridad + Soporte',
          details: ['Mantenimiento preventivo completo', 'Sistema de respaldo automatizado', 'Configuración de seguridad avanzada', 'Antivirus empresarial', 'Soporte remoto 3 meses', 'Documentación técnica']
        },
        {
          icon: '🔄💿',
          title: 'Combo Recuperación Total',
          description: 'Recuperación de datos + Formateo + Reinstalación',
          details: ['Recuperación de archivos importantes', 'Análisis completo del disco', 'Formateo y particionado nuevo', 'Instalación SO y drivers', 'Restauración de datos recuperados', 'Configuración personalizada']
        },
        {
          icon: '🏠🏢',
          title: 'Combo Completo Premium',
          description: 'Todos los servicios incluidos - Solución 360°',
          details: ['Diagnóstico completo avanzado', 'Mantenimiento físico y software', 'Optimización total del sistema', 'Instalación de software premium', 'Configuración de seguridad', 'Soporte 6 meses incluido']
        }
      ],
      benefits: [
        'Ahorra hasta 30% vs servicios individuales',
        'Solución integral en una sola visita',
        'Garantía extendida en todos los combos',
        'Prioridad en agenda y soporte',
        'Seguimiento post-servicio gratuito',
        'Descuentos en futuras actualizaciones'
      ],
      pricing: {
        domestic: {
          title: 'Combos Hogar',
          price: 'Desde $90.000',
          frequency: 'Paquete completo',
          includes: ['2-3 servicios combinados', 'Descuento 20%', 'Garantía 45 días', 'Soporte telefónico']
        },
        corporate: {
          title: 'Combos Premium',
          price: 'Desde $180.000',
          frequency: 'Solución completa',
          includes: ['4-6 servicios combinados', 'Descuento 30%', 'Garantía 60 días', 'Soporte prioritario 3 meses']
        }
      }
    }
  };

  const content = serviceContent[serviceType];

  if (!isOpen || !content) return null;

  const modalContent = (
    <div className="service-modal-overlay" onClick={onClose}>
      <div className="service-modal" data-service={serviceType} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="service-modal__header">
          <div className="service-modal__header-content">
            <span className="service-modal__icon">{content.icon}</span>
            <div className="service-modal__header-text">
              <h2 className="service-modal__title">{content.title}</h2>
              <p className="service-modal__subtitle">{content.subtitle}</p>
            </div>
          </div>
          <button className="service-modal__close" onClick={onClose} aria-label="Cerrar modal">
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="service-modal__content">
          {/* Description */}
          <div className="service-modal__description">
            <p>{content.description}</p>
          </div>

          {/* Services Grid */}
          <div className="service-modal__services">
            <h3 className="service-modal__section-title">
              {serviceType === 'combos' ? 'Nuestros Combos Especiales' : 'Nuestros Servicios'}
            </h3>
            {serviceType === 'combos' && (
              <div className="service-modal__combos-intro">
                <div className="service-modal__savings-badge">
                  <span className="service-modal__savings-icon">💰</span>
                  <div className="service-modal__savings-text">
                    <strong>¡Ahorra hasta 30%!</strong>
                    <span>vs servicios individuales</span>
                  </div>
                </div>
              </div>
            )}
            <div className="service-modal__services-grid">
              {content.services.map((service: ServiceData["services"][number], index: number) => (
                <div key={index} className="service-modal__service-card">
                  <div className="service-modal__service-header">
                    <span className="service-modal__service-icon" aria-hidden="true">{service.icon}</span>
                    <div>
                      <h4 className="service-modal__service-title">{service.title}</h4>
                      <p className="service-modal__service-description">{service.description}</p>
                    </div>
                  </div>
                  <ul className="service-modal__service-details">
                    {service.details.map((detail: string, detailIndex: number) => (
                      <li key={detailIndex}>{detail}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits */}
          <div className="service-modal__benefits">
            <h3 className="service-modal__section-title">Beneficios</h3>
            <div className="service-modal__benefits-grid">
              {content.benefits.map((benefit: string, index: number) => (
                <div key={index} className="service-modal__benefit">
                  <span className="service-modal__benefit-icon">✅</span>
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing */}
          <div className="service-modal__pricing">
            <h3 className="service-modal__section-title">Planes de Mantenimiento</h3>
            <div className="service-modal__pricing-grid">
              <div className="service-modal__pricing-card">
                <div className="service-modal__pricing-header">
                  <h4>{content.pricing.domestic.title}</h4>
                  <div className="service-modal__pricing-price">
                    <span className="service-modal__price">{content.pricing.domestic.price}</span>
                    <span className="service-modal__frequency">{content.pricing.domestic.frequency}</span>
                  </div>
                </div>
                <ul className="service-modal__pricing-includes">
                  {content.pricing.domestic.includes.map((item: string, index: number) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="service-modal__pricing-card service-modal__pricing-card--featured">
                <div className="service-modal__pricing-badge">Recomendado</div>
                <div className="service-modal__pricing-header">
                  <h4>{content.pricing.corporate.title}</h4>
                  <div className="service-modal__pricing-price">
                    <span className="service-modal__price">{content.pricing.corporate.price}</span>
                    <span className="service-modal__frequency">{content.pricing.corporate.frequency}</span>
                  </div>
                </div>
                <ul className="service-modal__pricing-includes">
                  {content.pricing.corporate.includes.map((item: string, index: number) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="service-modal__footer">
          <div className="service-modal__cta">
            <p className="service-modal__cta-text">
              ¿Necesitas este servicio? <strong>¡Contáctanos ahora!</strong>
            </p>
            <div className="service-modal__cta-buttons">
              <a
                href="http://wa.link/n8et4q"
                target="_blank"
                rel="noopener noreferrer"
                className="service-modal__btn service-modal__btn--whatsapp"
              >
                <span>📱</span>
                WhatsApp
              </a>
              <a
                href="tel:+573008474121"
                className="service-modal__btn service-modal__btn--call"
              >
                <span>📞</span>
                Llamar
              </a>
            </div>
          </div>
          <div className="service-modal__trust">
            <div className="service-modal__rating">
              <span className="service-modal__stars">⭐⭐⭐⭐⭐</span>
              <span className="service-modal__rating-text">5.0 (92 reseñas)</span>
            </div>
            <div className="service-modal__guarantee">
              <span className="service-modal__guarantee-icon">🛡️</span>
              <span>Garantía de 30 días</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Renderizar usando portal para asegurar que aparezca encima de todo
  return typeof window !== 'undefined' 
    ? createPortal(modalContent, document.body)
    : null;
};

export default ServiceModal;
