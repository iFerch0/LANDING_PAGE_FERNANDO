import React from 'react';
import { DeviceIcon } from '@/components/Icons';
import { SERVICE_OPTIONS, DEVICE_OPTIONS, URGENCY_OPTIONS } from '@/data/formOptions';
import type { ContactFormData, FormErrors } from '@/types/forms';
import styles from '@/components/ContactForm.module.css';

interface Props {
  formData: ContactFormData;
  errors: FormErrors;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  onBlur: React.FocusEventHandler<HTMLSelectElement>;
  onNext: () => void;
  onPrev: () => void;
  active: boolean;
}

export default function ContactFormStep1({
  formData,
  errors,
  onChange,
  onBlur,
  onNext,
  onPrev,
  active,
}: Props) {
  return (
    <div className={`${styles.stepPanel} ${active ? styles.stepPanelActive : ''}`}>
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
        <button type="button" className={styles.backBtn} onClick={onPrev}>
          ← Atrás
        </button>
        <button type="button" className={styles.nextBtn} onClick={onNext}>
          Siguiente →
        </button>
      </div>
    </div>
  );
}
