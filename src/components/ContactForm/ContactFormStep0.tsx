import React from 'react';
import { UserIcon } from '@/components/Icons';
import type { ContactFormData, FormErrors } from '@/types/forms';
import styles from '@/components/ContactForm.module.css';

interface Props {
  formData: ContactFormData;
  errors: FormErrors;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onBlur: React.FocusEventHandler<HTMLInputElement>;
  onNext: () => void;
  active: boolean;
}

export default function ContactFormStep0({
  formData,
  errors,
  onChange,
  onBlur,
  onNext,
  active,
}: Props) {
  return (
    <div className={`${styles.stepPanel} ${active ? styles.stepPanelActive : ''}`}>
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
    </div>
  );
}
