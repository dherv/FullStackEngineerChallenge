import React from 'react';
import { render, screen } from '@testing-library/react';
import FormButtonSubmit from './FormButtonSubmit';

describe('FormButtonSubmit component', () => {
  test('should have a type submit', () => {
    render(<FormButtonSubmit />);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
    expect(screen.getByRole('button')).not.toHaveAttribute('disabled');
  });
  test('should be disabled when props disabled is true', () => {
    render(<FormButtonSubmit disabled={true} />);
    expect(screen.getByRole('button')).toHaveAttribute('disabled');
  });
});
