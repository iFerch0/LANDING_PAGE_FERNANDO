'use client';

import { useState } from 'react';
import styles from './Desktop.module.css';
import DesktopIcon from './DesktopIcon';
import Window from './Window';
import * as Icons from './OSIcons';
import Taskbar from './Taskbar';

// Import existing components
import Features from '../Features';
import Testimonials from '../Testimonials';
import Faq from '../Faq';
import ContactForm from '../ContactForm';
import Stats from '../Stats';
import Process from '../Process';

interface AppWindow {
  id: string;
  title: string;
  component: React.ReactNode;
  isMaximized: boolean;
}

export default function Desktop() {
  const [openWindows, setOpenWindows] = useState<AppWindow[]>([]);
  const [time, setTime] = useState(new Date());

  // Update time every minute
  useState(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 60000);
    return () => clearInterval(interval);
  });

  const desktopApps = [
    {
      id: 'services',
      title: 'Servicios',
      icon: <Icons.ServicesIcon />,
      component: (
        <div className={styles.windowSection}>
          <h2>Nuestros Servicios</h2>
          <Features />
        </div>
      )
    },
    {
      id: 'process',
      title: 'Proceso',
      icon: <Icons.ProcessIcon />,
      component: (
        <div className={styles.windowSection}>
          <h2>Nuestro Proceso</h2>
          <Process />
        </div>
      )
    },
    {
      id: 'testimonials',
      title: 'Testimonios',
      icon: <Icons.TestimonialsIcon />,
      component: (
        <div className={styles.windowSection}>
          <h2>Lo que dicen nuestros clientes</h2>
          <Testimonials />
        </div>
      )
    },
    {
      id: 'stats',
      title: 'Estadísticas',
      icon: <Icons.StatsIcon />,
      component: (
        <div className={styles.windowSection}>
          <h2>Nuestros Números</h2>
          <Stats />
        </div>
      )
    },
    {
      id: 'faq',
      title: 'Preguntas Frecuentes',
      icon: <Icons.FAQIcon />,
      component: (
        <div className={styles.windowSection}>
          <h2>Preguntas Frecuentes</h2>
          <Faq />
        </div>
      )
    },
    {
      id: 'contact',
      title: 'Contacto',
      icon: <Icons.ContactIcon />,
      component: (
        <div className={styles.windowSection}>
          <h2>Contáctanos</h2>
          <ContactForm />
        </div>
      )
    },
    {
      id: 'about',
      title: 'Acerca de',
      icon: <Icons.AboutIcon />,
      component: (
        <div className={styles.windowSection}>
          <h2>Acerca de Nosotros</h2>
          <div className={styles.aboutContent}>
            <p className={styles.aboutText}>
              Somos expertos en <strong>reparación, asesoría y armado de computadores</strong> con años de experiencia en el sector.
            </p>
            <p className={styles.aboutText}>
              Nuestro compromiso es ofrecer servicios técnicos de la más alta calidad, garantizando la satisfacción de nuestros clientes.
            </p>
            <div className={styles.servicesList}>
              <h3>Servicios Destacados:</h3>
              <ul>
                <li>🔧 Reparación de computadores de escritorio y portátiles</li>
                <li>💼 Asesoría técnica especializada</li>
                <li>🖥️ Armado de PC personalizadas</li>
                <li>⚡ Mantenimiento preventivo y correctivo</li>
                <li>📊 Optimización de rendimiento</li>
                <li>🔒 Instalación de sistemas operativos</li>
              </ul>
            </div>
            <div className={styles.cta}>
              <a href="https://wa.me/573001234567" className={styles.ctaButton} target="_blank" rel="noopener noreferrer">
                Contáctanos por WhatsApp
              </a>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'portfolio',
      title: 'Portafolio',
      icon: <Icons.PortfolioIcon />,
      component: (
        <div className={styles.windowSection}>
          <h2>Nuestros Trabajos</h2>
          <div className={styles.portfolioGrid}>
            <div className={styles.portfolioItem}>
              <h3>PC Gaming Alto Rendimiento</h3>
              <p>Setup completo con RTX 4070, Ryzen 7 5800X</p>
            </div>
            <div className={styles.portfolioItem}>
              <h3>Estación de Trabajo</h3>
              <p>Workstation para diseño gráfico y edición de video</p>
            </div>
            <div className={styles.portfolioItem}>
              <h3>Reparación Laptop</h3>
              <p>Recuperación de datos y cambio de componentes</p>
            </div>
            <div className={styles.portfolioItem}>
              <h3>Red Empresarial</h3>
              <p>Configuración de red para oficina de 20 equipos</p>
            </div>
          </div>
        </div>
      )
    }
  ];

  const handleIconClick = (appId: string) => {
    const app = desktopApps.find((a) => a.id === appId);
    if (!app) return;

    // Check if window is already open
    if (openWindows.some((w) => w.id === appId)) {
      // Bring to front (remove and re-add)
      setOpenWindows((prev) => [
        ...prev.filter((w) => w.id !== appId),
        prev.find((w) => w.id === appId)!
      ]);
      return;
    }

    // Open new window
    setOpenWindows((prev) => [
      ...prev,
      {
        id: app.id,
        title: app.title,
        component: app.component,
        isMaximized: false
      }
    ]);
  };

  const handleCloseWindow = (windowId: string) => {
    setOpenWindows((prev) => prev.filter((w) => w.id !== windowId));
  };

  const handleMaximizeWindow = (windowId: string) => {
    setOpenWindows((prev) =>
      prev.map((w) =>
        w.id === windowId ? { ...w, isMaximized: !w.isMaximized } : w
      )
    );
  };

  return (
    <div className={styles.desktop}>
      {/* Background */}
      <div className={styles.desktopBackground}>
        <div className={styles.gridOverlay}></div>
        <div className={styles.gradientOverlay}></div>
      </div>

      {/* Desktop Icons */}
      <div className={styles.desktopIcons}>
        {desktopApps.map((app) => (
          <DesktopIcon
            key={app.id}
            id={app.id}
            title={app.title}
            icon={app.icon}
            onClick={handleIconClick}
          />
        ))}
      </div>

      {/* Open Windows */}
      {openWindows.map((window, index) => (
        <Window
          key={window.id}
          id={window.id}
          title={window.title}
          onClose={() => handleCloseWindow(window.id)}
          onMaximize={() => handleMaximizeWindow(window.id)}
          isMaximized={window.isMaximized}
        >
          {window.component}
        </Window>
      ))}

      {/* Taskbar */}
      <Taskbar
        openWindows={openWindows}
        onWindowClick={handleIconClick}
        time={time}
      />
    </div>
  );
}
