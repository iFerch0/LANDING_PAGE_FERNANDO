'use client';

import { useEffect, useState } from 'react';
import styles from './BootScreen.module.css';

interface BootScreenProps {
  onBootComplete: () => void;
}

export default function BootScreen({ onBootComplete }: BootScreenProps) {
  const [bootStage, setBootStage] = useState(0);
  const [progress, setProgress] = useState(0);

  const bootMessages = [
    'Iniciando sistema TechOS...',
    'Cargando módulos de servicios...',
    'Verificando componentes...',
    'Configurando experiencia de usuario...',
    'Sistema listo. Bienvenido!'
  ];

  useEffect(() => {
    // Progress bar animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    // Boot messages sequence
    const messageInterval = setInterval(() => {
      setBootStage((prev) => {
        if (prev >= bootMessages.length - 1) {
          clearInterval(messageInterval);
          return prev;
        }
        return prev + 1;
      });
    }, 1000);

    // Complete boot after 5 seconds
    const bootTimer = setTimeout(() => {
      onBootComplete();
    }, 5500);

    return () => {
      clearInterval(progressInterval);
      clearInterval(messageInterval);
      clearTimeout(bootTimer);
    };
  }, [onBootComplete]);

  return (
    <div className={styles.bootScreen}>
      <div className={styles.bootContainer}>
        {/* Logo and Brand */}
        <div className={styles.logo}>
          <div className={styles.logoIcon}>
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="10" y="10" width="80" height="80" rx="12" stroke="currentColor" strokeWidth="3"/>
              <path d="M30 35 L45 50 L30 65" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              <line x1="55" y1="60" x2="70" y2="60" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
            </svg>
          </div>
          <h1 className={styles.brandName}>TechOS</h1>
          <p className={styles.subtitle}>Sistema de Servicios Técnicos</p>
        </div>

        {/* Boot Messages */}
        <div className={styles.messages}>
          {bootMessages.slice(0, bootStage + 1).map((message, index) => (
            <div
              key={index}
              className={styles.message}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <span className={styles.messageIndicator}>{'>'}</span>
              <span>{message}</span>
            </div>
          ))}
        </div>

        {/* Progress Bar */}
        <div className={styles.progressContainer}>
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className={styles.progressText}>{progress}%</span>
        </div>

        {/* Loading Dots */}
        <div className={styles.loadingDots}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      {/* Background Effects */}
      <div className={styles.backgroundGrid}></div>
      <div className={styles.scanline}></div>
    </div>
  );
}
