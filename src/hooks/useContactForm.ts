import React, { useState } from 'react';
import type { ContactFormData, FormErrors } from '@/data/contact-form';
import { SERVICE_OPTIONS, DEVICE_OPTIONS, URGENCY_OPTIONS } from '@/data/contact-form';
import { getWaLink } from '@/constants/contact';

const INITIAL_FORM_DATA: ContactFormData = {
  name: '',
  phone: '',
  service: '',
  deviceType: '',
  problem: '',
  urgency: '',
};

const STEP_FIELDS: string[][] = [
  ['name', 'phone'],
  ['service', 'deviceType', 'urgency'],
  ['problem'],
];

function validateField(name: string, value: string): string {
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
}

function buildWhatsAppMessage(data: ContactFormData): string {
  const urgencyEmoji = data.urgency === 'alta' ? '🚨' : data.urgency === 'media' ? '⚡' : '📅';
  const serviceLabel = SERVICE_OPTIONS.find((s) => s.value === data.service)?.label || 'Otro';
  const deviceLabel = DEVICE_OPTIONS.find((d) => d.value === data.deviceType)?.label || 'Otro';
  const urgencyLabel = URGENCY_OPTIONS.find((u) => u.value === data.urgency)?.label || '';

  return `${urgencyEmoji} NUEVA SOLICITUD

👤 *Cliente:* ${data.name}
📱 *WhatsApp:* ${data.phone}

🔧 *Servicio:* ${serviceLabel}
${deviceLabel ? `💻 *Equipo:* ${deviceLabel}` : ''}
${urgencyEmoji} *Urgencia:* ${urgencyLabel}

📝 *Descripción:*
${data.problem}

---
Enviado desde ferchotecnico.com`;
}

export function useContactForm() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<ContactFormData>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    if (error) setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const validateStep = (stepIndex: number): boolean => {
    const newErrors: FormErrors = {};
    STEP_FIELDS[stepIndex].forEach((field) => {
      const error = validateField(field, formData[field as keyof ContactFormData]);
      if (error) newErrors[field] = error;
    });
    setErrors((prev) => ({ ...prev, ...newErrors }));
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(step)) setStep((s) => Math.min(s + 1, 2));
  };

  const prevStep = () => setStep((s) => Math.max(s - 1, 0));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateStep(2)) return;
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 400));
      window.open(getWaLink(buildWhatsAppMessage(formData)), '_blank');
      setFormData(INITIAL_FORM_DATA);
      setStep(0);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    step,
    formData,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    nextStep,
    prevStep,
    handleSubmit,
  };
}
