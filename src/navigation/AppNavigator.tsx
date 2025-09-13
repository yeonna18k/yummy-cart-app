import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CartScreen from '../screens/CartScreen';

export type RootStackParamList = {
  ProductList: undefined;
  ProductDetail: { productId: number };
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

const ProductListScreen = () => (
  <View style={styles.screen}>
    <Text style={styles.title}>상품 목록</Text>
    <Text>여기에 상품들이 표시됩니다</Text>
  </View>
);

const ProductDetailScreen = () => (
  <View style={styles.screen}>
    <Text style={styles.title}>상품 상세</Text>
    <Text>여기에 상품 상세정보가 표시됩니다</Text>
  </View>
);

const ProductStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProductList"
        component={ProductListScreen}
        options={{ title: '야미 마켓' }}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={{ title: '상품 상세' }}
      />
    </Stack.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Products"
          component={ProductStack}
          options={{ headerShown: false, title: '상품' }}
        />
        <Tab.Screen
          name="Cart"
          component={CartScreen}
          options={{ title: '장바구니' }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default AppNavigator;
