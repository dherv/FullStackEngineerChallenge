import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PageAdminReviews from './PageAdminReviews';

describe('PageAdminReviews page', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <PageAdminReviews />
      </MemoryRouter>
    );
  });

  test('should display the reviews', async () => {
    await waitFor(() =>
      expect(screen.getByText('Add a review')).toBeInTheDocument()
    );
    await waitFor(() =>
      expect(screen.queryAllByText('employee_1')).toHaveLength(2)
    );
    expect(screen.queryAllByText('employee_2')).toHaveLength(2);
  });

  test('should add a review', async () => {
    await waitFor(() =>
      expect(screen.getByText('Add a review')).toBeInTheDocument()
    );
    userEvent.click(screen.getByText('Add a review'));
    await waitFor(() =>
      expect(
        screen.getByLabelText('select a person to review')
      ).toBeInTheDocument()
    );

    userEvent.click(screen.queryAllByRole('combobox')[0]);
    userEvent.click(screen.queryAllByText('employee_1')[2]);
    await waitFor(() => {
      expect(screen.queryAllByText('employee_1')).toHaveLength(4);
    });

    userEvent.click(screen.queryAllByRole('combobox')[1]);
    userEvent.click(screen.queryAllByText('employee_2')[3]);
    await waitFor(() => {
      expect(screen.queryAllByText('employee_2')).toHaveLength(5);
    });

    userEvent.click(screen.getByText(/Submit/));
    await waitFor(() => {
      expect(screen.queryAllByText('employee_1')).toHaveLength(3);
    });
  });
  test('should edit a review', async () => {
    await waitFor(() => expect(screen.queryAllByText('Edit')).toHaveLength(2));
    userEvent.click(screen.queryAllByText('Edit')[1]);
    await waitFor(() =>
      expect(
        screen.getByLabelText('select a person to review')
      ).toBeInTheDocument()
    );

    userEvent.click(screen.queryAllByRole('combobox')[0]);
    userEvent.click(screen.queryAllByText('employee_1')[2]);
    await waitFor(() => {
      expect(screen.queryAllByText('employee_1')).toHaveLength(4);
    });

    userEvent.click(screen.queryAllByRole('combobox')[1]);
    userEvent.click(screen.queryAllByText('employee_2')[3]);
    await waitFor(() => {
      expect(screen.queryAllByText('employee_2')).toHaveLength(5);
    });

    userEvent.click(screen.getByText(/Submit/));
    await waitFor(() => {
      expect(screen.queryAllByText('employee_1')).toHaveLength(3);
    });
  });

  test('should delete a review', async () => {
    await waitFor(() =>
      expect(screen.getByText('Add a review')).toBeInTheDocument()
    );
    await waitFor(() =>
      expect(screen.queryAllByText('employee_1')).toHaveLength(2)
    );
    userEvent.click(screen.queryAllByText(/Delete/)[0]);
    await waitFor(() =>
      expect(screen.queryAllByText('employee_1')).toHaveLength(1)
    );
  });
});
