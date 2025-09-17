import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useCallback } from 'react';
import { RootStackParamList } from '../types/navigationTypes';

type ProductListNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const useProductNavigation = () => {
  const navigation = useNavigation<ProductListNavigationProp>();

  const navigateToProductDetail = useCallback(
    (productId: number) => {
      navigation.navigate('ProductDetail', { productId });
    },
    [navigation],
  );
  return { navigateToProductDetail };
};
