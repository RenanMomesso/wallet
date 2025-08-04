import { TYPOGRAPHY } from '@/constants';
import { Card } from '@/types';
import { CardUtils } from '@/utils/cardUtils';
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Animated, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface CartaoProps {
  card: Card;
  index: number;
  isSelected: boolean;
  animationValue?: Animated.Value;
  onPress?: () => void;
  used?: boolean;
  showFullNumber?: boolean;
}

const Cartao: React.FC<CartaoProps> = ({
  card,
  index,
  isSelected,
  animationValue,
  onPress,
  used = false,
  showFullNumber = false,
}) => {
  const cardColors = CardUtils.getCardColor(index);
  const cardVariant = CardUtils.getCardVariant(index);
  const formattedNumber = CardUtils.formatCardNumber(card.number, showFullNumber);

  const cardContent = (
    <LinearGradient 
      colors={[cardColors.primary, cardColors.secondary]} 
      style={styles.card}
    >
      <Text style={styles.cardType}>{cardVariant}</Text>
      <View style={styles.cardDetails}>
        <Text style={styles.cardHolder}>{card.name}</Text>
        <Text style={styles.cardNumber}>{formattedNumber}</Text>
        <Text style={styles.cardExpiry}>Validade {card.expiry}</Text>
      </View>
    </LinearGradient>
  );

  if (animationValue) {
    return (
      <Animated.View
        style={[
          styles.cardContainer,
          {
            transform: [{ translateY: animationValue }],
            zIndex: isSelected ? 2 : 1,
          },
        ]}
      >
        <TouchableOpacity 
          disabled={used} 
          onPress={onPress} 
          activeOpacity={0.9}
          accessibilityRole="button"
          accessibilityLabel={`${cardVariant} ending in ${card.number.slice(-4)}`}
        >
          {cardContent}
        </TouchableOpacity>
      </Animated.View>
    );
  }

  return (
    <View style={styles.cardContainer}>
      <TouchableOpacity 
        disabled={used} 
        onPress={onPress} 
        activeOpacity={0.9}
        accessibilityRole="button"
        accessibilityLabel={`${cardVariant} ending in ${card.number.slice(-4)}`}
      >
        {cardContent}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    position: "absolute",
    width: "100%",
    top: 0,
  },
  card: {
    height: 180,
    borderRadius: 16,
    padding: 20,
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  cardType: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "400",
    fontFamily: TYPOGRAPHY.fontFamily.regular,
    lineHeight: 20,
    marginTop: 30,
    marginBottom: 34,
  },
  cardDetails: {
    flex: 1,
    justifyContent: "flex-end",
  },
  cardHolder: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "400",
    fontFamily: TYPOGRAPHY.fontFamily.regular,
    lineHeight: 18,
  },
  cardNumber: {
    color: "#fff",
    fontSize: 14,
    marginBottom: 4,
    fontWeight: "400",
    letterSpacing: 0,
    fontFamily: TYPOGRAPHY.fontFamily.regular,
    lineHeight: 16,
  },
  cardExpiry: {
    color: "#fff",
    fontSize: 14,
    opacity: 0.9,
    fontFamily: TYPOGRAPHY.fontFamily.regular,
    fontWeight: "400",
    lineHeight: 16,
  },
});

export default Cartao;