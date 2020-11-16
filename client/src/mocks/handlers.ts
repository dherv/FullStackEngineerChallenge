import { rest } from 'msw';
import { employee_1, review_1, review_2 } from './samples';

const url = 'http://localhost:7000/api';

export const handlers = [
  rest.get(`${url}/reviews`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json([review_1, review_2]));
  }),
  rest.get(`${url}/employees`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json([employee_1]));
  }),

  rest.put(`${url}/employees`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json([employee_1]));
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
