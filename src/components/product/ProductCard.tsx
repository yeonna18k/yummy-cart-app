import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Product } from '../../types/Product';

interface ProductCardProps {
  product: Product;
  onPress: (productId: number) => void;
}

const ProductCard = ({ product, onPress }: ProductCardProps) => {
  // UI만 담당
  return (
    <TouchableOpacity
      onPress={() => onPress(product.id)}
      style={styles.container}
    >
      <View style={styles.cardImageContainer}>
        <Image source={{ uri: product.image }} style={styles.cardImage} />
      </View>
      <View>
        <Text style={styles.cardTitle}>{product.name}</Text>
        <Text style={styles.cardPrice}>
          {product.salePrice.toLocaleString()}원
        </Text>
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
    borderRadius: 8,
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardPrice: {
    fontSize: 16,
  },
});
