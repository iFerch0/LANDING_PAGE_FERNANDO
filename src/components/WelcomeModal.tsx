"use client";
import React, { useState, useEffect } from 'react';
import './WelcomeModal.css';

const WelcomeModal: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Verificar si el modal ya fue mostrado
    const hasSeenModal = localStorage.getItem('welcomeModalSeen');

    if (!hasSeenModal) {
      // Mostrar el modal después de un pequeño delay para una mejor UX
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    // Guardar en localStorage que el usuario ya vio el modal
    localStorage.setItem('welcomeModalSeen', 'true');
  };

  if (!isVisible) return null;

  return (
    <div className="welcome-modal-overlay" onClick={handleClose}>
      <div className="welcome-modal-content" onClick={(e) => e.stopPropagation()}>
        <button
          className="welcome-modal-close"
          onClick={handleClose}
          aria-label="Cerrar"
        >
          ×
        </button>

        <div className="welcome-modal-header">
          <span className="welcome-modal-sparkle">✨</span>
          <h2 className="welcome-modal-title">
            Queridas clientas, querido contarles algo importante
          </h2>
          <span className="welcome-modal-sparkle">✨</span>
        </div>

        <div className="welcome-modal-body">
          <p className="welcome-modal-intro">
            Con mucho cariño, hemos actualizado algunas políticas del estudio para que todas podamos disfrutar de un espacio tranquilo, ordenado y seguro:
          </p>

          <div className="welcome-modal-policy">
            <div className="welcome-modal-policy-icon">⏰</div>
            <div className="welcome-modal-policy-content">
              <h3>Tiempo de espera:</h3>
              <p>
                Tendré una tolerancia de 10 minutos. Si no es posible llegar dentro de ese tiempo, la cita se cancelará y será necesario realizar un nuevo abono para reprogramarla. Gracias por comprender el valor del tiempo de todas.
              </p>
            </div>
          </div>

          <div className="welcome-modal-policy">
            <div className="welcome-modal-policy-icon">👭</div>
            <div className="welcome-modal-policy-content">
              <h3>Acompañantes:</h3>
              <p>
                Para mantener el ambiente cómodo y seguro, les pedimos que no asistan con acompañantes ni con niños sin supervisión. Queremos que este sea un momentico solo para ustedes. 💛✨
              </p>
            </div>
          </div>

          <div className="welcome-modal-footer">
            <p>
              Gracias por su comprensión y por confiar en mi trabajo. Cada una de ustedes hace parte de este espacio tan especial. 💖
            </p>
          </div>
        </div>

        <button className="welcome-modal-button" onClick={handleClose}>
          Entendido
        </button>
      </div>
    </div>
  );
};

export default WelcomeModal;
