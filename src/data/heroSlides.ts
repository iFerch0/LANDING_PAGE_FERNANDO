export interface HeroSlide {
  id: number;
  src: string;
  alt: string;
  title: string;
  subtitle: string;
  category: string;
  objectPosition?: string; // Punto focal: "center", "top", "center top", etc.
}

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 1,
    src: '/img/hero/0.jpg',
    alt: 'Ensamble y configuración de computador de escritorio para hogar y oficina',
    title: 'Ensambles Personalizados',
    subtitle: 'Equipos optimizados para oficina, hogar y productividad diaria',
    category: 'Ensamble',
    objectPosition: 'center center',
  },
  {
    id: 2,
    src: '/img/hero/1.jpg',
    alt: 'Setup profesional con monitor externo y laptop conectada en escritorio',
    title: 'Configuración Profesional',
    subtitle: 'Estaciones de trabajo de alto rendimiento para máxima productividad',
    category: 'Setup',
    objectPosition: 'center 30%',
  },
  {
    id: 3,
    src: '/img/hero/2.jpg',
    alt: 'Laptop Lenovo Windows completamente funcional después de servicio técnico',
    title: 'Laptop Restaurada',
    subtitle: 'Rendimiento fluido y confiable para trabajo y estudio',
    category: 'Reparación',
    objectPosition: 'center 25%',
  },
  {
    id: 4,
    src: '/img/hero/3.jpg',
    alt: 'Instalación y configuración limpia de sistemas operativos',
    title: 'Instalación de Sistemas',
    subtitle: 'Windows, macOS y Linux con software esencial configurado',
    category: 'Software',
    objectPosition: 'center 20%',
  },
  {
    id: 5,
    src: '/img/hero/4.jpg',
    alt: 'Diagnóstico técnico electrónico y reparación de placas base',
    title: 'Diagnóstico Electrónico',
    subtitle: 'Reparación especializada a nivel de componentes y circuitos',
    category: 'Diagnóstico',
    objectPosition: 'center center',
  },
  {
    id: 6,
    src: '/img/hero/5.jpg',
    alt: 'Mantenimiento profundo de hardware, placas y disipación de calor',
    title: 'Mantenimiento Profundo',
    subtitle: 'Diagnóstico preventivo, limpieza térmica y pasta de alto rendimiento',
    category: 'Mantenimiento',
    objectPosition: 'center center',
  },
  {
    id: 7,
    src: '/img/hero/6.jpg',
    alt: 'Banco de pruebas y laboratorio técnico para ensamble de computadores',
    title: 'Laboratorio Técnico',
    subtitle: 'Pruebas de estabilidad, estrés y control de calidad exhaustivo',
    category: 'Laboratorio',
    objectPosition: 'center center',
  },
  {
    id: 8,
    src: '/img/hero/7.jpg',
    alt: 'Optimización de flujo térmico y reducción de temperaturas en equipos',
    title: 'Optimización Térmica',
    subtitle: 'Control de temperaturas para maximizar la vida útil del hardware',
    category: 'Térmico',
    objectPosition: 'center center',
  },
  {
    id: 9,
    src: '/img/hero/8.jpg',
    alt: 'Upgrade de almacenamiento en estado sólido NVMe y ampliación de memoria RAM',
    title: 'Upgrade de Hardware',
    subtitle: 'Mayor velocidad con discos SSD y memorias RAM de alta frecuencia',
    category: 'Upgrade',
    objectPosition: 'center 40%',
  },
  {
    id: 10,
    src: '/img/hero/9.jpg',
    alt: 'Puesta a punto y verificación integral de funcionamiento',
    title: 'Puesta a Punto Total',
    subtitle: 'Equipos listos para máxima exigencia y alta durabilidad',
    category: 'Garantía',
    objectPosition: 'center center',
  },
  {
    id: 11,
    src: '/img/hero/10.jpg',
    alt: 'Estación de trabajo con doble pantalla profesional para oficina y diseño',
    title: 'Estaciones de Trabajo Dual',
    subtitle: 'Setups ergonómicos y configuraciones multi-monitor para productividad',
    category: 'Productividad',
    objectPosition: 'center 30%',
  },
  {
    id: 12,
    src: '/img/hero/11.jpg',
    alt: 'Ensamble de PC Gamer y Workstation de alto rendimiento en taller especializado',
    title: 'Ensambles de Alto Rendimiento',
    subtitle: 'Montaje profesional con gestión de cableado y flujo de aire optimizado',
    category: 'Ensamble',
    objectPosition: 'center center',
  },
  {
    id: 13,
    src: '/img/hero/12.jpg',
    alt: 'Mantenimiento preventivo especializado y repaste térmico de computadores',
    title: 'Servicio Técnico Especializado',
    subtitle: 'Atención personalizada, diagnóstico confiable y garantía en Montería',
    category: 'Servicio',
    objectPosition: 'center center',
  },
];
