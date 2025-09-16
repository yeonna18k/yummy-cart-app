import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { CartTabIcon, ProductTabIcon } from '../components/icons/TabIcons';
import { colors } from '../constants/colors';
import CartScreen from '../screens/CartScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import ProductListScreen from '../screens/ProductListScreen';

export type RootStackParamList = {
  ProductList: undefined;
  ProductDetail: { productId: number };
  Cart: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

const ProductStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{ contentStyle: { backgroundColor: '#ffffff' } }}
    >
      <Stack.Screen
        name="ProductList"
        component={ProductListScreen}
        options={{ title: '야미 마켓' }}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={{ title: '메뉴 상세' }}
      />
    </Stack.Navigator>
  );
};

const CartStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{ contentStyle: { backgroundColor: '#ffffff' } }}
    >
      <Stack.Screen
        name="Cart"
        component={CartScreen}
        options={{ title: '장바구니' }}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={{ title: '메뉴 상세' }}
      />
    </Stack.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{ tabBarStyle: { backgroundColor: '#ffffff' } }}
      >
        <Tab.Screen
          name="ProductsTab"
          component={ProductStack}
          options={{
            headerShown: false,
            title: '메뉴',
            tabBarIcon: ProductTabIcon,
            tabBarActiveTintColor: colors.primary,
          }}
        />
        <Tab.Screen
          name="CartTab"
          component={CartStack}
          options={{
            headerShown: false,
            title: '장바구니',
            tabBarIcon: CartTabIcon,
            tabBarActiveTintColor: colors.primary,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
