import React from 'react';
import { SendIcon, WhatsAppIcon } from '@/components/Icons';
import type { ContactFormData, FormErrors } from '@/types/forms';
import styles from '@/components/ContactForm.module.css';

const MAX_DESCRIPTION_LENGTH = 500;

interface Props {
  formData: ContactFormData;
  errors: FormErrors;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
  onBlur: React.FocusEventHandler<HTMLTextAreaElement>;
  onPrev: () => void;
  isSubmitting: boolean;
  active: boolean;
}

export default function ContactFormStep2({
  formData,
  errors,
  onChange,
  onBlur,
  onPrev,
  isSubmitting,
  active,
}: Props) {
  return (
    <div className={`${styles.stepPanel} ${active ? styles.stepPanelActive : ''}`}>
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
        <div className={styles.charCount}>
          {formData.problem.length}/{MAX_DESCRIPTION_LENGTH}
        </div>
        {errors.problem && <span className={styles.errorText}>{errors.problem}</span>}
      </div>

      <div className={styles.socialProof}>
        <div className={styles.proofStars}>★★★★★</div>
        <span className={styles.proofText}>
          <strong>4.9/5</strong> basado en 100+ clientes satisfechos
        </span>
      </div>

      <div className={styles.stepActions}>
        <button type="button" className={styles.backBtn} onClick={onPrev}>
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
  );
}
