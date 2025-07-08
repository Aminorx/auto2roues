import React, { useState, useEffect } from 'react';
import { X, Upload, MapPin, Calendar, DollarSign, FileText, Car, Wrench, Package } from 'lucide-react';
import { categories } from '../utils/mockData';

interface CreateListingFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (listing: any) => void;
}

interface FormData {
  category: string;
  subcategory: string;
  title: string;
  description: string;
  price: string;
  location: string;
  images: File[];
  condition: string;
  brand: string;
  model: string;
  year: string;
  mileage: string;
  fuelType: string;
  transmission: string;
  bodyType: string;
  color: string;
  engineSize: string;
  doors: string;
  seats: string;
  features: string[];
  serviceType: string;
  availability: string;
  experience: string;
  certifications: string[];
}

const CreateListingForm: React.FC<CreateListingFormProps> = ({ isOpen, onClose, onSubmit }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    category: '',
    subcategory: '',
    title: '',
    description: '',
    price: '',
    location: '',
    images: [],
    condition: '',
    brand: '',
    model: '',
    year: '',
    mileage: '',
    fuelType: '',
    transmission: '',
    bodyType: '',
    color: '',
    engineSize: '',
    doors: '',
    seats: '',
    features: [],
    serviceType: '',
    availability: '',
    experience: '',
    certifications: []
  });

  const [subcategories, setSubcategories] = useState<any[]>([]);

  useEffect(() => {
    const selectedCategory = categories.find(cat => cat.id === formData.category);
    setSubcategories(selectedCategory?.subcategories || []);
    setFormData(prev => ({ ...prev, subcategory: '' }));
  }, [formData.category]);

  const getSelectedCategory = () => {
    return categories.find(cat => cat.id === formData.category);
  };

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setFormData(prev => ({ ...prev, images: [...prev.images, ...files] }));
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleFeatureToggle = (feature: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }));
  };

  const handleCertificationToggle = (cert: string) => {
    setFormData(prev => ({
      ...prev,
      certifications: prev.certifications.includes(cert)
        ? prev.certifications.filter(c => c !== cert)
        : [...prev.certifications, cert]
    }));
  };

  const nextStep = () => {
    const selectedCategory = getSelectedCategory();
    
    if (selectedCategory?.id === 'services') {
      if (currentStep < 3) setCurrentStep(currentStep + 1);
    } else {
      if (currentStep < 4) setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const listing = {
      ...formData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      status: 'active'
    };
    onSubmit(listing);
    onClose();
    setCurrentStep(1);
    setFormData({
      category: '',
      subcategory: '',
      title: '',
      description: '',
      price: '',
      location: '',
      images: [],
      condition: '',
      brand: '',
      model: '',
      year: '',
      mileage: '',
      fuelType: '',
      transmission: '',
      bodyType: '',
      color: '',
      engineSize: '',
      doors: '',
      seats: '',
      features: [],
      serviceType: '',
      availability: '',
      experience: '',
      certifications: []
    });
  };

  const renderStepIndicator = () => {
    const selectedCategory = getSelectedCategory();
    const totalSteps = selectedCategory?.id === 'services' ? 3 : 4;
    
    return (
      <div className="flex items-center justify-center mb-8">
        {Array.from({ length: totalSteps }, (_, i) => (
          <React.Fragment key={i}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              i + 1 <= currentStep ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
            }`}>
              {i + 1}
            </div>
            {i < totalSteps - 1 && (
              <div className={`w-12 h-1 mx-2 ${
                i + 1 < currentStep ? 'bg-blue-600' : 'bg-gray-200'
              }`} />
            )}
          </React.Fragment>
        ))}
      </div>
    );
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">Catégorie et informations de base</h3>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Catégorie</label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => handleInputChange('category', category.id)}
              className={`p-4 border-2 rounded-lg text-left transition-colors ${
                formData.category === category.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-3">
                <category.icon className="w-6 h-6 text-blue-600" />
                <div>
                  <div className="font-medium text-gray-900">{category.name}</div>
                  <div className="text-sm text-gray-500">{category.description}</div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {formData.category && subcategories.length > 0 && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Sous-catégorie</label>
          <select
            value={formData.subcategory}
            onChange={(e) => handleInputChange('subcategory', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Sélectionnez une sous-catégorie</option>
            {subcategories.map((sub) => (
              <option key={sub.id} value={sub.id}>{sub.name}</option>
            ))}
          </select>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Titre de l'annonce</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => handleInputChange('title', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Ex: BMW Série 3 320d en excellent état"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Décrivez votre véhicule, pièce ou service en détail..."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Prix (€)</label>
          <input
            type="number"
            value={formData.price}
            onChange={(e) => handleInputChange('price', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="0"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Localisation</label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) => handleInputChange('location', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ville, Code postal"
          />
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => {
    const selectedCategory = getSelectedCategory();
    
    if (selectedCategory?.id === 'vehicles') {
      return (
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Détails du véhicule</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Marque</label>
              <input
                type="text"
                value={formData.brand}
                onChange={(e) => handleInputChange('brand', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ex: BMW, Mercedes, Audi..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Modèle</label>
              <input
                type="text"
                value={formData.model}
                onChange={(e) => handleInputChange('model', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ex: Série 3, Classe C..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Année</label>
              <input
                type="number"
                value={formData.year}
                onChange={(e) => handleInputChange('year', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="2020"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Kilométrage</label>
              <input
                type="number"
                value={formData.mileage}
                onChange={(e) => handleInputChange('mileage', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="50000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Carburant</label>
              <select
                value={formData.fuelType}
                onChange={(e) => handleInputChange('fuelType', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Sélectionnez</option>
                <option value="essence">Essence</option>
                <option value="diesel">Diesel</option>
                <option value="hybride">Hybride</option>
                <option value="electrique">Électrique</option>
                <option value="gpl">GPL</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Transmission</label>
              <select
                value={formData.transmission}
                onChange={(e) => handleInputChange('transmission', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Sélectionnez</option>
                <option value="manuelle">Manuelle</option>
                <option value="automatique">Automatique</option>
                <option value="semi-automatique">Semi-automatique</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Type de carrosserie</label>
              <select
                value={formData.bodyType}
                onChange={(e) => handleInputChange('bodyType', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Sélectionnez</option>
                <option value="berline">Berline</option>
                <option value="break">Break</option>
                <option value="suv">SUV</option>
                <option value="coupe">Coupé</option>
                <option value="cabriolet">Cabriolet</option>
                <option value="monospace">Monospace</option>
                <option value="citadine">Citadine</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Couleur</label>
              <input
                type="text"
                value={formData.color}
                onChange={(e) => handleInputChange('color', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ex: Noir, Blanc, Rouge..."
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">État</label>
            <select
              value={formData.condition}
              onChange={(e) => handleInputChange('condition', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Sélectionnez l'état</option>
              <option value="neuf">Neuf</option>
              <option value="excellent">Excellent</option>
              <option value="bon">Bon</option>
              <option value="correct">Correct</option>
              <option value="a-reparer">À réparer</option>
            </select>
          </div>
        </div>
      );
    } else if (selectedCategory?.id === 'services') {
      return (
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Détails du service</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Type de service</label>
            <select
              value={formData.serviceType}
              onChange={(e) => handleInputChange('serviceType', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Sélectionnez</option>
              <option value="reparation">Réparation</option>
              <option value="entretien">Entretien</option>
              <option value="diagnostic">Diagnostic</option>
              <option value="carrosserie">Carrosserie</option>
              <option value="peinture">Peinture</option>
              <option value="pneumatiques">Pneumatiques</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Disponibilité</label>
            <select
              value={formData.availability}
              onChange={(e) => handleInputChange('availability', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Sélectionnez</option>
              <option value="immediate">Immédiate</option>
              <option value="semaine">Dans la semaine</option>
              <option value="mois">Dans le mois</option>
              <option value="sur-rdv">Sur rendez-vous</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Expérience (années)</label>
            <input
              type="number"
              value={formData.experience}
              onChange={(e) => handleInputChange('experience', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="5"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Certifications</label>
            <div className="space-y-2">
              {['Agréé constructeur', 'Certification qualité', 'Formation spécialisée', 'Garantie travaux'].map((cert) => (
                <label key={cert} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.certifications.includes(cert)}
                    onChange={() => handleCertificationToggle(cert)}
                    className="mr-2"
                  />
                  {cert}
                </label>
              ))}
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Détails de la pièce</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Marque compatible</label>
              <input
                type="text"
                value={formData.brand}
                onChange={(e) => handleInputChange('brand', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ex: BMW, Mercedes, Universel..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Modèle compatible</label>
              <input
                type="text"
                value={formData.model}
                onChange={(e) => handleInputChange('model', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ex: Série 3, Tous modèles..."
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">État</label>
            <select
              value={formData.condition}
              onChange={(e) => handleInputChange('condition', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Sélectionnez l'état</option>
              <option value="neuf">Neuf</option>
              <option value="occasion">Occasion</option>
              <option value="reconditionne">Reconditionné</option>
            </select>
          </div>
        </div>
      );
    }
  };

  const renderStep3 = () => {
    const selectedCategory = getSelectedCategory();
    
    if (selectedCategory?.id === 'services') {
      return (
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Photos et finalisation</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Photos</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
                className="cursor-pointer flex flex-col items-center justify-center"
              >
                <Upload className="w-12 h-12 text-gray-400 mb-4" />
                <p className="text-sm text-gray-600">Cliquez pour ajouter des photos</p>
                <p className="text-xs text-gray-500 mt-1">PNG, JPG jusqu'à 10MB</p>
              </label>
            </div>

            {formData.images.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                {formData.images.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Upload ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      );
    } else {
      return (
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Équipements et options</h3>
          
          {getSelectedCategory()?.id === 'vehicles' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Équipements</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {[
                  'Climatisation', 'GPS', 'Bluetooth', 'Régulateur de vitesse',
                  'Jantes alliage', 'Toit ouvrant', 'Sièges chauffants', 'Caméra de recul',
                  'Détecteurs de stationnement', 'Système audio premium'
                ].map((feature) => (
                  <label key={feature} className="flex items-center text-sm">
                    <input
                      type="checkbox"
                      checked={formData.features.includes(feature)}
                      onChange={() => handleFeatureToggle(feature)}
                      className="mr-2"
                    />
                    {feature}
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>
      );
    }
  };

  const renderStep4 = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">Photos et finalisation</h3>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Photos</label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            id="image-upload"
          />
          <label
            htmlFor="image-upload"
            className="cursor-pointer flex flex-col items-center justify-center"
          >
            <Upload className="w-12 h-12 text-gray-400 mb-4" />
            <p className="text-sm text-gray-600">Cliquez pour ajouter des photos</p>
            <p className="text-xs text-gray-500 mt-1">PNG, JPG jusqu'à 10MB</p>
          </label>
        </div>

        {formData.images.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            {formData.images.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={URL.createObjectURL(image)}
                  alt={`Upload ${index + 1}`}
                  className="w-full h-24 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  if (!isOpen) return null;

  const selectedCategory = getSelectedCategory();
  const isLastStep = selectedCategory?.id === 'services' ? currentStep === 3 : currentStep === 4;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Créer une annonce</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          {renderStepIndicator()}
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && (selectedCategory?.id === 'services' ? renderStep3() : renderStep3())}
          {currentStep === 4 && renderStep4()}

          <div className="flex justify-between mt-8">
            <button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Précédent
            </button>

            {isLastStep ? (
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Publier l'annonce
              </button>
            ) : (
              <button
                type="button"
                onClick={nextStep}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Suivant
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateListingForm;