import { CardFormData } from '@/types';
import { CardUtils } from '@/utils/cardUtils';
import { CardValidator } from '@/utils/validation';
import { useState } from 'react';

export interface UseCardFormReturn {
  formData: Partial<CardFormData>;
  errors: string[];
  isValid: boolean;
  updateField: (field: keyof CardFormData, value: string) => void;
  validateForm: () => boolean;
  resetForm: () => void;
  getFormattedData: () => CardFormData;
}

export const useCardForm = (): UseCardFormReturn => {
  const [formData, setFormData] = useState<Partial<CardFormData>>({
    number: '',
    name: '',
    expiry: '',
    cvv: '',
  });
  const [errors, setErrors] = useState<string[]>([]);

  const updateField = (field: keyof CardFormData, value: string) => {
    let formattedValue = value;

    switch (field) {
      case 'number':
        formattedValue = CardUtils.formatInputCardNumber(value);
        break;
      case 'expiry':
        formattedValue = CardUtils.formatExpiryDate(value);
        break;
      default:
        formattedValue = value;
    }

    setFormData(prev => ({ ...prev, [field]: formattedValue }));
    
    if (errors.length > 0) {
      setErrors([]);
    }
  };

  const validateForm = (): boolean => {
    const validation = CardValidator.validateCardForm(formData);
    setErrors(validation.errors);
    return validation.isValid;
  };

  const resetForm = () => {
    setFormData({
      number: '',
      name: '',
      expiry: '',
      cvv: '',
    });
    setErrors([]);
  };

  const getFormattedData = (): CardFormData => {
    return {
      number: formData.number?.replace(/\s/g, '') || '',
      name: formData.name || '',
      expiry: formData.expiry || '',
      cvv: formData.cvv || '',
    };
  };

  const validation = CardValidator.validateCardForm(formData);

  return {
    formData,
    errors,
    isValid: validation.isValid,
    updateField,
    validateForm,
    resetForm,
    getFormattedData,
  };
};
