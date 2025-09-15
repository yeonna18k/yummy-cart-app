export interface Product {
  id: number;
  name: string;
  originalPrice: number;
  discountRate: number;
  salePrice: number;
  image: string;
  description: string;
}

export type ProductsResponse = Product[];
