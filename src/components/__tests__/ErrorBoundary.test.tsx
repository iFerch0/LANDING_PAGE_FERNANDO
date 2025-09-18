import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ErrorBoundary from '../ErrorBoundary';

function Boom() {
  throw new Error('boom');
}

describe('ErrorBoundary', () => {
  it('muestra el fallback cuando un hijo lanza un error', () => {
    const fallbackText = 'Fallback de error';
    render(
      <ErrorBoundary fallback={<div role="alert">{fallbackText}</div>}>
        <Boom />
      </ErrorBoundary>
    );

    expect(screen.getByRole('alert')).toHaveTextContent(fallbackText);
  });
});
