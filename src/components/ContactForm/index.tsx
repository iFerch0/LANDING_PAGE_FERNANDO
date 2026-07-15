'use client';

import React from 'react';
import { STEPS } from '@/data/formOptions';
import styles from '@/components/ContactForm.module.css';
import { useContactForm } from './useContactForm';
import ContactFormStep0 from './ContactFormStep0';
import ContactFormStep1 from './ContactFormStep1';
import ContactFormStep2 from './ContactFormStep2';

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

  return (
    <section id="contacto" className={styles.contactForm}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header} data-reveal="up">
          <div className={styles.headerTop}>
            <span className={styles.sectionNum}>04</span>
            <h2 className={styles.title}>
              Cuéntame <span className={styles.titleAccent}>qué necesitás</span>
            </h2>
          </div>
          <p className={styles.subtitle}>Completá los 3 pasos y te contacto por WhatsApp.</p>
        </div>

        {/* Step Indicators */}
        <div className={styles.steps}>
          {STEPS.map((s, idx) => (
            <React.Fragment key={s.label}>
              <div
                className={`${styles.step} ${idx < step ? styles.stepDone : ''} ${idx === step ? styles.stepActive : ''}`}
              >
                <span className={styles.stepDot} />
                <span className={styles.stepLabel}>{s.label}</span>
              </div>
              {idx < STEPS.length - 1 && <span className={styles.stepLine} />}
            </React.Fragment>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} data-reveal="scale">
          <ContactFormStep0
            formData={formData}
            errors={errors}
            onChange={handleChange as React.ChangeEventHandler<HTMLInputElement>}
            onBlur={handleBlur as React.FocusEventHandler<HTMLInputElement>}
            onNext={nextStep}
            active={step === 0}
          />
          <ContactFormStep1
            formData={formData}
            errors={errors}
            onChange={handleChange as React.ChangeEventHandler<HTMLSelectElement>}
            onBlur={handleBlur as React.FocusEventHandler<HTMLSelectElement>}
            onNext={nextStep}
            onPrev={prevStep}
            active={step === 1}
          />
          <ContactFormStep2
            formData={formData}
            errors={errors}
            onChange={handleChange as React.ChangeEventHandler<HTMLTextAreaElement>}
            onBlur={handleBlur as React.FocusEventHandler<HTMLTextAreaElement>}
            onPrev={prevStep}
            isSubmitting={isSubmitting}
            active={step === 2}
          />
        </form>

        {/* Trust Badges */}
        <div className={styles.trustBadges} data-reveal="fade">
          <div className={styles.trustItem}>
            <svg
              className={styles.trustIcon}
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Diagnóstico gratis
          </div>
          <div className={styles.trustItem}>
            <svg
              className={styles.trustIcon}
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Sin compromiso
          </div>
          <div className={styles.trustItem}>
            <svg
              className={styles.trustIcon}
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Respuesta en 2h
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
