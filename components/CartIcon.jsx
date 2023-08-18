import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CartIcon = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.cartIcon}>
      <Ionicons name="cart-outline" size={24} color="black" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cartIcon: {
    marginTop:20,
    marginBottom:20,
    marginLeft:160,
    marginRight: 160,
    padding: 10,
    borderRadius: 100,
    backgroundColor: '#3498db',
  },
});

export default CartIcon;
