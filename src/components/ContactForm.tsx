'use client';

import React, { useState } from 'react';
import { UserIcon, DeviceIcon, SendIcon, CheckCircleIcon, WhatsAppIcon } from './Icons';
import styles from './ContactForm.module.css';

/* ── Types ────────────────────────────────────────────────────────────── */

interface ContactFormData {
  name: string;
  phone: string;
  service: string;
  deviceType: string;
  problem: string;
  urgency: string;
}

interface FormErrors {
  [key: string]: string;
}

/* ── Data ─────────────────────────────────────────────────────────────── */

const SERVICE_OPTIONS = [
  { value: '', label: 'Selecciona un servicio', group: '' },
  { value: 'reparacion', label: '🔧 Reparación de Hardware', group: 'Reparación' },
  { value: 'mantenimiento', label: '🛡️ Mantenimiento Preventivo', group: 'Reparación' },
  { value: 'datos', label: '💾 Recuperación de Datos', group: 'Reparación' },
  { value: 'formateo', label: '💿 Formateo e Instalación', group: 'Reparación' },
  { value: 'virus', label: '🦠 Eliminación de Virus', group: 'Reparación' },
  { value: 'remoto', label: '📡 Soporte Remoto', group: 'Reparación' },
  { value: 'plan-basico', label: '🏢 Plan Básico Empresarial', group: 'Empresas' },
  { value: 'plan-profesional', label: '⚡ Plan Profesional Empresarial', group: 'Empresas' },
  { value: 'plan-corporativo', label: '🏆 Plan Corporativo', group: 'Empresas' },
  { value: 'digitalizacion', label: '📊 Digitalización de Procesos', group: 'Empresas' },
  { value: 'web', label: '🌐 Desarrollo Web', group: 'Desarrollo' },
  { value: 'otro', label: '📝 Otro servicio', group: '' },
];

const DEVICE_OPTIONS = [
  { value: '', label: 'Selecciona' },
  { value: 'laptop', label: '💻 Portátil' },
  { value: 'pc-desktop', label: '🖥️ PC Escritorio' },
  { value: 'all-in-one', label: '📱 All-in-One' },
  { value: 'gaming', label: '🎮 PC Gaming' },
  { value: 'multiple', label: '🏢 Varios equipos' },
  { value: 'other', label: '💿 Otro' },
];

const URGENCY_OPTIONS = [
  { value: '', label: 'Selecciona' },
  { value: 'alta', label: '🚨 Alta - Hoy' },
  { value: 'media', label: '⚡ Media - 24-48h' },
  { value: 'baja', label: '📅 Baja - Esta semana' },
];

const STEPS = [
  { label: 'Datos', icon: UserIcon },
  { label: 'Servicio', icon: DeviceIcon },
  { label: 'Enviar', icon: SendIcon },
];

/* ── Component ────────────────────────────────────────────────────────── */

