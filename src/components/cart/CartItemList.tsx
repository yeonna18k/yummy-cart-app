import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { colors } from '../../constants/colors';
import { useCart } from '../../hooks/useCart';
import { useProductNavigation } from '../../hooks/useProductNavigation';
import CartItem from './CartItem';

const CartItemList = () => {
  const { items, clearCart } = useCart();
  const { navigateToProductDetail } = useProductNavigation();

  const handleClearCart = () => {
    clearCart();
  };

  return (
    <View style={styles.container}>
      <View style={styles.cartLabelContainer}>
        <Text style={styles.cartLabel}>장바구니 목록</Text>
        <TouchableOpacity onPress={handleClearCart}>
          <Text style={styles.clearText}>전체 삭제</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={items}
        renderItem={({ item }) => (
          <CartItem item={item} onPress={navigateToProductDetail} />
        )}
      />
    </View>
  );
};

export default CartItemList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  cartLabelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  cartLabel: {
    fontSize: 20,
  },
  clearText: {
    color: colors.primary,
  },
});
