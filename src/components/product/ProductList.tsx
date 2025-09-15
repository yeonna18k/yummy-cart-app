import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { mockApi } from '../../services/mockApi';
import { Product } from '../../types/Product';
import ProductCard from './ProductCard';

type ProductListNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ProductList'
>;

const ProductList = () => {
  // 비즈니스 로직 및 상태 관리
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const navigation = useNavigation<ProductListNavigationProp>();

  const loadProducts = useCallback(async (page = 1, isRefresh = false) => {
    if (page === 1) {
      setIsLoading(true);
    } else {
      setIsLoadingMore(true);
    }

    try {
      const response = await mockApi.getProducts(page, 10);

      if (isRefresh || page === 1) {
        setProducts(response.data);
      } else {
        setProducts(prev => [...prev, ...response.data]);
      }
      setHasMore(response.hasMore);
      setCurrentPage(page);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setIsLoadingMore(false);
      setIsLoading(false);
    }
  }, []);

  const loadMoreProducts = useCallback(() => {
    if (hasMore && !isLoadingMore) {
      loadProducts(currentPage + 1);
    }
  }, [hasMore, isLoadingMore, currentPage, loadProducts]);

  const handleRefresh = useCallback(() => {
    loadProducts(1, true);
    setHasMore(true);
    setCurrentPage(1);
  }, [loadProducts]);

  const handleProductPress = useCallback(
    (productId: number) => {
      navigation.navigate('ProductDetail', { productId });
    },
    [navigation],
  );

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const renderItem = useCallback(
    ({ item }: { item: Product }) => (
      <ProductCard product={item} onPress={handleProductPress} />
    ),
    [handleProductPress],
  );

  const renderFooter = () => {
    if (!isLoadingMore) return null;
    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="small" color="#007AFF" />
        <Text>더 많은 상품을 불러오는 중입니다</Text>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        onEndReached={loadMoreProducts}
        onEndReachedThreshold={0.1}
        refreshing={isLoading && currentPage === 1}
        onRefresh={handleRefresh}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
};

export default ProductList;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  footerLoader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 20,
  },
});
