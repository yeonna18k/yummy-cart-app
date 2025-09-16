import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../../constants/colors';

interface AddToCartButtonProps {
  quantity: number;
  salePrice: number | undefined;
  onAddToCart: () => void;
}

const AddToCartButton = ({
  quantity,
  salePrice,
  onAddToCart,
}: AddToCartButtonProps) => {
  return (
    <View style={styles.bottomButtonContainer}>
      <TouchableOpacity style={styles.addToCartButton} onPress={onAddToCart}>
        <Text style={styles.addToCartButtonText}>
          {quantity}건 | {salePrice && (salePrice * quantity).toLocaleString()}
          원 장바구니 담기
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddToCartButton;

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
  addToCartButton: {
    backgroundColor: colors.primary,
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addToCartButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
