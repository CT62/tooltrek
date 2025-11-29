// types/index.ts
export interface Tool {
  id: number;
  name: string;
  brand: string;
  price: number;
  image?: string | null;
  description: string;
  collectionId: number;
}

export interface Collection {
  id: number;
  name: string;
  category: string;
  price: number;
  items: number;
  rating: number;
  reviews: number;
  description: string;
  popular: boolean;
  tools: Tool[];
}

export interface ApiError {
  error: string;
  details?: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token?: string;
  success: boolean;
  error?: string;
}
