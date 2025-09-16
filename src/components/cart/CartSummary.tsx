import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useCart } from '../../hooks/useCart';

const CartSummary = () => {
  const { originalTotalPrice, totalPrice } = useCart();
  const savings = originalTotalPrice - totalPrice;
  return (
    <View style={styles.container}>
      <View style={styles.priceInfo}>
        {savings > 0 && (
          <View style={styles.priceRow}>
            <Text style={styles.originalPriceLabel}>주문금액</Text>
            <Text style={styles.originalPriceValue}>
              {originalTotalPrice.toLocaleString()}원
            </Text>
          </View>
        )}

        {savings > 0 && (
          <View style={styles.priceRow}>
            <Text style={styles.savingsLabel}>할인</Text>
            <Text style={styles.savingsValue}>
              -{savings.toLocaleString()}원
            </Text>
          </View>
        )}

        <View style={[styles.priceRow, styles.totalRow]}>
          <Text style={styles.totalLabel}>총 결제금액</Text>
          <Text style={styles.totalValue}>{totalPrice.toLocaleString()}원</Text>
        </View>
      </View>
    </View>
  );
};

export default CartSummary;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
  },
  priceInfo: {
    marginBottom: 70,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  originalPriceLabel: {
    fontSize: 14,
    color: '#666666',
  },
  originalPriceValue: {
    fontSize: 14,
    color: '#666666',
  },
  savingsLabel: {
    fontSize: 14,
    color: '#ff4444',
  },
  savingsValue: {
    fontSize: 14,
    color: '#ff4444',
    fontWeight: 'bold',
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 12,
    marginTop: 8,
    marginBottom: 0,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
});
