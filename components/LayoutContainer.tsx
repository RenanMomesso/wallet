import React from 'react';
import { Image, StatusBar, StyleSheet, View } from 'react-native';

interface LayoutContainerProps {
    children?: React.ReactNode;
}
const LayoutContainer = ({ children }: LayoutContainerProps) => {
  return (
     <View style={styles.container}>
          <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
          <Image
            source={require('../assets/images/backgroundimage.png')}
            style={styles.backgroundImage}
            resizeMode="cover"
          />
            {children}
        </View>
  )
}

export default LayoutContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#06338c", // fallback color if image fails
  },
  backgroundImage: {
    position: 'absolute',
    top: -170,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '140%',
  }
});