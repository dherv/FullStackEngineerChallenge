import { rest } from 'msw';

const url = 'http://localhost:7000/api';

export const handlers = [
  rest.get(`${url}/reviews`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          id: 1,
          employeeId: 1,
          pending: true,
          reviewerId: 2,
          text: 'test review',
          reviewer: {
            id: 2,
            name: 'employee_2',
            department: 'IT',
            position: 'Frontend',
          },
          employee: {
            id: 1,
            name: 'employee_1',
            department: 'IT',
            position: 'Frontend',
          },
        },
        {
          id: 1,
          employeeId: 1,
          pending: true,
          reviewerId: 2,
          text: null,
          reviewer: {
            id: 2,
            name: 'employee_2',
            department: 'IT',
            position: 'Frontend',
          },
          employee: {
            id: 1,
            name: 'employee_1',
            department: 'IT',
            position: 'Frontend',
          },
        },
      ])
    );
  }),
  rest.get(`${url}/employees`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          id: 1,
          name: 'employee',
          department: 'IT',
          position: 'Frontend',
        },
      ])
    );
  }),

  rest.put(`${url}/employees`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          id: 1,
          name: 'employee',
          department: 'IT',
          position: 'Frontend',
        },
      ])
    );
  }),
];
