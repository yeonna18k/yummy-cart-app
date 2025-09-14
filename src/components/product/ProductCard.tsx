import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface ProductCardProps {
  product: any;
  onPress: (productId: number) => void;
}

const ProductCard = ({ product, onPress }: ProductCardProps) => {
  // UI만 담당
  return (
    <TouchableOpacity onPress={() => onPress(product.id)} style={styles.card}>
      <Image source={{ uri: product.image }} style={styles.cardImage} />
      <View>
        <Text style={styles.cardTitle}>{product.name}</Text>
        <Text style={styles.cardPrice}>{product.price}원</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 30,
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  cardImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
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
