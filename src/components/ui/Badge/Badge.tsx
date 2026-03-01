// src/components/ui/Badge/Badge.tsx
import React from 'react';
import styles from './Badge.module.css';

type BadgeVariant = 'default' | 'primary' | 'accent' | 'success' | 'warning' | 'danger' | 'info';

interface BadgeProps {
  variant?: BadgeVariant;
  dot?: boolean;
  children: React.ReactNode;
  className?: string;
}

/**
 * Badge — etiqueta de estado o categoría.
 *
 * @example
 * <Badge variant="success" dot>Disponible</Badge>
 * <Badge variant="warning">Reacondicionado</Badge>
 */
export function Badge({ variant = 'default', dot = false, children, className = '' }: BadgeProps) {
  const classes = [styles.badge, styles[variant], className].filter(Boolean).join(' ');

  return (
    <span className={classes}>
      {dot && <span className={styles.dot} aria-hidden="true" />}
      {children}
    </span>
  );
}

export default Badge;