const ContactForm = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    phone: '',
    service: '',
    deviceType: '',
    problem: '',
    urgency: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  /* ── Validation ──────────────────────────────────────────────────── */

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'name':
        return value.trim().length < 2 ? 'El nombre debe tener al menos 2 caracteres' : '';
      case 'phone':
        return !/^[+]?[\d\s\-()]{10,}$/.test(value) ? 'Ingresa un número válido' : '';
      case 'service':
        return !value ? 'Selecciona un servicio' : '';
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

  const validateStep = (stepIndex: number): boolean => {
    const stepFields: string[][] = [
      ['name', 'phone'],
      ['service', 'deviceType', 'urgency'],
      ['problem'],
    ];

    const newErrors: FormErrors = {};
    stepFields[stepIndex].forEach((field) => {
      const error = validateField(field, formData[field as keyof ContactFormData]);
      if (error) newErrors[field] = error;
    });

    setErrors((prev) => ({ ...prev, ...newErrors }));
    return Object.keys(newErrors).length === 0;
  };

  /* ── Handlers ────────────────────────────────────────────────────── */

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

  const nextStep = () => {
    if (validateStep(step)) {
      setStep((s) => Math.min(s + 1, 2));
    }
  };

  const prevStep = () => setStep((s) => Math.max(s - 1, 0));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateStep(2)) return;

    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 400));

      const urgencyEmoji =
        formData.urgency === 'alta' ? '🚨' : formData.urgency === 'media' ? '⚡' : '📅';

      const serviceLabel =
        SERVICE_OPTIONS.find((s) => s.value === formData.service)?.label || 'Otro';
      const deviceLabel =
        DEVICE_OPTIONS.find((d) => d.value === formData.deviceType)?.label || 'Otro';
      const urgencyLabel = URGENCY_OPTIONS.find((u) => u.value === formData.urgency)?.label || '';

      const message = `${urgencyEmoji} NUEVA SOLICITUD

👤 *Cliente:* ${formData.name}
📱 *WhatsApp:* ${formData.phone}

🔧 *Servicio:* ${serviceLabel}
${deviceLabel ? `💻 *Equipo:* ${deviceLabel}` : ''}
${urgencyEmoji} *Urgencia:* ${urgencyLabel}

📝 *Descripción:*
${formData.problem}

---
Enviado desde ferchotecnico.com`;

      window.open(`https://wa.me/573008474121?text=${encodeURIComponent(message)}`, '_blank');

      setFormData({
        name: '',
        phone: '',
        service: '',
        deviceType: '',
        problem: '',
        urgency: '',
      });
      setStep(0);
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ── Render ──────────────────────────────────────────────────────── */

  return (
    <section id="contacto" className={styles.contactForm}>
      <div className={styles.container}>
        <div className={styles.card} data-aos="fade-up">
          {/* Header */}
          <div className={styles.header}>
            <span className={styles.eyebrow}>
              <SendIcon />
              Solicita tu servicio
            </span>
            <h2 className={styles.title}>
              Cuéntame
              <span className={styles.titleAccent}> qué necesitas</span>
            </h2>
            <p className={styles.subtitle}>Completa los 3 pasos y te contacto por WhatsApp</p>
          </div>

          {/* Step Indicators */}
          <div className={styles.stepIndicators}>
            {STEPS.map((s, idx) => {
              const StepIcon = s.icon;
              return (
                <div
                  key={s.label}
                  className={`${styles.stepDot} ${idx <= step ? styles.stepDotActive : ''} ${idx === step ? styles.stepDotCurrent : ''}`}
                >
                  <div className={styles.stepCircle}>
                    {idx < step ? (
                      <CheckCircleIcon className={styles.stepCheck} />
                    ) : (
                      <StepIcon className={styles.stepIcon} />
                    )}
                  </div>
                  <span className={styles.stepLabel}>{s.label}</span>
                  {idx < STEPS.length - 1 && (
                    <div
                      className={`${styles.stepLine} ${idx < step ? styles.stepLineActive : ''}`}
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {/* Step 0: Info Personal */}
            <div className={`${styles.stepPanel} ${step === 0 ? styles.stepPanelActive : ''}`}>
              <h3 className={styles.sectionTitle}>
                <UserIcon />
                Información Personal
              </h3>

              <div className={styles.fieldGroup}>
                <label htmlFor="cf-name" className={styles.label}>
                  Nombre completo *
                </label>
                <input
                  id="cf-name"
                  name="name"
                  type="text"
                  placeholder="Tu nombre"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                  autoComplete="name"
                />
                {errors.name && <span className={styles.errorText}>{errors.name}</span>}
              </div>

              <div className={styles.fieldGroup}>
                <label htmlFor="cf-phone" className={styles.label}>
                  WhatsApp *
                </label>
                <input
                  id="cf-phone"
                  name="phone"
                  type="tel"
                  placeholder="300 123 4567"
                  value={formData.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`${styles.input} ${errors.phone ? styles.inputError : ''}`}
                  autoComplete="tel"
                />
                {errors.phone && <span className={styles.errorText}>{errors.phone}</span>}
              </div>

              <button type="button" className={styles.nextBtn} onClick={nextStep}>
                Siguiente
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M5 12h14" />
                  <path d="M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Step 1: Servicio */}
            <div className={`${styles.stepPanel} ${step === 1 ? styles.stepPanelActive : ''}`}>
              <h3 className={styles.sectionTitle}>
                <DeviceIcon />
                Detalles del Servicio
              </h3>

              <div className={styles.fieldGroup}>
                <label htmlFor="cf-service" className={styles.label}>
                  ¿Qué servicio necesitas? *
                </label>
                <select
                  id="cf-service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`${styles.select} ${errors.service ? styles.inputError : ''}`}
                >
                  <option value="">Selecciona un servicio</option>
                  <optgroup label="Reparación y Mantenimiento">
                    {SERVICE_OPTIONS.filter((s) => s.group === 'Reparación').map((s) => (
                      <option key={s.value} value={s.value}>
                        {s.label}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="Para Empresas">
                    {SERVICE_OPTIONS.filter((s) => s.group === 'Empresas').map((s) => (
                      <option key={s.value} value={s.value}>
                        {s.label}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="Desarrollo">
                    {SERVICE_OPTIONS.filter((s) => s.group === 'Desarrollo').map((s) => (
                      <option key={s.value} value={s.value}>
                        {s.label}
                      </option>
                    ))}
                  </optgroup>
                  <option value="otro">📝 Otro servicio</option>
                </select>
                {errors.service && <span className={styles.errorText}>{errors.service}</span>}
              </div>

              <div className={styles.formGrid}>
                <div className={styles.fieldGroup}>
                  <label htmlFor="cf-device" className={styles.label}>
                    Tipo de equipo *
                  </label>
                  <select
                    id="cf-device"
                    name="deviceType"
                    value={formData.deviceType}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`${styles.select} ${errors.deviceType ? styles.inputError : ''}`}
                  >
                    {DEVICE_OPTIONS.map((d) => (
                      <option key={d.value} value={d.value}>
                        {d.label}
                      </option>
                    ))}
                  </select>
                  {errors.deviceType && (
                    <span className={styles.errorText}>{errors.deviceType}</span>
                  )}
                </div>

                <div className={styles.fieldGroup}>
                  <label htmlFor="cf-urgency" className={styles.label}>
                    Urgencia *
                  </label>
                  <select
                    id="cf-urgency"
                    name="urgency"
                    value={formData.urgency}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`${styles.select} ${errors.urgency ? styles.inputError : ''}`}
                  >
                    {URGENCY_OPTIONS.map((u) => (
                      <option key={u.value} value={u.value}>
                        {u.label}
                      </option>
                    ))}
                  </select>
                  {errors.urgency && <span className={styles.errorText}>{errors.urgency}</span>}
                </div>
              </div>

              <div className={styles.stepActions}>
                <button type="button" className={styles.backBtn} onClick={prevStep}>
                  ← Atrás
                </button>
                <button type="button" className={styles.nextBtn} onClick={nextStep}>
                  Siguiente →
                </button>
              </div>
            </div>

            {/* Step 2: Descripción + Envío */}
            <div className={`${styles.stepPanel} ${step === 2 ? styles.stepPanelActive : ''}`}>
              <h3 className={styles.sectionTitle}>
                <SendIcon />
                Describe tu problema
              </h3>

              <div className={styles.fieldGroup}>
                <label htmlFor="cf-problem" className={styles.label}>
                  ¿Qué está pasando con tu equipo? *
                </label>
                <textarea
                  id="cf-problem"
                  name="problem"
                  placeholder="Cuéntame qué problema tiene tu equipo, qué síntomas presenta, etc."
                  value={formData.problem}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`${styles.textarea} ${errors.problem ? styles.inputError : ''}`}
                  rows={4}
                />
                <div className={styles.charCount}>{formData.problem.length}/500</div>
                {errors.problem && <span className={styles.errorText}>{errors.problem}</span>}
              </div>

              {/* Social Proof */}
              <div className={styles.socialProof}>
                <div className={styles.proofStars}>★★★★★</div>
                <span className={styles.proofText}>
                  <strong>4.9/5</strong> basado en 100+ clientes satisfechos
                </span>
              </div>

              <div className={styles.stepActions}>
                <button type="button" className={styles.backBtn} onClick={prevStep}>
                  ← Atrás
                </button>
                <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <div className={styles.spinner} />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <WhatsAppIcon size={18} />
                      Enviar por WhatsApp
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Trust badges below card */}
        <div className={styles.trustBadges} data-aos="fade-up">
          <div className={styles.trustItem}>
            <CheckCircleIcon className={styles.trustIcon} />
            <span>Diagnóstico gratis</span>
          </div>
          <div className={styles.trustItem}>
            <CheckCircleIcon className={styles.trustIcon} />
            <span>Sin compromiso</span>
          </div>
          <div className={styles.trustItem}>
            <CheckCircleIcon className={styles.trustIcon} />
            <span>Respuesta en 2h</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
