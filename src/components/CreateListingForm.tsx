import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Upload, X, Check, Car, Bike, Wrench, Package, Camera } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { getBrandsBySubcategory, fuelTypes } from '../utils/mockData';

interface FormData {
  // Étape 1: Catégorie principale
  category: string;
  
  // Étape 2: Sous-catégorie
  subcategory: string;
  
  // Étape 3: Titre et immatriculation
  title: string;
  registrationNumber?: string;
  
  // Étape 4: Détails spécifiques (dynamiques selon la sous-catégorie)
  specificDetails: Record<string, any>;
  
  // Étape 5: Description
  description: string;
  
  // Étape 6: Photos
  photos: File[];
  
  // Étape 7: Prix
  price: number;
  
  // Étape 8: Localisation
  location: {
    city: string;
    postalCode: string;
  };
  
  // Étape 9: Contact
  contact: {
    phone: string;
    email: string;
    hidePhone: boolean;
  };
}

const CATEGORIES = [
  {
    id: 'car-utility',
    name: 'Voitures - Utilitaires',
    icon: Car,
    color: 'from-blue-500 to-blue-600',
    subcategories: [
      { id: 'car', name: 'Voiture' },
      { id: 'utility', name: 'Utilitaire' },
      { id: 'caravan', name: 'Caravane' },
      { id: 'trailer', name: 'Remorque' }
    ]
  },
  {
    id: 'moto-quad-marine',
    name: 'Motos, Scooters, Quads, Nautisme',
    icon: Bike,
    color: 'from-green-500 to-green-600',
    subcategories: [
      { id: 'motorcycle', name: 'Moto' },
      { id: 'scooter', name: 'Scooter' },
      { id: 'quad', name: 'Quad' },
      { id: 'jetski', name: 'Jetski' },
      { id: 'boat', name: 'Bateau' }
    ]
  },
  {
    id: 'services',
    name: 'Services',
    icon: Wrench,
    color: 'from-orange-500 to-orange-600',
    subcategories: [
      { id: 'repair', name: 'Réparation' },
      { id: 'towing', name: 'Remorquage' },
      { id: 'maintenance', name: 'Entretien' },
      { id: 'other', name: 'Autre' }
    ]
  },
  {
    id: 'spare-parts',
    name: 'Pièces détachées',
    icon: Package,
    color: 'from-purple-500 to-purple-600',
    subcategories: [
      { id: 'moto-parts', name: 'Moto' },
      { id: 'vehicle-parts', name: 'Véhicule' }
    ]
  }
];

// Équipements prédéfinis pour les véhicules
const VEHICLE_EQUIPMENT = {
  car: [
    'Toit ouvrant / Toit panoramique',
    'Climatisation',
    'GPS',
    'Sièges chauffants',
    'Caméra de recul',
    'Radar de recul',
    'Jantes alliage',
    'Feux LED / Xénon',
    'Vitres électriques',
    'Airbags',
    'Sièges électriques',
    'Attelage',
    'Régulateur de vitesse',
    'Bluetooth',
    'Système audio premium',
    'Cuir'
  ],
  motorcycle: [
    'ABS',
    'Contrôle de traction',
    'Modes de conduite',
    'Éclairage LED',
    'Quickshifter',
    'Chauffage poignées',
    'Pare-brise',
    'Top case',
    'Sacoches',
    'Antivol',
    'Compteur digital',
    'USB'
  ],
  utility: [
    'Climatisation',
    'GPS',
    'Caméra de recul',
    'Radar de recul',
    'Vitres électriques',
    'Airbags',
    'Feux LED / Xénon',
    'Attelage'
  ],
  caravan: [
    'Cuisine équipée',
    'Douche / WC',
    'Réfrigérateur',
    'Chauffage',
    'Panneaux solaires',
    'Store extérieur',
    'Réserve d\'eau',
    'Auvent',
    'TV',
    'Antenne satellite',
    'Éclairage LED',
    'Prises 12V/220V'
  ]
};

// Marques de caravanes
const CARAVAN_BRANDS = [
  'Hymer',
  'Hobby',
  'Dethleffs',
  'Fendt',
  'Knaus',
  'Bürstner',
  'Tabbert',
  'Weinsberg',
  'LMC',
  'Eura Mobil',
  'Caravelair',
  'Sterckeman',
  'La Mancelle',
  'Silver',
  'Notin',
  'Rapido',
  'Bailey',
  'Swift',
  'Lunar',
  'Elddis',
  'Coachman',
  'Kip',
  'Biod',
  'Polar',
  'Cabby',
  'Adria',
  'Eriba',
  'T@B',
  'Camp-let',
  'Trigano',
  'CI',
  'Burstner Averso'
];

// Types de caravanes
const CARAVAN_TYPES = [
  'Caravane rigide',
  'Caravane pliante',
  'Caravane surbaissée',
  'Caravane avec double essieu',
  'Autre'
];

// Nouvelles constantes pour les détails spécifiques des voitures
const VEHICLE_TYPES = [
  { value: 'citadine', label: 'Citadine' },
  { value: 'berline', label: 'Berline' },
  { value: 'suv', label: 'SUV' },
  { value: 'break', label: 'Break' },
  { value: 'coupe', label: 'Coupé' },
  { value: 'cabriolet', label: 'Cabriolet' },
  { value: 'monospace', label: 'Monospace' },
  { value: 'pickup', label: 'Pick-up' },
  { value: 'sportive', label: 'Sportive' },
  { value: 'compacte', label: 'Compacte' }
];

const TRANSMISSION_TYPES = [
  { value: 'manual', label: 'Manuelle' },
  { value: 'automatic', label: 'Automatique' },
  { value: 'semi-automatic', label: 'Semi-automatique' }
];

const DOOR_OPTIONS = [
  { value: '3', label: '3 portes' },
  { value: '5', label: '5 portes' }
];

const UPHOLSTERY_OPTIONS = [
  { value: 'tissu', label: 'Tissu' },
  { value: 'cuir_partiel', label: 'Cuir partiel' },
  { value: 'cuir', label: 'Cuir' },
  { value: 'velours', label: 'Velours' },
  { value: 'alcantara', label: 'Alcantara' }
];

