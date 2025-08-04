import { cardService } from '@/services/api';
import { Card, CreateCardRequest } from '@/types';
import React, { createContext, useContext, useEffect, useReducer } from 'react';

interface CardsState {
  cards: Card[];
  loading: boolean;
  error: string | null;
  selectedCard: Card | null;
}

type CardsAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_CARDS'; payload: Card[] }
  | { type: 'ADD_CARD'; payload: Card }
  | { type: 'REMOVE_CARD'; payload: string }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_SELECTED_CARD'; payload: Card | null }
  | { type: 'CLEAR_ERROR' };

const initialState: CardsState = {
  cards: [],
  loading: false,
  error: null,
  selectedCard: null,
};

const cardsReducer = (state: CardsState, action: CardsAction): CardsState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_CARDS':
      return { ...state, cards: action.payload, loading: false, error: null };
    case 'ADD_CARD':
      return { 
        ...state, 
        cards: [...state.cards, action.payload],
        loading: false,
        error: null 
      };
    case 'REMOVE_CARD':
      return { 
        ...state, 
        cards: state.cards.filter(card => card.id !== action.payload),
        selectedCard: state.selectedCard?.id === action.payload ? null : state.selectedCard
      };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'SET_SELECTED_CARD':
      return { ...state, selectedCard: action.payload };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    default:
      return state;
  }
};

interface CardsContextType extends CardsState {
  fetchCards: () => Promise<void>;
  createCard: (cardData: CreateCardRequest) => Promise<void>;
  deleteCard: (id: string) => Promise<void>;
  selectCard: (card: Card | null) => void;
  clearError: () => void;
}

const CardsContext = createContext<CardsContextType | undefined>(undefined);

export const CardsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cardsReducer, initialState);

  const fetchCards = async (): Promise<void> => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const cards = await cardService.getCards();
      dispatch({ type: 'SET_CARDS', payload: cards });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Erro ao carregar cartões' });
    }
  };

  const createCard = async (cardData: CreateCardRequest): Promise<void> => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const newCard = await cardService.createCard(cardData);
      dispatch({ type: 'ADD_CARD', payload: newCard });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Erro ao criar cartão' });
      throw error;
    }
  };

  const deleteCard = async (id: string): Promise<void> => {
    try {
      await cardService.deleteCard(id);
      dispatch({ type: 'REMOVE_CARD', payload: id });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Erro ao deletar cartão' });
      throw error;
    }
  };

  const selectCard = (card: Card | null): void => {
    dispatch({ type: 'SET_SELECTED_CARD', payload: card });
  };

  const clearError = (): void => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  useEffect(() => {
    fetchCards();
  }, []);

  const contextValue: CardsContextType = {
    ...state,
    fetchCards,
    createCard,
    deleteCard,
    selectCard,
    clearError,
  };

  return (
    <CardsContext.Provider value={contextValue}>
      {children}
    </CardsContext.Provider>
  );
};

export const useCards = (): CardsContextType => {
  const context = useContext(CardsContext);
  if (context === undefined) {
    throw new Error('useCards must be used within a CardsProvider');
  }
  return context;
};
