import React from "react";

const Process = () => {
    return (
           <section id="proceso" className="process">
        <div className="container">
            <h2 className="section-title">Nuestro Proceso de Trabajo</h2>
            
            <div className="process__grid">
                <div className="process-step">
                    <div className="process-step__number">1</div>
                    <h3 className="process-step__title">Contacto Inicial</h3>
                    <p className="process-step__description">Te contactas conmigo por WhatsApp o llamada para describir el problema de tu equipo.</p>
                </div>
                
                <div className="process-step">
                    <div className="process-step__number">2</div>
                    <h3 className="process-step__title">Diagnóstico Gratuito</h3>
                    <p className="process-step__description">Realizo una evaluación completa sin costo para identificar exactamente qué necesita tu computador.</p>
                </div>
                
                <div className="process-step">
                    <div className="process-step__number">3</div>
                    <h3 className="process-step__title">Reparación Profesional</h3>
                    <p className="process-step__description">Ejecuto la solución usando herramientas especializadas y repuestos originales de calidad.</p>
                </div>
                
                <div className="process-step">
                    <div className="process-step__number">4</div>
                    <h3 className="process-step__title">Entrega y Garantía</h3>
                    <p className="process-step__description">Te entrego tu equipo funcionando perfectamente con garantía de 30 días en el servicio.</p>
                </div>
            </div>
        </div>
    </section>
    );
};

export default Process;
