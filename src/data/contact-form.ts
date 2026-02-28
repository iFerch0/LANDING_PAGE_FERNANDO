import type React from 'react';
import { UserIcon, DeviceIcon, SendIcon } from '@/components/Icons';

export interface ContactFormData {
  name: string;
  phone: string;
  service: string;
  deviceType: string;
  problem: string;
  urgency: string;
}

export interface FormErrors {
  [key: string]: string;
}

export const SERVICE_OPTIONS = [
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

export const DEVICE_OPTIONS = [
  { value: '', label: 'Selecciona' },
  { value: 'laptop', label: '💻 Portátil' },
  { value: 'pc-desktop', label: '🖥️ PC Escritorio' },
  { value: 'all-in-one', label: '📱 All-in-One' },
  { value: 'gaming', label: '🎮 PC Gaming' },
  { value: 'multiple', label: '🏢 Varios equipos' },
  { value: 'other', label: '💿 Otro' },
];

export const URGENCY_OPTIONS = [
  { value: '', label: 'Selecciona' },
  { value: 'alta', label: '🚨 Alta - Hoy' },
  { value: 'media', label: '⚡ Media - 24-48h' },
  { value: 'baja', label: '📅 Baja - Esta semana' },
];

export const STEPS: Array<{ label: string; icon: React.FC<{ className?: string }> }> = [
  { label: 'Datos', icon: UserIcon },
  { label: 'Servicio', icon: DeviceIcon },
  { label: 'Enviar', icon: SendIcon },
];
