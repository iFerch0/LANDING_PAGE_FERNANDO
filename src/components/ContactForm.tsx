'use client';

import React, { useState } from "react";

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

    // Estilos inline para asegurar que no haya interferencias CSS
    const inputStyles: React.CSSProperties = {
        width: '100%',
        padding: '12px 16px',
        border: '2px solid var(--color-border)',
        borderRadius: '8px',
        fontSize: '16px',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        backgroundColor: 'var(--color-surface)',
        color: 'var(--color-text)',
        outline: 'none',
        transition: 'all 0.2s ease',
        boxSizing: 'border-box'
    };

    const textareaStyles: React.CSSProperties = {
        ...inputStyles,
        minHeight: '100px',
        resize: 'vertical' as const,
        lineHeight: '1.5',
        whiteSpace: 'pre-wrap' as const
    };

    const selectStyles: React.CSSProperties = {
        ...inputStyles,
        cursor: 'pointer',
        appearance: 'none',
        backgroundImage: "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='var(--color-text-secondary)' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")",
        backgroundPosition: 'right 12px center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '16px',
        paddingRight: '40px'
    };

    const validateField = (name: string, value: string): string => {
        switch (name) {
            case 'name':
                return value.trim().length < 2 ? 'El nombre debe tener al menos 2 caracteres' : '';
            case 'phone':
                const phoneRegex = /^[+]?[\d\s\-\(\)]{10,}$/;
                return !phoneRegex.test(value) ? 'Ingresa un número de teléfono válido' : '';
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return !emailRegex.test(value) ? 'Ingresa un correo electrónico válido' : '';
            case 'deviceType':
                return !value ? 'Selecciona el tipo de equipo' : '';
            case 'problem':
                return value.trim().length < 10 ? 'Describe el problema con más detalle (mín. 10 caracteres)' : '';
            case 'urgency':
                return !value ? 'Selecciona el nivel de urgencia' : '';
            default:
                return '';
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        
        console.log(`Campo: ${name}, Valor: "${value}", Longitud: ${value.length}`); // Debug
        
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleInput = (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.currentTarget;
        
        console.log(`Input event - Campo: ${name}, Valor: "${value}", Longitud: ${value.length}`); // Debug adicional
        
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        // Forzar la captura de espacios
        if (e.key === ' ') {
            const { name, value } = e.currentTarget;
            const newValue = value + ' ';
            
            console.log(`Espacio presionado - Campo: ${name}, Nuevo valor: "${newValue}"`); // Debug
            
            setFormData(prev => ({
                ...prev,
                [name]: newValue
            }));
            
            // Clear error when user starts typing
            if (errors[name]) {
                setErrors(prev => ({
                    ...prev,
                    [name]: ''
                }));
            }
        }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        const error = validateField(name, value);
        if (error) {
            setErrors(prev => ({ ...prev, [name]: error }));
        }
    };

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};
        
        // Validate required fields
        const requiredFields = ['name', 'phone', 'email', 'deviceType', 'problem', 'urgency'];
        
        requiredFields.forEach(field => {
            const error = validateField(field, formData[field as keyof FormData]);
            if (error) {
                newErrors[field] = error;
            }
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        console.log('Datos del formulario:', formData); // Debug
        
        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 800));
            
            const urgencyEmoji = formData.urgency === 'alta' ? '🚨' : formData.urgency === 'media' ? '⚡' : '📅';
            const deviceEmoji = formData.deviceType === 'laptop' ? '💻' : formData.deviceType === 'pc-desktop' ? '🖥️' : '💿';
            
            const deviceText = {
                'pc-desktop': 'PC de Escritorio',
                'laptop': 'Portátil',
                'all-in-one': 'All-in-One',
                'gaming': 'PC Gaming',
                'server': 'Servidor',
                'other': 'Otro'
            }[formData.deviceType] || 'Otro';

            const urgencyText = {
                'alta': 'ALTA - Requiere atención inmediata',
                'media': 'MEDIA - En 24-48 horas',
                'baja': 'BAJA - Esta semana'
            }[formData.urgency] || '';

            const message = `${urgencyEmoji} NUEVA SOLICITUD DE SERVICIO TÉCNICO

👤 *Cliente:* ${formData.name}
📱 *WhatsApp:* ${formData.phone}
📧 *Email:* ${formData.email}

${deviceEmoji} *Equipo:* ${deviceText}

${urgencyEmoji} *Urgencia:* ${urgencyText}

🔧 *Problema:*
${formData.problem}

${formData.location ? `📍 *Ubicación:* ${formData.location}` : ''}

---
💬 Enviado desde www.ferchotecnico.com`;

            const whatsappUrl = `https://wa.me/573008474121?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');
            
            // Reset form
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
        <section id="contacto" style={{
            padding: '80px 0',
            background: 'var(--color-background)'
        }}>
            <div style={{
                maxWidth: '800px',
                margin: '0 auto',
                padding: '0 20px'
            }}>
                <div style={{
                    background: 'var(--color-surface)',
                    borderRadius: '16px',
                    padding: '48px',
                    boxShadow: 'var(--shadow-lg)',
                    border: '1px solid var(--color-border)'
                }}>
                    {/* Header */}
                    <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                        <div style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            background: 'var(--color-primary)',
                            color: 'var(--color-btn-primary-text)',
                            padding: '8px 16px',
                            borderRadius: '50px',
                            fontSize: '14px',
                            fontWeight: '500',
                            marginBottom: '16px'
                        }}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M3 8l7.89 7.89a2.85 2.85 0 0 0 4.04 0L20 11"/>
                                <path d="M9 21h6"/>
                                <path d="M12 3v18"/>
                            </svg>
                            Solicitud Profesional
                        </div>
                        <h2 style={{
                            fontSize: '32px',
                            fontWeight: 'bold',
                            marginBottom: '12px',
                            color: 'var(--color-text)',
                            textAlign: 'center'
                        }}>
                            Solicita tu Servicio Técnico
                        </h2>
                        <p style={{
                            color: 'var(--color-text-secondary)',
                            fontSize: '18px',
                            maxWidth: '500px',
                            margin: '0 auto'
                        }}>
                            Completa el formulario y recibe atención inmediata
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                        {/* Personal Info */}
                        <div style={{ marginBottom: '32px' }}>
                            <h3 style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                fontSize: '18px',
                                fontWeight: '600',
                                color: 'var(--color-text)',
                                marginBottom: '20px',
                                paddingBottom: '8px',
                                borderBottom: '2px solid var(--color-border)'
                            }}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3a6e93" strokeWidth="2">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                                    <circle cx="12" cy="7" r="4"/>
                                </svg>
                                Información Personal
                            </h3>
                            
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                                gap: '20px',
                                marginBottom: '20px'
                            }}>
                                <div>
                                    <label style={{
                                        display: 'block',
                                        fontWeight: '500',
                                        color: 'var(--color-text)',
                                        fontSize: '14px',
                                        marginBottom: '8px'
                                    }}>
                                        Nombre completo *
                                    </label>
                                    <input
                                        name="name"
                                        type="text"
                                        placeholder="Ej: Fernando Rhenals"
                                        required
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        onInput={handleInput}
                                        onKeyDown={handleKeyDown}
                                        onBlur={handleBlur}
                                        style={{
                                            ...inputStyles,
                                            borderColor: errors.name ? 'var(--color-error)' : 'var(--color-border)'
                                        }}
                                    />
                                    {errors.name && (
                                        <span style={{ color: 'var(--color-error)', fontSize: '12px', marginTop: '4px', display: 'block' }}>
                                            {errors.name}
                                        </span>
                                    )}
                                </div>

                                <div>
                                    <label style={{
                                        display: 'block',
                                        fontWeight: '500',
                                        color: 'var(--color-text)',
                                        fontSize: '14px',
                                        marginBottom: '8px'
                                    }}>
                                        WhatsApp / Teléfono *
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        onInput={handleInput}
                                        onBlur={handleBlur}
                                        placeholder="300 123 4567"
                                        style={{
                                            ...inputStyles,
                                            borderColor: errors.phone ? 'var(--color-error)' : 'var(--color-border)'
                                        }}
                                        required
                                    />
                                    {errors.phone && (
                                        <span style={{ color: 'var(--color-error)', fontSize: '12px', marginTop: '4px', display: 'block' }}>
                                            {errors.phone}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label style={{
                                    display: 'block',
                                    fontWeight: '500',
                                    color: 'var(--color-text)',
                                    fontSize: '14px',
                                    marginBottom: '8px'
                                }}>
                                    Correo electrónico *
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    onInput={handleInput}
                                    onBlur={handleBlur}
                                    placeholder="correo@ejemplo.com"
                                    style={{
                                        ...inputStyles,
                                        borderColor: errors.email ? 'var(--color-error)' : 'var(--color-border)'
                                    }}
                                    required
                                />
                                {errors.email && (
                                    <span style={{ color: 'var(--color-error)', fontSize: '12px', marginTop: '4px', display: 'block' }}>
                                        {errors.email}
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Service Details */}
                        <div style={{ marginBottom: '32px' }}>
                            <h3 style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                fontSize: '18px',
                                fontWeight: '600',
                                color: 'var(--color-text)',
                                marginBottom: '20px',
                                paddingBottom: '8px',
                                borderBottom: '2px solid var(--color-border)'
                            }}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3a6e93" strokeWidth="2">
                                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                                    <line x1="8" y1="21" x2="16" y2="21"/>
                                    <line x1="12" y1="17" x2="12" y2="21"/>
                                </svg>
                                Detalles del Servicio
                            </h3>

                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                                gap: '20px',
                                marginBottom: '20px'
                            }}>
                                <div>
                                    <label style={{
                                        display: 'block',
                                        fontWeight: '500',
                                        color: 'var(--color-text)',
                                        fontSize: '14px',
                                        marginBottom: '8px'
                                    }}>
                                        Tipo de equipo *
                                    </label>
                                    <select
                                        name="deviceType"
                                        value={formData.deviceType}
                                        onChange={handleInputChange}
                                        onBlur={handleBlur}
                                        style={{
                                            ...selectStyles,
                                            borderColor: errors.deviceType ? 'var(--color-error)' : 'var(--color-border)'
                                        }}
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
                                    {errors.deviceType && (
                                        <span style={{ color: 'var(--color-error)', fontSize: '12px', marginTop: '4px', display: 'block' }}>
                                            {errors.deviceType}
                                        </span>
                                    )}
                                </div>

                                <div>
                                    <label style={{
                                        display: 'block',
                                        fontWeight: '500',
                                        color: 'var(--color-text)',
                                        fontSize: '14px',
                                        marginBottom: '8px'
                                    }}>
                                        Nivel de urgencia *
                                    </label>
                                    <select
                                        name="urgency"
                                        value={formData.urgency}
                                        onChange={handleInputChange}
                                        onBlur={handleBlur}
                                        style={{
                                            ...selectStyles,
                                            borderColor: errors.urgency ? 'var(--color-error)' : 'var(--color-border)'
                                        }}
                                        required
                                    >
                                        <option value="">¿Qué tan urgente es?</option>
                                        <option value="alta">🚨 ALTA - Necesito ayuda hoy</option>
                                        <option value="media">⚡ MEDIA - En 24-48 horas</option>
                                        <option value="baja">📅 BAJA - Esta semana</option>
                                    </select>
                                    {errors.urgency && (
                                        <span style={{ color: 'var(--color-error)', fontSize: '12px', marginTop: '4px', display: 'block' }}>
                                            {errors.urgency}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div style={{ marginBottom: '20px' }}>
                                <label style={{
                                    display: 'block',
                                    fontWeight: '500',
                                    color: 'var(--color-text)',
                                    fontSize: '14px',
                                    marginBottom: '8px'
                                }}>
                                    Describe el problema *
                                </label>
                                <textarea
                                    name="problem"
                                    placeholder="Cuéntanos exactamente qué está pasando con tu computador. Mientras más detalles, mejor podremos ayudarte..."
                                    required
                                    value={formData.problem}
                                    onChange={handleInputChange}
                                    onInput={handleInput}
                                    onKeyDown={handleKeyDown}
                                    onBlur={handleBlur}
                                    style={{
                                        ...textareaStyles,
                                        borderColor: errors.problem ? 'var(--color-error)' : 'var(--color-border)'
                                    }}
                                    rows={4}
                                />
                                <div style={{
                                    fontSize: '12px',
                                    color: 'var(--color-text-secondary)',
                                    textAlign: 'right',
                                    marginTop: '4px'
                                }}>
                                    {formData.problem.length}/500
                                </div>
                                {errors.problem && (
                                    <span style={{ color: 'var(--color-error)', fontSize: '12px', marginTop: '4px', display: 'block' }}>
                                        {errors.problem}
                                    </span>
                                )}
                            </div>

                            <div>
                                <label style={{
                                    display: 'block',
                                    fontWeight: '500',
                                    color: 'var(--color-text)',
                                    fontSize: '14px',
                                    marginBottom: '8px'
                                }}>
                                    Ubicación específica (opcional)
                                </label>
                                <input
                                    name="location"
                                    type="text"
                                    placeholder="Ej: Barrio Centro, cerca al banco..."
                                    value={formData.location}
                                    onChange={handleInputChange}
                                    onInput={handleInput}
                                    onKeyDown={handleKeyDown}
                                    onBlur={handleBlur}
                                    style={inputStyles}
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button 
                            type="submit" 
                            disabled={isSubmitting}
                            style={{
                                width: '100%',
                                background: isSubmitting 
                                    ? 'var(--color-text-secondary)' 
                                    : 'var(--color-primary)',
                                color: 'var(--color-btn-primary-text)',
                                border: 'none',
                                padding: '16px 24px',
                                borderRadius: '8px',
                                fontSize: '18px',
                                fontWeight: '600',
                                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                                transition: 'all 0.3s ease',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px',
                                marginTop: '24px'
                            }}
                        >
                            {isSubmitting ? (
                                <>
                                    <div style={{
                                        width: '20px',
                                        height: '20px',
                                        border: '2px solid transparent',
                                        borderTop: '2px solid currentColor',
                                        borderRadius: '50%',
                                        animation: 'spin 1s linear infinite'
                                    }}></div>
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
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: '24px',
                            marginTop: '20px',
                            paddingTop: '16px',
                            borderTop: '1px solid var(--color-border)',
                            flexWrap: 'wrap'
                        }}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                                fontSize: '12px',
                                color: 'var(--color-text-secondary)',
                                fontWeight: '500'
                            }}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3a6e93" strokeWidth="2">
                                    <circle cx="12" cy="12" r="10"/>
                                    <polyline points="12,6 12,12 16,14"/>
                                </svg>
                                <span>Respuesta rápida</span>
                            </div>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                                fontSize: '12px',
                                color: 'var(--color-text-secondary)',
                                fontWeight: '500'
                            }}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3a6e93" strokeWidth="2">
                                    <path d="M9 11l3 3L22 4"/>
                                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
                                </svg>
                                <span>Sin compromiso</span>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            <style jsx>{`
                @keyframes spin {
                    to {
                        transform: rotate(360deg);
                    }
                }
                
                /* Estilos para inputs en modo oscuro */
                input::placeholder,
                textarea::placeholder,
                select::placeholder {
                    color: var(--color-text-secondary);
                    opacity: 0.7;
                }
                
                /* Estilos de focus para mejor accesibilidad */
                input:focus,
                textarea:focus,
                select:focus {
                    border-color: var(--color-primary);
                    box-shadow: 0 0 0 3px var(--color-focus-ring);
                    outline: none;
                }
                
                /* Estilos para select en modo oscuro */
                select option {
                    background-color: var(--color-surface);
                    color: var(--color-text);
                }
                
                /* Estilos para el botón hover */
                button:not(:disabled):hover {
                    background: var(--color-primary-hover);
                    transform: translateY(-1px);
                    box-shadow: var(--shadow-md);
                }
                
                /* Estilos para el botón active */
                button:not(:disabled):active {
                    background: var(--color-primary-active);
                    transform: translateY(0);
                }
                
                /* Estilos para el contenedor del formulario en modo oscuro */
                @media (prefers-color-scheme: dark) {
                    section {
                        background: var(--color-background);
                    }
                }
                
                /* Soporte para data-color-scheme */
                [data-color-scheme="dark"] section {
                    background: var(--color-background);
                }
                
                [data-color-scheme="light"] section {
                    background: var(--color-background);
                }
            `}</style>
        </section>
    );
};

export default ContactForm;
