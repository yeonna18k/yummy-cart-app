import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useCart } from '../../hooks/useCart';
import { useProductNavigation } from '../../hooks/useProductNavigation';
import CartItem from './CartItem';

const CartItemList = () => {
  const { items } = useCart();
  const { navigateToProductDetail } = useProductNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.cartLabel}>장바구니 목록</Text>
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
  cartLabel: {
    fontSize: 20,
  },
});
