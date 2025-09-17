import AsyncStorage from '@react-native-async-storage/async-storage';
import { CartItem } from '../types/cartTypes';

const CART_STORAGE_KEY = '@cart_items';

export const cartStorage = {
  async loadCart(): Promise<CartItem[]> {
    try {
      const cartData = await AsyncStorage.getItem(CART_STORAGE_KEY);
      return cartData ? JSON.parse(cartData) : [];
    } catch (err) {
      console.error('장바구니 데이터 로드 실패: ', err);
      return [];
    }
  },

  async saveCart(items: CartItem[]) {
    try {
      await AsyncStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (err) {
      console.error('장바구니 데이터 저장 실패: ', err);
    }
  },

  async clearCart() {
    try {
      await AsyncStorage.removeItem(CART_STORAGE_KEY);
    } catch (err) {
      console.error('장바구니 데이터 삭제 실패: ', err);
    }
  },
};
