import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TableButtonActions from './TableButtonActions';

describe('TableButtonActions component', () => {
  const record = {
    id: 1,
    name: 'name',
    department: 'department',
    position: 'position',
  };
  const onClickEdit = jest.fn();
  const onClickDelete = jest.fn();
  beforeEach(() => {
    render(
      <TableButtonActions
        record={record}
        onClickEdit={onClickEdit}
        onClickDelete={onClickDelete}
      />
    );
  });

  test('should call onClickEdit with record', async () => {
    userEvent.click(screen.getByText('Edit'));
    await waitFor(() => expect(onClickEdit).toHaveBeenCalledWith(record));
  });

  test('should call onClickDelete with record', async () => {
    userEvent.click(screen.getByText('Delete'));
    await waitFor(() => expect(onClickDelete).toHaveBeenCalledWith(record));
  });
});
