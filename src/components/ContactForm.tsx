'use client';

import React, { useState, useRef } from "react";

interface FormData {
    name: string;
    phone: string;
    email: string;
    deviceType: string;
    problem: string;
    urgency: string;
    location: string;
}

interface FormErrors {
    [key: string]: string;
}

const ContactForm = () => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        phone: '',
        email: '',
        deviceType: '',
        problem: '',
        urgency: '',
        location: ''
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);

    const validateField = (name: string, value: string): string => {
        switch (name) {
            case 'name':
                return value.length < 2 ? 'El nombre debe tener al menos 2 caracteres' : '';
            case 'phone':
                const phoneRegex = /^[+]?[\d\s\-\(\)]{10,}$/;
                return !phoneRegex.test(value) ? 'Ingresa un número de teléfono válido' : '';
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return !emailRegex.test(value) ? 'Ingresa un correo electrónico válido' : '';
            case 'deviceType':
                return !value ? 'Selecciona el tipo de equipo' : '';
            case 'problem':
                return value.length < 10 ? 'Describe el problema con más detalle (mín. 10 caracteres)' : '';
            case 'urgency':
                return !value ? 'Selecciona el nivel de urgencia' : '';
            default:
                return '';
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        
        // Update form data immediately without any interference
        setFormData(prev => ({ 
            ...prev, 
            [name]: value 
        }));
        
        // Clear errors only if they exist (less interference)
        if (errors[name]) {
            setErrors(prev => ({ 
                ...prev, 
                [name]: '' 
            }));
        }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        const error = validateField(name, value);
        setErrors(prev => ({ ...prev, [name]: error }));
    };

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};
        Object.keys(formData).forEach(key => {
            if (key !== 'location') { // location is optional
                const error = validateField(key, formData[key as keyof FormData]);
                if (error) newErrors[key] = error;
            }
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (!validateForm()) {
            // Focus first error field
            const firstErrorField = Object.keys(errors)[0];
            if (firstErrorField) {
                const element = formRef.current?.querySelector(`[name="${firstErrorField}"]`) as HTMLElement;
                element?.focus();
            }
            return;
        }

        setIsSubmitting(true);

        try {
            // Simulate API delay for better UX
            await new Promise(resolve => setTimeout(resolve, 800));
            
            const urgencyEmoji = formData.urgency === 'alta' ? '🚨' : formData.urgency === 'media' ? '⚡' : '📅';
            const deviceEmoji = formData.deviceType === 'laptop' ? '💻' : formData.deviceType === 'pc-desktop' ? '🖥️' : '💿';
            
            const message = `${urgencyEmoji} NUEVA SOLICITUD DE SERVICIO TÉCNICO

👤 *Cliente:* ${formData.name}
📱 *WhatsApp:* ${formData.phone}
📧 *Email:* ${formData.email}

${deviceEmoji} *Equipo:* ${formData.deviceType === 'pc-desktop' ? 'PC de Escritorio' : 
                formData.deviceType === 'laptop' ? 'Portátil' : 
                formData.deviceType === 'all-in-one' ? 'All-in-One' : 
                formData.deviceType === 'gaming' ? 'PC Gaming' : 
                formData.deviceType === 'server' ? 'Servidor' : 'Otro'}

${urgencyEmoji} *Urgencia:* ${formData.urgency === 'alta' ? 'ALTA - Requiere atención inmediata' : 
                formData.urgency === 'media' ? 'MEDIA - En 24-48 horas' : 
                'BAJA - Esta semana'}

🔧 *Problema:*
${formData.problem}

${formData.location ? `📍 *Ubicación:* ${formData.location}` : ''}

---
💬 Enviado desde www.ferchotecnico.com`;

            const whatsappUrl = `https://wa.me/573008474121?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');
            
            // Reset form after successful submission
            setFormData({
                name: '', phone: '', email: '', deviceType: '', 
                problem: '', urgency: '', location: ''
            });
            
        } catch (error) {
            console.error('Error submitting form:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="contacto" className="contact-form">
            <div className="container">
                <div className="contact-form__content">
                    {/* Enhanced Header */}
                    <div className="contact-form__header" data-aos="fade-up">
                        <div className="contact-form__badge">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M3 8l7.89 7.89a2.85 2.85 0 0 0 4.04 0L20 11"/>
                                <path d="M9 21h6"/>
                                <path d="M12 3v18"/>
                            </svg>
                            Solicitud Profesional
                        </div>
                        <h2>Agenda tu Servicio Técnico</h2>
                        <p>Completa el formulario detallado y te contactaremos para coordinar la cita</p>
                    </div>

                    {/* Enhanced Form */}
                    <form 
                        ref={formRef}
                        className="enhanced-form" 
                        onSubmit={handleSubmit}
                        data-aos="fade-up" 
                        data-aos-delay="100"
                        noValidate
                    >
                        {/* Personal Info Section */}
                        <div className="form-section">
                            <h3 className="section-title">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                                    <circle cx="12" cy="7" r="4"/>
                                </svg>
                                Información Personal
                            </h3>
                            
                            <div className="form-grid">
                                <div className="form-field">
                                    <label className="form-label">
                                        Nombre completo *
                                    </label>
                                    <div className={`input-wrapper ${errors.name ? 'error' : ''}`}>
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                                            <circle cx="12" cy="7" r="4"/>
                                        </svg>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            placeholder="Ej: Juan Pérez"
                                            autoComplete="name"
                                            required
                                        />
                                    </div>
                                    {errors.name && (
                                        <div className="field-error show">
                                            {errors.name}
                                        </div>
                                    )}
                                </div>

                                <div className="form-field">
                                    <label className="form-label">
                                        WhatsApp / Teléfono *
                                    </label>
                                    <div className={`input-wrapper ${errors.phone ? 'error' : ''}`}>
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                                        </svg>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            placeholder="300 123 4567"
                                            required
                                        />
                                    </div>
                                    {errors.phone && (
                                        <div className="field-error show">
                                            {errors.phone}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="form-field">
                                <label className="form-label">
                                    Correo electrónico *
                                </label>
                                <div className={`input-wrapper ${errors.email ? 'error' : ''}`}>
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2 2V6c0-1.1.9-2 2-2z"/>
                                        <polyline points="22,6 12,13 2,6"/>
                                    </svg>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder="correo@ejemplo.com"
                                        required
                                    />
                                </div>
                                {errors.email && (
                                    <div className="field-error show">
                                        {errors.email}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Service Details Section */}
                        <div className="form-section">
                            <h3 className="section-title">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                                    <line x1="8" y1="21" x2="16" y2="21"/>
                                    <line x1="12" y1="17" x2="12" y2="21"/>
                                </svg>
                                Detalles del Servicio
                            </h3>

                            <div className="form-grid">
                                <div className="form-field">
                                    <label className="form-label">
                                        Tipo de equipo *
                                    </label>
                                    <div className={`select-wrapper ${errors.deviceType ? 'error' : ''}`}>
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                                            <line x1="8" y1="21" x2="16" y2="21"/>
                                            <line x1="12" y1="17" x2="12" y2="21"/>
                                        </svg>
                                        <select
                                            name="deviceType"
                                            value={formData.deviceType}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            required
                                        >
                                            <option value="">Selecciona tu equipo</option>
                                            <option value="laptop">💻 Portátil / Laptop</option>
                                            <option value="pc-desktop">🖥️ PC de Escritorio</option>
                                            <option value="all-in-one">📱 All-in-One</option>
                                            <option value="gaming">🎮 PC Gaming</option>
                                            <option value="server">🖧 Servidor</option>
                                            <option value="other">💿 Otro</option>
                                        </select>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="select-arrow">
                                            <polyline points="6,9 12,15 18,9"/>
                                        </svg>
                                    </div>
                                    {errors.deviceType && (
                                        <div className="field-error show">
                                            {errors.deviceType}
                                        </div>
                                    )}
                                </div>

                                <div className="form-field">
                                    <label className="form-label">
                                        Nivel de urgencia *
                                    </label>
                                    <div className={`select-wrapper ${errors.urgency ? 'error' : ''}`}>
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <circle cx="12" cy="12" r="10"/>
                                            <polyline points="12,6 12,12 16,14"/>
                                        </svg>
                                        <select
                                            name="urgency"
                                            value={formData.urgency}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            required
                                        >
                                            <option value="">¿Qué tan urgente es?</option>
                                            <option value="alta">🚨 ALTA - Necesito ayuda hoy</option>
                                            <option value="media">⚡ MEDIA - En 24-48 horas</option>
                                            <option value="baja">📅 BAJA - Esta semana</option>
                                        </select>
                                        <svg className="select-arrow" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <polyline points="6,9 12,15 18,9"/>
                                        </svg>
                                    </div>
                                    {errors.urgency && (
                                        <div className="field-error show">
                                            {errors.urgency}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="form-field">
                                <label className="form-label">
                                    Describe el problema *
                                </label>
                                <div className={`textarea-wrapper ${errors.problem ? 'error' : ''}`}>
                                    <textarea
                                        name="problem"
                                        value={formData.problem}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder="Cuéntanos exactamente qué está pasando con tu computador. Mientras más detalles, mejor podremos ayudarte..."
                                        rows={4}
                                        autoComplete="off"
                                        spellCheck="true"
                                        required
                                    />
                                    <div className="char-counter">
                                        {formData.problem.length}/500
                                    </div>
                                </div>
                                {errors.problem && (
                                    <div className="field-error show">
                                        {errors.problem}
                                    </div>
                                )}
                            </div>

                            <div className="form-field">
                                <label className="form-label">
                                    Ubicación específica (opcional)
                                </label>
                                <div className="input-wrapper">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                                        <circle cx="12" cy="10" r="3"/>
                                    </svg>
                                    <input
                                        type="text"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder="Ej: Barrio Centro, cerca al banco..."
                                        autoComplete="address-line1"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button 
                            type="submit" 
                            className={`btn-submit ${isSubmitting ? 'submitting' : ''}`}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <>
                                    <div className="spinner"></div>
                                    Enviando solicitud...
                                </>
                            ) : (
                                <>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10z"/>
                                    </svg>
                                    Enviar por WhatsApp
                                </>
                            )}
                        </button>

                        {/* Trust Indicators */}
                        <div className="form-trust">
                            <div className="trust-item">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                                </svg>
                                <span>Información segura</span>
                            </div>
                            <div className="trust-item">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="12" r="10"/>
                                    <polyline points="12,6 12,12 16,14"/>
                                </svg>
                                <span>Respuesta en 2 horas</span>
                            </div>
                            <div className="trust-item">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M9 12l2 2 4-4"/>
                                    <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3"/>
                                    <path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3"/>
                                </svg>
                                <span>Sin compromiso</span>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default ContactForm;
