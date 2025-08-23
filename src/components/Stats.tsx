import React from "react";
import CountUpClient from './CountUpClient';

const Stats = () => {
    return (
            <section className="stats">
        <div className="container">
            <div className="stats__grid">
                <div className="stat-item">
                    <div className="stat__number"><CountUpClient end={2000} suffix="+" /></div>
                    <div className="stat__label">Equipos Reparados</div>
                </div>
                <div className="stat-item">
                    <div className="stat__number"><CountUpClient end={50} decimals={1} /></div>
                    <div className="stat__label">Calificación Promedio</div>
                </div>
                <div className="stat-item">
                    <div className="stat__number"><CountUpClient end={24} suffix="h" /></div>
                    <div className="stat__label">Tiempo Promedio</div>
                </div>
                <div className="stat-item">
                    <div className="stat__number"><CountUpClient end={10} /></div>
                    <div className="stat__label">Años de Experiencia</div>
                </div>
            </div>
        </div>
    </section>
    );
}

export default Stats;

