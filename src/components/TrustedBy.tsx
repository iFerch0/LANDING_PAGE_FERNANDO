import React from 'react';
import styles from './TrustedBy.module.css';

const clientTypes = [
  {
    icon: '🏢',
    label: 'Oficinas',
    desc: 'Soporte continuo',
  },
  {
    icon: '🎓',
    label: 'Colegios',
    desc: 'Salas informáticas',
  },
  {
    icon: '🏪',
    label: 'Pymes',
    desc: 'Infraestructura IT',
  },
  {
    icon: '🏠',
    label: 'Hogares',
    desc: 'Reparación y limpieza',
  },
  {
    icon: '🚀',
    label: 'Emprendedores',
    desc: 'Soluciones digitales',
  },
];

const TrustedBy: React.FC = () => {
  return (
    <section className={styles.section} aria-label="Tipos de clientes">
      <div className={styles.container}>
        <div className={styles.header} data-aos="fade-up">
          <span className={styles.eyebrow}>Clientes que confían</span>
          <h2 className={styles.title}>
            Soluciones para
            <span className={styles.titleAccent}> cada necesidad</span>
          </h2>
        </div>

        <div className={styles.grid} data-aos="fade-up" data-aos-delay="100">
          {clientTypes.map((client) => (
            <div key={client.label} className={styles.item}>
              <span className={styles.icon}>{client.icon}</span>
              <span className={styles.label}>{client.label}</span>
              <span className={styles.desc}>{client.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;
