"use client";
import React from 'react';

interface ErrorBoundaryProps {
  fallback?: React.ReactNode;
  onError?: (error: Error, info: React.ErrorInfo) => void;
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export default class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
    // Could integrate with Sentry/LogRocket here in the future
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      return this.props.fallback ?? (
        <div role="alert" style={{
          padding: 16,
          borderRadius: 8,
          border: '1px solid var(--color-border, #ddd)',
          background: 'var(--color-surface, #fff)',
          color: 'var(--color-text, #111)'
        }}>
          Ocurrió un error inesperado. Intenta recargar la página.
        </div>
      );
    }
    return this.props.children;
  }
}
