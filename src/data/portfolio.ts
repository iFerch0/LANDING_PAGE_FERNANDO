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
    id: 'FT-2026-09',
    category: 'build',
    title: 'Next-Gen Ultra Gaming',
    description:
      'Build de alto rendimiento para gaming 1440p Ultra / 4K Esports y creación de contenido. Ensamblado con componentes de última generación.',
    year: 2026,
    images: [
      '/img/portfolio/builds/FT-2026-09/1.png',
      '/img/portfolio/builds/FT-2026-09/2.jpg',
      '/img/portfolio/builds/FT-2026-09/3.jpg',
      '/img/portfolio/builds/FT-2026-09/4.png',
      '/img/portfolio/builds/FT-2026-09/5.jpg',
      '/img/portfolio/builds/FT-2026-09/6.png',
    ],
    specs: {
      cpu: 'Intel Core Ultra 5 250K Plus',
      ram: '32 GB DDR5-6000 Patriot Viper',
      storage: '1 TB NVMe Gen 4 (7,100 MB/s)',
      motherboard: 'ASUS Prime B860-Plus',
      psu: '750W 80+ Gold Full Modular',
      cooling: '240mm Refrigeración Líquida ARGB',
      case: 'Chasis Gaming Mesh High Airflow',
      gpu: 'AMD Radeon RX 9060 XT 16GB GDDR6',
    },
  },
  {
    id: 'FT-2026-07',
    category: 'build',
    title: 'Workstation Master Ryzen 9 5900XT',
    description:
      'Estación de trabajo pesada y gaming extremo. 16 núcleos físicos, refrigeración líquida AIO con display LCD IPS personalizable y GPU RX 9060 XT 16GB.',
    year: 2026,
    images: ['/img/portfolio/builds/FT-2026-07/1.jpg', '/img/portfolio/builds/FT-2026-07/2.jpg'],
    specs: {
      cpu: 'AMD Ryzen 9 5900XT (16C/32T - 4.8 GHz)',
      ram: '32GB DDR4 3200MHz Dual Channel',
      storage: '1TB SSD M.2 NVMe High Speed',
      motherboard: 'Socket AM4 High End + Wi-Fi 6E & BT 5.3',
      psu: '750W 80+ Gold Full Modular',
      cooling: 'AIO Liquid Cooling con Pantalla LCD IPS Inteligente',
      case: 'Chasis High Airflow',
      gpu: 'AMD Radeon RX 9060 XT 16GB GDDR6',
    },
  },
  {
    id: 'FT-2025-02',
    category: 'build',
    title: 'Gaming Rig RTX 4060 Edition',
    description:
      'Equipo balanceado para gaming competitivo y títulos AAA en 1080p Ultra con soporte para Ray Tracing y DLSS 3 Frame Generation.',
    year: 2025,
    images: [
      '/img/portfolio/builds/FT-2025-02/1.jpg',
      '/img/portfolio/builds/FT-2025-02/2.jpg',
      '/img/portfolio/builds/FT-2025-02/3.jpg',
    ],
    specs: {
      cpu: 'AMD Ryzen 5 5500 (6C/12T - 4.2 GHz)',
      ram: '16GB DDR4 3200MHz Dual Channel',
      storage: '1TB NVMe PCIe High Speed',
      motherboard: 'Socket AM4 Gaming Ready',
      psu: '650W 80+ Bronze',
      cooling: 'Disipación por Aire de Alto Flujo',
      case: 'Chasis High Airflow',
      gpu: 'NVIDIA GeForce RTX 4060 8GB GDDR6',
    },
  },
  {
    id: 'FT-2024-08',
    category: 'build',
    title: 'Workstation AMD Ryzen 5 8500G',
    description:
      'Equipo para diseño gráfico de entrada y esports. Equipado con gráficos integrados Radeon 740M, 32GB DDR5 a 6400MHz y refrigeración líquida de 240mm.',
    year: 2024,
    images: [
      '/img/portfolio/builds/FT-2024-08/1.jpg',
      '/img/portfolio/builds/FT-2024-08/2.jpg',
      '/img/portfolio/builds/FT-2024-08/3.jpg',
      '/img/portfolio/builds/FT-2024-08/4.jpg',
      '/img/portfolio/builds/FT-2024-08/5.jpg',
    ],
    specs: {
      cpu: 'AMD Ryzen 5 8500G (6C/12T - 5.0 GHz)',
      ram: '32GB DDR5 6400MHz Dual Channel',
      storage: '1TB NVMe PCIe High Speed',
      motherboard: 'Socket AM5 DDR5 Ready',
      psu: '750W 80+ Gold',
      cooling: '240mm Refrigeración Líquida ARGB',
      case: 'Chasis High Airflow',
      gpu: 'AMD Radeon 740M (Gráficos Integrados RDNA 3)',
    },
  },
  {
    id: 'FT-2024-08-II',
    category: 'build',
    title: 'Workstation Intel Core i5 12600K',
    description:
      'Equipo enfocado en programación, virtualización y desarrollo. 10 núcleos híbridos, 32GB DDR5 a 6400MHz, refrigeración líquida y fuente de 750W 80+ Gold lista para upgrade de tarjeta gráfica dedicada.',
    year: 2024,
    images: [
      '/img/portfolio/builds/FT-2024-08-II/1.jpg',
      '/img/portfolio/builds/FT-2024-08-II/2.jpg',
      '/img/portfolio/builds/FT-2024-08-II/3.jpg',
      '/img/portfolio/builds/FT-2024-08-II/4.jpg',
      '/img/portfolio/builds/FT-2024-08-II/5.jpg',
    ],
    specs: {
      cpu: 'Intel Core i5 12600K (10C/16T - 4.9 GHz)',
      ram: '32GB DDR5 6400MHz Dual Channel',
      storage: '1TB NVMe PCIe Gen 4',
      motherboard: 'LGA1700 DDR5 Ready',
      psu: '750W 80+ Gold',
      cooling: '240mm Refrigeración Líquida ARGB',
      case: 'Chasis High Airflow',
      gpu: 'Intel UHD Graphics 770 (Integrada 32 EUs)',
    },
  },
  {
    id: 'FT-2023-08',
    category: 'build',
    title: 'Workstation Ryzen 7 & RX 6800XT',
    description:
      'Equipo de alto rendimiento para gaming 1440p Ultra / 4K y creación de contenido pesado con 4TB de almacenamiento masivo NVMe.',
    year: 2023,
    images: [
      '/img/portfolio/builds/FT-2023-08/1.jpg',
      '/img/portfolio/builds/FT-2023-08/2.jpg',
      '/img/portfolio/builds/FT-2023-08/3.mp4',
    ],
    specs: {
      cpu: 'AMD Ryzen 7 5800X (8C/16T - 4.7 GHz)',
      ram: '32GB DDR4 Dual Channel High Speed',
      storage: '4TB SSD M.2 NVMe High Speed',
      motherboard: 'Socket AM4 High End',
      psu: '750W 80+ Gold Full Modular',
      cooling: '240mm Refrigeración Líquida ARGB',
      case: 'Chasis High Airflow',
      gpu: 'AMD Radeon RX 6800 XT 16GB GDDR6',
    },
  },
];

