import { rest } from 'msw';
import {
  employee_1,
  employee_2,
  employee_create,
  employee_edit,
  review_1,
  review_2,
} from './samples';

const url = 'http://localhost:7000/api';

export const handlers = [
  rest.get(`${url}/reviews`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json([review_1, review_2]));
  }),
  rest.get(`${url}/employees`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json([employee_1, employee_2]));
  }),
  rest.post(`${url}/employees`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(employee_create));
  }),
  rest.put(`${url}/employees/1`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(employee_edit));
  }),

  rest.put(`${url}/reviews/1`, (req, res, ctx) => {
    const text = 'my review';
    return res(ctx.status(200), ctx.json({ ...review_1, text }));
  }),

  rest.put(`${url}/reviews/2`, (req, res, ctx) => {
    const text = 'edit review';
    return res(ctx.status(200), ctx.json({ ...review_2, text: text }));
  }),
];
