import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../../constants/colors';
import { useCart } from '../../hooks/useCart';

const CheckoutButton = () => {
  const { originalTotalPrice, totalPrice } = useCart();

  const handlePayment = () => {
    console.log('결제하기');
  };
  return (
    <View style={styles.bottomButtonContainer}>
      <TouchableOpacity style={styles.checkoutButton} onPress={handlePayment}>
        <Text style={styles.originalPriceText}>
          {originalTotalPrice.toLocaleString()}원
        </Text>
        <Text style={styles.checkoutButtonText}>
          {totalPrice.toLocaleString()}원 결제하기
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CheckoutButton;

const styles = StyleSheet.create({
  bottomButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  checkoutButton: {
    backgroundColor: colors.primary,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  originalPriceText: {
    textDecorationLine: 'line-through',
    marginRight: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ddd',
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
