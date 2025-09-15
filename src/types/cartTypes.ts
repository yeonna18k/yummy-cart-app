export interface CartItem {
  id: number;
  name: string;
  originalPrice: number;
  discountRate: number;
  salePrice: number;
  image: string;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  totalItems: number;
  originalTotalPrice: number;
  totalPrice: number;
}
