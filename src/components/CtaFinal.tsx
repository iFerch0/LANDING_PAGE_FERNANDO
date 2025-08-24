import React from "react";
import CountUpClient from './CountUpClient';

const CtaFinal = () => {
    return (
           <section className="cta-final">
        <div className="container">
            <div className="cta-final__content">
                <h2 className="cta-final__title">¿Listo para Arreglar tu Computador?</h2>
                
                <div className="cta-final__benefits">
                    <div className="cta-benefit">Diagnóstico Gratuito</div>
                    <div className="cta-benefit">Garantía <CountUpClient end={30} ssrValue={30} suffix=" Días" /></div>
                    <div className="cta-benefit">Respuesta 24/7</div>
                </div>
                
                <div className="cta-final__actions">
                    <a href="http://wa.link/n8et4q" target="_blank" className="btn btn--whatsapp btn--large">
                        Escribir por WhatsApp
                    </a>
                    <a href="tel:+573008474121" className="btn btn--call btn--large">
                        Llamar Ahora
                    </a>
                </div>
                
                <div className="cta-final__info">
                    <p>Montería, Córdoba - Servicio a Domicilio • Lun - Sáb: 8:00 AM - 6:00 PM</p>
                </div>
            </div>
        </div>
    </section>
    )
}

export default CtaFinal;
