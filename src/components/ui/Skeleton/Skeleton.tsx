// src/components/ui/Skeleton/Skeleton.tsx
import React from 'react';
import styles from './Skeleton.module.css';

interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  rounded?: boolean;
  square?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Skeleton — placeholder de carga animado.
 *
 * @example
 * <Skeleton height={200} />
 * <Skeleton width={120} height={20} />
 * <Skeleton width={48} height={48} rounded />
 */
export function Skeleton({ width, height, rounded, square, className = '', style }: SkeletonProps) {
  const classes = [
    styles.skeleton,
    rounded ? styles.rounded : '',
    square ? styles.square : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={classes}
      aria-hidden="true"
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
        ...style,
      }}
    />
  );
}

export default Skeleton;
