export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  type: 'individual' | 'professional';
  companyName?: string;
  companyLogo?: string;
  address?: string;
  city?: string;
  postalCode?: string;
  website?: string;
  siret?: string;
  bio?: string;
  avatar?: string;
  specialties?: string[];
  verified: boolean;
  emailVerified?: boolean;
  createdAt: Date;
  lastLoginAt?: Date;
}

export interface Vehicle {
  id: string;
  userId: string;
  user?: User;
  title: string;
  description: string;
  category: 'car' | 'motorcycle' | 'scooter' | 'quad' | 'utility' | 'other' | 'parts';
  brand: string;
  model: string;
  year: number;
  mileage?: number;
  fuelType?: 'gasoline' | 'diesel' | 'electric' | 'hybrid';
  condition: 'new' | 'used' | 'damaged';
  price: number;
  location: string;
  images: string[];
  features: string[];
  isPremium: boolean;
  premiumType?: 'daily' | 'weekly' | 'monthly';
  premiumExpiresAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  views: number;
  favorites: number;
  status: 'pending' | 'approved' | 'rejected';
}

export interface Message {
  id: string;
  fromUserId: string;
  toUserId: string;
  vehicleId: string;
  content: string;
  createdAt: Date;
  read: boolean;
}

export interface SearchFilters {
  category?: string;
  brand?: string;
  model?: string;
  yearFrom?: number;
  yearTo?: number;
  mileageFrom?: number;
  mileageTo?: number;
  priceFrom?: number;
  priceTo?: number;
  fuelType?: string;
  condition?: string;
  location?: string;
  sortBy?: 'date' | 'price_asc' | 'price_desc' | 'mileage';
}

export interface PremiumOption {
  id: string;
  name: string;
  price: number;
  duration: number; // in days
  features: string[];
}

export interface AccountSetupStep {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}