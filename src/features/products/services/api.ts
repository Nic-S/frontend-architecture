import axios from 'axios';
import paths from '../utils/paths';
import { ProductResponse } from '../models/productResponse';
import { Product, toProduct } from '../models/product';

const api = {
  getProducts: async (): Promise<Product[]> => {
    const response = await axios.get<ProductResponse[]>(paths.getProducts());
    return response.data.map(toProduct);
  },
};

export default api;
