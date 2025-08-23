"use client";

import React, { useEffect, useRef, useState } from "react";
import { ChevronDown } from './Icons';

type FaqData = {
  question: string;
  answer: React.ReactNode;
};

const FAQ_ITEMS: FaqData[] = [
  {
    question: "¿Cuánto tiempo toma una reparación?",
    answer: (
      <p>
        Dependiendo del problema, las reparaciones simples pueden tomar de 1-2 horas, mientras que casos más complejos pueden requerir 1-2 días. Siempre te mantengo informado del progreso.
      </p>
    ),
  },
  {
    question: "¿Ofreces servicio a domicilio?",
    answer: (
      <p>
        Sí, ofrezco servicio a domicilio en toda Montería sin costo adicional. Para casos que requieren herramientas especializadas, puede ser necesario llevar el equipo al taller.
      </p>
    ),
  },
  {
    question: "¿Qué garantía ofrecen los servicios?",
    answer: (
      <p>
        Todos mis servicios incluyen garantía de 30 días. Si el mismo problema vuelve a presentarse dentro de este período, lo corrijo sin costo adicional.
      </p>
    ),
  },
  {
    question: "¿Trabajan con todas las marcas?",
    answer: (
      <p>
        Sí, trabajo con todas las marcas: HP, Dell, Lenovo, Asus, Acer, Apple, Sony y muchas más. También con equipos ensamblados y de escritorio.
      </p>
    ),
  },
  {
    question: "¿Qué métodos de pago aceptan?",
    answer: (
      <p>
        Acepto efectivo, transferencia bancaria, Nequi, Daviplata y tarjetas de crédito/débito. El pago se realiza una vez completado y aprobado el servicio.
      </p>
    ),
  },
  {
    question: "¿Qué pasa si el equipo no se puede reparar?",
    answer: (
      <p>
        Si después del diagnóstico determino que el equipo no es viable de reparar, no cobro nada por la evaluación y te asesoro sobre las mejores opciones disponibles.
      </p>
    ),
  },
];

function useResizeObserver(ref: React.RefObject<HTMLElement | null>, callback: () => void) {
  useEffect(() => {
    if (!ref.current) return;
    if (typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(callback);
    ro.observe(ref.current);
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

  // Set dynamic max-height for a smooth transition
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

  // Update height if content changes
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
        <h2 id="faq-title" className="section-title">
          Preguntas Frecuentes
        </h2>

        <div className="faq__list">
          {FAQ_ITEMS.map((it, idx) => (
            <FaqItem
              key={idx}
              id={`${idx}`}
              question={it.question}
              isOpen={openIndex === idx}
              onToggle={() => setOpenIndex(openIndex === idx ? null : idx)}
            >
              {it.answer}
            </FaqItem>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;