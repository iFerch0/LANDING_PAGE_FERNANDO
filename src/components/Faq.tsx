'use client';

import React from "react";
import { useState } from 'react';

const FaqItem = ({ question, children }: { question: string; children: React.ReactNode }) => {
const [isOpen, setIsOpen] = useState(false);
  
return (
    <div className={`faq-item ${isOpen ? 'active' : ''}`}>
      <button className="faq-item__question" onClick={() => setIsOpen(!isOpen)}>
        <span>{question}</span>
        <span className="faq-item__icon">{isOpen ? '-' : '+'}</span>
      </button>
      <div className="faq-item__answer" style={{ maxHeight: isOpen ? '200px' : '0' }}>
        {children}
      </div>
    </div>
  );
};

const Faq = () => {
    return (
        <section id="faq" className="faq">
        <div className="container">
            <h2 className="section-title">Preguntas Frecuentes</h2>
            
            <div className="faq__list">
                
                <FaqItem question="¿Cuánto tiempo toma una reparación?">
                 <p>Dependiendo del problema, las reparaciones simples pueden tomar de 1-2 horas, mientras que casos más complejos pueden requerir 1-2 días. Siempre te mantengo informado del progreso.</p>
                </FaqItem>

                <FaqItem question="¿Ofreces servicio a domicilio?">
                        <p>Sí, ofrezco servicio a domicilio en toda Montería sin costo adicional. Para casos que requieren herramientas especializadas, puede ser necesario llevar el equipo al taller.</p>
                </FaqItem>

                <FaqItem question="¿Qué garantía ofrecen los servicios?">
                        <p>Todos mis servicios incluyen garantía de 30 días. Si el mismo problema vuelve a presentarse dentro de este período, lo corrijo sin costo adicional.</p>
                </FaqItem>

                <FaqItem question="¿Trabajan con todas las marcas?">
                    <p>Sí, trabajo con todas las marcas: HP, Dell, Lenovo, Asus, Acer, Apple, Sony y muchas más. También con equipos ensamblados y de escritorio.</p>
                </FaqItem>

                <FaqItem question="¿Qué métodos de pago aceptan?">
                    <p>Acepto efectivo, transferencia bancaria, Nequi, Daviplata y tarjetas de crédito/débito. El pago se realiza una vez completado y aprobado el servicio.</p>
                </FaqItem>

                <FaqItem question="¿Qué pasa si el equipo no se puede reparar?">
                    <p>Si después del diagnóstico determino que el equipo no es viable de reparar, no cobro nada por la evaluación y te asesoro sobre las mejores opciones disponibles.</p>
                </FaqItem>
            </div>
        </div>
    </section>
    );
};
export default Faq;