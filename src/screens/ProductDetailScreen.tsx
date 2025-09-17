import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import ErrorView from '../components/common/ErrorView';
import LoadingView from '../components/common/LoadingView';
import AddToCartButton from '../components/product/AddToCartButton';
import ProductDetailInfo from '../components/product/ProductDetailInfo';
import ProductQuantitySelector from '../components/product/ProductQuantitySelector';
import { useCart } from '../hooks/useCart';
import { RootStackParamList } from '../navigation/AppNavigator';
import { mockApi } from '../services/mockApi';
import { Product } from '../types/productTypes';

type ProductDetailRouteProp = RouteProp<RootStackParamList, 'ProductDetail'>;

const ProductDetailScreen = () => {
  const route = useRoute<ProductDetailRouteProp>();
  const { productId } = route.params;
  const { addToCart } = useCart();
  const navigation = useNavigation();

  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const loadProductDetail = async () => {
    try {
      setIsLoading(true);
      const productData = await mockApi.getProductById(productId);

      if (productData) {
        setProduct(productData);
        setIsError(false);
      } else {
        setIsError(true);
      }
    } catch (err) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleIncreaseQuantity = () => {
    if (quantity < 100) setQuantity(prev => prev + 1);
  };
  const handleDecreaseQuantity = () => {
    if (quantity > 1) setQuantity(prev => prev - 1);
  };

  const handleAddToCart = () => {
    const newItem = {
      id: product?.id!,
      name: product?.name!,
      originalPrice: product?.originalPrice!,
      discountRate: product?.discountRate!,
      salePrice: product?.salePrice!,
      image: product?.image!,
      quantity: quantity,
    };
    addToCart(newItem);
    navigation.goBack();
  };

  useEffect(() => {
    loadProductDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  if (isLoading) {
    return <LoadingView message="상품 정보를 불러오는 중..." />;
  }

  if (isError || !product) {
    return (
      <ErrorView title="상품을 불러올 수 없어요" onRetry={loadProductDetail} />
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <ProductDetailInfo product={product} />

          <ProductQuantitySelector
            quantity={quantity}
            onIncreaseQuantity={handleIncreaseQuantity}
            onDecreaseQuantity={handleDecreaseQuantity}
            minQuantity={1}
            maxQuantity={100}
          />

          <View style={styles.bottomSpacing} />
        </ScrollView>

        <AddToCartButton
          quantity={quantity}
          salePrice={product.salePrice}
          onAddToCart={handleAddToCart}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default ProductDetailScreen;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },

  bottomSpacing: {
    height: 100,
  },
});
