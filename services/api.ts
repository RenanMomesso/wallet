import { API_CONFIG } from "@/constants";
import { Card, CreateCardRequest } from "@/types";
import { CardUtils } from "@/utils/cardUtils";

interface ApiResponse<T> {
  data: T;
  success: boolean;
  error?: string;
}

interface IApiClient {
  get<T>(endpoint: string): Promise<T>;
  post<T>(endpoint: string, data: any): Promise<T>;
  delete(endpoint: string): Promise<void>;
}

class FetchApiClient implements IApiClient {
  constructor(private baseURL: string, private timeout: number = 5000) {}

  private async request<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.timeout);

      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          ...options?.headers,
        },
        signal: controller.signal,
        ...options,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("API request failed:", error);
      throw error;
    }
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint);
  }

  async post<T>(endpoint: string, data: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async delete(endpoint: string): Promise<void> {
    await this.request(endpoint, { method: "DELETE" });
  }
}

interface ICardService {
  getCards(): Promise<Card[]>;
  createCard(cardData: CreateCardRequest): Promise<Card>;
  deleteCard(id: string): Promise<void>;
}

class CardService implements ICardService {
  constructor(private apiClient: IApiClient) {}

  async getCards(): Promise<Card[]> {
    try {
      return await this.apiClient.get<Card[]>(API_CONFIG.ENDPOINTS.CARDS);
    } catch (error) {
      console.warn("Failed to fetch cards from server, returning empty array");
      return [];
    }
  }

  async createCard(cardData: CreateCardRequest): Promise<Card> {
    const newCard: Card = {
      id: CardUtils.generateCardId(),
      ...cardData,
    };

    return await this.apiClient.post<Card>(
      API_CONFIG.ENDPOINTS.CARDS,
      newCard
    );
  }

  async deleteCard(id: string): Promise<void> {
    await this.apiClient.delete(`${API_CONFIG.ENDPOINTS.CARDS}/${id}`);
  }
}

export const createCardService = (): ICardService => {
  const apiClient = new FetchApiClient(
    API_CONFIG.BASE_URL,
    API_CONFIG.TIMEOUT
  );
  return new CardService(apiClient);
};

export const cardService = createCardService();
