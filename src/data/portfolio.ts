/**
 * Portfolio data - Builds and Maintenance projects
 * Single Source of Truth for portfolio items
 */

export interface PcSpec {
  label: string;
  value: string;
  detail: string;
}

export interface FpsEntry {
  game: string;
  value: string;
}

export interface PcBuild {
  id: string;
  name: string;
  subtitle: string;
  category: string;
  accentColor: string;
  images: string[];
  specs: PcSpec[];
  fps: FpsEntry[];
}

export interface PortfolioMaintenance {
  id: string;
  category: 'maintenance';
  title: string;
  description: string;
  year: number;
  beforeImages: string[];
  afterImages: string[];
  problem: string;
  solution: string;
}

export const builds: PcBuild[] = [
  {
    id: 'FT-2026-09',
    name: 'Next-Gen Ultra Gaming',
    subtitle: 'Gaming 1440p Ultra / 4K Esports + Creación de Contenido',
    category: 'Gaming · Enthusiast',
    accentColor: '#c86432',
    images: [
      '/img/portfolio/builds/FT-2026-09/1.png',
      '/img/portfolio/builds/FT-2026-09/2.jpg',
      '/img/portfolio/builds/FT-2026-09/3.jpg',
      '/img/portfolio/builds/FT-2026-09/4.png',
      '/img/portfolio/builds/FT-2026-09/5.jpg',
      '/img/portfolio/builds/FT-2026-09/6.png',
    ],
    specs: [
      { label: 'CPU', value: 'Intel Core Ultra 5 250K Plus', detail: '18 núcleos · 5.3 GHz boost' },
      { label: 'GPU', value: 'AMD Radeon RX 9060 XT', detail: '16 GB GDDR6 · RDNA 4 / FSR 4' },
      { label: 'RAM', value: '32 GB DDR5-6000', detail: 'Dual Channel · High Speed' },
      { label: 'SSD', value: '1 TB NVMe Gen 4', detail: '7,100 MB/s lectura' },
      { label: 'AIO', value: '240mm Refrigeración Líquida', detail: 'Radiador doble · ARGB' },
      { label: 'PSU', value: '750W 80+ Gold', detail: 'Full Modular' },
    ],
    fps: [
      { game: 'Cyberpunk 2077 | 1440p | Ultra', value: '105+' },
      { game: 'Call of Duty: Warzone | 1440p | Ultra', value: '160+' },
      { game: 'Valorant | 1440p | Competitivo', value: '480+' },
    ],
  },
  {
    id: 'FT-2026-07',
    name: 'Workstation Master Ryzen 9',
    subtitle: '16 Cores / 32 Hilos · Render 3D, Creación Pesada & Gaming 1440p/4K',
    category: 'Workstation & Gaming · Elite',
    accentColor: '#f97316',
    images: ['/img/portfolio/builds/FT-2026-07/1.jpg', '/img/portfolio/builds/FT-2026-07/2.jpg'],
    specs: [
      {
        label: 'CPU',
        value: 'AMD Ryzen 9 5900XT',
        detail: '16 núcleos / 32 hilos · hasta 4.8 GHz (72MB Caché)',
      },
      { label: 'GPU', value: 'AMD Radeon RX 9060 XT', detail: '16 GB GDDR6 · RDNA 4 / FSR 4' },
      { label: 'RAM', value: '32 GB DDR4-3200', detail: 'Dual Channel High Speed' },
      { label: 'SSD', value: '1 TB NVMe M.2', detail: 'Alta velocidad PCIe' },
      {
        label: 'AIO',
        value: 'AIO Liquid LCD Display',
        detail: 'Pantalla IPS personalizada con telemetría en vivo',
      },
      { label: 'PSU', value: '750W 80+ Gold', detail: 'Full Modular + Wi-Fi 6E & Bluetooth 5.3' },
    ],
    fps: [
      { game: 'Cyberpunk 2077 | 1440p | Ultra / FSR', value: '110+' },
      { game: 'Call of Duty: Warzone | 1440p | Ultra', value: '165+' },
      { game: 'Valorant | 1440p | Competitivo', value: '520+' },
    ],
  },
  {
    id: 'FT-2026-07-II',
    name: 'Pro Gaming Rig Ryzen 7 & RTX 5060',
    subtitle: 'Gaming 1440p Ultra, Títulos AAA con Ray Tracing + DLSS 4 & Noctua Cooling',
    category: 'Gaming · Enthusiast',
    accentColor: '#e11d48',
    images: [
      '/img/portfolio/builds/FT-2026-07-II/1.jpg',
      '/img/portfolio/builds/FT-2026-07-II/2.jpg',
      '/img/portfolio/builds/FT-2026-07-II/3.jpg',
    ],
    specs: [
      {
        label: 'CPU',
        value: 'AMD Ryzen 7 7700X',
        detail: '8 núcleos / 16 hilos · hasta 5.4 GHz Turbo (Zen 4)',
      },
      {
        label: 'GPU',
        value: 'NVIDIA GeForce RTX 5060',
        detail: '8 GB GDDR7 · Blackwell / DLSS 4 & Ray Tracing',
      },
      {
        label: 'RAM',
        value: '32 GB DDR5-6000',
        detail: 'Kingston FURY Beast · Dual Channel Ultra Speed',
      },
      {
        label: 'SSD',
        value: '1 TB NVMe Gen 4',
        detail: '7,000 MB/s lectura ultra rápida PCIe 4.0',
      },
      {
        label: 'COOL',
        value: 'Noctua Dual Tower Air Cooler',
        detail: 'Doble torre & doble ventilador · Máxima disipación silenciosa',
      },
      {
        label: 'PSU',
        value: '750W 80+ Gold',
        detail: 'Eficiencia energética continua para sesiones gaming intensas',
      },
    ],
    fps: [
      { game: 'Cyberpunk 2077 | 1440p | Ultra / DLSS', value: '120+' },
      { game: 'Call of Duty: Warzone | 1440p | Ultra', value: '165+' },
      { game: 'Red Dead Redemption 2 | 1440p | Ultra', value: '105+' },
    ],
  },
  {
    id: 'FT-2025-11',
    name: 'Workstation 3D & Gaming RTX 5060',
    subtitle: 'Renderizado 3D, AutoCAD, Arquitectura & Gaming 1080p/1440p Ultra',
    category: 'Workstation & Gaming · 3D Pro',
    accentColor: '#6366f1',
    images: [
      '/img/portfolio/builds/FT-2025-11/1.mp4',
      '/img/portfolio/builds/FT-2025-11/2.mp4',
      '/img/portfolio/builds/FT-2025-11/3.jpg',
      '/img/portfolio/builds/FT-2025-11/3.5.jpg',
      '/img/portfolio/builds/FT-2025-11/4.jpg',
    ],
    specs: [
      {
        label: 'CPU',
        value: 'Intel Core i7 12700KF',
        detail: '12 núcleos (8P+4E) / 20 hilos · hasta 5.0 GHz turbo',
      },
      {
        label: 'GPU',
        value: 'NVIDIA GeForce RTX 5060',
        detail: '8 GB GDDR7 · Blackwell / DLSS 4 & Ray Tracing',
      },
      {
        label: 'RAM',
        value: '32 GB DDR5-6400',
        detail: 'Dual Channel · Ultra High Bandwidth para Render',
      },
      {
        label: 'SSD',
        value: '2 TB WD_BLACK NVMe',
        detail: '7,250 MB/s lectura ultra rápida Gen 4',
      },
      {
        label: 'AIO',
        value: '240mm Refrigeración Líquida',
        detail: 'Radiador doble · Control térmico en renders pesados',
      },
      {
        label: 'PSU',
        value: '750W 80+ Gold Modular',
        detail: 'Certificación 80 Plus Gold · Entrega continua',
      },
    ],
    fps: [
      { game: 'Cyberpunk 2077 | 1440p | Ultra / DLSS', value: '115+' },
      { game: 'Call of Duty: Warzone | 1440p | Ultra', value: '160+' },
      { game: 'Forza Horizon 5 | 1440p | Extremo', value: '135+' },
    ],
  },
  {
    id: 'FT-2025-10',
    name: 'Full Stack Dev Station Ryzen 5',
    subtitle: 'Desarrollo Full Stack, Compilación & Gaming Esports 1080p',
    category: 'Workstation · Developer Edition',
    accentColor: '#06b6d4',
    images: [
      '/img/portfolio/builds/FT-2025-10/1.jpg',
      '/img/portfolio/builds/FT-2025-10/2.mp4',
      '/img/portfolio/builds/FT-2025-10/3.jpg',
      '/img/portfolio/builds/FT-2025-10/4.jpg',
    ],
    specs: [
      {
        label: 'CPU',
        value: 'AMD Ryzen 5 8500G',
        detail: '6 núcleos / 12 hilos · hasta 5.0 GHz turbo',
      },
      {
        label: 'iGPU',
        value: 'AMD Radeon 740M',
        detail: 'Gráficos Integrados RDNA 3 · Salida multimonitor',
      },
      {
        label: 'RAM',
        value: '16 GB DDR5',
        detail: 'Dual Channel High Speed · Ideal para Docker y Web Dev',
      },
      {
        label: 'SSD',
        value: '512 GB NVMe M.2',
        detail: 'Alta velocidad PCIe para compilación y arranque rápido',
      },
      {
        label: 'AIO',
        value: '120mm Refrigeración Líquida',
        detail: 'Radiador compacto · Control térmico óptimo para desarrollo',
      },
      {
        label: 'PSU',
        value: '650W 80+ Bronze',
        detail: 'Certificación 80+ Bronze · Lista para upgrade de GPU dedicada',
      },
    ],
    fps: [
      { game: 'Valorant | 1080p | Medio / Competitivo', value: '140+' },
      { game: 'League of Legends | 1080p | Muy Alto', value: '120+' },
      { game: 'GTA V / CS2 | 1080p | Normal', value: '75+' },
    ],
  },
  {
    id: 'FT-2025-07',
    name: 'Esports Gaming Rig RTX 3050',
    subtitle: 'Gaming 1080p Competitivo, DLSS + Monitor 25" 100Hz & Conectividad Wi-Fi 6',
    category: 'Gaming · Esports Setup',
    accentColor: '#eab308',
    images: [
      '/img/portfolio/builds/FT-2025-07/1.jpg',
      '/img/portfolio/builds/FT-2025-07/2.jpg',
      '/img/portfolio/builds/FT-2025-07/3.jpg',
    ],
    specs: [
      {
        label: 'CPU',
        value: 'AMD Ryzen 5 5500',
        detail: '6 núcleos / 12 hilos · hasta 4.2 GHz turbo',
      },
      {
        label: 'GPU',
        value: 'GIGABYTE RTX 3050 6GB',
        detail: '6 GB GDDR6 · Ray Tracing + DLSS 2',
      },
      {
        label: 'RAM',
        value: '16 GB DDR4-3200',
        detail: 'Dual Channel High Speed para gaming fluido',
      },
      {
        label: 'SSD',
        value: '512 GB NVMe M.2',
        detail: 'Alta velocidad PCIe para juegos y carga instantánea',
      },
      {
        label: 'NET',
        value: 'Wi-Fi 6 + Bluetooth 5.2',
        detail: 'Conectividad inalámbrica de ultra baja latencia',
      },
      {
        label: 'PSU',
        value: '500W 80+ Bronze',
        detail: 'Certificación 80+ Bronze de entrega continua',
      },
    ],
    fps: [
      { game: 'Valorant | 1080p | Alto Comp.', value: '200+' },
      { game: 'Fortnite / GTA V | 1080p | Medio-Alto', value: '115+' },
      { game: 'CS2 / Warzone | 1080p | Optimizado', value: '95+' },
    ],
  },
  {
    id: 'FT-2025-02',
    name: 'Gaming Rig RTX 4060 Edition',
    subtitle: 'Gaming 1080p Ultra & Títulos AAA con Ray Tracing + DLSS 3',
    category: 'Gaming · AAA Ready',
    accentColor: '#84cc16',
    images: [
      '/img/portfolio/builds/FT-2025-02/1.jpg',
      '/img/portfolio/builds/FT-2025-02/2.jpg',
      '/img/portfolio/builds/FT-2025-02/3.jpg',
    ],
    specs: [
      { label: 'CPU', value: 'AMD Ryzen 5 5500', detail: '6 núcleos / 12 hilos · hasta 4.2 GHz' },
      {
        label: 'GPU',
        value: 'NVIDIA GeForce RTX 4060',
        detail: '8 GB GDDR6 · Ada Lovelace / DLSS 3 + Frame Gen',
      },
      { label: 'RAM', value: '16 GB DDR4-3200', detail: 'Dual Channel High Speed' },
      { label: 'SSD', value: '1 TB NVMe M.2', detail: 'Alta velocidad PCIe' },
      {
        label: 'COOL',
        value: 'Disipación de Alto Flujo',
        detail: 'Presión positiva & ventilación directa',
      },
      { label: 'PSU', value: '650W 80+ Bronze', detail: 'Fuente certificada de entrega continua' },
    ],
    fps: [
      { game: 'Cyberpunk 2077 | 1080p | Ultra / DLSS', value: '90+' },
      { game: 'Red Dead Redemption 2 | 1080p | Ultra', value: '85+' },
      { game: 'Forza Horizon 5 | 1080p | Extremo', value: '115+' },
    ],
  },
  {
    id: 'FT-2024-08',
    name: 'Workstation Design & Esports',
    subtitle: 'Diseño Gráfico de Entrada + Gaming Competitivo 1080p',
    category: 'Workstation · APU Performance',
    accentColor: '#38bdf8',
    images: [
      '/img/portfolio/builds/FT-2024-08/1.jpg',
      '/img/portfolio/builds/FT-2024-08/2.jpg',
      '/img/portfolio/builds/FT-2024-08/3.jpg',
      '/img/portfolio/builds/FT-2024-08/4.jpg',
      '/img/portfolio/builds/FT-2024-08/5.jpg',
    ],
    specs: [
      { label: 'CPU', value: 'AMD Ryzen 5 8500G', detail: '6 núcleos / 12 hilos · hasta 5.0 GHz' },
      { label: 'iGPU', value: 'AMD Radeon 740M', detail: 'Gráficos Integrados RDNA 3' },
      { label: 'RAM', value: '32 GB DDR5-6400', detail: 'Dual Channel · Ultra High Bandwidth' },
      { label: 'SSD', value: '1 TB NVMe M.2', detail: 'Alta velocidad PCIe' },
      { label: 'AIO', value: '240mm Refrigeración Líquida', detail: 'Radiador doble · ARGB' },
      { label: 'PSU', value: '750W 80+ Gold', detail: 'Capacidad de upgrade para GPU dedicada' },
    ],
    fps: [
      { game: 'Valorant | 1080p | Competitivo', value: '150+' },
      { game: 'League of Legends | 1080p | Muy Alto', value: '130+' },
      { game: 'Rocket League | 1080p | Calidad/Rend.', value: '95+' },
    ],
  },
  {
    id: 'FT-2024-08-II',
    name: 'Dev Station & Future-Proof Rig',
    subtitle: 'Programación, Compilación & Multitarea Pesada (GPU Ready)',
    category: 'Workstation · Developer Edition',
    accentColor: '#10b981',
    images: [
      '/img/portfolio/builds/FT-2024-08-II/1.jpg',
      '/img/portfolio/builds/FT-2024-08-II/2.jpg',
      '/img/portfolio/builds/FT-2024-08-II/3.jpg',
      '/img/portfolio/builds/FT-2024-08-II/4.jpg',
      '/img/portfolio/builds/FT-2024-08-II/5.jpg',
    ],
    specs: [
      {
        label: 'CPU',
        value: 'Intel Core i5 12600K',
        detail: '10 núcleos (6P+4E) / 16 hilos · hasta 4.9 GHz',
      },
      {
        label: 'iGPU',
        value: 'Intel UHD Graphics 770',
        detail: 'Gráficos integrados 32 EUs · Salida 4K',
      },
      {
        label: 'RAM',
        value: '32 GB DDR5-6400',
        detail: 'Dual Channel · Ideal para Docker y compilación',
      },
      { label: 'SSD', value: '1 TB NVMe M.2', detail: 'Alta velocidad PCIe Gen 4' },
      {
        label: 'AIO',
        value: '120mm Thermaltake Líquida',
        detail: 'Refrigeración líquida compacta Thermaltake · Rendimiento térmico óptimo',
      },
      { label: 'PSU', value: '750W 80+ Gold', detail: 'Potencia lista para futuro upgrade de GPU' },
    ],
    fps: [
      { game: 'League of Legends | 1080p | Medio', value: '100+' },
      { game: 'Valorant | 1080p | Bajo Comp.', value: '85+' },
      { game: 'Minecraft | 1080p | 12 Chunks', value: '120+' },
    ],
  },
  {
    id: 'FT-2023-08',
    name: 'Workstation Ryzen 7 & RX 6800 XT',
    subtitle: 'Gaming 1440p / 4K + Creación de Contenido & 4TB NVMe',
    category: 'Gaming & Workstation · High End',
    accentColor: '#ef4444',
    images: [
      '/img/portfolio/builds/FT-2023-08/1.jpg',
      '/img/portfolio/builds/FT-2023-08/2.jpg',
      '/img/portfolio/builds/FT-2023-08/3.mp4',
    ],
    specs: [
      { label: 'CPU', value: 'AMD Ryzen 7 5800X', detail: '8 núcleos / 16 hilos · hasta 4.7 GHz' },
      { label: 'GPU', value: 'AMD Radeon RX 6800 XT', detail: '16 GB GDDR6 · RDNA 2 / FSR' },
      { label: 'RAM', value: '32 GB DDR4 High Speed', detail: 'Dual Channel · 3200MHz' },
      {
        label: 'SSD',
        value: '4 TB SSD M.2 NVMe',
        detail: 'Almacenamiento masivo de alta velocidad',
      },
      { label: 'AIO', value: '240mm Refrigeración Líquida', detail: 'Radiador doble · ARGB' },
      { label: 'PSU', value: '750W 80+ Gold', detail: 'Full Modular' },
    ],
    fps: [
      { game: 'Cyberpunk 2077 | 1440p | Ultra / FSR', value: '95+' },
      { game: 'Call of Duty: Warzone | 1440p | Extremo', value: '140+' },
      { game: 'Red Dead Redemption 2 | 1440p | Ultra', value: '100+' },
    ],
  },
];

export const maintenance: PortfolioMaintenance[] = [
  {
    id: 'MT-2025-08',
    category: 'maintenance',
    title: 'Torre Oficina - Limpieza Integral & Overhaul',
    description:
      'Mantenimiento preventivo y correctivo completo a equipo de oficina con acumulación crítica de polvo y suciedad tras uso prolongado.',
    year: 2025,
    beforeImages: ['/img/portfolio/maintenance/MT-2025-08/antes/1.JPG'],
    afterImages: ['/img/portfolio/maintenance/MT-2025-08/despues/1.jpg'],
    problem:
      'Acumulación masiva de polvo y suciedad en todos los componentes internos, obstrucción del flujo de aire y sobrecalentamiento en tareas de oficina.',
    solution:
      'Desensamble completo, soplado y limpieza profunda de componentes, disipador y ventiladores, remoción de residuos y cambio de pasta térmica de alto rendimiento.',
  },
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
