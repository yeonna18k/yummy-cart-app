import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Iconicons from 'react-native-vector-icons/Ionicons';
import { colors } from '../../constants/colors';
import { Product } from '../../types/productTypes';

const ProductDetailInfo = ({ product }: { product: Product }) => {
  return (
    <View>
      <View style={styles.imageContainer}>
        <Image source={{ uri: product?.image }} style={styles.productImage} />
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.titlePriceContainer}>
          <Text style={styles.productName}>{product?.name}</Text>
          <View style={styles.productPriceContainer}>
            <View style={styles.originalPriceContainer}>
              <Text style={styles.productOriginalPrice}>
                {product.originalPrice}원
              </Text>
              <Text style={styles.productDiscountRate}>
                {product.discountRate * 100}% 할인
                <Iconicons name="pricetag" size={14} color={colors.primary} />
              </Text>
            </View>
            <Text style={styles.productPrice}>
              {product?.salePrice.toLocaleString()}원
            </Text>
          </View>
        </View>
        <Text style={styles.productDescription}>{product?.description}</Text>
      </View>
    </View>
  );
};

export default ProductDetailInfo;

const styles = StyleSheet.create({
  imageContainer: {
    width: '100%',
    height: 300,
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  infoContainer: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  titlePriceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  productPriceContainer: {
    alignItems: 'flex-end',
  },
  originalPriceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  productOriginalPrice: {
    textDecorationLine: 'line-through',
    color: '#bbb',
  },
  productDiscountRate: {
    color: colors.primary,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 20,
    fontWeight: 600,
  },
  productDescription: {
    fontSize: 16,
    lineHeight: 24,
    color: '#555',
  },
});
