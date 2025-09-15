import React from 'react';
import { StyleSheet, View } from 'react-native';
import CartItemList from '../CartItemList';

const Cart = () => {
  return (
    <View style={styles.container}>
      <CartItemList />
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
