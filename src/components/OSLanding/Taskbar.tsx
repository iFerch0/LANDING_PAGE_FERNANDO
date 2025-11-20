'use client';

import { useState, useEffect } from 'react';
import styles from './Taskbar.module.css';

interface TaskbarProps {
  openWindows: Array<{ id: string; title: string }>;
  onWindowClick: (id: string) => void;
  time: Date;
}

export default function Taskbar({ openWindows, onWindowClick, time }: TaskbarProps) {
  const [showStartMenu, setShowStartMenu] = useState(false);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  useEffect(() => {
    const handleClickOutside = () => setShowStartMenu(false);
    if (showStartMenu) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [showStartMenu]);

  return (
    <div className={styles.taskbar}>
      {/* Start Button */}
      <button
        className={`${styles.startButton} ${showStartMenu ? styles.active : ''}`}
        onClick={(e) => {
          e.stopPropagation();
          setShowStartMenu(!showStartMenu);
        }}
        aria-label="Menú inicio"
      >
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="3" width="8" height="8" fill="currentColor" />
          <rect x="13" y="3" width="8" height="8" fill="currentColor" />
          <rect x="3" y="13" width="8" height="8" fill="currentColor" />
          <rect x="13" y="13" width="8" height="8" fill="currentColor" />
        </svg>
        <span>TechOS</span>
      </button>

      {/* Start Menu */}
      {showStartMenu && (
        <div className={styles.startMenu}>
          <div className={styles.startMenuHeader}>
            <h3>TechOS</h3>
            <p>Sistema de Servicios Técnicos</p>
          </div>
          <div className={styles.startMenuItems}>
            <a href="#" className={styles.startMenuItem}>
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" stroke="currentColor" strokeWidth="2" />
                <polyline points="9 22 9 12 15 12 15 22" stroke="currentColor" strokeWidth="2" />
              </svg>
              <span>Inicio</span>
            </a>
            <a href="https://wa.me/573001234567" className={styles.startMenuItem} target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" stroke="currentColor" strokeWidth="2" />
              </svg>
              <span>Contacto</span>
            </a>
            <a href="tel:+573001234567" className={styles.startMenuItem}>
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" stroke="currentColor" strokeWidth="2" />
              </svg>
              <span>Llamar</span>
            </a>
          </div>
        </div>
      )}

      {/* Open Windows */}
      <div className={styles.taskbarWindows}>
        {openWindows.map((window) => (
          <button
            key={window.id}
            className={styles.taskbarWindow}
            onClick={() => onWindowClick(window.id)}
            title={window.title}
          >
            <span>{window.title}</span>
          </button>
        ))}
      </div>

      {/* System Tray */}
      <div className={styles.systemTray}>
        {/* Network Icon */}
        <div className={styles.trayIcon} title="Red">
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        {/* Volume Icon */}
        <div className={styles.trayIcon} title="Volumen">
          <svg viewBox="0 0 24 24" fill="none">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        {/* Clock */}
        <div className={styles.clock}>
          <span className={styles.time}>{formatTime(time)}</span>
          <span className={styles.date}>{formatDate(time)}</span>
        </div>
      </div>
    </div>
  );
}
