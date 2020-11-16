import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddElement from './AddElement';

describe('AddElement component', () => {
  const onClick = jest.fn();
  test('should render the text', () => {
    render(<AddElement text="Add an employee" onClick={onClick} />);
    expect(screen.getByText('Add an employee')).toBeInTheDocument();
  });
  test('should call onClick', () => {
    render(<AddElement text="Add an employee" onClick={onClick} />);
    userEvent.click(screen.getByText('Add an employee'));
    expect(onClick).toHaveBeenCalled();
  });
});
