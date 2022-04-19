// eslint-disable-next-line import/no-extraneous-dependencies
import { rest } from 'msw';
import { API_URL } from '../../../constants';
import { ROLES, UserResponse } from '../../../features/auth/model/userResponse';
import { getJwtToken } from '../../../core/services/webStorageService';

const AUTH_URL = `${API_URL}/auth`;

export const authHandlers = [
  rest.post(`${AUTH_URL}/get-token`, (req, res, ctx) => {
    return res(
      // Respond with a 200 status code
      ctx.status(200),
      ctx.json({
        access_token:
          'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY1MDA1NjExMiwiaWF0IjoxNjUwMDU2MTEyfQ.WWCqTVIsvkaZksK_wusLh7qyH8Z_itBnb5n-McCkX5A',
      })
    );
  }),

  rest.get(`${AUTH_URL}/me`, (req, res, ctx) => {
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

    // If authenticated, return a mocked user details
    return res(
      ctx.status(200),
      ctx.json<UserResponse>({ email: 'test@test.it', familyName: 'Rossi', firstName: 'Mario', roles: [ROLES.ADMIN] })
    );
  }),
  rest.get(`${AUTH_URL}/refresh-token`, (req, res, ctx) => {
    // Check if the user is authenticated in this session (not real check)
    if (!getJwtToken()) {
      // If not authenticated, respond with a 403 error
      return res(
        ctx.status(403),
        ctx.json({
          errorMessage: 'Not authorized',
        })
      );
    }

    return res(
      // Respond with a 200 status code
      ctx.status(200),
      ctx.json({
        access_token:
          'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY1MDA1NjExMiwiaWF0IjoxNjUwMDU2MTEyfQ.WWCqTVIsvkaZksK_wusLh7qyH8Z_itBnb5n-McCkX5A',
      })
    );
  }),
];

export default authHandlers;
