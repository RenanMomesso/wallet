import Cartao from "@/components/Card";
import LayoutContainer from "@/components/LayoutContainer";
import TopBar from "@/components/TopBar";
import { useCards } from "@/contexts/CardsContext";
import { useCardForm } from "@/hooks/useCardForm";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    Alert,
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function Cadastro() {
  const router = useRouter();
  const { createCard, loading } = useCards();
  const { formData, errors, isValid, updateField, validateForm, getFormattedData } = useCardForm();
  const [previewCard, setPreviewCard] = useState(false);

  const handleSubmit = async () => {
    if (!validateForm()) {
      Alert.alert("Erro de Validação", errors.join('\n'));
      return;
    }
    setPreviewCard(true);
  };

  const handleSaveCard = async () => {
    try {
      const cardData = getFormattedData();
      await createCard(cardData);
      router.push("/cartoes");
    } catch (error) {
      console.error("Error creating card:", error);
      Alert.alert("Erro", "Falha ao cadastrar cartão. Tente novamente.");
    }
  };

  if (previewCard) {
    return (
      <LayoutContainer>
        <TopBar
          onBackPress={() => setPreviewCard(false)}
          variant="simple"
          title="Cadastro"
        />
        <View style={styles.content}>
          <Text style={styles.title}>Wallet Test</Text>
          <Text style={styles.successSubtitle}>cartão cadastrado com sucesso</Text>
          <View style={styles.cardPreviewContainer}>
            <Cartao
              card={{
                id: "temp-id",
                number: formData.number || '',
                name: formData.name || '',
                expiry: formData.expiry || '',
                cvv: formData.cvv || '',
              }}
              index={0}
              isSelected={true}
              showFullNumber={true}
            />
          </View>
          <TouchableOpacity
            style={[styles.submitButton, loading && styles.submitButtonDisabled]}
            onPress={handleSaveCard}
            disabled={loading}
          >
            <Text style={styles.submitButtonText}>
              {loading ? "Salvando..." : "avançar"}
            </Text>
          </TouchableOpacity>
        </View>
      </LayoutContainer>
    );
  }

  return (
    <LayoutContainer>
      <TopBar
        onBackPress={() => router.back()}
        variant="simple"
        title="Cadastro"
      />
      <View style={styles.content}>
        <Text style={styles.title}>Wallet Test</Text>
        <View style={styles.form}>
          <Text style={styles.label}>número do cartão</Text>
          <View style={styles.inputContainer}>
            <View style={styles.iconContainer}>
              <Image
                source={require("@/assets/images/camera_icon.png")}
                style={styles.icon}
              />
            </View>
            <TextInput
              style={[styles.input, styles.inputWithIcon]}
              value={formData.number}
              onChangeText={(text) => updateField('number', text)}
              placeholder="0000 0000 0000 0000"
              placeholderTextColor="#666"
              maxLength={19}
              keyboardType="numeric"
              accessibilityLabel="Número do cartão"
            />
          </View>

          <Text style={styles.label}>nome do titular do cartão</Text>
          <TextInput
            style={styles.input}
            value={formData.name}
            onChangeText={(text) => updateField('name', text)}
            placeholder="João Silva"
            placeholderTextColor="#666"
            accessibilityLabel="Nome do titular"
          />

          <View style={styles.row}>
            <View style={styles.halfWidth}>
              <Text style={styles.label}>vencimento</Text>
              <TextInput
                style={styles.input}
                value={formData.expiry}
                onChangeText={(text) => updateField('expiry', text)}
                placeholder="MM/AA"
                placeholderTextColor="#666"
                maxLength={5}
                keyboardType="numeric"
                accessibilityLabel="Data de vencimento"
              />
            </View>

            <View style={styles.halfWidth}>
              <Text style={styles.label}>código de segurança</Text>
              <TextInput
                style={styles.input}
                value={formData.cvv}
                onChangeText={(text) => updateField('cvv', text)}
                placeholder="123"
                placeholderTextColor="#666"
                maxLength={4}
                keyboardType="numeric"
                secureTextEntry
                accessibilityLabel="Código de segurança"
              />
            </View>
          </View>

          <TouchableOpacity
            style={[
              styles.submitButton,
              !isValid && styles.submitButtonDisabled,
            ]}
            onPress={handleSubmit}
            disabled={!isValid}
          >
            <Text style={styles.submitButtonText}>avançar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LayoutContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(30, 64, 175, 0.85)",
  },
  content: {
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: 135,
  },
  title: {
    fontSize: 24,
    color: "#fff",
    marginBottom: 16,
    fontWeight: "bold",
    fontFamily: "PTSans_700Bold",
    textAlign: "center",
  },
  successSubtitle: {
    fontSize: 16,
    color: "#fff",
    fontFamily: "PTSans_400Regular",
    textAlign: "center",
    marginBottom: 40,
  },
  cardPreviewContainer: {
    alignItems: "center",
    marginBottom: 180,
  },
  form: {
    flex: 1,
  },
  label: {
    color: "#BBBBBB",
    fontSize: 14,
    marginBottom: 8,
    marginTop: 16,
    fontFamily: "PTSans_400Regular",
  },
  inputContainer: {
    position: "relative",
  },
  iconContainer: {
    position: "absolute",
    left: 12,
    top: 15,
    zIndex: 1,
  },
  icon: {
    width: 24,
    height: 24,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 15,
    fontSize: 16,
    color: "#000",
    fontFamily: "PTSans_400Regular",
  },
  inputWithIcon: {
    paddingLeft: 50,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 15,
  },
  halfWidth: {
    flex: 1,
  },
  submitButton: {
    backgroundColor: "#12C2E9",
    borderRadius: 8,
    paddingVertical: 18,
    alignItems: "center",
    marginTop: 30,
    marginBottom: 40,
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "PTSans_700Bold",
  },
});