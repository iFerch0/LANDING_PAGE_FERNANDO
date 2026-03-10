'use client';

import React from 'react';
import { CheckCircleIcon } from '@/components/Icons';
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
        <div className={styles.card} data-aos="fade-up">
          {/* Header */}
          <div className={styles.header}>
            <span className={styles.eyebrow}>
              {React.createElement(STEPS[2].icon)}
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
        </div>

        {/* Trust badges */}
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
