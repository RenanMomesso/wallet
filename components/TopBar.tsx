import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type TopBarVariant = "simple" | "fancy";

interface TopBarProps {
  variant?: TopBarVariant;
  title?: string;
  subtitle?: string;
  onBackPress?: () => void;
  onAddPress?: () => void;
}

export default function TopBar({
  variant = "simple",
  title = "",
  subtitle = "",
  onBackPress,
  onAddPress,
}: TopBarProps) {
  if (variant === "simple") {
    return (
      <View style={styles.simpleBarWrapper}>
        {!!onBackPress && (
          <TouchableOpacity onPress={onBackPress} style={styles.iconBtn}>
            <AntDesign name="arrowleft" size={18} color="#22d3ee" />
          </TouchableOpacity>
        )}
        <Text style={styles.simpleBarText}>{title}</Text>
        <View />
      </View>
    );
  }

  // "fancy" variant
  return (
    <View style={styles.fancyWrapper}>
      <View style={styles.fancyTopRow}>
        {!!onBackPress && (
          <TouchableOpacity onPress={onBackPress} style={styles.iconBtn}>
            <AntDesign name="arrowleft" size={20} color="#1e3a8a" />
          </TouchableOpacity>
        )}
        <Text style={styles.fancyTitle}>{title}</Text>
        {!!onAddPress ? (
          <TouchableOpacity onPress={onAddPress} style={styles.iconBtn}>
            <AntDesign name="plus" size={20} color="#1e3a8a" />
          </TouchableOpacity>
        ) : (
          <View style={styles.iconBtn} />
        )}
      </View>
      {/* Shadow */}
      <LinearGradient
        colors={["#e5e7eb", "rgba(30,64,175,0.05)", "rgba(30,64,175,0)"]}
        start={[0, 0]}
        end={[0, 1]}
        style={styles.fancyShadow}
      />
      {/* Card */}
      <View style={styles.fancyCard}>
        <Text style={styles.fancySubtitle}>{subtitle}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // SIMPLE BAR Styles
  simpleBarWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 48,
    paddingHorizontal: 16,
    backgroundColor: "transparent",
    marginTop: 16,
  },
  simpleBarText: {
    color: "#22d3ee",
    fontSize: 22,
    fontWeight: "400",
    marginLeft: 8,
    fontFamily: "PTSans_400Regular",
    textTransform: "lowercase",
  },
  iconBtn: {
    padding: 6,
    minWidth: 32,
    alignItems: "center",
    justifyContent: "center",
  },

  // FANCY BAR Styles
  fancyWrapper: {
    width: "100%",
    alignItems: "center",
    backgroundColor: "#f3f4f6",
    borderBottomLeftRadius: 36,
    borderBottomRightRadius: 36,
    paddingBottom: 16,
    elevation: 2,
    zIndex: 2,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  fancyTopRow: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 18,
    paddingTop: 34,
    paddingBottom: 6,
  },
  fancyTitle: {
    fontSize: 20,
    color: "#1e3a8a",
    fontWeight: "700",
    fontFamily: "PTSans_700Bold",
    textAlign: "center",
  },
  fancyShadow: {
    width: "100%",
    height: 8,
    marginTop: 0,
    marginBottom: -8,
    borderBottomLeftRadius: 36,
    borderBottomRightRadius: 36,
    zIndex: 3,
  },
  fancyCard: {
    backgroundColor: "#f3f4f6",
    width: "88%",
    alignSelf: "center",
    borderBottomLeftRadius: 36,
    borderBottomRightRadius: 36,
    alignItems: "center",
    paddingVertical: 14,
    marginTop: 0,
    zIndex: 4,
  },
  fancySubtitle: {
    color: "#22d3ee",
    fontSize: 18,
    fontWeight: "400",
    fontFamily: "PTSans_400Regular",
    textAlign: "center",
  },
});
