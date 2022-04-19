import { GridColDef } from '@mui/x-data-grid';
import { ProductResponse } from './productResponse';

export interface Product {
  id: string;
  color: string;
  department: string;
  price: string;
  product: string;
  productAdjective: string;
  productDescription: string;
  productMaterial: string;
  productName: string;
}

export const toProduct = (o: ProductResponse): Product => ({
  id: o.id,
  color: o.color,
  department: o.department,
  price: o.price,
  product: o.product.type,
  productAdjective: o.product ? o.product.adjective : '',
  productDescription: o.product ? o.product.description : '',
  productMaterial: o.product ? o.product.material : '',
  productName: o.product ? o.product.material : '',
});

export const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'color',
    headerName: 'Color',
    width: 150,
    editable: true,
  },
  {
    field: 'department',
    headerName: 'department',
    width: 150,
    editable: true,
  },
  {
    field: 'price',
    headerName: 'price',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'product',
    headerName: 'product',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
  },
  {
    field: 'productAdjective',
    headerName: 'product Adjective',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
  },
  {
    field: 'productDescription',
    headerName: 'product Description',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
  },
  {
    field: 'productMaterial',
    headerName: 'product Material',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
  },
  {
    field: 'productName',
    headerName: 'product Name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
  },
];
