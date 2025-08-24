import React from "react";
import Script from 'next/script';

const Testimonials = () => {
    return (
        <section id="testimonios" className="testimonials">
            <div className="container">
                <h2 className="section-title">Lo Que Dicen Nuestros Clientes</h2>

                {/* Elfsight Google Reviews widget */}
                <Script src="https://elfsightcdn.com/platform.js" strategy="afterInteractive" async />
                <div className="elfsight-app-d4a2b5a4-3734-4c3c-bd68-010b5bf39151" data-elfsight-app-lazy></div>

            </div>
        </section>
    );
};

export default Testimonials;
