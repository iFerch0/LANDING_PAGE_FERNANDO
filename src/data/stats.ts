export interface Stat {
  id: string;
  end: number;
  suffix: string;
  label: string;
  description: string;
  aosDelay: number;
}

export const stats: Stat[] = [
  {
    id: 'repairs',
    end: 500,
    suffix: '+',
    label: 'PCs reparadas',
    description: 'Desde 2015 en Montería',
    aosDelay: 100,
  },
  {
    id: 'satisfaction',
    end: 92,
    suffix: '%',
    label: 'Satisfacción',
    description: 'Clientes que recomiendan el servicio',
    aosDelay: 200,
  },
  {
    id: 'response-time',
    end: 24,
    suffix: 'h',
    label: 'Tiempo promedio',
    description: 'Mayoría de problemas resueltos',
    aosDelay: 300,
  },
  {
    id: 'warranty',
    end: 30,
    suffix: ' días',
    label: 'Garantía',
    description: 'En todas las reparaciones',
    aosDelay: 400,
  },
  {
    id: 'businesses',
    end: 15,
    suffix: '+',
    label: 'Empresas atendidas',
    description: 'Soporte corporativo activo',
    aosDelay: 500,
  },
];

export const statsHeader = {
  title: 'Confianza respaldada por resultados',
  subtitle: 'Más de 10 años sirviendo a Montería con soluciones técnicas profesionales',
};

import { WA_BASE_URL } from '@/constants/contact';

export const statsCTA = {
  title: '¿Necesitas una solución similar?',
  description: 'Contáctanos hoy y únete a nuestros clientes satisfechos',
  buttonText: 'Solicitar diagnóstico',
  buttonLink: WA_BASE_URL,
};
