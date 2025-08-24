import React from "react";

const Services = () => {
    return (
    <section id="servicios" className="services">
        <div className="container">
            <h2 className="section-title">Nuestros Servicios Profesionales</h2>
            <div className="services__grid">
                <div className="service-card service-card--popular">
                    <div className="service-card__popular-badge">Popular</div>
                    <h3 className="service-card__title">Reparación de PC y Portátiles</h3>
                    <p className="service-card__description">Diagnóstico completo y reparación de hardware y software. Desde problemas de arranque hasta optimización de rendimiento.</p>
                                        <a
                                            href={`https://wa.me/573008474121?text=${encodeURIComponent("Hola, quiero más información sobre Reparación de PC y Portátiles")}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="service-card__btn"
                                        >Más información</a>
                </div>
                
                <div className="service-card">
                    <h3 className="service-card__title">Recuperación de Datos</h3>
                    <p className="service-card__description">Rescatamos tu información valiosa de discos dañados, formateos accidentales y fallos del sistema.</p>
                                        <a
                                            href={`https://wa.me/573008474121?text=${encodeURIComponent("Hola, quiero más información sobre Recuperación de Datos")}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="service-card__btn"
                                        >Más información</a>
                </div>
                
                <div className="service-card">
                    <h3 className="service-card__title">Eliminación de Virus</h3>
                    <p className="service-card__description">Limpieza profunda de malware, virus y programas maliciosos. Instalación de antivirus profesional.</p>
                                        <a
                                            href={`https://wa.me/573008474121?text=${encodeURIComponent("Hola, quiero más información sobre Eliminación de Virus")}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="service-card__btn"
                                        >Más información</a>
                </div>
                
                <div className="service-card">
                    <h3 className="service-card__title">Optimización de Rendimiento</h3>
                    <p className="service-card__description">Aceleramos tu equipo eliminando archivos basura, optimizando el sistema y mejorando la velocidad.</p>
                                        <a
                                            href={`https://wa.me/573008474121?text=${encodeURIComponent("Hola, quiero más información sobre Optimización de Rendimiento")}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="service-card__btn"
                                        >Más información</a>
                </div>
                
                <div className="service-card">
                    <h3 className="service-card__title">Mantenimiento Preventivo</h3>
                    <p className="service-card__description">Limpieza y configuración preventiva para evitar fallas futuras y extender la vida útil del equipo.</p>
                                        <a
                                            href={`https://wa.me/573008474121?text=${encodeURIComponent("Hola, quiero más información sobre Mantenimiento Preventivo")}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="service-card__btn"
                                        >Más información</a>
                </div>
                
                <div className="service-card">
                    <h3 className="service-card__title">Soporte Técnico General</h3>
                    <p className="service-card__description">Instalación de software, configuración de sistemas y asesoramiento técnico personalizado.</p>
                                        <a
                                            href={`https://wa.me/573008474121?text=${encodeURIComponent("Hola, quiero más información sobre Soporte Técnico General")}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="service-card__btn"
                                        >Más información</a>
                </div>
            </div>
        </div>
    </section>
    );
};

export default Services;
