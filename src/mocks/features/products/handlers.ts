import { rest } from 'msw';
import faker from '@faker-js/faker';
import formatISO from 'date-fns/formatISO';
import { API_URL } from '../../../constants';
import { getJwtToken } from '../../../core/services/webStorageService';
import { ProductResponse } from '../../../features/products/models/productResponse';

const PRODUCTS_URL = `${API_URL}/products`;

export const productsHandlers = [
  rest.get(`${PRODUCTS_URL}/`, (req, res, ctx) => {
    // Check if the user is authenticated in this session
    if (!getJwtToken()) {
      // If not authenticated, respond with a 403 error
      return res(
        ctx.status(403),
        ctx.json({
          errorMessage: 'Not authorized',
        })
      );
    }

    const response: ProductResponse[] = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < 10000; i++) {
      response.push({
        id: faker.datatype.uuid(),
        color: faker.commerce.color(),
        price: faker.commerce.price(),
        department: faker.commerce.department(),
        contractDate: formatISO(faker.date.recent(), { representation: 'date' }),
        product: {
          adjective: faker.commerce.productAdjective(),
          description: faker.commerce.productDescription(),
          material: faker.commerce.productMaterial(),
          name: faker.commerce.productName(),
          type: faker.commerce.product(),
          date: formatISO(faker.date.recent(), { representation: 'date' }),
        },
      });
    }

    // If authenticated, return a mocked user details
    return res(ctx.status(200), ctx.json<ProductResponse[]>(response));
  }),
  rest.put(`${PRODUCTS_URL}/:id`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(req.body));
  }),
];

export const productsTestHandlers = [
  rest.get(`${PRODUCTS_URL}/`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json<ProductResponse[]>([
        {
          id: '123',
          color: 'Red',
          price: '1',
          department: 'department',
          contractDate: '10-10-2022T00:00Z',
          product: {
            adjective: 'adjective',
            description: 'description',
            material: 'material',
            name: 'name',
            type: 'type',
            date: '11-11-2023T00:00Z',
          },
        },
      ])
    );
  }),
  rest.put(`${PRODUCTS_URL}/:id`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(req.body));
  }),
];
