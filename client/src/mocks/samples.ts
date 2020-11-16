import { IEmployee, IReview } from '../types/app.types';

export const employee_1: IEmployee = {
  id: 1,
  name: 'employee_1',
  department: 'IT',
  position: 'Frontend',
};

export const employee_2: IEmployee = {
  id: 2,
  name: 'employee_2',
  department: 'IT',
  position: 'Backend',
};

export const employee_create: IEmployee = {
  id: 3,
  name: 'Damien',
  department: 'IT',
  position: 'Frontend',
};

export const employee_edit: IEmployee = {
  id: 1,
  name: 'employee_1',
  department: 'Design',
  position: 'Designer',
};

export const review_1: IReview = {
  id: 1,
  employeeId: 1,
  pending: true,
  reviewerId: 2,
  text: null,
  reviewer: employee_2,
  employee: employee_1,
};

export const review_2: IReview = {
  id: 2,
  employeeId: 1,
  pending: false,
  reviewerId: 2,
  text: 'test review',
  reviewer: employee_2,
  employee: employee_1,
};
