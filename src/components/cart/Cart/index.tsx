import React from 'react';
import { StyleSheet, View } from 'react-native';
import CartItemList from '../CartItemList';
import CartSummary from '../CartSummary';
import CheckoutButton from '../CheckoutButton';

const Cart = () => {
  return (
    <View style={styles.container}>
      <CartItemList />
      <CartSummary />
      <CheckoutButton />
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
