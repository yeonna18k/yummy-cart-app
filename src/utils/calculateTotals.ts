import { CartItem } from '../types/cartTypes';

export const calculateTotals = (items: CartItem[]) => {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const originalTotalPrice = items.reduce(
    (sum, item) => sum + item.originalPrice * item.quantity,
    0,
  );
  const totalPrice = items.reduce(
    (sum, item) => sum + item.salePrice * item.quantity,
    0,
  );
  return { totalItems, originalTotalPrice, totalPrice };
};
