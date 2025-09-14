export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  stock: number;
  rating: number;
  unit: string;
}

export interface ProductsResponse {
  products: Product[];
}
