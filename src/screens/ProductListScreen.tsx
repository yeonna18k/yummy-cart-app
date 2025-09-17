import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import ErrorView from '../components/common/ErrorView';
import LoadingView from '../components/common/LoadingView';
import ProductCard from '../components/product/ProductCard';
import { colors } from '../constants/colors';
import { useProductNavigation } from '../hooks/useProductNavigation';
import { mockApi } from '../services/mockApi';
import { Product } from '../types/productTypes';

const ProductListScreen = () => {
  const { navigateToProductDetail } = useProductNavigation();

  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isError, setIsError] = useState(false);

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
      setIsError(true);
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

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const renderItem = useCallback(
    ({ item }: { item: Product }) => (
      <ProductCard product={item} onPress={navigateToProductDetail} />
    ),
    [navigateToProductDetail],
  );

  const renderFooter = () => {
    if (!isLoadingMore) return null;
    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="small" color={colors.primary} />
        <Text>더 많은 상품을 불러오는 중입니다</Text>
      </View>
    );
  };

  if (isLoading) {
    return <LoadingView message="상품 정보를 불러오는 중..." />;
  }

  if (isError || !products) {
    return <ErrorView title="상품을 불러올 수 없어요" onRetry={loadProducts} />;
  }

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

export default ProductListScreen;

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
