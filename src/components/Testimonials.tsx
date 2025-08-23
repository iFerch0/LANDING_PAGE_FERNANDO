import React from "react";

const Testimonials = () => {
    return (
            <section id="testimonios" className="testimonials">
        <div className="container">
            <h2 className="section-title">Lo Que Dicen Nuestros Clientes</h2>
            
            <div className="testimonials__grid">
                <div className="testimonial-card">
                    <div className="testimonial__quote">"</div>
                    <p className="testimonial__text">Fernando salvó mi computador cuando pensé que había perdido años de trabajo. Excelente servicio y muy confiable.</p>
                    <div className="testimonial__author">
                        <strong>idalver Gómez</strong>
                        <span>Local Guide</span>
                    </div>
                </div>
                
                <div className="testimonial-card">
                    <div className="testimonial__quote">"</div>
                    <p className="testimonial__text">Mi portátil estaba súper lento y ahora funciona como nuevo. Precios justos y atención personalizada.</p>
                    <div className="testimonial__author">
                        <strong>luz karime mendivil</strong>
                        <span>Cliente Satisfecho</span>
                    </div>
                </div>
                
                <div className="testimonial-card">
                    <div className="testimonial__quote">"</div>
                    <p className="testimonial__text">Recuperó todos mis archivos importantes de un disco dañado. Un profesional de verdad, lo recomiendo 100%.</p>
                    <div className="testimonial__author">
                        <strong>MARCELA MORELO</strong>
                        <span>Empresaria</span>
                    </div>
                </div>
            </div>
        </div>
    </section>
    );
};

export default Testimonials;
