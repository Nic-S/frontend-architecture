export interface ProductResponse {
  id: string;
  color: string;
  department: string;
  price: string;
  contractDate: string;
  product: { type: string; adjective: string; description: string; material: string; name: string; date: string };
}
