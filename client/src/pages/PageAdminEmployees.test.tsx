import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PageAdminEmployees from './PageAdminEmployees';

describe('PageAdminEmployees page', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <PageAdminEmployees />
      </MemoryRouter>
    );
  });

  test('should display the employees', async () => {
    await waitFor(() =>
      expect(screen.getByText('Frontend')).toBeInTheDocument()
    );
    expect(screen.getByText('Backend')).toBeInTheDocument();
    expect(screen.queryAllByText('IT')).toHaveLength(2);
  });

  test('should add an employee', async () => {
    await waitFor(() =>
      expect(screen.getByText('Frontend')).toBeInTheDocument()
    );
    userEvent.click(screen.getByText(/Add an employee/));
    userEvent.type(screen.getByPlaceholderText('John Wick'), 'Damien');
    userEvent.type(screen.getByPlaceholderText('Frontend'), 'Frontend');
    userEvent.type(screen.getByPlaceholderText('IT'), 'IT');
    userEvent.click(screen.getByText(/Submit/));
    await waitFor(() => {
      expect(screen.getByText('Damien')).toBeInTheDocument();
    });
  });

  test('should edit an employee', async () => {
    await waitFor(() =>
      expect(screen.getByText('Frontend')).toBeInTheDocument()
    );
    userEvent.click(screen.queryAllByText(/Edit/)[0]);
    userEvent.type(screen.getByPlaceholderText('John Wick'), 'employee_1');
    userEvent.type(screen.getByPlaceholderText('Frontend'), 'Designer');
    userEvent.type(screen.getByPlaceholderText('IT'), 'Design');
    userEvent.click(screen.getByText(/Submit/));
    await waitFor(() => {
      expect(screen.getByText('Designer')).toBeInTheDocument();
    });
  });

  test('should delete an employee', async () => {
    await waitFor(() =>
      expect(screen.getByText('Frontend')).toBeInTheDocument()
    );
    userEvent.click(screen.queryAllByText(/Delete/)[0]);
    await waitFor(() => {
      expect(screen.queryByText('employee_1')).toBeNull();
    });
  });
});
