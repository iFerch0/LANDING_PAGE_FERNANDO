// src/components/ui/Input/Input.tsx
import React, { forwardRef } from 'react';
import styles from './Input.module.css';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

/**
 * Input — componente base de formulario.
 *
 * @example
 * <Input label="Nombre" placeholder="Ej: Fernando" error={errorMensaje} leftIcon={<UserIcon />} />
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      fullWidth = true,
      className = '',
      id,
      ...rest
    },
    ref
  ) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;
    const helperId = `${inputId}-helper`;
    const errorId = `${inputId}-error`;

    const inputClasses = [
      styles.input,
      leftIcon ? styles.withLeftIcon : '',
      rightIcon ? styles.withRightIcon : '',
      error ? styles.error : '',
    ]
      .filter(Boolean)
      .join(' ');

    const wrapperStyles = [styles.wrapper, !fullWidth ? 'w-auto' : '', className]
      .filter(Boolean)
      .join(' ');

    return (
      <div className={wrapperStyles}>
        {label && (
          <label htmlFor={inputId} className={styles.label}>
            {label}
            {rest.required && (
              <span aria-hidden="true" className="text-error ml-1">
                *
              </span>
            )}
          </label>
        )}

        <div className={styles.inputWrapper}>
          {leftIcon && (
            <span className={styles.leftIcon} aria-hidden="true">
              {leftIcon}
            </span>
          )}
          <input
            id={inputId}
            ref={ref}
            className={inputClasses}
            aria-invalid={!!error}
            aria-describedby={error ? errorId : helperText ? helperId : undefined}
            {...rest}
          />
          {rightIcon && (
            <span className={styles.rightIcon} aria-hidden="true">
              {rightIcon}
            </span>
          )}
        </div>

        {error && (
          <p id={errorId} className={styles.errorText} aria-live="polite">
            {error}
          </p>
        )}
        {!error && helperText && (
          <p id={helperId} className={styles.helperText}>
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
