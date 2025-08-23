import React from "react";

const SuccessCases = () => {
    return (
            <section id="casos" className="success-cases">
        <div className="container">
            <h2 className="section-title">Casos de Éxito</h2>
            
            <div className="success-cases__grid">
                <div className="success-case">
                    <h3 className="success-case__title">Recuperación de Datos Críticos</h3>
                    <div className="before-after">
                        <div className="before-after__item">
                            <h4>ANTES</h4>
                            <p>Disco duro con fallas físicas, datos inaccesibles</p>
                        </div>
                        <div className="before-after__arrow">→</div>
                        <div className="before-after__item">
                            <h4>DESPUÉS</h4>
                            <p>100% de datos recuperados y sistema optimizado</p>
                        </div>
                    </div>
                </div>
                
                <div className="success-case">
                    <h3 className="success-case__title">Optimización de Rendimiento</h3>
                    <div className="before-after">
                        <div className="before-after__item">
                            <h4>ANTES</h4>
                            <p>Arranque lento: 5+ minutos, frecuentes cuelgues</p>
                        </div>
                        <div className="before-after__arrow">→</div>
                        <div className="before-after__item">
                            <h4>DESPUÉS</h4>
                            <p>Arranque rápido: 30 segundos, rendimiento óptimo</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    );
};

export default SuccessCases;
