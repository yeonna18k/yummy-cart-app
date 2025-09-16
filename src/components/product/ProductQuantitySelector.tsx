import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../../constants/colors';

interface ProductQuantitySelectorProps {
  quantity: number;
  onIncreaseQuantity: () => void;
  onDecreaseQuantity: () => void;
  minQuantity?: number;
  maxQuantity?: number;
}

const ProductQuantitySelector = ({
  quantity,
  onIncreaseQuantity,
  onDecreaseQuantity,
  minQuantity = 1,
  maxQuantity = 100,
}: ProductQuantitySelectorProps) => {
  const isDecreaseDisabled = quantity <= minQuantity;
  const isIncreaseDisabled = quantity >= maxQuantity;

  return (
    <View style={styles.quantityContainer}>
      <Text style={styles.quantityLabel}>수량</Text>
      <View style={styles.quantitySelector}>
        <TouchableOpacity
          style={[
            styles.quantityButton,
            isDecreaseDisabled && styles.disabledButton,
          ]}
          onPress={onDecreaseQuantity}
          disabled={isDecreaseDisabled}
        >
          <Text style={styles.quantityButtonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantityText}>{quantity}</Text>
        <TouchableOpacity
          style={[
            styles.quantityButton,
            isIncreaseDisabled && styles.disabledButton,
          ]}
          onPress={onIncreaseQuantity}
          disabled={isIncreaseDisabled}
        >
          <Text style={styles.quantityButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductQuantitySelector;

const styles = StyleSheet.create({
  quantityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  quantityLabel: {
    fontSize: 18,
    fontWeight: 600,
  },
  quantitySelector: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  quantityButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primaryBackground,
    borderRadius: 20,
  },
  quantityButtonText: {
    fontSize: 32,
    lineHeight: 32,
  },
  quantityText: {
    fontSize: 18,
    fontWeight: 600,
  },
  disabledButton: {
    backgroundColor: '#eee',
  },
});
