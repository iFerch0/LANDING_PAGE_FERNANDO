'use client';

import styles from './DesktopIcon.module.css';

export interface DesktopIconProps {
  id: string;
  title: string;
  icon: React.ReactNode;
  onClick: (id: string) => void;
  position?: { x: number; y: number };
}

export default function DesktopIcon({ id, title, icon, onClick, position }: DesktopIconProps) {
  const style = position ? {
    gridColumn: 'auto',
    gridRow: 'auto'
  } : {};

  return (
    <button
      className={styles.desktopIcon}
      onClick={() => onClick(id)}
      style={style}
      aria-label={`Abrir ${title}`}
    >
      <div className={styles.iconWrapper}>
        {icon}
      </div>
      <span className={styles.iconLabel}>{title}</span>
    </button>
  );
}
