import { API_URL } from '../../../constants';

const PRODUCTS_URL = `${API_URL}/products`;

const paths = {
  getProducts: (): string => `${PRODUCTS_URL}/`,
};

export default paths;
