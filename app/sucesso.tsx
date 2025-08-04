import LayoutContainer from "@/components/LayoutContainer";
import TopBar from "@/components/TopBar";
import { useCards } from "@/contexts/CardsContext";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Sucesso() {
  const router = useRouter();
  const { cards } = useCards();
  
  // Get the most recently added card
  const latestCard = cards[cards.length - 1];

  return (
    <LayoutContainer>
      <TopBar
        onBackPress={() => router.back()}
        variant="simple"
        title="cadastro"
      />
      <View style={styles.content}>
        <Text style={styles.title}>Wallet Test</Text>
        <Text style={styles.subtitle}>cartão cadastrado com sucesso</Text>
        
        <View style={styles.cardContainer}>
          <LinearGradient
            colors={['#1a1a1a', '#2d2d2d']}
            style={styles.card}
          >
            <Text style={styles.cardType}>Black Card</Text>
            <View style={styles.cardDetails}>
              <Text style={styles.cardHolder}>
                {latestCard?.name || 'João Carlos Pereira'}
              </Text>
              <Text style={styles.cardNumber}>
                **** **** **** {latestCard?.number?.slice(-4) || '2345'}
              </Text>
              <Text style={styles.cardExpiry}>
                Validade {latestCard?.expiry || '04/32'}
              </Text>
            </View>
          </LinearGradient>
        </View>

        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => router.push('/cartoes')}
        >
          <Text style={styles.actionButtonText}>avançar</Text>
        </TouchableOpacity>
      </View>
    </LayoutContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: 135,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
    fontFamily: "PTSans_700Bold",
    textAlign: "center",
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: "#BBBBBB",
    fontFamily: "PTSans_400Regular",
    textAlign: "center",
    marginBottom: 40,
  },
  cardContainer: {
    width: '85%',
    marginBottom: 60,
  },
  card: {
    height: 180,
    borderRadius: 16,
    padding: 20,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  cardType: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: "PTSans_700Bold",
  },
  cardDetails: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  cardHolder: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 8,
    fontWeight: '500',
    fontFamily: "PTSans_400Regular",
  },
  cardNumber: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 4,
    fontWeight: '600',
    letterSpacing: 1,
    fontFamily: "PTSans_700Bold",
  },
  cardExpiry: {
    color: '#fff',
    fontSize: 12,
    opacity: 0.9,
    fontFamily: "PTSans_400Regular",
  },
  actionButton: {
    backgroundColor: '#12C2E9',
    borderRadius: 12,
    paddingVertical: 18,
    width: '85%',
    alignItems: 'center',
    position: 'absolute',
    bottom: 60,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: "PTSans_700Bold",
  },
});
   