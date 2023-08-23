import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import ProductScreen from './ProductScreen';
import CartScreen from './CartScreen';
import CartIcon from './CartIcon';
import LoadingScreen from './LoadingScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';





const Home = () => {
  const [searchText, setSearchText] = useState('');
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [renderCart, setRenderCart] = useState(false);

  useEffect(() => {
    fetchProducts('');
    _retrieveData();
  }, []);

  const _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('cart');
      if (value) {
        const cartItems = JSON.parse(value);
        setCart(cartItems);
      }
    } catch (error) {
      // Handle the error appropriately
      console.log("Error retrieving cart data:", error);
    }
  };
  
  useEffect(() => {
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchText, products]);

  const fetchProducts = async searchTerm => {
    try {
      const response = await fetch(`https://dummyapi.online/api/products?q=${searchTerm}`);
      const data = await response.json();
      setProducts(data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const addToCart = async (product, quantity) => {
    const existingProduct = cart.find(item => item.id === product.id);
    if (existingProduct) {
      const updatedCart = cart.map(item =>
        item.id === existingProduct.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...product, quantity }]);
    }
  
    try {
      await AsyncStorage.setItem('cart', JSON.stringify(cart));
    } catch (error) {
      // Error saving data
      console.log("Error saving cart data:", error);
    }
  };
  

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter(item => item.id !== productId);
    setCart(updatedCart);
  };

  const renderProductItem = ({ item }) => (
    <TouchableOpacity
      style={styles.productContainer}
      onPress={() => setSelectedProduct(item)}
    >
      <View style={styles.productImageContainer}>
        <Image source={{ uri: item.image }} style={styles.productImage} />
      </View>
      <Text

        style={styles.productName}>
        {item.name.replace(/Product/g, '')}

      </Text>
      <TouchableOpacity
        style={styles.addToCartButton}
        onPress={() => setSelectedProduct(item)}
      >
        <Text style={styles.addToCartButtonText}>View Details</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for products"
          value={searchText}
          onChangeText={text => setSearchText(text)}
        />
        <CartIcon onPress={() => setRenderCart(true)} />
      </View>


      {renderCart ? <CartScreen
        cartItems={cart}
        removeFromCart={removeFromCart}
        onBackButtonPress={() => setRenderCart(false)}
        addToCart={addToCart}
      /> : <FlatList
        style={styles.productList}
        data={filteredProducts}
        renderItem={renderProductItem}
        keyExtractor={item => item.id.toString()}
        numColumns={3}
      />}

      {selectedProduct && <ProductScreen
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        addToCart={addToCart}
      />}
    </View>
  )
};

const styles = StyleSheet.create({
  productList: {
    paddingBottom: 100,
  },
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f4f4f4',
  },
  searchInput: {
    marginTop: 55,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  productContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    padding: 9,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    borderRadius: 10,
    margin: 5,
    elevation: 3,
  },
  productImageContainer: {
    flex: 1,
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
  addToCartButton: {
    backgroundColor: '#3498db',
    padding: 8,
    borderRadius: 5,
    marginTop: 5,
  },
  addToCartButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  cartButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  cartButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },

});

export default Home;

