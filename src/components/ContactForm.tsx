'use client';

import React from "react";
import { useState } from 'react';



const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        deviceType: '',
        problem: ''
    });

const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
};

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const message = `SOLICITUD DE DIAGNÓSTICO:
        - Cliente: ${formData.name}
        - Teléfono: ${formData.phone}
        - Equipo: ${formData.deviceType}
        - Problema: ${formData.problem}`;
        const whatsappUrl = `https://wa.me/573008474121?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };

    return (
        <section id="contacto" className="contact-form">
            <div className="container">
                <div className="contact-form__content">
                    <div className="contact-form__header">
                        <h2>Solicita tu Diagnóstico Gratuito</h2>
                        <p>Completa el formulario y te contactaremos en las próximas horas</p>
                    </div>

                    <form className="form" id="contactForm" onSubmit={handleSubmit}>
                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label">Nombre completo</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Teléfono / WhatsApp</label>
                                <input
                                    type="tel"
                                    className="form-control"
                                    name="phone"
                                    required
                                    value={formData.phone}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Correo electrónico</label>
                            <input
                                type="email"
                                className="form-control"
                                name="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Tipo de equipo</label>
                            <select
                                className="form-control"
                                name="deviceType"
                                required
                                value={formData.deviceType}
                                onChange={handleChange}
                            >
                                <option value="">Selecciona una opción</option>
                                <option value="pc-desktop">PC de Escritorio</option>
                                <option value="laptop">Portátil</option>
                                <option value="all-in-one">All-in-One</option>
                                <option value="other">Otro</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Describe el problema</label>
                            <textarea
                                className="form-control"
                                name="problem"
                                rows={4}
                                placeholder="Cuéntanos qué está pasando con tu computador..."
                                required
                                value={formData.problem}
                                onChange={handleChange}
                            ></textarea>
                        </div>

                        <button type="submit" className="btn btn--primary btn--full-width btn--large">
                            Enviar Solicitud
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default ContactForm;
