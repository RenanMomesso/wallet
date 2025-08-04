import { useRouter } from "expo-router";
import { Dimensions, Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const { width } = Dimensions.get('window');
const BUTTON_WIDTH = width * 0.85;

export default function WalletHome() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      <Image
        source={require('../assets/images/backgroundimage.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      />
      <View style={styles.content}>
        <Text style={styles.title}>Wallet Test</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.primaryButton]}
            onPress={() => router.push("/cartoes")}
          >
            <Text style={styles.buttonText}>meus cartões</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.secondaryButton]}
            onPress={() => router.push("/cadastro")}
          >
            <Text style={styles.buttonTextSecondary}>cadastrar cartão</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

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
  },
  content: {
    width: '100%',
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  title: {
    fontSize: 28,
    color: "#fff",
    fontWeight: "400",
    fontFamily: "PTSans_700Bold",
    marginBottom: 60,
    marginTop: 40,
    textAlign: "center",
    lineHeight:32,
  },
  buttonContainer: {
    gap: 22,
    width: BUTTON_WIDTH,
  },
  button: {
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    width: "100%",
  },
  primaryButton: {
    backgroundColor: "#00d2ff",
  },
  secondaryButton: {
    backgroundColor: "#c7ff1a",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "PTSans_700Bold",
  },
  buttonTextSecondary: {
    color: "#222",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "PTSans_700Bold",
  }
});