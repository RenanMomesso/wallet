import { CardFormData } from '@/types';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export class CardValidator {
  

  static validateCardForm(data: Partial<CardFormData>): ValidationResult {
    const errors: string[] = [];

    if (!data.number?.trim()) {
      errors.push('Número do cartão é obrigatório');
    }

    if (!data.name?.trim()) {
      errors.push('Nome do titular é obrigatório');
    }

    if (!data.expiry?.trim() || data.expiry.length !== 5) {
      errors.push('Data de vencimento inválida');
    }

    if (!data.cvv?.trim() || data.cvv.length < 3) {
      errors.push('Código de segurança inválido');
    }

    if (data.number && !this.isValidCardNumber(data.number)) {
      errors.push('Número do cartão inválido');
    }

    if (data.expiry && !this.isValidExpiryDate(data.expiry)) {
      errors.push('Data de vencimento inválida');
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  private static isValidCardNumber(cardNumber: string): boolean {
    const cleaned = cardNumber.replace(/\s/g, '');
    return cleaned.length >= 13 && cleaned.length <= 19 && /^\d+$/.test(cleaned);
  }

  private static isValidExpiryDate(expiry: string): boolean {
    if (!/^\d{2}\/\d{2}$/.test(expiry)) return false;
    
    const [month, year] = expiry.split('/').map(Number);
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100;
    const currentMonth = currentDate.getMonth() + 1;

    return month >= 1 && month <= 12 && 
           (year > currentYear || (year === currentYear && month >= currentMonth));
  }
}
