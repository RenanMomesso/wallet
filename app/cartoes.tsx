import Cartao from "@/components/Card";
import LayoutContainer from "@/components/LayoutContainer";
import TopBar from "@/components/TopBar";
import { useCards } from "@/contexts/CardsContext";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
    Animated,
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const { height } = Dimensions.get("window");

export default function Cartoes() {
  const router = useRouter();
  const { cards, loading, error, selectedCard, selectCard } = useCards();
  const [localSelectedIndex, setLocalSelectedIndex] = useState(0);

  const cardAnimations = useRef<{ [key: string]: Animated.Value }>({}).current;
  const bottomAnim = useRef(new Animated.Value(0)).current;
  const [used, setUsed] = useState(false);

  useEffect(() => {
    cards.forEach((card, index) => {
      if (!cardAnimations[card.id]) {
        cardAnimations[card.id] = new Animated.Value(index * -40);
      }
    });

    if (cards.length > 0 && selectedCard == null) {
      selectCard(cards[0]);
      setLocalSelectedIndex(0);
    }
  }, [cards]);

  const handleSelectCard = (cardIndex: number) => {
    if (used) return;

    setLocalSelectedIndex(cardIndex);
    selectCard(cards[cardIndex]);
    setUsed(false);

    // Animate selected card to top, others to bottom stack
    cards.forEach((card, index) => {
      if (index === cardIndex) {
        // Selected card goes to top
        Animated.spring(cardAnimations[card.id], {
          toValue: 0,
          useNativeDriver: true,
          tension: 100,
          friction: 8,
        }).start();
      } else {
        // Other cards go to bottom stack
        const stackPosition =
          index > cardIndex
            ? 144 + (index - cardIndex - 1) * 20
            : 144 + (index + (cards.length - cardIndex - 1)) * 20;

        Animated.spring(cardAnimations[card.id], {
          toValue: stackPosition,
          useNativeDriver: true,
          tension: 100,
          friction: 8,
        }).start();
      }
    });
  };

  const onUseCard = () => {
    setUsed(true);
    bottomAnim.setValue(0);
    Animated.timing(bottomAnim, {
      toValue: height / 3 + 20,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const onRestoreStack = () => {
    Animated.timing(bottomAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      setUsed(false);
    });
  };

  const selectedCardData = cards[localSelectedIndex];
  const notSelectedCards = cards.filter(
    (_, index) => index !== localSelectedIndex
  );

  return (
    <LayoutContainer>
      <TopBar
        title="Wallet Test"
        onBackPress={() => router.back()}
        variant="fancy"
        subtitle="Meus Cartões"
        onAddPress={() => router.push("/cadastro")}
      />
      <View style={styles.content}>
        {loading && (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Carregando cartões...</Text>
          </View>
        )}
        <View style={styles.cardsContainer}>
          {!used &&
            cards.map((card, index) => (
              <Cartao
                key={card.id}
                card={card}
                index={index}
                isSelected={index === localSelectedIndex}
                animationValue={cardAnimations[card.id]}
                onPress={() => handleSelectCard(index)}
                used={used}
              />
            ))}

          {used && (
            <>
              <Cartao
                key={selectedCardData.id}
                card={selectedCardData}
                index={localSelectedIndex}
                isSelected={true}
                animationValue={undefined}
                used={used}
              />

              {notSelectedCards.map((card, index) => {
                const originalIndex = cards.findIndex((c) => c.id === card.id);
                return (
                  <Animated.View
                    key={card.id}
                    style={[
                      styles.bottomCardWrapper,
                      {
                        position: "relative",
                        width: "100%",
                        zIndex: 1,
                        transform: [{ translateY: bottomAnim }],
                        alignSelf: "center",
                      },
                    ]}
                  >
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={onRestoreStack}
                      style={{
                        width: "100%",
                        opacity: 0.6,
                      }}
                    >
                      <Cartao
                        card={card}
                        index={originalIndex}
                        isSelected={false}
                        animationValue={undefined}
                        used={used}
                        
                      />
                    </TouchableOpacity>
                  </Animated.View>
                );
              })}
            </>
          )}
        </View>

        {!used && (
          <Text style={styles.defaultText} onPress={onUseCard}>usar este cartão</Text>
        )}

        {used && (
          <TouchableOpacity
            style={styles.actionButton}
            onPress={onUseCard}
            disabled={used}
          >
            <Text style={styles.actionButtonText}>pagar com este cartão</Text>
          </TouchableOpacity>
        )}
      </View>
    </LayoutContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 60,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    color: "#94a3b8",
    marginBottom: 60,
    fontWeight: "300",
    fontFamily: "PTSans_400Regular",
  },
  cardsContainer: {
    height: 350,
    width: "85%",
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
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
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "PTSans_700Bold",
  },
  cardDetails: {
    flex: 1,
    justifyContent: "flex-end",
  },
  cardHolder: {
    color: "#fff",
    fontSize: 14,
    marginBottom: 8,
    fontWeight: "500",
    fontFamily: "PTSans_400Regular",
  },
  cardNumber: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 4,
    fontWeight: "600",
    letterSpacing: 1,
    fontFamily: "PTSans_700Bold",
  },
  cardExpiry: {
    color: "#fff",
    fontSize: 12,
    opacity: 0.9,
    fontFamily: "PTSans_400Regular",
  },
  defaultText: {
    color: "#94a3b8",
    fontSize: 16,
    marginTop: 20,
    marginBottom: 30,
    fontFamily: "PTSans_400Regular",
  },
  actionButton: {
    backgroundColor: "#22d3ee",
    borderRadius: 12,
    paddingVertical: 18,
    alignItems: "center",
    marginHorizontal: 20,
    marginBottom: 40,
    width: "85%",
  },
  actionButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "PTSans_700Bold",
  },
  bottomCardWrapper: {
    width: "100%",
    alignItems: "center",
    backgroundColor:"red",
    justifyContent: "center",
    
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    color: "#94a3b8",
    fontSize: 16,
    marginTop: 16,
    fontFamily: "PTSans_400Regular",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  errorText: {
    color: "#ef4444",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    fontFamily: "PTSans_400Regular",
  },
  retryButton: {
    backgroundColor: "#22d3ee",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: "#000",
    fontSize: 14,
    fontFamily: "PTSans_700Bold",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  emptyText: {
    color: "#94a3b8",
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
    fontFamily: "PTSans_400Regular",
  },
  addButton: {
    backgroundColor: "#22d3ee",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  addButtonText: {
    color: "#000",
    fontSize: 16,
    fontFamily: "PTSans_700Bold",
  },
});