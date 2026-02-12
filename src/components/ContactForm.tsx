'use client';

import React, { useState } from 'react';
import { UserIcon, DeviceIcon, SendIcon } from './Icons';
import styles from './ContactForm.module.css';

interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  deviceType: string;
  problem: string;
  urgency: string;
}

interface FormErrors {
  [key: string]: string;
}

const ContactForm = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    phone: '',
    email: '',
    deviceType: '',
    problem: '',
    urgency: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'name':
        return value.trim().length < 2 ? 'El nombre debe tener al menos 2 caracteres' : '';
      case 'phone':
        return !/^[+]?[\d\s\-\(\)]{10,}$/.test(value) ? 'Ingresa un número válido' : '';
      case 'email':
        return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? 'Ingresa un correo válido' : '';
      case 'deviceType':
        return !value ? 'Selecciona el tipo de equipo' : '';
      case 'problem':
        return value.trim().length < 10 ? 'Describe el problema (mín. 10 caracteres)' : '';
      case 'urgency':
        return !value ? 'Selecciona la urgencia' : '';
      default:
        return '';
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    if (error) setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    ['name', 'phone', 'email', 'deviceType', 'problem', 'urgency'].forEach((field) => {
      const error = validateField(field, formData[field as keyof ContactFormData]);
      if (error) newErrors[field] = error;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      const urgencyEmoji =
        formData.urgency === 'alta' ? '🚨' : formData.urgency === 'media' ? '⚡' : '📅';
      const deviceEmoji =
        formData.deviceType === 'laptop'
          ? '💻'
          : formData.deviceType === 'pc-desktop'
            ? '🖥️'
            : '💿';

      const deviceText: Record<string, string> = {
        'pc-desktop': 'PC de Escritorio',
        laptop: 'Portátil',
        'all-in-one': 'All-in-One',
        gaming: 'PC Gaming',
        server: 'Servidor',
        other: 'Otro',
      };

      const urgencyText: Record<string, string> = {
        alta: 'ALTA - Requiere atención inmediata',
        media: 'MEDIA - En 24-48 horas',
        baja: 'BAJA - Esta semana',
      };

      const message = `${urgencyEmoji} NUEVA SOLICITUD

👤 *Cliente:* ${formData.name}
📱 *WhatsApp:* ${formData.phone}
📧 *Email:* ${formData.email}

${deviceEmoji} *Equipo:* ${deviceText[formData.deviceType] || 'Otro'}
${urgencyEmoji} *Urgencia:* ${urgencyText[formData.urgency] || ''}

🔧 *Problema:*
${formData.problem}

---
Enviado desde ferchotecnico.com`;

      window.open(`https://wa.me/573008474121?text=${encodeURIComponent(message)}`, '_blank');

      setFormData({
        name: '',
        phone: '',
        email: '',
        deviceType: '',
        problem: '',
        urgency: '',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contacto" className={styles.contactForm}>
      <div className={styles.container}>
        <div className={styles.card} data-aos="fade-up">
          {/* Header */}
          <div className={styles.header}>
            <div className={styles.badge}>
              <SendIcon />
              Formulario de Contacto
            </div>
            <h2 className={styles.title}>Solicita tu Servicio</h2>
            <p className={styles.subtitle}>Completa el formulario y te contactamos</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {/* Personal Info */}
            <div className={styles.formSection}>
              <h3 className={styles.sectionTitle}>
                <UserIcon />
                Información Personal
              </h3>

              <div className={styles.formGrid}>
                <div className={styles.fieldGroup}>
                  <label className={styles.label}>Nombre completo *</label>
                  <input
                    name="name"
                    type="text"
                    placeholder="Tu nombre"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                    required
                  />
                  {errors.name && <span className={styles.errorText}>{errors.name}</span>}
                </div>

                <div className={styles.fieldGroup}>
                  <label className={styles.label}>WhatsApp *</label>
                  <input
                    name="phone"
                    type="tel"
                    placeholder="300 123 4567"
                    value={formData.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`${styles.input} ${errors.phone ? styles.inputError : ''}`}
                    required
                  />
                  {errors.phone && <span className={styles.errorText}>{errors.phone}</span>}
                </div>
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label}>Correo electrónico *</label>
                <input
                  name="email"
                  type="email"
                  placeholder="correo@ejemplo.com"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                  required
                />
                {errors.email && <span className={styles.errorText}>{errors.email}</span>}
              </div>
            </div>

            {/* Service Details */}
            <div className={styles.formSection}>
              <h3 className={styles.sectionTitle}>
                <DeviceIcon />
                Detalles del Servicio
              </h3>

              <div className={styles.formGrid}>
                <div className={styles.fieldGroup}>
                  <label className={styles.label}>Tipo de equipo *</label>
                  <select
                    name="deviceType"
                    value={formData.deviceType}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`${styles.select} ${errors.deviceType ? styles.inputError : ''}`}
                    required
                  >
                    <option value="">Selecciona</option>
                    <option value="laptop">💻 Portátil</option>
                    <option value="pc-desktop">🖥️ PC Escritorio</option>
                    <option value="all-in-one">📱 All-in-One</option>
                    <option value="gaming">🎮 PC Gaming</option>
                    <option value="other">💿 Otro</option>
                  </select>
                  {errors.deviceType && (
                    <span className={styles.errorText}>{errors.deviceType}</span>
                  )}
                </div>

                <div className={styles.fieldGroup}>
                  <label className={styles.label}>Urgencia *</label>
                  <select
                    name="urgency"
                    value={formData.urgency}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`${styles.select} ${errors.urgency ? styles.inputError : ''}`}
                    required
                  >
                    <option value="">Selecciona</option>
                    <option value="alta">🚨 Alta - Hoy</option>
                    <option value="media">⚡ Media - 24-48h</option>
                    <option value="baja">📅 Baja - Esta semana</option>
                  </select>
                  {errors.urgency && <span className={styles.errorText}>{errors.urgency}</span>}
                </div>
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label}>Describe el problema *</label>
                <textarea
                  name="problem"
                  placeholder="Cuéntanos qué está pasando con tu equipo..."
                  value={formData.problem}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`${styles.textarea} ${errors.problem ? styles.inputError : ''}`}
                  rows={3}
                  required
                />
                <div className={styles.charCount}>{formData.problem.length}/500</div>
                {errors.problem && <span className={styles.errorText}>{errors.problem}</span>}
              </div>
            </div>

            {/* Submit */}
            <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <div className={styles.spinner}></div>
                  Enviando...
                </>
              ) : (
                <>
                  <SendIcon />
                  Enviar por WhatsApp
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
