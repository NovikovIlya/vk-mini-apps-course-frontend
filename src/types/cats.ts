export interface CatBreed {
  id: number;
  name: string;
  description: string;
  image: string;
  characteristics: {
    energy: number; // 1-5
    friendliness: number; // 1-5
    shedding: number; // 1-5
    playfulness: number; // 1-5
    vocality: number; // 1-5
    independence: number; // 1-5
    grooming: number; // 1-5
    childFriendly: number; // 1-5
    petFriendly: number; // 1-5
    intelligence: number; // 1-5
  };
  size: 'small' | 'medium' | 'large';
  lifespan: string;
  origin: string;
  weight: string;
}

export interface FilterCriteria {
  energy?: number;
  friendliness?: number;
  shedding?: number;
  playfulness?: number;
  vocality?: number;
  independence?: number;
  grooming?: number;
  childFriendly?: number;
  petFriendly?: number;
  intelligence?: number;
  size?: string[];
}