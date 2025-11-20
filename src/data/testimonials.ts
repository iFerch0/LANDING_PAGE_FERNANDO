export const testimonialsHeader = {
  badge: 'Testimonios Verificados',
  title: 'Lo Que Dicen Nuestros Clientes',
  subtitle: 'Experiencias reales de clientes que confían en nuestro servicio técnico'
};

export interface TrustIndicator {
  id: string;
  title: string;
  subtitle: string;
}

export const trustIndicators: TrustIndicator[] = [
  {
    id: 'verified',
    title: '100% Verificadas',
    subtitle: 'Reviews auténticas de Google'
  },
  {
    id: 'rating',
    title: '4.9/5 Estrellas',
    subtitle: 'Calificación promedio'
  }
];

// Elfsight widget configuration
export const elfsightConfig = {
  scriptSrc: 'https://elfsightcdn.com/platform.js',
  appId: 'd4a2b5a4-3734-4c3c-bd68-010b5bf39151'
};
