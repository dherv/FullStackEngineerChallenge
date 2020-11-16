import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import TemplateSidebar from './TemplateSidebar';

describe('TemplateSidebar template', () => {
  const routes = [
    {
      path: '/admin/employees',
      title: 'employees',
    },
    { path: '/admin/reviews', title: 'reviews' },
  ];
  beforeEach(() => {
    render(
      <MemoryRouter>
        <TemplateSidebar routes={routes} />
      </MemoryRouter>
    );
  });
  test('should display a menu item for each route', () => {
    expect(screen.getByText('employees')).toBeInTheDocument();
    expect(screen.getByText('reviews')).toBeInTheDocument();
  });
  test('should display two links with the right href', () => {
    expect(screen.getByText('employees')).toHaveAttribute(
      'href',
      '/admin/employees'
    );
    expect(screen.getByText('reviews')).toHaveAttribute(
      'href',
      '/admin/reviews'
    );
  });
});
