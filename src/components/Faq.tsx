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
        <h2 id="faq-title" className="section-title">Preguntas Frecuentes</h2>

        <div className="faq__list">
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
      </div>
    </section>
  );
};

export default Faq;