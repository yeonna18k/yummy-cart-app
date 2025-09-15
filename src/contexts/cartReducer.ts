import { CartItem, CartState } from '../types/cartTypes';
import { calculateTotals } from '../utils/calculateTotals';

type CartAction =
  | { type: 'ADD_TO_CART'; payload: CartItem }
  | { type: 'REMOVE_FROM_CART'; payload: { id: number } }
  | { type: 'UPDATE_QUANTITY'; payload: { id: number; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: CartItem[] };

export const initialState: CartState = {
  items: [],
  totalItems: 0,
  originalTotalPrice: 0,
  totalPrice: 0,
};

export const cartReducer = (
  state: CartState,
  action: CartAction,
): CartState => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItem = state.items.find(
        item => item.id === action.payload.id,
      );

      let newItems: CartItem[];
      if (existingItem) {
        newItems = state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item,
        );
      } else {
        newItems = [...state.items, { ...action.payload }];
      }

      const { totalItems, originalTotalPrice, totalPrice } =
        calculateTotals(newItems);
      return { items: newItems, originalTotalPrice, totalItems, totalPrice };
    }

    case 'REMOVE_FROM_CART': {
      const newItems = state.items.filter(
        item => item.id !== action.payload.id,
      );
      const { totalItems, originalTotalPrice, totalPrice } =
        calculateTotals(newItems);
      return { items: newItems, originalTotalPrice, totalItems, totalPrice };
    }

    case 'UPDATE_QUANTITY': {
      if (action.payload.quantity <= 0) {
        const newItems = state.items.filter(
          item => item.id !== action.payload.id,
        );
        const { totalItems, originalTotalPrice, totalPrice } =
          calculateTotals(newItems);
        return { items: newItems, originalTotalPrice, totalItems, totalPrice };
      }

      const newItems = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item,
      );
      const { totalItems, originalTotalPrice, totalPrice } =
        calculateTotals(newItems);
      return { items: newItems, originalTotalPrice, totalItems, totalPrice };
    }

    case 'CLEAR_CART': {
      return initialState;
    }

    case 'LOAD_CART': {
      const { totalItems, originalTotalPrice, totalPrice } = calculateTotals(
        action.payload,
      );
      return {
        items: action.payload,
        originalTotalPrice,
        totalItems,
        totalPrice,
      };
    }

    default:
      return state;
  }
};
