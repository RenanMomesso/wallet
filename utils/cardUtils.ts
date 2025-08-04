import { CARD_COLORS } from '@/constants';
import { CardColors, CardVariant } from '@/types';

export class CardUtils {
  static getCardColor(index: number): CardColors {
    return CARD_COLORS[index % CARD_COLORS.length];
  }

  static formatCardNumber(number: string, showFull: boolean = false): string {
    const cleanNumber = number.replace(/\s/g, '');
    
    if (showFull) {
      return cleanNumber.replace(/(\d{4})(?=\d)/g, "$1 ");
    }
    
    const lastFour = cleanNumber.slice(-4);
    return `**** **** **** ${lastFour}`;
  }

  static formatInputCardNumber(text: string): string {
    const cleaned = text.replace(/\s/g, "");
    return cleaned.replace(/(.{4})/g, "$1 ").trim();
  }

  static formatExpiryDate(text: string): string {
    const cleaned = text.replace(/\D/g, "");
    if (cleaned.length >= 2) {
      return cleaned.substring(0, 2) + "/" + cleaned.substring(2, 4);
    }
    return cleaned;
  }

  static getCardVariant(index: number): CardVariant {
    const variants: CardVariant[] = ['Green Card', 'Black Card', 'Blue Card', 'Red Card'];
    return index < variants.length ? variants[index] : `Card ${index + 1}` as CardVariant;
  }

  static generateCardId(): string {
    return Date.now().toString();
  }
}
