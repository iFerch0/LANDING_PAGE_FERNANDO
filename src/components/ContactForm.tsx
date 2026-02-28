'use client';

import React from 'react';
import { CheckCircleIcon, WhatsAppIcon, SendIcon, UserIcon, DeviceIcon } from './Icons';
import styles from './ContactForm.module.css';
import { SERVICE_OPTIONS, DEVICE_OPTIONS, URGENCY_OPTIONS, STEPS } from '@/data/contact-form';
import { useContactForm } from '@/hooks/useContactForm';
import type { ContactFormData, FormErrors } from '@/data/contact-form';

/* ── Shared handler types ─────────────────────────────────────────────── */

type ChangeHandler = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
) => void;
type BlurHandler = (
  e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
) => void;

interface StepBaseProps {
  formData: ContactFormData;
  errors: FormErrors;
  onChange: ChangeHandler;
  onBlur: BlurHandler;
}

/* ── Step sub-components ──────────────────────────────────────────────── */

const StepPersonal: React.FC<StepBaseProps & { onNext: () => void }> = ({
  formData,
  errors,
  onChange,
  onBlur,
  onNext,
}) => (
  <>
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
        onChange={onChange}
        onBlur={onBlur}
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
        onChange={onChange}
        onBlur={onBlur}
        className={`${styles.input} ${errors.phone ? styles.inputError : ''}`}
        autoComplete="tel"
      />
      {errors.phone && <span className={styles.errorText}>{errors.phone}</span>}
    </div>

    <button type="button" className={styles.nextBtn} onClick={onNext}>
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
  </>
);

const StepService: React.FC<StepBaseProps & { onNext: () => void; onBack: () => void }> = ({
  formData,
  errors,
  onChange,
  onBlur,
  onNext,
  onBack,
}) => (
  <>
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
        onChange={onChange}
        onBlur={onBlur}
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
          onChange={onChange}
          onBlur={onBlur}
          className={`${styles.select} ${errors.deviceType ? styles.inputError : ''}`}
        >
          {DEVICE_OPTIONS.map((d) => (
            <option key={d.value} value={d.value}>
              {d.label}
            </option>
          ))}
        </select>
        {errors.deviceType && <span className={styles.errorText}>{errors.deviceType}</span>}
      </div>

      <div className={styles.fieldGroup}>
        <label htmlFor="cf-urgency" className={styles.label}>
          Urgencia *
        </label>
        <select
          id="cf-urgency"
          name="urgency"
          value={formData.urgency}
          onChange={onChange}
          onBlur={onBlur}
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
      <button type="button" className={styles.backBtn} onClick={onBack}>
        ← Atrás
      </button>
      <button type="button" className={styles.nextBtn} onClick={onNext}>
        Siguiente →
      </button>
    </div>
  </>
);

const StepSummary: React.FC<StepBaseProps & { onBack: () => void; isSubmitting: boolean }> = ({
  formData,
  errors,
  onChange,
  onBlur,
  onBack,
  isSubmitting,
}) => (
  <>
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
        onChange={onChange}
        onBlur={onBlur}
        className={`${styles.textarea} ${errors.problem ? styles.inputError : ''}`}
        rows={4}
      />
      <div className={styles.charCount}>{formData.problem.length}/500</div>
      {errors.problem && <span className={styles.errorText}>{errors.problem}</span>}
    </div>

    <div className={styles.socialProof}>
      <div className={styles.proofStars}>★★★★★</div>
      <span className={styles.proofText}>
        <strong>4.9/5</strong> basado en 100+ clientes satisfechos
      </span>
    </div>

    <div className={styles.stepActions}>
      <button type="button" className={styles.backBtn} onClick={onBack}>
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
  </>
);

/* ── Main component ───────────────────────────────────────────────────── */

const ContactForm = () => {
  const {
    step,
    formData,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    nextStep,
    prevStep,
    handleSubmit,
  } = useContactForm();

  const stepProps = { formData, errors, onChange: handleChange, onBlur: handleBlur };

  return (
    <section id="contacto" className={styles.contactForm}>
      <div className={styles.container}>
        <div className={styles.card} data-aos="fade-up">
          <div className={styles.header}>
            <span className={styles.eyebrow}>
              <SendIcon />
              Solicita tu servicio
            </span>
            <h2 className={styles.title}>
              Cuéntame<span className={styles.titleAccent}> qué necesitas</span>
            </h2>
            <p className={styles.subtitle}>Completa los 3 pasos y te contacto por WhatsApp</p>
          </div>

          <div className={styles.stepIndicators}>
            {STEPS.map((s, idx) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.label}
                  className={`${styles.stepDot} ${idx <= step ? styles.stepDotActive : ''} ${idx === step ? styles.stepDotCurrent : ''}`}
                >
                  <div className={styles.stepCircle}>
                    {idx < step ? (
                      <CheckCircleIcon className={styles.stepCheck} />
                    ) : (
                      <Icon className={styles.stepIcon} />
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

          <form onSubmit={handleSubmit}>
            <div className={`${styles.stepPanel} ${step === 0 ? styles.stepPanelActive : ''}`}>
              <StepPersonal {...stepProps} onNext={nextStep} />
            </div>
            <div className={`${styles.stepPanel} ${step === 1 ? styles.stepPanelActive : ''}`}>
              <StepService {...stepProps} onNext={nextStep} onBack={prevStep} />
            </div>
            <div className={`${styles.stepPanel} ${step === 2 ? styles.stepPanelActive : ''}`}>
              <StepSummary {...stepProps} onBack={prevStep} isSubmitting={isSubmitting} />
            </div>
          </form>
        </div>

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
