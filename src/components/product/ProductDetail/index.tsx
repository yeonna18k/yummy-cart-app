import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Iconicons from 'react-native-vector-icons/Ionicons';
import { colors } from '../../../constants/colors';
import { useCart } from '../../../hooks/useCart';
import { RootStackParamList } from '../../../navigation/AppNavigator';
import { mockApi } from '../../../services/mockApi';
import { Product } from '../../../types/Product';
import ErrorView from '../../common/ErrorView';
import LoadingView from '../../common/LoadingView';
import { styles } from './styles';

type ProductDetailRouteProp = RouteProp<RootStackParamList, 'ProductDetail'>;

const ProductDetail = () => {
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

  const increaseQuantity = () => setQuantity(prev => prev + 1);
  const decreaseQuantity = () => {
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
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: product?.image }}
              style={styles.productImage}
            />
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
                    <Iconicons
                      name="pricetag"
                      size={14}
                      color={colors.primary}
                    />
                  </Text>
                </View>
                <Text style={styles.productPrice}>
                  {product?.salePrice.toLocaleString()}원
                </Text>
              </View>
            </View>
            <Text style={styles.productDescription}>
              {product?.description}
            </Text>
          </View>

          <View style={styles.quantityContainer}>
            <Text style={styles.quantityLabel}>수량</Text>
            <View style={styles.quantitySelector}>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={decreaseQuantity}
              >
                <Text style={styles.quantityButtonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantityText}>{quantity}</Text>
              <TouchableOpacity style={styles.quantityButton}>
                <Text
                  style={styles.quantityButtonText}
                  onPress={increaseQuantity}
                >
                  +
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.bottomSpacing} />
        </ScrollView>

        <View style={styles.bottomButtonContainer}>
          <TouchableOpacity
            style={styles.addToCartButton}
            onPress={handleAddToCart}
          >
            <Text style={styles.addToCartButtonText}>
              {quantity}건 |{' '}
              {product?.salePrice &&
                (product?.salePrice * quantity).toLocaleString()}
              원 장바구니 담기
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default ProductDetail;
