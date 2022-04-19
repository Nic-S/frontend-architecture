import { authHandlers } from './features/auth/handlers';
import { productsHandlers } from './features/products/handlers';

export const handlers = [...authHandlers, ...productsHandlers];
