import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

export default function AnimateScreen() {
  const router = useRouter();
  const fadeAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(0.8);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      router.replace('/');
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <LinearGradient
      colors={['#1e40af', '#1e3a8a', '#1e2563']}
      style={styles.container}
    >
      <View style={styles.content}>
        <Animated.View 
          style={[
            styles.iconContainer,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }]
            }
          ]}
        >
          <View style={styles.cardIcon}>
            <View style={styles.cardIconLine1} />
            <View style={styles.cardIconLine2} />
            <View style={styles.cardIconLine3} />
          </View>
        </Animated.View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    padding: 30,
  },
  cardIcon: {
    width: 80,
    height: 60,
    borderWidth: 3,
    borderColor: '#60a5fa',
    borderRadius: 8,
    padding: 10,
    justifyContent: 'space-between',
  },
  cardIconLine1: {
    height: 3,
    backgroundColor: '#60a5fa',
    width: '100%',
  },
  cardIconLine2: {
    height: 3,
    backgroundColor: '#60a5fa',
    width: '70%',
  },
  cardIconLine3: {
    height: 3,
    backgroundColor: '#60a5fa',
    width: '50%',
  },
});
