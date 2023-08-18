import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const ProductScreen = ({ product, onBackButtonPress, onAddToCart }) => {
  return (
    <View style={styles.container}>
      <View style={styles.productDetailsContainer}>
        <Text style={styles.productDetailsText}>Name: {product.name}</Text>
        <Text style={styles.productDetailsText}>Description: {product.description}</Text>
        <Text style={styles.productDetailsText}>Price: ${product.price}</Text>
        
        <Image source={{ uri: product.image }} style={styles.productImage} />

        <TouchableOpacity onPress={onAddToCart} style={styles.addToCartButton}>
          <Text style={styles.addToCartButtonText}>Add to Cart</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onBackButtonPress} style={styles.backButton}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f4f4f4',
  },
  productDetailsContainer: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    elevation: 3,
  },
  productDetailsText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },
  productImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
  },
  addToCartButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  addToCartButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  backButton: {
    backgroundColor: '#e74c3c',
    padding: 10,
    borderRadius: 5,
  },
  backButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default ProductScreen;
