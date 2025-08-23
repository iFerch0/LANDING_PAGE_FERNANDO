import React from "react";

const Stats = () => {
    return (
            <section className="stats">
        <div className="container">
            <div className="stats__grid">
                <div className="stat-item">
                    <div className="stat__number">2000+</div>
                    <div className="stat__label">Equipos Reparados</div>
                </div>
                <div className="stat-item">
                    <div className="stat__number">5.0</div>
                    <div className="stat__label">Calificación Promedio</div>
                </div>
                <div className="stat-item">
                    <div className="stat__number">24h</div>
                    <div className="stat__label">Tiempo Promedio</div>
                </div>
                <div className="stat-item">
                    <div className="stat__number">10</div>
                    <div className="stat__label">Años de Experiencia</div>
                </div>
            </div>
        </div>
    </section>
    );
}

export default Stats;

