// src/components/ui/EmptyState/EmptyState.tsx
import React from 'react';
import styles from './EmptyState.module.css';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

/**
 * EmptyState — estado vacío para listas y búsquedas sin resultados.
 *
 * @example
 * <EmptyState
 *   icon="🔍"
 *   title="Sin resultados"
 *   description="Intenta con otros filtros."
 *   action={<Button onClick={clearFilters}>Limpiar filtros</Button>}
 * />
 */
export function EmptyState({ icon, title, description, action, className = '' }: EmptyStateProps) {
  return (
    <div className={`${styles.wrapper} ${className}`} role="status" aria-live="polite">
      {icon && (
        <div className={styles.icon} aria-hidden="true">
          {icon}
        </div>
      )}
      <p className={styles.title}>{title}</p>
      {description && <p className={styles.description}>{description}</p>}
      {action && <div className={styles.action}>{action}</div>}
    </div>
  );
}

export default EmptyState;
