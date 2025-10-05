import React, { useEffect, useState } from 'react';
import { View, Image, Text, Animated, Dimensions } from 'react-native';

interface WelcomeScreenProps {
  onFinish: () => void;
  theme: 'light' | 'dark';
}

export function WelcomeScreen({ onFinish, theme }: WelcomeScreenProps) {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [scaleAnim] = useState(new Animated.Value(0.8));
  const { width, height } = Dimensions.get('window');

  useEffect(() => {
    // Animation d'entrée
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();

    // Auto-fermeture après 3 secondes
    const timer = setTimeout(() => {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.8,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start(() => {
        onFinish();
      });
    }, 3000);

    return () => clearTimeout(timer);
  }, [fadeAnim, scaleAnim, onFinish]);

  return (
    <View 
      className="flex-1 items-center justify-center"
      style={{ backgroundColor: '#8B7355' }}
    >
      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }],
          width: width * 0.9,
          height: height * 0.9,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Image
          source={require('../../assets/Écran d\'accueil Dictionnaire Nzébi.png')}
          style={{
            width: '100%',
            height: '100%',
            resizeMode: 'contain',
          }}
        />
      </Animated.View>
    </View>
  );
}