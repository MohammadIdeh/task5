import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

const LoadingScreen = () => {
  const [fillAnimations] = useState([...Array(6)].map(() => new Animated.Value(0)));

  useEffect(() => {
    startFillAnimations();
  }, []);

  const startFillAnimations = () => {
    const duration = 500; 

    fillAnimations.forEach((anim, index) => {
      Animated.timing(anim, {
        toValue: 1,
        duration: duration,
        delay: duration * index,
        useNativeDriver: false,
      }).start(() => {
        if (index === fillAnimations.length - 1) {
          
        }
      });
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.loader}>
        {fillAnimations.map((anim, index) => (
          <Animated.View
            key={index}
            style={[
              styles.loaderPart,
              {
                width: anim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0%', '16.666%'],
                }),
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loader: {
    width: 180,
    height: 70,
    borderWidth: 5,
    borderColor: '#00F45B',
    borderRightColor: '#00F45B', 
    position: 'relative',
    flexDirection: 'row',
    overflow: 'hidden', 
  },
  loaderPart: {
    backgroundColor: '#00F45B',
    height: '100%',
  },
});

export default LoadingScreen;