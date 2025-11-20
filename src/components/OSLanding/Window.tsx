'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './Window.module.css';

export interface WindowProps {
  id: string;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
  isMaximized?: boolean;
}

export default function Window({
  id,
  title,
  children,
  onClose,
  onMinimize,
  onMaximize,
  isMaximized = false
}: WindowProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Center window on mount
    if (windowRef.current && !isMaximized) {
      const rect = windowRef.current.getBoundingClientRect();
      const centerX = (window.innerWidth - rect.width) / 2;
      const centerY = (window.innerHeight - rect.height) / 2;
      setPosition({ x: centerX, y: Math.max(50, centerY) });
    }
  }, [isMaximized]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isMaximized) return;
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || isMaximized) return;
    setPosition({
      x: e.clientX - dragStart.x,
      y: Math.max(0, e.clientY - dragStart.y)
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragStart]);

  const windowStyle = isMaximized
    ? { top: 0, left: 0, width: '100%', height: '100%', transform: 'none' }
    : {
        top: `${position.y}px`,
        left: `${position.x}px`,
        transform: 'none'
      };

  return (
    <div className={styles.windowOverlay} onClick={onClose}>
      <div
        ref={windowRef}
        className={`${styles.window} ${isMaximized ? styles.maximized : ''}`}
        style={windowStyle}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Window Header */}
        <div
          className={styles.windowHeader}
          onMouseDown={handleMouseDown}
          style={{ cursor: isMaximized ? 'default' : 'move' }}
        >
          <div className={styles.windowTitle}>
            <svg
              className={styles.windowIcon}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
            </svg>
            <span>{title}</span>
          </div>

          <div className={styles.windowControls}>
            {onMinimize && (
              <button
                className={`${styles.controlButton} ${styles.minimize}`}
                onClick={onMinimize}
                aria-label="Minimizar"
                title="Minimizar"
              >
                <svg viewBox="0 0 12 12" fill="none">
                  <line x1="2" y1="6" x2="10" y2="6" stroke="currentColor" strokeWidth="2" />
                </svg>
              </button>
            )}
            {onMaximize && (
              <button
                className={`${styles.controlButton} ${styles.maximize}`}
                onClick={onMaximize}
                aria-label={isMaximized ? 'Restaurar' : 'Maximizar'}
                title={isMaximized ? 'Restaurar' : 'Maximizar'}
              >
                {isMaximized ? (
                  <svg viewBox="0 0 12 12" fill="none">
                    <rect x="3" y="3" width="6" height="6" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M5 3V1H11V7H9" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 12 12" fill="none">
                    <rect x="2" y="2" width="8" height="8" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                )}
              </button>
            )}
            <button
              className={`${styles.controlButton} ${styles.close}`}
              onClick={onClose}
              aria-label="Cerrar"
              title="Cerrar"
            >
              <svg viewBox="0 0 12 12" fill="none">
                <path d="M2 2L10 10M10 2L2 10" stroke="currentColor" strokeWidth="2" />
              </svg>
            </button>
          </div>
        </div>

        {/* Window Content */}
        <div className={styles.windowContent}>
          {children}
        </div>
      </div>
    </div>
  );
}
