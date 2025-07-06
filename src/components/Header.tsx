import React, { useState } from 'react';
import { Search, Bell, Heart, MessageCircle, User, Menu, X } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

interface HeaderProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  currentView, 
  setCurrentView, 
  mobileMenuOpen, 
  setMobileMenuOpen 
}) => {
  const { currentUser, setCurrentUser, setShowAuthModal, setAuthMode } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('vehicles');

  const handleAuthClick = (mode: 'login' | 'register') => {
    setAuthMode(mode);
    setShowAuthModal(true);
    setMobileMenuOpen(false);
  };

  const handleNavClick = (view: string) => {
    setCurrentView(view);
    setMobileMenuOpen(false);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('home');
    setMobileMenuOpen(false);
  };

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
    // Here you would typically filter content based on category
  };

  const categories = [
    { id: 'vehicles', label: 'Véhicules' },
    { id: 'motos', label: 'Motos' },
    { id: 'scooters', label: 'Scooters' },
    { id: 'quads', label: 'Quads' },
    { id: 'utilitaires', label: 'Utilitaires' },
    { id: 'pieces-voitures', label: 'Pièces détachées voitures' },
    { id: 'pieces-motos', label: 'Pièces détachées motos' },
    { id: 'conseils', label: 'Conseils' },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-200">
      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer"
            onClick={() => handleNavClick('home')}
          >
            <span className="text-2xl font-bold bg-gradient-to-r from-primary-bolt-500 to-primary-bolt-600 bg-clip-text text-transparent">
              auto2roues
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6 flex-1 max-w-4xl mx-8">
            {/* Deposit Button */}
            <button
              onClick={() => handleNavClick('create-listing')}
              className="bg-gradient-to-r from-primary-bolt-500 to-primary-bolt-600 hover:from-primary-bolt-600 hover:to-primary-bolt-700 text-white px-6 py-2.5 rounded-lg font-medium transition-all duration-200 shadow-sm hover:shadow-md whitespace-nowrap"
            >
              Déposer une annonce
            </button>

            {/* Search Bar */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Rechercher sur auto2roues"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-4 pr-12 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-bolt-500 focus:border-primary-bolt-500 transition-all text-gray-900 placeholder-gray-500"
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-primary-bolt-500 transition-colors">
                  <Search className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Icons */}
          <div className="hidden lg:flex items-center space-x-6">
            {currentUser ? (
              <>
                {/* Mes recherches */}
                <button className="flex flex-col items-center text-gray-600 hover:text-primary-bolt-500 transition-colors group">
                  <Bell className="h-5 w-5 mb-1 group-hover:scale-110 transition-transform" />
                  <span className="text-xs">Mes recherches</span>
                </button>

                {/* Favoris */}
                <button className="flex flex-col items-center text-gray-600 hover:text-primary-bolt-500 transition-colors group">
                  <Heart className="h-5 w-5 mb-1 group-hover:scale-110 transition-transform" />
                  <span className="text-xs">Favoris</span>
                </button>

                {/* Messages */}
                <button 
                  onClick={() => handleNavClick('messages')}
                  className="flex flex-col items-center text-gray-600 hover:text-primary-bolt-500 transition-colors group relative"
                >
                  <MessageCircle className="h-5 w-5 mb-1 group-hover:scale-110 transition-transform" />
                  <span className="text-xs">Messages</span>
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    3
                  </span>
                </button>

                {/* User Menu */}
                <div className="relative group">
                  <button className="flex flex-col items-center text-gray-600 hover:text-primary-bolt-500 transition-colors">
                    <User className="h-5 w-5 mb-1 group-hover:scale-110 transition-transform" />
                    <span className="text-xs">{currentUser.name}</span>
                  </button>
                  
                  {/* Dropdown Menu */}
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="py-2">
                      <button
                        onClick={() => handleNavClick('dashboard')}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        Mon compte
                      </button>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        Se déconnecter
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <button
                onClick={() => handleAuthClick('login')}
                className="flex flex-col items-center text-gray-600 hover:text-primary-bolt-500 transition-colors group"
              >
                <User className="h-5 w-5 mb-1 group-hover:scale-110 transition-transform" />
                <span className="text-xs">Se connecter</span>
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-gray-600 hover:text-primary-bolt-500 hover:bg-gray-50 transition-all duration-200"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Categories Menu */}
      <div className="hidden lg:block border-t border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-8 py-3">
            {categories.map((category, index) => (
              <React.Fragment key={category.id}>
                <button
                  onClick={() => handleCategoryClick(category.id)}
                  className={`text-sm transition-all duration-200 relative py-2 ${
                    activeCategory === category.id
                      ? 'text-primary-bolt-500'
                      : 'text-gray-700 hover:text-primary-bolt-500'
                  }`}
                >
                  {category.label}
                  {activeCategory === category.id && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-bolt-500 rounded-full"></div>
                  )}
                </button>
                {index < categories.length - 1 && (
                  <span className="text-gray-300 text-sm">•</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="px-4 py-4 space-y-4">
            {/* Mobile Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Rechercher sur auto2roues"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-bolt-500 focus:border-primary-bolt-500 transition-all"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-gray-400">
                <Search className="h-5 w-5" />
              </button>
            </div>

            {/* Mobile Deposit Button */}
            <button
              onClick={() => handleNavClick('create-listing')}
              className="w-full bg-gradient-to-r from-primary-bolt-500 to-primary-bolt-600 hover:from-primary-bolt-600 hover:to-primary-bolt-700 text-white py-3 px-4 rounded-lg font-medium transition-all duration-200"
            >
              Déposer une annonce
            </button>

            {/* Mobile Categories */}
            <div className="border-t border-gray-200 pt-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Catégories</h3>
              <div className="grid grid-cols-1 gap-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryClick(category.id)}
                    className={`text-left py-2 px-3 rounded-lg text-sm transition-all duration-200 ${
                      activeCategory === category.id
                        ? 'bg-primary-bolt-50 text-primary-bolt-500'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile User Actions */}
            <div className="border-t border-gray-200 pt-4 space-y-2">
              {currentUser ? (
                <>
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-8 h-8 bg-gradient-to-r from-primary-bolt-500 to-primary-bolt-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">
                        {currentUser.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{currentUser.name}</p>
                      <p className="text-sm text-gray-500">
                        {currentUser.type === 'professional' ? 'Professionnel' : 'Particulier'}
                      </p>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => handleNavClick('dashboard')}
                    className="w-full text-left py-3 px-4 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    Mon compte
                  </button>
                  
                  <button
                    onClick={() => handleNavClick('messages')}
                    className="w-full text-left py-3 px-4 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors flex items-center justify-between"
                  >
                    <span>Messages</span>
                    <span className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      3
                    </span>
                  </button>
                  
                  <button
                    onClick={handleLogout}
                    className="w-full text-left py-3 px-4 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    Se déconnecter
                  </button>
                </>
              ) : (
                <div className="space-y-2">
                  <button
                    onClick={() => handleAuthClick('login')}
                    className="w-full text-left py-3 px-4 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    Se connecter
                  </button>
                  <button
                    onClick={() => handleAuthClick('register')}
                    className="w-full text-left py-3 px-4 bg-primary-bolt-50 text-primary-bolt-500 hover:bg-primary-bolt-100 rounded-lg transition-colors"
                  >
                    S'inscrire
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};