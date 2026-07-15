'use client';

import { useEffect, useState } from 'react';
import styles from './PWAInstaller.module.css';

export default function PWAInstaller() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallButton, setShowInstallButton] = useState(false);
  const [updateAvailable, setUpdateAvailable] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowInstallButton(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  setUpdateAvailable(true);
                }
              });
            }
          });
        })
        .catch((error) => {
          console.error('Service Worker registration failed:', error);
        });
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      return;
    }

    deferredPrompt.prompt();
    await deferredPrompt.userChoice;

    setDeferredPrompt(null);
    setShowInstallButton(false);
  };

  const handleUpdateClick = () => {
    window.location.reload();
  };

  if (updateAvailable) {
    return (
      <div className={`${styles.container} ${styles.visible}`}>
        <div className={styles.content}>
          <div className={styles.text}>
            <h3 className={styles.title}>Nueva versión disponible</h3>
            <p className={styles.description}>Actualiza para obtener las últimas mejoras</p>
          </div>
          <div className={styles.actions}>
            <button onClick={handleUpdateClick} className={styles.installButton}>
              Actualizar
            </button>
            <button
              onClick={() => setUpdateAvailable(false)}
              className={styles.closeButton}
              aria-label="Cerrar"
            >
              ✕
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!showInstallButton) {
    return null;
  }

  return (
    <div className={`${styles.container} ${styles.visible}`}>
      <div className={styles.content}>
        <div className={styles.text}>
          <h3 className={styles.title}>Instalar App</h3>
          <p className={styles.description}>Acceso rápido desde tu pantalla de inicio</p>
        </div>
        <div className={styles.actions}>
          <button onClick={handleInstallClick} className={styles.installButton}>
            Instalar
          </button>
          <button
            onClick={() => setShowInstallButton(false)}
            className={styles.closeButton}
            aria-label="Cerrar"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}
