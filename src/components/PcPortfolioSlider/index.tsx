'use client';

import React, { useState, useCallback } from 'react';
import Image from 'next/image';
import styles from './PcPortfolioSlider.module.css';
import { whatsappUrl } from '@/data/contact';
import { maintenance, PortfolioMaintenance } from '@/data/portfolio';
import { CpuIcon, WrenchIcon, DiagnosticIcon, CheckCircleIcon, ZapIcon } from '../Icons';

interface PcSpec {
  label: string;
  value: string;
  detail: string;
}

interface FpsEntry {
  game: string;
  value: string;
}

interface PcBuild {
  id: string;
  name: string;
  subtitle: string;
  category: string;
  accentColor: string;
  images: string[]; // paths relative to /public
  specs: PcSpec[];
  fps: FpsEntry[];
}

const isVideo = (src: string) => /\.(mp4|webm|ogg|mov)$/i.test(src);

const builds: PcBuild[] = [
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

type TabType = 'builds' | 'maintenance';

const PcPortfolioSlider: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('builds');

  // Builds state
  const [currentBuildIdx, setCurrentBuildIdx] = useState(0);
  const [currentBuildImage, setCurrentBuildImage] = useState(0);

  // Maintenance state
  const [currentMaintIdx, setCurrentMaintIdx] = useState(0);
  const [currentMaintView, setCurrentMaintView] = useState(0);

  const handleTabChange = useCallback((tab: TabType) => {
    setActiveTab(tab);
    setCurrentBuildImage(0);
    setCurrentMaintView(0);
  }, []);

  // Navigation handlers for active tab
  const totalItems = activeTab === 'builds' ? builds.length : maintenance.length;
  const currentIdx = activeTab === 'builds' ? currentBuildIdx : currentMaintIdx;

  const goTo = useCallback(
    (index: number) => {
      if (activeTab === 'builds') {
        setCurrentBuildIdx(index);
        setCurrentBuildImage(0);
      } else {
        setCurrentMaintIdx(index);
        setCurrentMaintView(0);
      }
    },
    [activeTab]
  );

  const prev = useCallback(() => {
    if (activeTab === 'builds') {
      setCurrentBuildIdx((c) => (c === 0 ? builds.length - 1 : c - 1));
      setCurrentBuildImage(0);
    } else {
      setCurrentMaintIdx((c) => (c === 0 ? maintenance.length - 1 : c - 1));
      setCurrentMaintView(0);
    }
  }, [activeTab]);

  const next = useCallback(() => {
    if (activeTab === 'builds') {
      setCurrentBuildIdx((c) => (c === builds.length - 1 ? 0 : c + 1));
      setCurrentBuildImage(0);
    } else {
      setCurrentMaintIdx((c) => (c === maintenance.length - 1 ? 0 : c + 1));
      setCurrentMaintView(0);
    }
  }, [activeTab]);

  // Current build data
  const build = builds[currentBuildIdx] || builds[0];
  const totalBuildImages = build.images ? build.images.length : 0;
  const safeBuildImageIndex = currentBuildImage < totalBuildImages ? currentBuildImage : 0;
  const hasBuildImages = totalBuildImages > 0 && Boolean(build.images[safeBuildImageIndex]);
  const activeBuildImage = hasBuildImages ? build.images[safeBuildImageIndex] : '';

  const prevBuildImage = useCallback(() => {
    if (totalBuildImages <= 1) {
      return;
    }
    setCurrentBuildImage((i) => (i <= 0 ? totalBuildImages - 1 : i - 1));
  }, [totalBuildImages]);

  const nextBuildImage = useCallback(() => {
    if (totalBuildImages <= 1) {
      return;
    }
    setCurrentBuildImage((i) => (i >= totalBuildImages - 1 ? 0 : i + 1));
  }, [totalBuildImages]);

  // Current maintenance data
  const currentMaint: PortfolioMaintenance = maintenance[currentMaintIdx] || maintenance[0];
  const beforeCount = currentMaint.beforeImages?.length || 0;
  const afterCount = currentMaint.afterImages?.length || 0;
  const safeBeforeImg =
    beforeCount > 0 ? currentMaint.beforeImages[Math.min(currentMaintView, beforeCount - 1)] : '';
  const safeAfterImg =
    afterCount > 0 ? currentMaint.afterImages[Math.min(currentMaintView, afterCount - 1)] : '';

  return (
    <section id="ensambles" className={styles.section} aria-labelledby="portfolio-slider-title">
      <div className={styles.container}>
        {/* Section header with Tab Switcher */}
        <div className={styles.header} data-reveal="up">
          <div className={styles.headerLeft}>
            <span className={styles.sectionNum}>01</span>
            <div className={styles.headerContent}>
              <h2 id="portfolio-slider-title" className={styles.title}>
                {activeTab === 'builds'
                  ? 'Últimos Ensambles de PC'
                  : 'Mantenimientos: Antes y Después'}
              </h2>
              <p className={styles.subtitle}>
                {activeTab === 'builds'
                  ? 'Builds personalizados, especificados y ensamblados para cada cliente'
                  : 'Evidencia real de limpieza profunda, repaste térmico y optimización de hardware'}
              </p>
            </div>
          </div>

          {/* Tab buttons */}
          <div className={styles.tabGroup} role="tablist" aria-label="Tipo de trabajos">
            <button
              role="tab"
              aria-selected={activeTab === 'builds'}
              className={`${styles.tabBtn} ${activeTab === 'builds' ? styles.tabBtnActive : ''}`}
              onClick={() => handleTabChange('builds')}
            >
              <CpuIcon size={16} />
              <span>Ensambles ({builds.length})</span>
            </button>
            <button
              role="tab"
              aria-selected={activeTab === 'maintenance'}
              className={`${styles.tabBtn} ${activeTab === 'maintenance' ? styles.tabBtnActive : ''}`}
              onClick={() => handleTabChange('maintenance')}
            >
              <WrenchIcon size={16} />
              <span>Antes / Después ({maintenance.length})</span>
            </button>
          </div>
        </div>

        {/* Slider Area */}
        <div className={styles.slider}>
          {activeTab === 'builds' ? (
            /* ── Builds Card ── */
            <div
              className={styles.slide}
              style={{ '--build-accent': build.accentColor } as React.CSSProperties}
            >
              {/* Left column — photo gallery */}
              <div className={styles.visual}>
                <div className={styles.buildBadge}>
                  <span className={styles.buildId}>{build.id}</span>
                  <span className={styles.buildCategory} style={{ color: build.accentColor }}>
                    {build.category}
                  </span>
                </div>

                {/* Photo area */}
                <div className={styles.photoArea}>
                  {hasBuildImages ? (
                    <>
                      <div className={styles.photoFrame}>
                        {/* Accent glow */}
                        <div
                          className={styles.photoGlow}
                          style={{
                            background: `radial-gradient(ellipse at center, ${build.accentColor}30 0%, transparent 70%)`,
                          }}
                          aria-hidden="true"
                        />

                        {isVideo(activeBuildImage) ? (
                          <video
                            key={activeBuildImage}
                            src={activeBuildImage}
                            controls
                            autoPlay
                            muted
                            loop
                            playsInline
                            className={styles.video}
                          />
                        ) : (
                          <Image
                            key={activeBuildImage}
                            src={activeBuildImage}
                            alt={`${build.name} — foto ${currentBuildImage + 1}`}
                            fill
                            sizes="(max-width: 900px) 100vw, 420px"
                            className={styles.photo}
                            priority={currentBuildIdx === 0 && currentBuildImage === 0}
                            loading={
                              currentBuildIdx === 0 && currentBuildImage === 0 ? 'eager' : 'lazy'
                            }
                          />
                        )}

                        {/* Photo nav arrows */}
                        {build.images.length > 1 && (
                          <>
                            <button
                              onClick={prevBuildImage}
                              className={styles.photoNavBtn}
                              aria-label="Foto anterior"
                              style={{ left: 8 }}
                            >
                              <svg
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                              >
                                <path d="M15 18l-6-6 6-6" />
                              </svg>
                            </button>
                            <button
                              onClick={nextBuildImage}
                              className={styles.photoNavBtn}
                              aria-label="Foto siguiente"
                              style={{ right: 8 }}
                            >
                              <svg
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                              >
                                <path d="M9 18l6-6-6-6" />
                              </svg>
                            </button>
                          </>
                        )}

                        {/* Photo counter */}
                        {build.images.length > 1 && (
                          <span className={styles.photoCounter} aria-live="polite">
                            {currentBuildImage + 1} / {build.images.length}
                          </span>
                        )}
                      </div>

                      {/* Thumbnail strip */}
                      {build.images.length > 1 && (
                        <div className={styles.thumbStrip} role="list" aria-label="Fotos del build">
                          {build.images.map((src, i) => (
                            <button
                              key={src}
                              role="listitem"
                              onClick={() => setCurrentBuildImage(i)}
                              className={`${styles.thumb} ${i === currentBuildImage ? styles.thumbActive : ''}`}
                              aria-label={`Ver archivo ${i + 1}`}
                              aria-current={i === currentBuildImage}
                              style={
                                i === currentBuildImage
                                  ? { borderColor: build.accentColor }
                                  : undefined
                              }
                            >
                              {isVideo(src) ? (
                                <div className={styles.videoThumbWrapper}>
                                  <video
                                    src={src}
                                    muted
                                    playsInline
                                    preload="metadata"
                                    className={styles.thumbImg}
                                  />
                                  <span className={styles.videoPlayBadge} aria-hidden="true">
                                    <svg
                                      width="8"
                                      height="8"
                                      viewBox="0 0 24 24"
                                      fill="currentColor"
                                    >
                                      <polygon points="5 3 19 12 5 21 5 3" />
                                    </svg>
                                  </span>
                                </div>
                              ) : (
                                <Image
                                  src={src}
                                  alt={`${build.name} miniatura ${i + 1}`}
                                  fill
                                  sizes="64px"
                                  className={styles.thumbImg}
                                />
                              )}
                            </button>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <div className={styles.photoPlaceholder} aria-label="Sin imágenes aún">
                      <svg
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                        style={{ opacity: 0.25 }}
                      >
                        <rect x="3" y="3" width="18" height="18" rx="2" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <path d="M21 15l-5-5L5 21" />
                      </svg>
                      <span className={styles.placeholderLabel}>Fotos próximamente</span>
                    </div>
                  )}
                </div>

                <h3 className={styles.buildName}>{build.name}</h3>
                <p className={styles.buildSubtitle}>{build.subtitle}</p>
              </div>

              {/* Right column — specs + FPS + CTAs */}
              <div className={styles.specs}>
                {/* Spec table */}
                <div className={styles.specTable}>
                  {build.specs.map((spec) => (
                    <div key={spec.label} className={styles.specRow}>
                      <span className={styles.specLabel}>{spec.label}</span>
                      <div className={styles.specContent}>
                        <span className={styles.specValue}>{spec.value}</span>
                        <span className={styles.specDetail}>{spec.detail}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Performance block */}
                <div className={styles.performance}>
                  <span className={styles.perfTitle}>Rendimiento estimado</span>
                  <div className={styles.perfGrid}>
                    {build.fps.map((item) => (
                      <div key={item.game} className={styles.perfItem}>
                        <span className={styles.perfGame}>{item.game}</span>
                        <span className={styles.perfValue} style={{ color: build.accentColor }}>
                          {item.value}
                          <span className={styles.perfUnit}> FPS</span>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTAs */}
                <div className={styles.actions}>
                  <a
                    href={whatsappUrl(
                      `Hola, me interesa armar un PC personalizado similar al ${build.name} (${build.id})`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.ctaPrimary}
                  >
                    Hablemos de tu Próximo PC
                  </a>
                </div>
              </div>
            </div>
          ) : (
            /* ── Maintenance (Before/After) Card ── */
            <div
              className={styles.slide}
              style={{ '--build-accent': 'var(--color-accent)' } as React.CSSProperties}
            >
              {/* Left column — Before/After Interactive Slider */}
              <div className={styles.visual}>
                <div className={styles.buildBadge}>
                  <span className={styles.buildId}>
                    {currentMaint.id} · AÑO {currentMaint.year}
                  </span>
                  <span className={styles.buildCategory} style={{ color: 'var(--color-accent)' }}>
                    MANTENIMIENTO PREVENTIVO & TÉRMICO
                  </span>
                </div>

                <div className={styles.comparisonGrid}>
                  {/* Before Photo Card */}
                  <div className={`${styles.compareCard} ${styles.compareCardBefore}`}>
                    <div className={styles.comparePhotoWrapper}>
                      <span className={`${styles.compareBadge} ${styles.compareBadgeBefore}`}>
                        <span className={`${styles.compareDot} ${styles.compareDotBefore}`} />
                        Antes
                      </span>
                      {safeBeforeImg && (
                        <Image
                          src={safeBeforeImg}
                          alt={`${currentMaint.title} - Estado Antes`}
                          fill
                          sizes="(max-width: 900px) 50vw, 240px"
                          className={styles.comparePhoto}
                        />
                      )}
                    </div>
                    <div className={styles.compareCaption}>
                      <span>Polvo & suciedad</span>
                      <span>Inicial</span>
                    </div>
                  </div>

                  {/* After Photo Card */}
                  <div className={`${styles.compareCard} ${styles.compareCardAfter}`}>
                    <div className={styles.comparePhotoWrapper}>
                      <span className={`${styles.compareBadge} ${styles.compareBadgeAfter}`}>
                        <span className={`${styles.compareDot} ${styles.compareDotAfter}`} />
                        Después
                      </span>
                      {safeAfterImg && (
                        <Image
                          src={safeAfterImg}
                          alt={`${currentMaint.title} - Resultado Después`}
                          fill
                          sizes="(max-width: 900px) 50vw, 240px"
                          className={styles.comparePhoto}
                        />
                      )}
                    </div>
                    <div className={styles.compareCaption}>
                      <span>100% Limpio & repaste</span>
                      <span>Final</span>
                    </div>
                  </div>
                </div>

                {/* View switcher if multiple before/after shots exist */}
                {beforeCount > 1 && (
                  <div
                    className={styles.thumbStrip}
                    role="list"
                    aria-label="Vistas del mantenimiento"
                  >
                    {currentMaint.beforeImages.map((src, i) => (
                      <button
                        key={src}
                        role="listitem"
                        onClick={() => setCurrentMaintView(i)}
                        className={`${styles.thumb} ${i === currentMaintView ? styles.thumbActive : ''}`}
                        aria-label={`Ver toma ${i + 1}`}
                        aria-current={i === currentMaintView}
                        style={
                          i === currentMaintView
                            ? { borderColor: 'var(--color-accent)' }
                            : undefined
                        }
                      >
                        <Image
                          src={src}
                          alt={`${currentMaint.title} vista ${i + 1}`}
                          fill
                          sizes="64px"
                          className={styles.thumbImg}
                        />
                      </button>
                    ))}
                  </div>
                )}

                <h3 className={styles.buildName}>{currentMaint.title}</h3>
                <p className={styles.buildSubtitle}>{currentMaint.description}</p>
              </div>

              {/* Right column — Diagnosis, Technical Work & CTAs */}
              <div className={styles.maintenanceInfo}>
                <div className={styles.diagnosticGrid}>
                  {/* Problem Callout */}
                  <div className={`${styles.calloutCard} ${styles.calloutCardProblem}`}>
                    <div className={`${styles.calloutHeader} ${styles.calloutHeaderProblem}`}>
                      <DiagnosticIcon size={16} />
                      <span>Diagnóstico & Problema Inicial</span>
                    </div>
                    <p className={styles.calloutText}>{currentMaint.problem}</p>
                  </div>

                  {/* Solution Callout */}
                  <div className={`${styles.calloutCard} ${styles.calloutCardSolution}`}>
                    <div className={`${styles.calloutHeader} ${styles.calloutHeaderSolution}`}>
                      <CheckCircleIcon size={16} />
                      <span>Solución Técnica Realizada</span>
                    </div>
                    <p className={styles.calloutText}>{currentMaint.solution}</p>
                  </div>
                </div>

                {/* Benefit chips */}
                <div className={styles.benefitChips}>
                  <span className={styles.benefitChip}>
                    <ZapIcon size={14} /> -20°C a -30°C Térmico
                  </span>
                  <span className={styles.benefitChip}>
                    <CheckCircleIcon size={14} /> Pasta Térmica Premium
                  </span>
                  <span className={styles.benefitChip}>
                    <WrenchIcon size={14} /> Desarmado & Limpieza Total
                  </span>
                </div>

                {/* CTAs */}
                <div className={styles.actions}>
                  <a
                    href={whatsappUrl(
                      `Hola, vi el mantenimiento "${currentMaint.title}" en tu portafolio y necesito agendar un mantenimiento para mi equipo.`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.ctaPrimary}
                  >
                    Agendar Mantenimiento
                  </a>
                  <a
                    href={whatsappUrl(
                      'Hola, quiero consultar el costo de mantenimiento para mi equipo'
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.ctaOutline}
                  >
                    Cotizar Diagnóstico
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          {totalItems > 1 && (
            <div className={styles.navigation}>
              <button
                onClick={prev}
                className={styles.navBtn}
                aria-label={activeTab === 'builds' ? 'Build anterior' : 'Mantenimiento anterior'}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>

              <div
                className={styles.dots}
                role="tablist"
                aria-label={activeTab === 'builds' ? 'Builds' : 'Mantenimientos'}
              >
                {Array.from({ length: totalItems }).map((_, i) => (
                  <button
                    key={i}
                    role="tab"
                    aria-selected={i === currentIdx}
                    className={`${styles.dot} ${i === currentIdx ? styles.dotActive : ''}`}
                    onClick={() => goTo(i)}
                    aria-label={`Elemento ${i + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={next}
                className={styles.navBtn}
                aria-label={activeTab === 'builds' ? 'Build siguiente' : 'Mantenimiento siguiente'}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PcPortfolioSlider;
