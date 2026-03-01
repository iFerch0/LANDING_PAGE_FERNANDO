// src/components/ui/Button/Button.tsx
import React from 'react';
import styles from './Button.module.css';

type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  /** Renderiza como <a> internamente (útil para links externos) */
  asChild?: boolean;
}

/**
 * Button — componente base del design system.
 *
 * @example
 * <Button variant="primary" size="lg" onClick={handleClick}>
 *   Contáctanos
 * </Button>
 */
export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  children,
  ...rest
}: ButtonProps) {
  const classes = [
    styles.button,
    styles[variant],
    styles[size],
    fullWidth ? styles.fullWidth : '',
    loading ? styles.loading : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      className={classes}
      disabled={disabled || loading}
      aria-disabled={disabled || loading}
      {...rest}
    >
      {loading && <span className={styles.spinner} aria-hidden="true" />}
      {!loading && leftIcon && <span aria-hidden="true">{leftIcon}</span>}
      {children}
      {!loading && rightIcon && <span aria-hidden="true">{rightIcon}</span>}
    </button>
  );
}

export default Button;
