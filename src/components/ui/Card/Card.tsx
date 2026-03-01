// src/components/ui/Card/Card.tsx
import React from 'react';
import styles from './Card.module.css';

type CardVariant = 'bordered' | 'elevated' | 'flat' | 'glass';
type CardPadding = 'none' | 'sm' | 'md' | 'lg';

interface CardProps {
  variant?: CardVariant;
  padding?: CardPadding;
  className?: string;
  children: React.ReactNode;
  as?: React.ElementType;
  onClick?: () => void;
}

/**
 * Card — contenedor base del design system.
 *
 * @example
 * <Card variant="elevated" padding="md">
 *   <h2>Producto</h2>
 * </Card>
 */
export function Card({
  variant = 'bordered',
  padding = 'md',
  className = '',
  children,
  as: Tag = 'div',
  onClick,
}: CardProps) {
  const classes = [
    styles.card,
    styles[variant],
    styles[`p-${padding}`],
    onClick ? 'cursor-pointer' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Tag className={classes} onClick={onClick}>
      {children}
    </Tag>
  );
}

export default Card;
