import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PageEmployeeReviews from './PageEmployeeReviews';

describe('PageEmployeeReviews page', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <PageEmployeeReviews />
      </MemoryRouter>
    );
  });

  test('should display a review to create', async () => {
    await waitFor(() =>
      expect(
        screen.getByText(/please write a review about employee_1/)
      ).toBeInTheDocument()
    );
  });

  test('should display a review to edit', async () => {
    await waitFor(() =>
      expect(screen.getByText(/test review/)).toBeInTheDocument()
    );
  });

  test('should open modal', async () => {
    await waitFor(() =>
      expect(screen.queryAllByText(/employee_1/)).toHaveLength(3)
    );
    userEvent.click(screen.queryAllByText(/Edit/)[1]);
    await waitFor(() => expect(screen.getByText(/Review/)).toBeInTheDocument());
  });

  test('should insert text from review in modal text area', async () => {
    // wait the items have loaded
    await waitFor(() =>
      expect(
        screen.getByText(/please write a review about employee_1/)
      ).toBeInTheDocument()
    );
    // open the modal for the review to edit
    userEvent.click(screen.queryAllByText(/Edit/)[1]);
    await waitFor(() =>
      expect(screen.getByRole('textbox')).toHaveDisplayValue('test review')
    );
  });

  test('should create review on submit', async () => {
    // wait the items have loaded
    await waitFor(() =>
      expect(
        screen.getByText(/please write a review about employee_1/)
      ).toBeInTheDocument()
    );
    // open the modal for the review to create
    userEvent.click(screen.queryAllByText(/Edit/)[0]);
    userEvent.type(screen.getByRole('textbox'), 'my review');
    await waitFor(() =>
      expect(screen.getByText('my review')).toBeInTheDocument()
    );
    userEvent.click(screen.getByText(/Submit/));
    // check the review text now appears in the list
    await waitFor(() =>
      expect(screen.queryAllByText(': my review')).toHaveLength(1)
    );
  });

  test('should update review on submit', async () => {
    // wait the items have loaded
    await waitFor(() =>
      expect(
        screen.getByText(/please write a review about employee_1/)
      ).toBeInTheDocument()
    );
    // open the modal for the review to create
    userEvent.click(screen.queryAllByText(/Edit/)[1]);
    userEvent.clear(screen.getByRole('textbox'));
    userEvent.type(screen.getByRole('textbox'), 'edit review');
    await waitFor(() =>
      expect(screen.getByText('edit review')).toBeInTheDocument()
    );
    userEvent.click(screen.getByText(/Submit/));
    // check the edit review text now appears in the list
    await waitFor(() =>
      expect(screen.queryAllByText(': edit review')).toHaveLength(1)
    );
  });
});
