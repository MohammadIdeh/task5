import React, { useState } from 'react';
import { View, Text, Image, Modal, TouchableOpacity, StyleSheet } from 'react-native';

const ProductScreen = ({ product, onClose, addToCart }) => {
  const [quantity, setQuantity] = useState(1);

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
    <Modal transparent={true} animationType="fade">
      <View style={styles.modalContainer}>
        <View style={styles.productContainer}>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.productId}>ID: {product.id}</Text>
          <Text style={styles.productPrice}>Price: {product.price}</Text>
          <Text style={styles.productDescription}>{product.description}</Text>
          <Image source={{ uri: product.image }} style={styles.productImage} />

          <View style={styles.quantityControls}>
            <TouchableOpacity onPress={decreaseQuantity} style={styles.quantityButton}>
              <Text style={styles.quantityButtonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantityText}>{quantity}</Text>
            <TouchableOpacity onPress={increaseQuantity} style={styles.quantityButton}>
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={handleAddToCart}
            style={styles.addToCartButton}
          >
            <Text style={styles.addToCartButtonText}>Add to Cart</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },

    productContainer: {
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 10,
      alignItems: 'center',
    },

    productImage: {
      width: 200,
      height: 200,
      marginBottom: 5,
    },

    productName: {
      fontSize: 18,
      marginBottom: 10,
    },

    productId: {
      fontSize: 16,
      marginBottom: 5,
      color: '#666',
    },

    productPrice: {
      fontSize: 16,
      marginBottom: 5,
      color: 'green',
    },

    productDescription: {
      fontSize: 14,
      marginBottom: 10,
    },

    closeButton: {
      marginTop: 20,
      padding: 10,
      backgroundColor: 'gray',
      borderRadius: 5,
    },

    closeText: {
      color: 'white',
      fontWeight: 'bold',
    },

    addedToCartButton: {
      marginTop: 10,
      padding: 10,
      backgroundColor: '#f3f3f4',
      borderRadius: 5,
    },
  
    addToCartButtonText: {
      color: 'black',
      fontWeight: 'bold',
    },

    addToCartButton: {
      marginTop: 10,
      padding: 10,
      backgroundColor: '#a5c3f1f9',
      borderRadius: 5,
    },
    quantityControls: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
      },
      quantityButton: {
        fontSize: 24,
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginRight: 10,
        marginLeft: 10,

      },
      quantityText: {
        fontSize: 18,
      },

      
    
  });

export default ProductScreen;