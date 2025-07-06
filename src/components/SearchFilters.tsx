import React, { useState } from 'react';
import { Filter, X, ChevronDown } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { brands, fuelTypes, conditions, categories } from '../utils/mockData';

interface SearchFiltersProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchFilters: React.FC<SearchFiltersProps> = ({ isOpen, onClose }) => {
  const { searchFilters, setSearchFilters } = useApp();
  const [localFilters, setLocalFilters] = useState(searchFilters);

  const handleFilterChange = (key: string, value: any) => {
    setLocalFilters({ ...localFilters, [key]: value });
  };

  const applyFilters = () => {
    setSearchFilters(localFilters);
    onClose();
  };

  const clearFilters = () => {
    setLocalFilters({});
    setSearchFilters({});
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <Filter className="h-6 w-6 text-primary-bolt-500" />
            <h2 className="text-xl font-semibold text-gray-900">Filtres de recherche</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Filters Content */}
        <div className="p-6 space-y-6">
          {/* Category and Brand */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Catégorie
              </label>
              <select
                value={localFilters.category || ''}
                onChange={(e) => handleFilterChange('category', e.target.value || undefined)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-bolt-500 focus:border-primary-bolt-500"
              >
                <option value="">Toutes catégories</option>
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.icon} {cat.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Marque
              </label>
              <select
                value={localFilters.brand || ''}
                onChange={(e) => handleFilterChange('brand', e.target.value || undefined)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-bolt-500 focus:border-primary-bolt-500"
              >
                <option value="">Toutes marques</option>
                {brands.map((brand) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Price Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Prix (€)
            </label>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                placeholder="Prix min"
                value={localFilters.priceFrom || ''}
                onChange={(e) => handleFilterChange('priceFrom', e.target.value ? parseInt(e.target.value) : undefined)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-bolt-500 focus:border-primary-bolt-500"
              />
              <input
                type="number"
                placeholder="Prix max"
                value={localFilters.priceTo || ''}
                onChange={(e) => handleFilterChange('priceTo', e.target.value ? parseInt(e.target.value) : undefined)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-bolt-500 focus:border-primary-bolt-500"
              />
            </div>
          </div>

          {/* Year Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Année
            </label>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                placeholder="Année min"
                value={localFilters.yearFrom || ''}
                onChange={(e) => handleFilterChange('yearFrom', e.target.value ? parseInt(e.target.value) : undefined)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-bolt-500 focus:border-primary-bolt-500"
              />
              <input
                type="number"
                placeholder="Année max"
                value={localFilters.yearTo || ''}
                onChange={(e) => handleFilterChange('yearTo', e.target.value ? parseInt(e.target.value) : undefined)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-bolt-500 focus:border-primary-bolt-500"
              />
            </div>
          </div>

          {/* Mileage Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Kilométrage
            </label>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                placeholder="Km min"
                value={localFilters.mileageFrom || ''}
                onChange={(e) => handleFilterChange('mileageFrom', e.target.value ? parseInt(e.target.value) : undefined)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-bolt-500 focus:border-primary-bolt-500"
              />
              <input
                type="number"
                placeholder="Km max"
                value={localFilters.mileageTo || ''}
                onChange={(e) => handleFilterChange('mileageTo', e.target.value ? parseInt(e.target.value) : undefined)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-bolt-500 focus:border-primary-bolt-500"
              />
            </div>
          </div>

          {/* Fuel Type and Condition */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Carburant
              </label>
              <select
                value={localFilters.fuelType || ''}
                onChange={(e) => handleFilterChange('fuelType', e.target.value || undefined)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-bolt-500 focus:border-primary-bolt-500"
              >
                <option value="">Tous carburants</option>
                {fuelTypes.map((fuel) => (
                  <option key={fuel.value} value={fuel.value}>
                    {fuel.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                État
              </label>
              <select
                value={localFilters.condition || ''}
                onChange={(e) => handleFilterChange('condition', e.target.value || undefined)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-bolt-500 focus:border-primary-bolt-500"
              >
                <option value="">Tous états</option>
                {conditions.map((condition) => (
                  <option key={condition.value} value={condition.value}>
                    {condition.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Localisation
            </label>
            <input
              type="text"
              placeholder="Ville, département, région..."
              value={localFilters.location || ''}
              onChange={(e) => handleFilterChange('location', e.target.value || undefined)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-bolt-500 focus:border-primary-bolt-500"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center p-6 border-t border-gray-200 bg-gray-50">
          <button
            onClick={clearFilters}
            className="px-6 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors"
          >
            Effacer les filtres
          </button>
          <div className="flex space-x-4">
            <button
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Annuler
            </button>
            <button
              onClick={applyFilters}
              className="px-6 py-2 bg-primary-bolt-500 text-white rounded-lg hover:bg-primary-bolt-600 transition-colors font-medium"
            >
              Appliquer les filtres
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};