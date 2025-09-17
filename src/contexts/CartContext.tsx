import { createContext, ReactNode, useEffect, useReducer } from 'react';
import { cartStorage } from '../services/storage';
import { CartItem, CartState } from '../types/cartTypes';
import { cartReducer, initialState } from './cartReducer';

export interface CartContextType extends CartState {
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
}

export const CartContext = createContext<CartContextType | undefined>(
  undefined,
);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const loadCartFromStorage = async () => {
    const cartItems = await cartStorage.loadCart();
    if (cartItems.length > 0) {
      dispatch({ type: 'LOAD_CART', payload: cartItems });
    }
  };

  useEffect(() => {
    loadCartFromStorage();
  }, []);

  useEffect(() => {
    cartStorage.saveCart(state.items);
  }, [state.items]);

  const addToCart = (item: CartItem) => {
    dispatch({ type: 'ADD_TO_CART', payload: item });
  };

  const removeFromCart = (id: number) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: { id } });
  };

  const updateQuantity = (id: number, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const clearCart = async () => {
    dispatch({ type: 'CLEAR_CART' });
    await cartStorage.clearCart();
  };

  const value: CartContextType = {
    ...state,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
