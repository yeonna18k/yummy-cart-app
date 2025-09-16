import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

interface TabIconProps {
  focused: boolean;
  color: string;
  size: number;
}

export const ProductTabIcon = ({ focused, color, size }: TabIconProps) => (
  <Icon
    name={focused ? 'fast-food' : 'fast-food-outline'}
    size={size}
    color={color}
  />
);

export const CartTabIcon = ({ focused, color, size }: TabIconProps) => (
  <Icon name={focused ? 'cart' : 'cart-outline'} size={size} color={color} />
);
