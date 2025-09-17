import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../../constants/colors';
import { Product } from '../../types/productTypes';

interface ProductCardProps {
  product: Product;
  onPress: (productId: number) => void;
}

const ProductCard = ({ product, onPress }: ProductCardProps) => {
  return (
    <TouchableOpacity
      onPress={() => onPress(product.id)}
      style={styles.container}
    >
      <View style={styles.cardImageContainer}>
        <Image source={{ uri: product.image }} style={styles.cardImage} />
      </View>
      <View>
        <Text style={styles.cardProductName}>{product.name}</Text>
        <View style={styles.cardPriceContainer}>
          <Text style={styles.cardPrice}>
            {product.salePrice.toLocaleString()}원
          </Text>
          <Text style={styles.cardDiscountRate}>
            ({product.discountRate * 100}% 할인)
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 30,
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  cardImageContainer: {
    width: 80,
    height: 80,
  },
  cardImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  cardProductName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardPriceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  cardPrice: {
    fontSize: 16,
  },
  cardDiscountRate: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.primary,
  },
});
