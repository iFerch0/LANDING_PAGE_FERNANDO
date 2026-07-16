/**
 * Portfolio data - Workstations and maintenance projects
 *
 * To add a new build:
 * 1. Add images to /public/img/portfolio/builds/
 * 2. Copy one of the build objects below
 * 3. Update the fields with your new build info
 *
 * To add maintenance work:
 * 1. Add before/after images to /public/img/portfolio/maintenance/
 * 2. Add a maintenance object to the maintenance array
 */

export type BuildSpecs = {
  cpu: string;
  ram: string;
  storage: string;
  motherboard: string;
  psu: string;
  cooling: string;
  case: string;
  gpu?: string;
};

export type PortfolioBuild = {
  id: string;
  category: 'build';
  title: string;
  description: string;
  year: number;
  images: string[];
  specs: BuildSpecs;
};

export type PortfolioMaintenance = {
  id: string;
  category: 'maintenance';
  title: string;
  description: string;
  year: number;
  beforeImages: string[];
  afterImages: string[];
  problem: string;
  solution: string;
};

export type PortfolioItem = PortfolioBuild | PortfolioMaintenance;

export const builds: PortfolioBuild[] = [
  {
    id: 'workstation-i5-13600K',
    category: 'build',
    title: 'Workstation Intel i5 13600K',
    description:
      'Workstation de alto rendimiento para desarrollo de software y diseño gráfico. Construida con componentes de última generación para manejar cargas de trabajo intensivas.',
    year: 2024,
    images: [
      '/img/portfolio/builds/workstation-i5-13600K-1.webp',
      '/img/portfolio/builds/workstation-i5-13600K-2.webp',
      '/img/portfolio/builds/workstation-i5-13600K-3.webp',
    ],
    specs: {
      cpu: 'Intel Core i5 13600K',
      ram: '32GB DDR5 Corsair Vengeance',
      storage: '1TB Samsung 980 Pro NVMe',
      motherboard: 'Gigabyte B760M',
      psu: 'Thermaltake A3 750W 80+ Gold',
      cooling: 'Thermaltake TH120 V2 Liquid Cooling',
      case: 'XPG Gaming Chassis',
    },
  },
  {
    id: 'workstation-ryzen-8500G',
    category: 'build',
    title: 'Workstation AMD Ryzen 5 8500G',
    description:
      'Workstation eficiente para desarrollo y diseño gráfico. Procesador AMD con gráficos integrados de alto rendimiento, ideal para flujos de trabajo creativos.',
    year: 2024,
    images: [
      '/img/portfolio/builds/workstation-ryzen-8500G-1.webp',
      '/img/portfolio/builds/workstation-ryzen-8500G-2.webp',
      '/img/portfolio/builds/workstation-ryzen-8500G-3.webp',
    ],
    specs: {
      cpu: 'AMD Ryzen 5 8500G',
      ram: '32GB DDR5 PNY XLRB',
      storage: '1TB Kingston NVMe',
      motherboard: 'Gigabyte A620M',
      psu: 'Segotep 750W 80+ Gold',
      cooling: 'Thermalright Aqua Elite 240 V3',
      case: 'Cooler Master',
    },
  },
];

export const maintenance: PortfolioMaintenance[] = [
  {
    id: 'desktop-cleaning-01',
    category: 'maintenance',
    title: 'Desktop - Limpieza profunda',
    description:
      'Limpieza interna completa de torre de escritorio con acumulación severa de polvo. Incluye limpieza de ventiladores, disipadores y componentes.',
    year: 2024,
    beforeImages: [
      '/img/portfolio/maintenance/desktop-polvo-antes-01.webp',
      '/img/portfolio/maintenance/desktop-polvo-antes-02.webp',
      '/img/portfolio/maintenance/desktop-polvo-antes-03.webp',
    ],
    afterImages: [
      '/img/portfolio/maintenance/desktop-polvo-despues-01.webp',
      '/img/portfolio/maintenance/desktop-polvo-despues-03.webp',
    ],
    problem:
      'Acumulación excesiva de polvo en ventiladores y disipadores, causando sobrecalentamiento y ruido excesivo.',
    solution:
      'Desarmado completo, limpieza con aire comprimido de todos los componentes, limpieza de ventiladores y aplicación de pasta térmica nueva en CPU.',
  },
  {
    id: 'desktop-cleaning-02',
    category: 'maintenance',
    title: 'Desktop - Mantenimiento preventivo',
    description:
      'Mantenimiento preventivo de equipo de escritorio con múltiples fotos del proceso de limpieza.',
    year: 2024,
    beforeImages: [
      '/img/portfolio/maintenance/desktop-polvo-antes-2-01.webp',
      '/img/portfolio/maintenance/desktop-polvo-antes-2-02.webp',
    ],
    afterImages: ['/img/portfolio/maintenance/desktop-polvo-despues-2-01.webp'],
    problem:
      'Polvo acumulado en componentes internos afectando el flujo de aire y temperaturas del sistema.',
    solution:
      'Limpieza profunda de todos los componentes internos, ventiladores, fuente de poder y disipadores.',
  },
  {
    id: 'laptop-cleaning-01',
    category: 'maintenance',
    title: 'Laptop - Limpieza interna',
    description:
      'Limpieza interna de laptop con cambio de pasta térmica para resolver problemas de temperatura.',
    year: 2024,
    beforeImages: ['/img/portfolio/maintenance/laptop-polvo-antes-01.webp'],
    afterImages: ['/img/portfolio/maintenance/laptop-polvo-despues-01.webp'],
    problem:
      'Sobrecalentamiento excesivo, ventilador ruidoso y throttling del procesador por acumulación de polvo.',
    solution:
      'Desarmado cuidadoso, limpieza del sistema de refrigeración, remoción de polvo del ventilador y disipador, aplicación de pasta térmica nueva.',
  },
];

export const portfolioItems: PortfolioItem[] = [
  builds[0],
  builds[1],
  maintenance[0],
  maintenance[1],
  maintenance[2],
];
