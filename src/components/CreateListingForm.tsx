import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Upload, X, Check, Car, Bike, Wrench, Package } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

interface FormData {
  // Étape 1: Catégorie principale
  category: string;
  
  // Étape 2: Sous-catégorie
  subcategory: string;
  
  // Étape 3: Titre
  title: string;
  
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

export const CreateListingForm: React.FC = () => {
  const { currentUser } = useApp();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    category: '',
    subcategory: '',
    title: '',
    specificDetails: {},
    description: '',
    photos: [],
    price: 0,
    location: { city: '', postalCode: '' },
    contact: { phone: '', email: '', hidePhone: false }
  });

  const totalSteps = 9;

  // Réinitialiser la sous-catégorie quand la catégorie change
  useEffect(() => {
    if (formData.category) {
      setFormData(prev => ({ ...prev, subcategory: '', specificDetails: {} }));
    }
  }, [formData.category]);

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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
        return true; // Pour l'instant, on permet de passer même sans détails spécifiques
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

  const renderSpecificDetailsFields = () => {
    const subcategory = getSelectedSubcategory();
    if (!subcategory) return null;

    // Pour l'instant, on affiche un champ générique selon la sous-catégorie
    // Plus tard, on pourra implémenter des champs spécifiques pour chaque type
    const placeholderText = {
      // Voitures - Utilitaires
      'car': 'Marque, modèle, année, kilométrage, carburant, etc.',
      'utility': 'Marque, modèle, année, kilométrage, type d\'utilitaire, etc.',
      'caravan': 'Marque, modèle, année, nombre de places, équipements, etc.',
      'trailer': 'Type de remorque, charge utile, dimensions, etc.',
      
      // Motos, Scooters, Quads, Nautisme
      'motorcycle': 'Marque, modèle, année, cylindrée, kilométrage, etc.',
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
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Détails spécifiques pour {subcategory.name}
          </label>
          <textarea
            value={formData.specificDetails.details || ''}
            onChange={(e) => updateFormData('specificDetails', { ...formData.specificDetails, details: e.target.value })}
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

            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-primary-bolt-500 transition-colors">
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Glissez vos photos ici
              </h3>
              <p className="text-gray-600 mb-4">
                ou cliquez pour sélectionner des fichiers
              </p>
              <button className="bg-primary-bolt-500 text-white px-6 py-2 rounded-lg hover:bg-primary-bolt-600 transition-colors">
                Choisir des photos
              </button>
            </div>

            {formData.photos.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {formData.photos.map((photo, index) => (
                  <div key={index} className="relative">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt={`Photo ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <button
                      onClick={() => {
                        const newPhotos = formData.photos.filter((_, i) => i !== index);
                        updateFormData('photos', newPhotos);
                      }}
                      className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
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

      default:
        return null;
    }
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center bg-white p-12 rounded-2xl shadow-xl border border-gray-100">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">🔒</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Connexion requise</h2>
          <p className="text-gray-600 text-lg">Vous devez être connecté pour déposer une annonce.</p>
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

        {/* Debug Info (à supprimer en production) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-8 p-4 bg-gray-100 rounded-lg">
            <h3 className="font-semibold mb-2">Debug - Données du formulaire :</h3>
            <pre className="text-xs overflow-auto">
              {JSON.stringify(formData, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};