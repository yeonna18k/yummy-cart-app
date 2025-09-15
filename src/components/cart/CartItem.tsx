import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '../../constants/colors';
import { useCart } from '../../hooks/useCart';
import { CartItem as CartItemTypes } from '../../types/cartTypes';

interface CartItemProps {
  item: CartItemTypes;
  onPress: (productId: number) => void;
}

const CartItem = ({ item, onPress }: CartItemProps) => {
  const { updateQuantity, removeFromCart } = useCart();

  const decreaseQuantity = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    }
  };

  const increaseQuantity = () => {
    updateQuantity(item.id, item.quantity + 1);
  };

  const handleRemoveItem = () => {
    removeFromCart(item.id);
  };

  return (
    <TouchableOpacity onPress={() => onPress(item.id)} style={styles.container}>
      <View style={styles.itemInfoContainer}>
        <View style={styles.itemImageContainer}>
          <Image source={{ uri: item.image }} style={styles.itemImage} />
        </View>
        <View>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemSalePrice}>
            {(item.salePrice * item.quantity).toLocaleString()}원
          </Text>
        </View>
      </View>

      <View style={styles.itemOptionContainer}>
        <TouchableOpacity onPress={handleRemoveItem}>
          <Ionicons name="trash" size={20} color={colors.primary} />
        </TouchableOpacity>
        <View style={styles.quantitySelector}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={decreaseQuantity}
          >
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{item.quantity}</Text>
          <TouchableOpacity style={styles.quantityButton}>
            <Text style={styles.quantityButtonText} onPress={increaseQuantity}>
              +
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  itemInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 30,
  },
  itemImageContainer: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  itemImage: {
    width: '100%',
    height: '100%',
  },
  itemName: {
    fontSize: 16,
  },
  itemSalePrice: {},
  quantitySelector: {
    flexDirection: 'row',
    gap: 10,
  },
  itemOptionContainer: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: 20,
  },
  quantityButton: {
    width: 20,
    height: 20,
    backgroundColor: colors.primaryBackground,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    fontSize: 16,
    lineHeight: 16,
    // color: '#fff',
  },
  quantityText: {},
});