const EMISSION_CLASSES = [
  { value: 'euro1', label: 'Euro 1' },
  { value: 'euro2', label: 'Euro 2' },
  { value: 'euro3', label: 'Euro 3' },
  { value: 'euro4', label: 'Euro 4' },
  { value: 'euro5', label: 'Euro 5' },
  { value: 'euro6', label: 'Euro 6' }
];

export const CreateListingForm: React.FC = () => {
  const { currentUser, setShowAuthModal, setAuthMode } = useApp();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    category: '',
    subcategory: '',
    title: '',
    registrationNumber: '',
    specificDetails: {},
    description: '',
    photos: [],
    price: 0,
    location: { city: '', postalCode: '' },
    contact: { phone: '', email: '', hidePhone: false }
  });

  const totalSteps = 10; // Ajout d'une étape de récapitulatif

  // Réinitialiser la sous-catégorie quand la catégorie change
  useEffect(() => {
    if (formData.category) {
      setFormData(prev => ({ 
        ...prev, 
        subcategory: '', 
        specificDetails: {} 
      }));
    }
  }, [formData.category]);

  // Réinitialiser la marque quand la sous-catégorie change
  useEffect(() => {
    if (formData.subcategory) {
      setFormData(prev => ({ 
        ...prev, 
        specificDetails: { 
          ...prev.specificDetails, 
          brand: '' // Réinitialiser la marque
        } 
      }));
    }
  }, [formData.subcategory]);
  // Avancement automatique des étapes
  useEffect(() => {
    if (currentStep === 1 && formData.category) {
      setTimeout(() => setCurrentStep(2), 300);
    }
  }, [formData.category, currentStep]);

  useEffect(() => {
    if (currentStep === 2 && formData.subcategory) {
      setTimeout(() => setCurrentStep(3), 300);
    }
  }, [formData.subcategory, currentStep]);

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const updateSpecificDetails = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      specificDetails: { ...prev.specificDetails, [field]: value }
    }));
  };

  const toggleEquipment = (equipment: string) => {
    const currentEquipment = formData.specificDetails.equipment || [];
    const updatedEquipment = currentEquipment.includes(equipment)
      ? currentEquipment.filter((item: string) => item !== equipment)
      : [...currentEquipment, equipment];
    
    updateSpecificDetails('equipment', updatedEquipment);
  };

  const toggleAmenity = (amenity: string) => {
    const currentAmenities = formData.specificDetails.amenities || [];
    const updatedAmenities = currentAmenities.includes(amenity)
      ? currentAmenities.filter((item: string) => item !== amenity)
      : [...currentAmenities, amenity];
    
    updateSpecificDetails('amenities', updatedAmenities);
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.category !== '';
      case 2:
        return formData.subcategory !== '';
      case 3:
        return formData.title.trim() !== '';
      case 4:
        // Validation spécifique pour les voitures
        if (formData.subcategory === 'car') {
          return formData.specificDetails.brand && 
                 formData.specificDetails.model && 
                 formData.specificDetails.year && 
                 formData.specificDetails.mileage && 
                 formData.specificDetails.fuelType;
        }
        // Validation pour les motos
        if (formData.subcategory === 'motorcycle') {
          return formData.specificDetails.brand && 
                 formData.specificDetails.model && 
                 formData.specificDetails.year && 
                 formData.specificDetails.mileage;
        }
        // Validation spécifique pour les caravanes
        if (formData.subcategory === 'caravan') {
          return formData.specificDetails.model && 
                 formData.specificDetails.year && 
                 formData.specificDetails.length && 
                 formData.specificDetails.width && 
                 formData.specificDetails.height && 
                 formData.specificDetails.sleepingCapacity && 
                 formData.specificDetails.ptac && 
                 formData.specificDetails.caravanType;
        }
        // Validation pour les utilitaires
        if (formData.subcategory === 'utility') {
          return formData.specificDetails.brand && 
                 formData.specificDetails.model && 
                 formData.specificDetails.year && 
                 formData.specificDetails.mileage && 
                 formData.specificDetails.fuelType;
        }
        return true; // Pour les autres sous-catégories, on permet de passer
      case 5:
        return formData.description.trim() !== '';
      case 6:
        return true; // Photos optionnelles
      case 7:
        return formData.price > 0;
      case 8:
        return formData.location.city !== '' && formData.location.postalCode !== '';
      case 9:
        return formData.contact.phone !== '';
      case 10:
        return true; // Étape de récapitulatif
      default:
        return false;
    }
  };

  const getSelectedCategory = () => {
    return CATEGORIES.find(cat => cat.id === formData.category);
  };

  const getSelectedSubcategory = () => {
    const category = getSelectedCategory();
    return category?.subcategories.find(sub => sub.id === formData.subcategory);
  };

  // Vérifier si la sous-catégorie nécessite un numéro d'immatriculation
  const needsRegistrationNumber = () => {
    const vehicleSubcategories = ['car', 'motorcycle', 'utility', 'caravan', 'quad', 'jetski', 'boat'];
    return vehicleSubcategories.includes(formData.subcategory);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setFormData(prev => ({
      ...prev,
      photos: [...prev.photos, ...files]
    }));
  };

  const removePhoto = (index: number) => {
    setFormData(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index)
    }));
  };

  const renderSpecificDetailsFields = () => {
    const subcategory = getSelectedSubcategory();
    if (!subcategory) return null;

    // Champs spécifiques pour les voitures
    if (subcategory.id === 'car') {
      const selectedEquipment = formData.specificDetails.equipment || [];
      
      return (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Marque *
              </label>
              <select
                value={formData.specificDetails.brand || ''}
                onChange={(e) => updateSpecificDetails('brand', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-bolt-500 focus:border-primary-bolt-500 transition-all"
              >
                <option value="">Sélectionnez une marque</option>
                {brands.map((brand) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Modèle *
              </label>
              <input
                type="text"
                value={formData.specificDetails.model || ''}
                onChange={(e) => updateSpecificDetails('model', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-bolt-500 focus:border-primary-bolt-500 transition-all"
                placeholder="Ex: 320d"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Année *
              </label>
              <input
                type="number"
                value={formData.specificDetails.year || ''}
                onChange={(e) => updateSpecificDetails('year', parseInt(e.target.value) || '')}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-bolt-500 focus:border-primary-bolt-500 transition-all"
                placeholder="2020"
                min="1990"
                max={new Date().getFullYear() + 1}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Type de véhicule
              </label>
              <select
                value={formData.specificDetails.vehicleType || ''}
                onChange={(e) => updateSpecificDetails('vehicleType', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-bolt-500 focus:border-primary-bolt-500 transition-all"
              >
                <option value="">Sélectionnez un type</option>
                {VEHICLE_TYPES.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Kilométrage *
            </label>
            <input
              type="number"
              value={formData.specificDetails.mileage || ''}
              onChange={(e) => updateSpecificDetails('mileage', parseInt(e.target.value) || '')}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-bolt-500 focus:border-primary-bolt-500 transition-all"
              placeholder="50000"
              min="0"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Boîte de vitesses
              </label>
              <select
                value={formData.specificDetails.transmission || ''}
                onChange={(e) => updateSpecificDetails('transmission', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-bolt-500 focus:border-primary-bolt-500 transition-all"
              >
                <option value="">Sélectionnez un type</option>
                {TRANSMISSION_TYPES.map((transmission) => (
                  <option key={transmission.value} value={transmission.value}>
                    {transmission.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Carburant *
              </label>
              <select
                value={formData.specificDetails.fuelType || ''}
                onChange={(e) => updateSpecificDetails('fuelType', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-bolt-500 focus:border-primary-bolt-500 transition-all"
              >
                <option value="">Sélectionnez un carburant</option>
                {fuelTypes.map((fuel) => (
                  <option key={fuel.value} value={fuel.value}>
                    {fuel.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Couleur
              </label>
              <input
                type="text"
                value={formData.specificDetails.color || ''}
                onChange={(e) => updateSpecificDetails('color', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-bolt-500 focus:border-primary-bolt-500 transition-all"
                placeholder="Ex: Noir métallisé"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Puissance (CV)
              </label>
              <input
                type="number"
                value={formData.specificDetails.power || ''}
                onChange={(e) => updateSpecificDetails('power', parseInt(e.target.value) || '')}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-bolt-500 focus:border-primary-bolt-500 transition-all"
                placeholder="150"
                min="0"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Nombre de portes
              </label>
              <select
                value={formData.specificDetails.doors || ''}
                onChange={(e) => updateSpecificDetails('doors', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-bolt-500 focus:border-primary-bolt-500 transition-all"
              >
                <option value="">Sélectionnez</option>
                {DOOR_OPTIONS.map((door) => (
                  <option key={door.value} value={door.value}>
                    {door.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Sellerie
              </label>
              <select
                value={formData.specificDetails.upholstery || ''}
                onChange={(e) => updateSpecificDetails('upholstery', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-bolt-500 focus:border-primary-bolt-500 transition-all"
              >
                <option value="">Sélectionnez un type</option>
                {UPHOLSTERY_OPTIONS.map((upholstery) => (
                  <option key={upholstery.value} value={upholstery.value}>
                    {upholstery.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Classe d'émissions
            </label>
            <select
              value={formData.specificDetails.emissionClass || ''}
              onChange={(e) => updateSpecificDetails('emissionClass', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-bolt-500 focus:border-primary-bolt-500 transition-all"
            >
              <option value="">Sélectionnez une classe</option>
              {EMISSION_CLASSES.map((emission) => (
                <option key={emission.value} value={emission.value}>
                  {emission.label}
                </option>
              ))}
            </select>
          </div>

          {/* Équipements sous forme de cases à cocher */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-4">
              Équipements (optionnel)
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {VEHICLE_EQUIPMENT.car.map((equipment) => (
                <label
                  key={equipment}
                  className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={selectedEquipment.includes(equipment)}
                    onChange={() => toggleEquipment(equipment)}
                    className="h-4 w-4 text-primary-bolt-500 focus:ring-primary-bolt-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700">{equipment}</span>
                </label>
              ))}
            </div>
            {selectedEquipment.length > 0 && (
              <p className="text-sm text-gray-500 mt-2">
                {selectedEquipment.length} équipement{selectedEquipment.length > 1 ? 's' : ''} sélectionné{selectedEquipment.length > 1 ? 's' : ''}
              </p>
            )}
          </div>
        </div>
      );
    }

    // Champs spécifiques pour les utilitaires
    if (subcategory.id === 'utility') {
      const selectedEquipment = formData.specificDetails.equipment || [];
      
      return (
        <div className="space-y-6">
          {/* Type de véhicule utilitaire */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Type de véhicule utilitaire *
            </label>
            <select
              value={formData.specificDetails.utilityType || ''}
              onChange={(e) => updateSpecificDetails('utilityType', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-bolt-500 focus:border-primary-bolt-500 transition-all"
            >
              <option value="">Sélectionnez un type</option>
              <option value="camionnette">Camionnette</option>
              <option value="fourgon">Fourgon</option>
              <option value="fourgonnette">Fourgonnette</option>
              <option value="pickup">Pick-up</option>
              <option value="plateau">Plateau</option>
              <option value="camion_benne">Camion benne</option>
              <option value="vehicule_frigorifique">Véhicule frigorifique</option>
              <option value="vehicule_atelier">Véhicule atelier</option>
              <option value="autre_utilitaire">Autre utilitaire</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Marque *
              </label>
              <select
                value={formData.specificDetails.brand || ''}
                onChange={(e) => updateSpecificDetails('brand', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-bolt-500 focus:border-primary-bolt-500 transition-all"
              >
                <option value="">Sélectionnez une marque</option>
                {brands.map((brand) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Modèle *
              </label>
              <input
                type="text"
                value={formData.specificDetails.model || ''}
                onChange={(e) => updateSpecificDetails('model', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-bolt-500 focus:border-primary-bolt-500 transition-all"
                placeholder="Ex: Transit Custom"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Année de mise en circulation *
              </label>
              <input
                type="number"
                value={formData.specificDetails.year || ''}
                onChange={(e) => updateSpecificDetails('year', parseInt(e.target.value) || '')}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-bolt-500 focus:border-primary-bolt-500 transition-all"
                placeholder="2020"
                min="1990"
                max={new Date().getFullYear() + 1}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Kilométrage *
              </label>
              <input
                type="number"
                value={formData.specificDetails.mileage || ''}
                onChange={(e) => updateSpecificDetails('mileage', parseInt(e.target.value) || '')}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-bolt-500 focus:border-primary-bolt-500 transition-all"
                placeholder="50000"
                min="0"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Boîte de vitesses
              </label>
              <select
                value={formData.specificDetails.transmission || ''}
                onChange={(e) => updateSpecificDetails('transmission', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-bolt-500 focus:border-primary-bolt-500 transition-all"
              >
                <option value="">Sélectionnez</option>
                <option value="manual">Manuelle</option>
                <option value="automatic">Automatique</option>
                <option value="semi-automatic">Semi-automatique</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Carburant *
              </label>
              <select
                value={formData.specificDetails.fuelType || ''}
                onChange={(e) => updateSpecificDetails('fuelType', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-bolt-500 focus:border-primary-bolt-500 transition-all"
              >
                <option value="">Sélectionnez un carburant</option>
                {fuelTypes.map((fuel) => (
                  <option key={fuel.value} value={fuel.value}>
                    {fuel.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Puissance (CV)
              </label>
              <input
                type="number"
                value={formData.specificDetails.power || ''}
                onChange={(e) => updateSpecificDetails('power', parseInt(e.target.value) || '')}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-bolt-500 focus:border-primary-bolt-500 transition-all"
                placeholder="120"
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Nombre de places
              </label>
              <input
                type="number"
                value={formData.specificDetails.seats || ''}
                onChange={(e) => updateSpecificDetails('seats', parseInt(e.target.value) || '')}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-bolt-500 focus:border-primary-bolt-500 transition-all"
                placeholder="3"
                min="1"
                max="9"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Nombre de portes
              </label>
              <input
                type="number"
                value={formData.specificDetails.doors || ''}
                onChange={(e) => updateSpecificDetails('doors', parseInt(e.target.value) || '')}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-bolt-500 focus:border-primary-bolt-500 transition-all"
                placeholder="3"
                min="2"
                max="5"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Couleur
              </label>
              <input
                type="text"
                value={formData.specificDetails.color || ''}
                onChange={(e) => updateSpecificDetails('color', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-bolt-500 focus:border-primary-bolt-500 transition-all"
                placeholder="Ex: Blanc"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                PTAC (Poids Total Autorisé en Charge)
              </label>
              <input
                type="text"
                value={formData.specificDetails.ptac || ''}
                onChange={(e) => updateSpecificDetails('ptac', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-bolt-500 focus:border-primary-bolt-500 transition-all"
                placeholder="Ex: 3500 kg"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Volume utile (en m³) - Optionnel
            </label>
            <input
              type="number"
              step="0.1"
              value={formData.specificDetails.volume || ''}
              onChange={(e) => updateSpecificDetails('volume', parseFloat(e.target.value) || '')}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-bolt-500 focus:border-primary-bolt-500 transition-all"
              placeholder="Ex: 12.5"
              min="0"
            />
          </div>

          {/* Équipements spécifiques aux utilitaires */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-4">
              Équipements (optionnel)
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {VEHICLE_EQUIPMENT.utility.map((equipment) => (
                <label
                  key={equipment}
                  className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={selectedEquipment.includes(equipment)}
                    onChange={() => toggleEquipment(equipment)}
                    className="h-4 w-4 text-primary-bolt-500 focus:ring-primary-bolt-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700">{equipment}</span>
                </label>
              ))}
            </div>
            {selectedEquipment.length > 0 && (
              <p className="text-sm text-gray-500 mt-2">
                {selectedEquipment.length} équipement{selectedEquipment.length > 1 ? 's' : ''} sélectionné{selectedEquipment.length > 1 ? 's' : ''}
              </p>
            )}
          </div>
        </div>
      );
    }

    // Champs spécifiques pour les caravanes
    if (subcategory.id === 'caravan') {
      const selectedAmenities = formData.specificDetails.amenities || [];
      
      return (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Marque (optionnel)
              </label>
              <select
                value={formData.specificDetails.brand || ''}
                onChange={(e) => updateSpecificDetails('brand', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-bolt-500 focus:border-primary-bolt-500 transition-all"
              >
                <option value="">Sélectionnez une marque</option>
                {CARAVAN_BRANDS.map((brand) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Modèle ou Référence *
              </label>
              <input
                type="text"
                value={formData.specificDetails.model || ''}
                onChange={(e) => updateSpecificDetails('model', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-bolt-500 focus:border-primary-bolt-500 transition-all"
                placeholder="Ex: Prestige 560"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Année de mise en circulation *
            </label>
            <input
              type="number"
              value={formData.specificDetails.year || ''}
              onChange={(e) => updateSpecificDetails('year', parseInt(e.target.value) || '')}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-bolt-500 focus:border-primary-bolt-500 transition-all"
              placeholder="2020"
              min="1990"
              max={new Date().getFullYear() + 1}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-4">
              Dimensions *
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs text-gray-600 mb-1">Longueur (m)</label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.specificDetails.length || ''}
                  onChange={(e) => updateSpecificDetails('length', parseFloat(e.target.value) || '')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-bolt-500 focus:border-primary-bolt-500 transition-all"
                  placeholder="6.5"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Largeur (m)</label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.specificDetails.width || ''}
                  onChange={(e) => updateSpecificDetails('width', parseFloat(e.target.value) || '')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-bolt-500 focus:border-primary-bolt-500 transition-all"
                  placeholder="2.3"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Hauteur (m)</label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.specificDetails.height || ''}
                  onChange={(e) => updateSpecificDetails('height', parseFloat(e.target.value) || '')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-bolt-500 focus:border-primary-bolt-500 transition-all"
                  placeholder="2.6"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Nombre de couchages *
              </label>
              <input
                type="number"
                value={formData.specificDetails.sleepingCapacity || ''}
                onChange={(e) => updateSpecificDetails('sleepingCapacity', parseInt(e.target.value) || '')}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-bolt-500 focus:border-primary-bolt-500 transition-all"
                placeholder="4"
                min="1"
                max="12"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                PTAC (kg) *
              </label>
              <input
                type="number"
                value={formData.specificDetails.ptac || ''}
                onChange={(e) => updateSpecificDetails('ptac', parseInt(e.target.value) || '')}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-bolt-500 focus:border-primary-bolt-500 transition-all"
                placeholder="1500"
                min="500"
                max="5000"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Type de caravane *
            </label>
            <select
              value={formData.specificDetails.caravanType || ''}
              onChange={(e) => updateSpecificDetails('caravanType', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-bolt-500 focus:border-primary-bolt-500 transition-all"
            >
              <option value="">Sélectionnez un type</option>
              {CARAVAN_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Aménagements sous forme de cases à cocher */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-4">
              Options / Aménagements (optionnel)
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {VEHICLE_EQUIPMENT.caravan.map((amenity) => (
                <label
                  key={amenity}
                  className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={selectedAmenities.includes(amenity)}
                    onChange={() => toggleAmenity(amenity)}
                    className="h-4 w-4 text-primary-bolt-500 focus:ring-primary-bolt-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700">{amenity}</span>
                </label>
              ))}
            </div>
            {selectedAmenities.length > 0 && (
              <p className="text-sm text-gray-500 mt-2">
                {selectedAmenities.length} aménagement{selectedAmenities.length > 1 ? 's' : ''} sélectionné{selectedAmenities.length > 1 ? 's' : ''}
              </p>
            )}
          </div>
        </div>
      );
    }

    // Équipements pour motos
    if (subcategory.id === 'motorcycle') {
      const selectedEquipment = formData.specificDetails.equipment || [];
      const availableBrands = getBrandsBySubcategory(subcategory.id);
      
      return (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Marque *
              </label>
              <select
                value={formData.specificDetails.brand || ''}
                onChange={(e) => updateSpecificDetails('brand', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-bolt-500 focus:border-primary-bolt-500 transition-all"
              >
                <option value="">Sélectionnez une marque</option>
                {availableBrands.map((brand) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Modèle *
              </label>
              <input
                type="text"
                value={formData.specificDetails.model || ''}
                onChange={(e) => updateSpecificDetails('model', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-bolt-500 focus:border-primary-bolt-500 transition-all"
                placeholder="Ex: MT-07"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Année *
              </label>
              <input
                type="number"
                value={formData.specificDetails.year || ''}
                onChange={(e) => updateSpecificDetails('year', parseInt(e.target.value) || '')}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-bolt-500 focus:border-primary-bolt-500 transition-all"
                placeholder="2020"
                min="1990"
                max={new Date().getFullYear() + 1}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Kilométrage *
              </label>
              <input
                type="number"
                value={formData.specificDetails.mileage || ''}
                onChange={(e) => updateSpecificDetails('mileage', parseInt(e.target.value) || '')}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-bolt-500 focus:border-primary-bolt-500 transition-all"
                placeholder="15000"
                min="0"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Cylindrée (cm³)
            </label>
            <input
              type="number"
              value={formData.specificDetails.displacement || ''}
              onChange={(e) => updateSpecificDetails('displacement', parseInt(e.target.value) || '')}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-bolt-500 focus:border-primary-bolt-500 transition-all"
              placeholder="689"
              min="50"
              max="2000"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-4">
              Équipements (optionnel)
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {VEHICLE_EQUIPMENT.motorcycle.map((equipment) => (
                <label
                  key={equipment}
                  className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={selectedEquipment.includes(equipment)}
                    onChange={() => toggleEquipment(equipment)}
                    className="h-4 w-4 text-primary-bolt-500 focus:ring-primary-bolt-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700">{equipment}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      );
    }

    // Champ générique pour les autres sous-catégories
    const availableBrands = getBrandsBySubcategory(subcategory.id);
    const showBrandField = availableBrands.length > 0;
    
    const placeholderText = {
      // Voitures - Utilitaires
      'caravan': 'Marque, modèle, année, nombre de places, équipements, etc.',
      'trailer': 'Type de remorque, charge utile, dimensions, etc.',
      
      // Motos, Scooters, Quads, Nautisme
      'scooter': 'Marque, modèle, année, cylindrée, kilométrage, etc.',
      'quad': 'Marque, modèle, année, cylindrée, type (sport/utilitaire), etc.',
      'jetski': 'Marque, modèle, année, puissance, heures de fonctionnement, etc.',
      'boat': 'Marque, modèle, année, longueur, motorisation, etc.',
      
      // Services
      'repair': 'Types de réparations, spécialités, zone d\'intervention, etc.',
      'towing': 'Zone de remorquage, types de véhicules, tarifs, etc.',
      'maintenance': 'Types d\'entretien, marques spécialisées, services inclus, etc.',
      'other': 'Description du service proposé, zone d\'intervention, etc.',
      
      // Pièces détachées
      'moto-parts': 'Type de pièce, compatibilité, état, référence, etc.',
      'vehicle-parts': 'Type de pièce, compatibilité, état, référence, etc.'
    };

    return (
      <div className="space-y-4">
        {/* Champ marque si disponible pour cette sous-catégorie */}
        {showBrandField && (
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Marque
            </label>
            <select
              value={formData.specificDetails.brand || ''}
              onChange={(e) => updateSpecificDetails('brand', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-bolt-500 focus:border-primary-bolt-500 transition-all"
            >
              <option value="">Sélectionnez une marque</option>
              {availableBrands.map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
          </div>
        )}
        
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Détails spécifiques pour {subcategory.name}
          </label>
          <textarea
            value={formData.specificDetails.details || ''}
            onChange={(e) => updateSpecificDetails('details', e.target.value)}
            rows={6}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-bolt-500 focus:border-primary-bolt-500 transition-all"
            placeholder={placeholderText[subcategory.id] || 'Détails spécifiques...'}
          />
          <p className="text-sm text-gray-500 mt-2">
            Renseignez les informations techniques et caractéristiques importantes pour votre {subcategory.name.toLowerCase()}.
          </p>
        </div>
      </div>
    );
  };

  const renderRecapStep = () => {
    const selectedCategory = getSelectedCategory();
    const selectedSubcategory = getSelectedSubcategory();

    return (
      <div className="space-y-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Récapitulatif de votre annonce
          </h2>
          <p className="text-gray-600">
            Vérifiez les informations avant de publier votre annonce
          </p>
        </div>

        <div className="space-y-6">
          {/* Catégorie et sous-catégorie */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Catégorie</h3>
            <div className="flex items-center space-x-3">
              <span className="px-3 py-1 bg-primary-bolt-100 text-primary-bolt-500 rounded-full text-sm font-medium">
                {selectedCategory?.name}
              </span>
              <span className="text-gray-400">→</span>
              <span className="px-3 py-1 bg-primary-bolt-100 text-primary-bolt-500 rounded-full text-sm font-medium">
                {selectedSubcategory?.name}
              </span>
            </div>
          </div>

          {/* Titre, immatriculation et prix */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Titre et prix</h3>
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h4 className="text-xl font-bold text-gray-900 mb-2">{formData.title}</h4>
                {formData.registrationNumber && (
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Immatriculation:</span> {formData.registrationNumber}
                  </p>
                )}
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-primary-bolt-500">
                  {formData.price.toLocaleString('fr-FR')} €
                </div>
              </div>
            </div>
          </div>

          {/* Détails spécifiques */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Détails spécifiques</h3>
            {formData.subcategory === 'car' ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <span className="text-sm text-gray-600">Marque:</span>
                    <p className="font-medium">{formData.specificDetails.brand || 'Non renseigné'}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Modèle:</span>
                    <p className="font-medium">{formData.specificDetails.model || 'Non renseigné'}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Année:</span>
                    <p className="font-medium">{formData.specificDetails.year || 'Non renseigné'}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Type:</span>
                    <p className="font-medium">
                      {VEHICLE_TYPES.find(t => t.value === formData.specificDetails.vehicleType)?.label || 'Non renseigné'}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Kilométrage:</span>
                    <p className="font-medium">
                      {formData.specificDetails.mileage ? `${formData.specificDetails.mileage.toLocaleString('fr-FR')} km` : 'Non renseigné'}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Transmission:</span>
                    <p className="font-medium">
                      {TRANSMISSION_TYPES.find(t => t.value === formData.specificDetails.transmission)?.label || 'Non renseigné'}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Carburant:</span>
                    <p className="font-medium">
                      {fuelTypes.find(f => f.value === formData.specificDetails.fuelType)?.label || 'Non renseigné'}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Couleur:</span>
                    <p className="font-medium">{formData.specificDetails.color || 'Non renseigné'}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Puissance:</span>
                    <p className="font-medium">
                      {formData.specificDetails.power ? `${formData.specificDetails.power} CV` : 'Non renseigné'}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Portes:</span>
                    <p className="font-medium">
                      {DOOR_OPTIONS.find(d => d.value === formData.specificDetails.doors)?.label || 'Non renseigné'}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Sellerie:</span>
                    <p className="font-medium">
                      {UPHOLSTERY_OPTIONS.find(u => u.value === formData.specificDetails.upholstery)?.label || 'Non renseigné'}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Émissions:</span>
                    <p className="font-medium">
                      {EMISSION_CLASSES.find(e => e.value === formData.specificDetails.emissionClass)?.label || 'Non renseigné'}
                    </p>
                  </div>
                </div>
                {formData.specificDetails.equipment && formData.specificDetails.equipment.length > 0 && (
                  <div>
                    <span className="text-sm text-gray-600 block mb-2">Équipements:</span>
                    <div className="flex flex-wrap gap-2">
                      {formData.specificDetails.equipment.map((equipment: string, index: number) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-primary-bolt-100 text-primary-bolt-500 text-xs rounded-full"
                        >
                          {equipment}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : formData.subcategory === 'caravan' ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <span className="text-sm text-gray-600">Marque:</span>
                    <p className="font-medium">{formData.specificDetails.brand || 'Non renseigné'}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Modèle:</span>
                    <p className="font-medium">{formData.specificDetails.model || 'Non renseigné'}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Année:</span>
                    <p className="font-medium">{formData.specificDetails.year || 'Non renseigné'}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Dimensions:</span>
                    <p className="font-medium">
                      {formData.specificDetails.length && formData.specificDetails.width && formData.specificDetails.height
                        ? `${formData.specificDetails.length}m × ${formData.specificDetails.width}m × ${formData.specificDetails.height}m`
                        : 'Non renseigné'}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Couchages:</span>
                    <p className="font-medium">
                      {formData.specificDetails.sleepingCapacity ? `${formData.specificDetails.sleepingCapacity} personnes` : 'Non renseigné'}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">PTAC:</span>
                    <p className="font-medium">
                      {formData.specificDetails.ptac ? `${formData.specificDetails.ptac} kg` : 'Non renseigné'}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Type:</span>
                    <p className="font-medium">{formData.specificDetails.caravanType || 'Non renseigné'}</p>
                  </div>
                </div>
                {formData.specificDetails.amenities && formData.specificDetails.amenities.length > 0 && (
                  <div>
                    <span className="text-sm text-gray-600 block mb-2">Aménagements:</span>
                    <div className="flex flex-wrap gap-2">
                      {formData.specificDetails.amenities.map((amenity: string, index: number) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-primary-bolt-100 text-primary-bolt-500 text-xs rounded-full"
                        >
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : formData.subcategory === 'utility' ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <span className="text-sm text-gray-600">Type:</span>
                    <p className="font-medium">
                      {formData.specificDetails.utilityType ? 
                        formData.specificDetails.utilityType.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()) : 
                        'Non renseigné'
                      }
                    </p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Marque:</span>
                    <p className="font-medium">{formData.specificDetails.brand || 'Non renseigné'}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Modèle:</span>
                    <p className="font-medium">{formData.specificDetails.model || 'Non renseigné'}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Année:</span>
                    <p className="font-medium">{formData.specificDetails.year || 'Non renseigné'}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Kilométrage:</span>
                    <p className="font-medium">
                      {formData.specificDetails.mileage ? `${formData.specificDetails.mileage.toLocaleString('fr-FR')} km` : 'Non renseigné'}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Carburant:</span>
                    <p className="font-medium">
                      {fuelTypes.find(f => f.value === formData.specificDetails.fuelType)?.label || 'Non renseigné'}
                    </p>
                  </div>
                  {formData.specificDetails.transmission && (
                    <div>
                      <span className="text-sm text-gray-600">Boîte:</span>
                      <p className="font-medium">
                        {formData.specificDetails.transmission === 'manual' ? 'Manuelle' :
                         formData.specificDetails.transmission === 'automatic' ? 'Automatique' :
                         formData.specificDetails.transmission === 'semi-automatic' ? 'Semi-automatique' : 
                         formData.specificDetails.transmission}
                      </p>
                    </div>
                  )}
                  {formData.specificDetails.power && (
                    <div>
                      <span className="text-sm text-gray-600">Puissance:</span>
                      <p className="font-medium">{formData.specificDetails.power} CV</p>
                    </div>
                  )}
                  {formData.specificDetails.ptac && (
                    <div>
                      <span className="text-sm text-gray-600">PTAC:</span>
                      <p className="font-medium">{formData.specificDetails.ptac}</p>
                    </div>
                  )}
                  {formData.specificDetails.volume && (
                    <div>
                      <span className="text-sm text-gray-600">Volume utile:</span>
                      <p className="font-medium">{formData.specificDetails.volume} m³</p>
                    </div>
                  )}
                </div>
                {formData.specificDetails.equipment && formData.specificDetails.equipment.length > 0 && (
                  <div>
                    <span className="text-sm text-gray-600 block mb-2">Équipements:</span>
                    <div className="flex flex-wrap gap-2">
                      {formData.specificDetails.equipment.map((equipment: string, index: number) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-primary-bolt-100 text-primary-bolt-500 text-xs rounded-full"
                        >
                          {equipment}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div>
                <p className="text-gray-700">{formData.specificDetails.details || 'Aucun détail spécifique renseigné'}</p>
                {formData.specificDetails.equipment && formData.specificDetails.equipment.length > 0 && (
                  <div className="mt-4">
                    <span className="text-sm text-gray-600 block mb-2">Équipements:</span>
                    <div className="flex flex-wrap gap-2">
                      {formData.specificDetails.equipment.map((equipment: string, index: number) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-primary-bolt-100 text-primary-bolt-500 text-xs rounded-full"
                        >
                          {equipment}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Description */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Description</h3>
            <p className="text-gray-700 whitespace-pre-line">{formData.description}</p>
          </div>

          {/* Photos */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Photos ({formData.photos.length})</h3>
            {formData.photos.length > 0 ? (
              <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
                {formData.photos.map((photo, index) => (
                  <div key={index} className="aspect-square">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt={`Photo ${index + 1}`}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">Aucune photo ajoutée</p>
            )}
          </div>

          {/* Localisation et contact */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Localisation</h3>
              <p className="text-gray-700">
                {formData.location.city} {formData.location.postalCode}
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact</h3>
              <div className="space-y-2">
                <p className="text-gray-700">
                  <span className="font-medium">Téléphone:</span> {formData.contact.hidePhone ? 'Masqué' : formData.contact.phone}
                </p>
                {formData.contact.email && (
                  <p className="text-gray-700">
                    <span className="font-medium">Email:</span> {formData.contact.email}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Choisissez une catégorie
              </h2>
              <p className="text-gray-600">
                Sélectionnez la catégorie qui correspond le mieux à votre annonce
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {CATEGORIES.map((category) => {
                const IconComponent = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => updateFormData('category', category.id)}
                    className={`relative p-6 rounded-2xl border-2 transition-all duration-200 text-left ${
                      formData.category === category.id
                        ? 'border-primary-bolt-500 bg-primary-bolt-50'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-r ${category.color} shadow-lg`}>
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {category.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {category.subcategories.map(sub => sub.name).join(', ')}
                        </p>
                      </div>
                    </div>
                    
                    {formData.category === category.id && (
                      <div className="absolute top-4 right-4">
                        <div className="w-6 h-6 bg-primary-bolt-500 rounded-full flex items-center justify-center">
                          <Check className="h-4 w-4 text-white" />
                        </div>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        );

      case 2:
        const selectedCategory = getSelectedCategory();
        if (!selectedCategory) return null;

        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Choisissez une sous-catégorie
              </h2>
              <p className="text-gray-600">
                Précisez le type de {selectedCategory.name.toLowerCase()}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {selectedCategory.subcategories.map((subcategory) => (
                <button
                  key={subcategory.id}
                  onClick={() => updateFormData('subcategory', subcategory.id)}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 text-center ${
                    formData.subcategory === subcategory.id
                      ? 'border-primary-bolt-500 bg-primary-bolt-50'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <h3 className="font-semibold text-gray-900">
                    {subcategory.name}
                  </h3>
                  
                  {formData.subcategory === subcategory.id && (
                    <div className="mt-2">
                      <div className="w-6 h-6 bg-primary-bolt-500 rounded-full flex items-center justify-center mx-auto">
                        <Check className="h-4 w-4 text-white" />
                      </div>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Titre de votre annonce
              </h2>
              <p className="text-gray-600">
                Rédigez un titre accrocheur et descriptif
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Titre *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => updateFormData('title', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-bolt-500 focus:border-primary-bolt-500 transition-all text-lg"
                  placeholder="Ex: BMW 320d - Excellent état, entretien suivi"
                  maxLength={100}
                />
                <div className="flex justify-between items-center mt-2">
                  <p className="text-sm text-gray-500">
                    Un bon titre augmente vos chances de vente
                  </p>
                  <span className="text-sm text-gray-400">
                    {formData.title.length}/100
                  </span>
                </div>
              </div>

              {/* Champ d'immatriculation conditionnel */}
              {needsRegistrationNumber() && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Numéro d'immatriculation (optionnel)
                  </label>
                  <input
                    type="text"
                    value={formData.registrationNumber || ''}
                    onChange={(e) => updateFormData('registrationNumber', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-bolt-500 focus:border-primary-bolt-500 transition-all"
                    placeholder="Ex: AB-123-CD"
                    maxLength={20}
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    Ce numéro nous aidera à pré-remplir automatiquement les informations de votre véhicule
                  </p>
                </div>
              )}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Détails spécifiques
              </h2>
              <p className="text-gray-600">
                Renseignez les caractéristiques importantes de votre {getSelectedSubcategory()?.name.toLowerCase()}
              </p>
            </div>

            {renderSpecificDetailsFields()}
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Description détaillée
              </h2>
              <p className="text-gray-600">
                Décrivez votre {getSelectedSubcategory()?.name.toLowerCase()} en détail
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => updateFormData('description', e.target.value)}
                rows={8}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-bolt-500 focus:border-primary-bolt-500 transition-all"
                placeholder="Décrivez l'état, l'historique, les équipements, les points forts..."
              />
              <p className="text-sm text-gray-500 mt-2">
                Plus votre description est détaillée, plus vous avez de chances d'attirer des acheteurs sérieux.
              </p>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Photos de votre {getSelectedSubcategory()?.name.toLowerCase()}
              </h2>
              <p className="text-gray-600">
                Ajoutez des photos de qualité pour attirer plus d'acheteurs
              </p>
            </div>

            <div className="space-y-6">
              {/* Zone de upload */}
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-primary-bolt-500 transition-colors">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                  id="photo-upload"
                />
                <label htmlFor="photo-upload" className="cursor-pointer">
                  <Camera className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Glissez vos photos ici
                  </h3>
                  <p className="text-gray-600 mb-4">
                    ou cliquez pour sélectionner des fichiers
                  </p>
                  <div className="bg-primary-bolt-500 text-white px-6 py-2 rounded-lg hover:bg-primary-bolt-600 transition-colors inline-block">
                    Choisir des photos
                  </div>
                </label>
              </div>

              {/* Aperçu des photos */}
              {formData.photos.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Photos sélectionnées ({formData.photos.length})
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {formData.photos.map((photo, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={URL.createObjectURL(photo)}
                          alt={`Photo ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <button
                          onClick={() => removePhoto(index)}
                          className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case 7:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Prix de vente
              </h2>
              <p className="text-gray-600">
                Fixez un prix attractif pour votre {getSelectedSubcategory()?.name.toLowerCase()}
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Prix (€) *
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={formData.price || ''}
                  onChange={(e) => updateFormData('price', parseInt(e.target.value) || 0)}
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-bolt-500 focus:border-primary-bolt-500 transition-all text-lg"
                  placeholder="0"
                  min="0"
                />
                <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                  €
                </span>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Consultez des annonces similaires pour fixer un prix compétitif
              </p>
            </div>
          </div>
        );

      case 8:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Localisation
              </h2>
              <p className="text-gray-600">
                Où se trouve votre {getSelectedSubcategory()?.name.toLowerCase()} ?
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Ville *
                </label>
                <input
                  type="text"
                  value={formData.location.city}
                  onChange={(e) => updateFormData('location', { ...formData.location, city: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-bolt-500 focus:border-primary-bolt-500 transition-all"
                  placeholder="Paris"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Code postal *
                </label>
                <input
                  type="text"
                  value={formData.location.postalCode}
                  onChange={(e) => updateFormData('location', { ...formData.location, postalCode: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-bolt-500 focus:border-primary-bolt-500 transition-all"
                  placeholder="75001"
                  maxLength={5}
                />
              </div>
            </div>
          </div>
        );

      case 9:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Informations de contact
              </h2>
              <p className="text-gray-600">
                Comment les acheteurs peuvent-ils vous contacter ?
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Téléphone *
                </label>
                <input
                  type="tel"
                  value={formData.contact.phone}
                  onChange={(e) => updateFormData('contact', { ...formData.contact, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-bolt-500 focus:border-primary-bolt-500 transition-all"
                  placeholder="+33 6 12 34 56 78"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email (optionnel)
                </label>
                <input
                  type="email"
                  value={formData.contact.email}
                  onChange={(e) => updateFormData('contact', { ...formData.contact, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-bolt-500 focus:border-primary-bolt-500 transition-all"
                  placeholder="votre@email.com"
                />
              </div>

              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="hidePhone"
                  checked={formData.contact.hidePhone}
                  onChange={(e) => updateFormData('contact', { ...formData.contact, hidePhone: e.target.checked })}
                  className="h-4 w-4 text-primary-bolt-500 focus:ring-primary-bolt-500 border-gray-300 rounded"
                />
                <label htmlFor="hidePhone" className="text-sm text-gray-700">
                  Masquer mon numéro de téléphone dans l'annonce
                </label>
              </div>
            </div>
          </div>
        );

      case 10:
        return renderRecapStep();

      default:
        return null;
    }
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center bg-white p-12 rounded-2xl shadow-xl border border-gray-100 max-w-md mx-4">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">🔒</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Connexion requise</h2>
          <p className="text-gray-600 text-lg mb-8">Vous devez être connecté pour déposer une annonce.</p>
          
          <div className="space-y-4">
            <button
              onClick={() => {
                setAuthMode('login');
                setShowAuthModal(true);
              }}
              className="w-full bg-gradient-to-r from-primary-bolt-500 to-primary-bolt-600 hover:from-primary-bolt-600 hover:to-primary-bolt-700 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Se connecter
            </button>
            
            <button
              onClick={() => {
                setAuthMode('register');
                setShowAuthModal(true);
              }}
              className="w-full border-2 border-primary-bolt-500 text-primary-bolt-500 hover:bg-primary-bolt-50 py-3 px-6 rounded-xl font-semibold transition-all duration-200"
            >
              Créer un compte
            </button>
          </div>
          
          <div className="mt-8 p-4 bg-primary-bolt-50 rounded-xl">
            <h3 className="font-semibold text-primary-bolt-500 mb-2">Pourquoi se connecter ?</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Gérer vos annonces facilement</li>
              <li>• Recevoir des messages d'acheteurs</li>
              <li>• Accéder aux statistiques de vos annonces</li>
              <li>• Bénéficier d'options premium</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-900">Déposer une annonce</h1>
            <span className="text-sm font-medium text-gray-600">
              Étape {currentStep} sur {totalSteps}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-primary-bolt-500 to-primary-bolt-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          {renderStepContent()}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className="flex items-center space-x-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Précédent</span>
          </button>

          {currentStep < totalSteps ? (
            <button
              onClick={nextStep}
              disabled={!canProceed()}
              className="flex items-center space-x-2 bg-gradient-to-r from-primary-bolt-500 to-primary-bolt-600 hover:from-primary-bolt-600 hover:to-primary-bolt-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
            >
              <span>Suivant</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              onClick={() => {
                // Ici on publierait l'annonce
                console.log('Publier l\'annonce:', formData);
                alert('Annonce publiée avec succès !');
              }}
              disabled={!canProceed()}
              className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
            >
              Publier l'annonce
            </button>
          )}
        </div>
      </div>
    </div>
  );
};