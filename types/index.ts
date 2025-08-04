export interface Card {
  id: string;
  number: string;
  cvv: string;
  name: string;
  expiry: string;
}

export interface CreateCardRequest {
  number: string;
  cvv: string;
  name: string;
  expiry: string;
}

export interface CardFormData extends CreateCardRequest {}

export interface AnimationConfig {
  tension: number;
  friction: number;
  duration: number;
}

export interface CardColors {
  primary: string;
  secondary: string;
}

export interface CardStackPosition {
  translateY: number;
  zIndex: number;
}

export type CardVariant = 'Green Card' | 'Black Card' | 'Blue Card' | 'Red Card';

export interface TopBarProps {
  variant?: 'simple' | 'fancy';
  title?: string;
  subtitle?: string;
  onBackPress?: () => void;
  onAddPress?: () => void;
}

export interface LayoutContainerProps {
  children?: React.ReactNode;
}
