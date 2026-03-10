export const specialties: string[] = [
  'Desarrollo Web',
  'Reparación PC',
  'Soporte Empresarial',
  'Ensamble de Equipos',
  'Mantenimiento Preventivo',
];

export interface Value {
  icon: string;
  title: string;
  desc: string;
}

export const values: Value[] = [
  {
    icon: '📋',
    title: 'Metodología profesional',
    desc: 'Diagnóstico documentado y presupuesto claro antes de cualquier intervención.',
  },
  {
    icon: '📦',
    title: 'Entregas por fases',
    desc: 'Trabajo organizado en etapas con avances visibles y resultados medibles.',
  },
  {
    icon: '📊',
    title: 'Resultados medibles',
    desc: 'Cada servicio incluye evidencia documentada del antes y después.',
  },
];