export const maintenance: PortfolioMaintenance[] = [
  {
    id: 'MT-2025-03',
    category: 'maintenance',
    title: 'Desktop - Limpieza profunda & Overhaul',
    description:
      'Limpieza interna completa de torre de escritorio con acumulación severa de polvo. Incluye limpieza de ventiladores, disipadores y componentes.',
    year: 2025,
    beforeImages: [
      '/img/portfolio/maintenance/MT-2025-03/antes/1.webp',
      '/img/portfolio/maintenance/MT-2025-03/antes/2.webp',
      '/img/portfolio/maintenance/MT-2025-03/antes/3.webp',
    ],
    afterImages: [
      '/img/portfolio/maintenance/MT-2025-03/despues/1.webp',
      '/img/portfolio/maintenance/MT-2025-03/despues/2.webp',
      '/img/portfolio/maintenance/MT-2025-03/despues/3.webp',
    ],
    problem:
      'Acumulación excesiva de polvo en ventiladores y disipadores, causando sobrecalentamiento y ruido excesivo.',
    solution:
      'Desarmado completo, limpieza con aire comprimido de todos los componentes, limpieza de ventiladores y aplicación de pasta térmica nueva en CPU.',
  },
  {
    id: 'MT-2024-03',
    category: 'maintenance',
    title: 'Laptop - Limpieza interna & Repaste',
    description:
      'Limpieza interna de laptop con cambio de pasta térmica para resolver problemas de temperatura.',
    year: 2024,
    beforeImages: ['/img/portfolio/maintenance/MT-2024-03/antes/1.webp'],
    afterImages: ['/img/portfolio/maintenance/MT-2024-03/despues/1.webp'],
    problem:
      'Sobrecalentamiento excesivo, ventilador ruidoso y throttling del procesador por acumulación de polvo.',
    solution:
      'Desarmado cuidadoso, limpieza del sistema de refrigeración, remoción de polvo del ventilador y disipador, aplicación de pasta térmica nueva.',
  },
  {
    id: 'MT-2024-02',
    category: 'maintenance',
    title: 'Desktop - Mantenimiento preventivo',
    description:
      'Mantenimiento preventivo de equipo de escritorio con fotos del proceso de limpieza.',
    year: 2024,
    beforeImages: ['/img/portfolio/maintenance/MT-2024-02/antes/1.webp'],
    afterImages: ['/img/portfolio/maintenance/MT-2024-02/despues/1.webp'],
    problem:
      'Polvo acumulado en componentes internos afectando el flujo de aire y temperaturas del sistema.',
    solution:
      'Limpieza profunda de todos los componentes internos, ventiladores, fuente de poder y disipadores.',
  },
];

export const portfolioItems: PortfolioItem[] = [...builds, ...maintenance];
