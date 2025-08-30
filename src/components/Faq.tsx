"use client";

import React, { useEffect, useRef, useState } from "react";
import { ChevronDown } from './Icons';
import { FAQ_ITEMS } from '@/data/faq';

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
    <div className={`faq-item ${isOpen ? "active" : ""}`}>
      <h3>
        <button
          id={`faq-question-${id}`}
          aria-expanded={isOpen}
          aria-controls={`faq-answer-${id}`}
          className="faq-item__question"
          onClick={onToggle}
        >
          <span>{question}</span>
          <span className="faq-item__icon" aria-hidden>
            <ChevronDown />
          </span>
        </button>
      </h3>
      <div
        id={`faq-answer-${id}`}
        role="region"
        aria-labelledby={`faq-question-${id}`}
        ref={contentRef}
        className="faq-item__answer"
      >
        {children}
      </div>
    </div>
  );
};

const Faq: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="faq" aria-labelledby="faq-title">
      <div className="container">
        {/* Enhanced Header */}
        <div className="faq__header" data-aos="fade-up">
          <div className="faq__badge">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
              <path d="M12 17h.01"/>
            </svg>
            Resuelve Tus Dudas
          </div>
          <h2 id="faq-title" className="section-title">Preguntas Frecuentes</h2>
          <p className="faq__subtitle">
            Encuentra respuestas a las consultas más comunes sobre nuestros servicios de mantenimiento y reparación
          </p>
        </div>

        <div className="faq__list" data-aos="fade-up" data-aos-delay="100">
          {FAQ_ITEMS.map((it, idx) => (
            <FaqItem
              key={idx}
              id={`${idx}`}
              question={it.question}
              isOpen={openIndex === idx}
              onToggle={() => setOpenIndex(openIndex === idx ? null : idx)}
            >
              {typeof it.answer === 'string' ? <p>{it.answer}</p> : it.answer}
            </FaqItem>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="faq__cta" data-aos="fade-up" data-aos-delay="200">
          <div className="faq-cta__content">
            <h3>¿Tienes otra pregunta?</h3>
            <p>Si no encontraste la respuesta que buscabas, contáctame directamente por WhatsApp</p>
            <a 
              href="https://wa.me/573015218139?text=Hola%2C%20tengo%20una%20consulta%20sobre%20los%20servicios%20de%20mantenimiento%20de%20computadores"
              className="btn btn--secondary"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10z"/>
              </svg>
              Hacer Otra Consulta
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faq;