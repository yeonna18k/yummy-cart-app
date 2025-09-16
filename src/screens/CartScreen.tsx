import { StyleSheet, View } from 'react-native';
import CartItemList from '../components/cart/CartItemList';
import CartSummary from '../components/cart/CartSummary';
import CheckoutButton from '../components/cart/CheckoutButton';
import EmptyCartView from '../components/cart/EmptyCartView';
import { useCart } from '../hooks/useCart';

const CartScreen = () => {
  const { items } = useCart();

  if (items.length === 0) {
    return <EmptyCartView />;
  }

  return (
    <View style={styles.container}>
      <CartItemList />
      <CartSummary />
      <CheckoutButton />
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
