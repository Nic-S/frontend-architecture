import { API_URL } from '../../../constants';

const PRODUCTS_URL = `${API_URL}/products`;

const paths = {
  getProducts: (): string => `${PRODUCTS_URL}/`,
  changeDate: (id: string): string => `${PRODUCTS_URL}/${id}`,
};

export default paths;
