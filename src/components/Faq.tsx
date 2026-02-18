'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, QuestionCircleIcon } from './Icons';
import { FAQ_ITEMS } from '@/data/faq';
import styles from './Faq.module.css';

function useResizeObserver(ref: React.RefObject<HTMLElement | null>, callback: () => void) {
  useEffect(() => {
    if (!ref.current) return;
    if (typeof ResizeObserver === 'undefined') return;
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
      el.style.maxHeight = el.scrollHeight + 'px';
      el.style.opacity = '1';
      el.style.paddingTop = 'var(--space-12)';
    } else {
      el.style.maxHeight = '0px';
      el.style.opacity = '0';
      el.style.paddingTop = '0px';
    }
  }, [isOpen]);

  useResizeObserver(contentRef, () => {
    if (isOpen && contentRef.current) {
      contentRef.current.style.maxHeight = contentRef.current.scrollHeight + 'px';
    }
  });

  return (
    <div className={`${styles.item} ${isOpen ? styles.itemActive : ''}`}>
      <h3>
        <button
          id={`faq-question-${id}`}
          aria-expanded={isOpen}
          aria-controls={`faq-answer-${id}`}
          className={styles.question}
          onClick={onToggle}
        >
          <span>{question}</span>
          <span className={`${styles.icon} ${isOpen ? styles.iconActive : ''}`} aria-hidden>
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
            <QuestionCircleIcon />
            Resuelve Tus Dudas
          </div>
          <div className={styles.titleContainer}>
            <h2 id="faq-title" className={styles.title}>
              Preguntas Frecuentes
            </h2>
          </div>
          <p className={styles.subtitle}>
            Respuestas directas a las consultas más frecuentes sobre servicios técnicos
          </p>
        </div>

        <div className={styles.list} data-aos="fade-up" data-aos-delay="100">
          {FAQ_ITEMS.map((it, idx) => {
            // Assign icons based on content
            const getQuestionIcon = (question: string) => {
              if (question.includes('tiempo') || question.includes('toma')) return '⏰';
              if (question.includes('cuesta') || question.includes('diagnóstico')) return '💰';
              if (question.includes('taller') || question.includes('ubicación')) return '📍';
              if (question.includes('garantía')) return '✅';
              if (question.includes('problemas') || question.includes('tipos')) return '🔧';
              if (question.includes('marcas')) return '💻';
              if (question.includes('pago')) return '💳';
              if (question.includes('respaldo') || question.includes('archivos')) return '💾';
              if (question.includes('fines de semana') || question.includes('horarios'))
                return '📅';
              if (question.includes('no se puede reparar')) return '🔍';
              return '❓';
            };

            return (
              <FaqItem
                key={idx}
                id={`${idx}`}
                question={`${getQuestionIcon(it.question)} ${it.question}`}
                isOpen={openIndex === idx}
                onToggle={() => setOpenIndex(openIndex === idx ? null : idx)}
              >
                {typeof it.answer === 'string' ? <p>{it.answer}</p> : it.answer}
              </FaqItem>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Faq;
