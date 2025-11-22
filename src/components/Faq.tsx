"use client";

import React, { useEffect, useRef, useState } from "react";
import { ChevronDown } from './Icons';
import { FAQ_ITEMS } from '@/data/faq';
import styles from './Faq.module.css';

function useResizeObserver(ref: React.RefObject<HTMLElement | null>, callback: () => void) {
  useEffect(() => {
    if (!ref.current) return;
    if (typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(callback);
    ro.observe(ref.current as Element);
    return () => ro.disconnect();
  }, [ref, callback]);
}

const FaqItem: React.FC<{
  id: string;
  question: string;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}> = ({ id, question, children, isOpen, onToggle }) => {
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    if (isOpen) {
      el.style.maxHeight = el.scrollHeight + "px";
      el.style.opacity = "1";
      el.style.paddingTop = "var(--space-12)";
    } else {
      el.style.maxHeight = "0px";
      el.style.opacity = "0";
      el.style.paddingTop = "0px";
    }
  }, [isOpen]);

  useResizeObserver(contentRef, () => {
    if (isOpen && contentRef.current) {
      contentRef.current.style.maxHeight = contentRef.current.scrollHeight + "px";
    }
  });

  return (
    <div className={`${styles.item} ${isOpen ? styles.itemActive : ""}`}>
      <h3>
        <button
          id={`faq-question-${id}`}
          aria-expanded={isOpen}
          aria-controls={`faq-answer-${id}`}
          className={styles.question}
          onClick={onToggle}
        >
          <span>{question}</span>
          <span className={`${styles.icon} ${isOpen ? styles.iconActive : ""}`} aria-hidden>
            <ChevronDown />
          </span>
        </button>
      </h3>
      <div
        id={`faq-answer-${id}`}
        role="region"
        aria-labelledby={`faq-question-${id}`}
        ref={contentRef}
        className={styles.answer}
      >
        {children}
      </div>
    </div>
  );
};

const Faq: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className={styles.faq} aria-labelledby="faq-title">
      <div className="container">
        {/* Enhanced Header */}
        <div className={styles.header} data-aos="fade-up">
          <div className={styles.badge}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
              <path d="M12 17h.01"/>
            </svg>
            Resuelve Tus Dudas
          </div>
          <div className={styles.titleContainer}>
            <h2 id="faq-title" className={styles.title}>
              Preguntas Frecuentes
            </h2>
          </div>
          <p className={styles.subtitle}>
            Respuestas directas a las 10 consultas más frecuentes sobre servicios técnicos especializados
          </p>

          {/* Trust Stats */}
          <div className={styles.trustStats} data-aos="fade-up" data-aos-delay="50">
            <div className={styles.statItem}>
              <div className={styles.statNumber}>500+</div>
              <div className={styles.statLabel}>Clientes Satisfechos</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>98%</div>
              <div className={styles.statLabel}>Problemas Resueltos</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statNumberRed}>30</div>
              <div className={styles.statLabel}>Días de Garantía</div>
            </div>
          </div>
        </div>

        <div className={styles.list} data-aos="fade-up" data-aos-delay="100">
          {/* Category hint */}
          <div className={styles.tipBox}>
            <div className={styles.tipTitle}>💡 Tip Profesional</div>
            <div className={styles.tipText}>
              Haz clic en cualquier pregunta para ver la respuesta detallada. Si tu duda no está aquí, contáctame directamente.
            </div>
          </div>

          {FAQ_ITEMS.map((it, idx) => {
            // Assign icons based on content
            const getQuestionIcon = (question: string) => {
              if (question.includes('tiempo') || question.includes('toma')) return '⏰';
              if (question.includes('cuesta') || question.includes('diagnóstico')) return '💰';
              if (question.includes('domicilio') || question.includes('servicio a')) return '🏠';
              if (question.includes('garantía')) return '✅';
              if (question.includes('problemas') || question.includes('tipos')) return '🔧';
              if (question.includes('marcas')) return '💻';
              if (question.includes('pago')) return '💳';
              if (question.includes('respaldo') || question.includes('archivos')) return '💾';
              if (question.includes('fines de semana') || question.includes('horarios')) return '📅';
              if (question.includes('no se puede reparar')) return '🔍';
              return '❓';
            };

            return (
              <div key={idx} className={styles.itemWrapper}>
                <FaqItem
                  id={`${idx}`}
                  question={`${getQuestionIcon(it.question)} ${it.question}`}
                  isOpen={openIndex === idx}
                  onToggle={() => setOpenIndex(openIndex === idx ? null : idx)}
                >
                  {typeof it.answer === 'string' ? <p>{it.answer}</p> : it.answer}
                </FaqItem>
              </div>
            );
          })}
        </div>

        {/* Enhanced Contact CTA */}
        <div className={styles.cta} data-aos="fade-up" data-aos-delay="200">
          <div className={styles.ctaContent}>
            <div className={styles.ctaEmoji}>💬</div>
            <h3 className={styles.ctaTitle}>¿Tienes una consulta específica?</h3>
            <p className={styles.ctaText}>
              Si tu pregunta no está en la lista o necesitas asesoría técnica personalizada,
              contáctame directamente. <strong>Respondo en menos de 5 minutos.</strong>
            </p>

            <div className={styles.ctaActions}>
              <a
                href="https://wa.me/573015218139?text=Hola%20Fernando%2C%20tengo%20una%20consulta%20técnica%20específica%20sobre..."
                className={styles.whatsappBtn}
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.570-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.525 3.488"/>
                </svg>
                Consulta Técnica WhatsApp
              </a>

              <div className={styles.ctaBenefits}>
                <div className={styles.ctaBenefit}>
                  <span className={styles.ctaBenefitIcon}>✓</span>
                  <span>Respuesta inmediata</span>
                </div>
                <div className={styles.ctaBenefit}>
                  <span className={styles.ctaBenefitIcon}>✓</span>
                  <span>Diagnóstico gratuito</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faq;
