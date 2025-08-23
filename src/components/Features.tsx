import React from "react";

const Features = () => {
    return (
    <section className="features">
        <div className="container">
            <div className="features__grid">
                <div className="feature-item">
                    <h3 className="feature__title">Servicio a Domicilio</h3>
                    <p className="feature__subtitle">Respuesta Inmediata</p>
                    <span className="feature__badge">100% Confiable</span>
                </div>
                <div className="counter-item">
                    <div className="counter__number">92+</div>
                    <div className="counter__label">Reseñas</div>
                </div>
                <div className="counter-item">
                    <div className="counter__number">24/7</div>
                    <div className="counter__label">Disponible</div>
                </div>
            </div>
        </div>
    </section>
    );
};

export default Features;
