import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import EmployeeSidebar from './EmployeeSidebar';

describe('EmployeeSidebar component', () => {
  test('should render an extra link to the admin page', () => {
    render(
      <MemoryRouter>
        <EmployeeSidebar />
      </MemoryRouter>
    );
    expect(screen.getByText('Log as admin')).toBeInTheDocument();
    expect(screen.getByText('Log as admin')).toHaveAttribute(
      'href',
      '/admin/employees'
    );
  });
});
