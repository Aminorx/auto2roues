import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, Vehicle, Message, SearchFilters } from '../types';
import { mockUsers, mockVehicles } from '../utils/mockData';

interface AppContextType {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  vehicles: Vehicle[];
  setVehicles: (vehicles: Vehicle[]) => void;
  selectedVehicle: Vehicle | null;
  setSelectedVehicle: (vehicle: Vehicle | null) => void;
  searchFilters: SearchFilters;
  setSearchFilters: (filters: SearchFilters) => void;
  filteredVehicles: Vehicle[];
  messages: Message[];
  setMessages: (messages: Message[]) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  showAuthModal: boolean;
  setShowAuthModal: (show: boolean) => void;
  authMode: 'login' | 'register';
  setAuthMode: (mode: 'login' | 'register') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [vehicles, setVehicles] = useState<Vehicle[]>(mockVehicles);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({});
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  // Filter vehicles based on search criteria
  const filteredVehicles = vehicles.filter(vehicle => {
    if (searchFilters.category && vehicle.category !== searchFilters.category) return false;
    if (searchFilters.brand && vehicle.brand !== searchFilters.brand) return false;
    if (searchFilters.model && vehicle.model.toLowerCase().includes(searchFilters.model.toLowerCase()) === false) return false;
    if (searchFilters.yearFrom && vehicle.year < searchFilters.yearFrom) return false;
    if (searchFilters.yearTo && vehicle.year > searchFilters.yearTo) return false;
    if (searchFilters.mileageFrom && vehicle.mileage && vehicle.mileage < searchFilters.mileageFrom) return false;
    if (searchFilters.mileageTo && vehicle.mileage && vehicle.mileage > searchFilters.mileageTo) return false;
    if (searchFilters.priceFrom && vehicle.price < searchFilters.priceFrom) return false;
    if (searchFilters.priceTo && vehicle.price > searchFilters.priceTo) return false;
    if (searchFilters.fuelType && vehicle.fuelType !== searchFilters.fuelType) return false;
    if (searchFilters.condition && vehicle.condition !== searchFilters.condition) return false;
    if (searchFilters.location && vehicle.location.toLowerCase().includes(searchFilters.location.toLowerCase()) === false) return false;
    return true;
  }).sort((a, b) => {
    // Premium listings first
    if (a.isPremium && !b.isPremium) return -1;
    if (!a.isPremium && b.isPremium) return 1;
    
    // Then sort by criteria
    switch (searchFilters.sortBy) {
      case 'price_asc':
        return a.price - b.price;
      case 'price_desc':
        return b.price - a.price;
      case 'mileage':
        return (a.mileage || 0) - (b.mileage || 0);
      default:
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  });

  return (
    <AppContext.Provider value={{
      currentUser,
      setCurrentUser,
      vehicles,
      setVehicles,
      selectedVehicle,
      setSelectedVehicle,
      searchFilters,
      setSearchFilters,
      filteredVehicles,
      messages,
      setMessages,
      isLoading,
      setIsLoading,
      showAuthModal,
      setShowAuthModal,
      authMode,
      setAuthMode,
    }}>
      {children}
    </AppContext.Provider>
  );
};