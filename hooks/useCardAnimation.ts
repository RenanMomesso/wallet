import { ANIMATION_CONFIG, CARD_CONFIG } from '@/constants';
import { Card } from '@/types';
import { useRef } from 'react';
import { Animated, Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

export interface UseCardAnimationReturn {
  cardAnimations: { [key: string]: Animated.Value };
  bottomAnim: Animated.Value;
  initializeCardAnimation: (cards: Card[]) => void;
  animateCardSelection: (cards: Card[], selectedIndex: number) => void;
  animateCardUsage: () => void;
  restoreCardStack: (callback?: () => void) => void;
}

export const useCardAnimation = (): UseCardAnimationReturn => {
  const cardAnimations = useRef<{ [key: string]: Animated.Value }>({}).current;
  const bottomAnim = useRef(new Animated.Value(0)).current;

  const initializeCardAnimation = (cards: Card[]) => {
    cards.forEach((card, index) => {
      if (!cardAnimations[card.id]) {
        cardAnimations[card.id] = new Animated.Value(index * CARD_CONFIG.OVERLAP_OFFSET);
      }
    });
  };

  const animateCardSelection = (cards: Card[], selectedIndex: number) => {
    cards.forEach((card, index) => {
      if (index === selectedIndex) {
        Animated.spring(cardAnimations[card.id], {
          toValue: 0,
          useNativeDriver: true,
          tension: ANIMATION_CONFIG.tension,
          friction: ANIMATION_CONFIG.friction,
        }).start();
      } else {
        const stackPosition = index > selectedIndex
          ? CARD_CONFIG.STACK_OFFSET + (index - selectedIndex - 1) * CARD_CONFIG.STACK_SPACING
          : CARD_CONFIG.STACK_OFFSET + (index + (cards.length - selectedIndex - 1)) * CARD_CONFIG.STACK_SPACING;

        Animated.spring(cardAnimations[card.id], {
          toValue: stackPosition,
          useNativeDriver: true,
          tension: ANIMATION_CONFIG.tension,
          friction: ANIMATION_CONFIG.friction,
        }).start();
      }
    });
  };

  const animateCardUsage = () => {
    bottomAnim.setValue(0);
    Animated.timing(bottomAnim, {
      toValue: height / 3 + 20,
      duration: ANIMATION_CONFIG.duration,
      useNativeDriver: true,
    }).start();
  };

  const restoreCardStack = (callback?: () => void) => {
    Animated.timing(bottomAnim, {
      toValue: 0,
      duration: ANIMATION_CONFIG.duration,
      useNativeDriver: true,
    }).start(callback);
  };

  return {
    cardAnimations,
    bottomAnim,
    initializeCardAnimation,
    animateCardSelection,
    animateCardUsage,
    restoreCardStack,
  };
};
