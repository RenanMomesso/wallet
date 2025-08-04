import { AnimationConfig, CardColors } from '@/types';

export const API_CONFIG = {
  BASE_URL: "http://localhost:3000",
  TIMEOUT: 5000,
  ENDPOINTS: {
    CARDS: "/cards",
  },
} as const;

export const CARD_COLORS: CardColors[] = [
  { primary: "#84cc16", secondary: "#65a30d" }, // Green
  { primary: "#1a1a1a", secondary: "#2d2d2d" }, // Black
  { primary: "#3b82f6", secondary: "#1d4ed8" }, // Blue
  { primary: "#ef4444", secondary: "#dc2626" }, // Red
];

export const ANIMATION_CONFIG: AnimationConfig = {
  tension: 100,
  friction: 8,
  duration: 500,
};

export const CARD_CONFIG = {
  HEIGHT: 180,
  OVERLAP_OFFSET: -40,
  STACK_OFFSET: 144,
  STACK_SPACING: 20,
} as const;

export const TYPOGRAPHY = {
  fontFamily: {
    regular: "PTSans_400Regular",
    bold: "PTSans_700Bold",
  },
} as const;
