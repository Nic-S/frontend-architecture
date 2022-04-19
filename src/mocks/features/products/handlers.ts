// eslint-disable-next-line import/no-extraneous-dependencies
import { rest } from 'msw';
// eslint-disable-next-line import/no-extraneous-dependencies
import faker from '@faker-js/faker';
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
    for (let i = 0; i < 100; i++) {
      response.push({
        id: faker.datatype.uuid(),
        color: faker.commerce.color(),
        price: faker.commerce.price(),
        department: faker.commerce.department(),
        product: {
          adjective: faker.commerce.productAdjective(),
          description: faker.commerce.productDescription(),
          material: faker.commerce.productMaterial(),
          name: faker.commerce.productName(),
          type: faker.commerce.product(),
        },
      });
    }

    // If authenticated, return a mocked user details
    return res(ctx.status(200), ctx.json<ProductResponse[]>(response));
  }),
];
