import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { testHandlers } from './handlers';

const testServer = setupServer(...testHandlers);

export { testServer, rest };
