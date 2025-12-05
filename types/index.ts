// types/index.ts
export interface Tool {
  id: number;
  name: string;
  brand: string;
  description: string;
  collectionId: number;
  createdAt: Date;
  updatedAt: Date;
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
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
  tools?: Tool[];
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
