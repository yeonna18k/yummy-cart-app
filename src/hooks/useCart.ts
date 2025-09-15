import { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart는 CartProvider 내부에서 사용해야 합니다.');
  }
  return context;
};
