import { authHandlers } from './features/auth/handlers';
import { productsHandlers, productsTestHandlers } from './features/products/handlers';

export const handlers = [...authHandlers, ...productsHandlers];

export const testHandlers = [...productsTestHandlers];
