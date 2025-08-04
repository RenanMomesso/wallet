import { CardsProvider } from "@/contexts/CardsContext";
import { Stack } from "expo-router";
import { StatusBar, View } from "react-native";

export default function RootLayout() {
  return (
    <CardsProvider>
      <View
        style={{
          flex: 1,
          backgroundColor: "#1e3a8a",
          paddingTop: StatusBar.currentHeight || 0,
        }}
      >
        <Stack
          screenOptions={{
           headerShown: false,
          }}
        >
          <Stack.Screen
            name="index"
            options={{
              title: "Wallet Test",
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="cadastro"
            options={{
              title: "cadastro",
              presentation: "card",
            }}
          />
          <Stack.Screen
            name="cartoes"
            options={{
              title: "Meus Cartões",
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="sucesso"
            options={{
              title: "Sucesso",
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="animate"
            options={{
              headerShown: false,
            }}
          />
        </Stack>
      </View>
    </CardsProvider>
  );
}
