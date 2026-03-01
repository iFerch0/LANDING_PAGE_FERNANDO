// src/data/compact-services.ts
// Datos para la grilla compacta de servicios (landing page).
// Separados del componente para facilitar mantenimiento y testing.

import type React from 'react';
import { ZapIcon, DeviceIcon, ShieldCheckIcon } from '@/components/Icons';

export interface CompactService {
  icon: React.FC<{ className?: string }>;
  title: string;
  description: string;
  duration: string;
  features: [string, string];
  accent: string;
  iconBox: string;
}

export const compactServices: CompactService[] = [
  {
    icon: ZapIcon,
    title: 'Mantenimiento Preventivo',
    description:
      'Limpieza completa de hardware, actualización de sistema y optimización de rendimiento.',
    duration: '2-3 horas',
    features: ['Limpieza interna completa', 'Cambio de pasta térmica'],
    accent: 'accentBlue',
    iconBox: 'iconBoxBlue',
  },
  {
    icon: DeviceIcon,
    title: 'Recuperación de Datos',
    description:
      'Recuperación de archivos perdidos o de discos dañados con tecnología especializada.',
    duration: '1-3 días',
    features: ['Evaluación sin costo', 'Entrega en USB/Nube'],
    accent: 'accentTeal',
    iconBox: 'iconBoxTeal',
  },
  {
    icon: DeviceIcon,
    title: 'Formateo e Instalación',
    description: 'Instalación limpia de Windows, configuración completa y programas esenciales.',
    duration: '3-4 horas',
    features: ['Windows 10/11 original', 'Drivers actualizados'],
    accent: 'accentGreen',
    iconBox: 'iconBoxGreen',
  },
  {
    icon: ShieldCheckIcon,
    title: 'Eliminación de Virus',
    description: 'Limpieza profunda de malware, virus, adware y optimización de seguridad.',
    duration: '2 horas',
    features: ['Escaneo completo', 'Antivirus premium'],
    accent: 'accentRed',
    iconBox: 'iconBoxRed',
  },
  {
    icon: ZapIcon,
    title: 'Soporte Remoto',
    description: 'Asistencia técnica a distancia para problemas de software y configuración.',
    duration: '30-60 min',
    features: ['Conexión remota segura', 'Solución inmediata'],
    accent: 'accentAmber',
    iconBox: 'iconBoxAmber',
  },
];
