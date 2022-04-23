import { ProductResponse } from './productResponse';

export interface Product {
  id: string;
  color: string;
  department: string;
  price: string;
  productType: string;
  productAdjective: string;
  productDescription: string;
  productMaterial: string;
  productName: string;
  productDate: string;
  contractDate: string;
}

export const toProduct = (o: ProductResponse): Product => ({
  id: o.id,
  color: o.color,
  department: o.department,
  price: o.price,
  productType: o.product.type,
  productAdjective: o.product ? o.product.adjective : '',
  productDescription: o.product ? o.product.description : '',
  productMaterial: o.product ? o.product.material : '',
  productName: o.product ? o.product.name : '',
  productDate: o.product ? o.product.date : '',
  contractDate: o.contractDate,
});
