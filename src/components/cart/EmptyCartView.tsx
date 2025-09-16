import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const EmptyCartView = () => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* 아이콘 또는 이미지 자리 */}
        <View style={styles.iconContainer}>
          <Text style={styles.iconText}>🛒</Text>
        </View>

        <Text style={styles.title}>장바구니가 비어있어요</Text>
        <Text style={styles.subtitle}>마음에 드는 메뉴를 담아보세요</Text>
      </View>
    </View>
  );
};

export default EmptyCartView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  content: {
    alignItems: 'center',
    maxWidth: 300,
  },
  iconContainer: {
    marginBottom: 24,
  },
  iconText: {
    fontSize: 64,
    opacity: 0.3,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
});
