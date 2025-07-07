import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Check, ShoppingCart, DollarSign, Car, Bike, Truck, Wrench, Info, Upload, MapPin, Phone, Eye, EyeOff, CheckCircle } from 'lucide-react';
import { ListingFormData, FormStep } from '../types/listing';
import { useApp } from '../contexts/AppContext';

// Import category images
import voitureIcon from '../assets/voiture.png';
import motoIcon from '../assets/moto.png';
import utilitaireIcon from '../assets/utilitaire.png';
import piecesIcon from '../assets/pieces.png';

export const CreateListingForm: React.FC = () => {
  const { currentUser } = useApp();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<ListingFormData>({
    listingType: null,
    productType: null,
    title: '',
    productDetails: {
      brand: '',
      model: '',
      year: new Date().getFullYear(),
      equipment: [],
    },
    description: '',
    photos: [],
    price: 0,
    location: {
      city: '',
      postalCode: '',
    },
    contact: {
      phone: currentUser?.phone || '',
      email: currentUser?.email || '',
      hidePhone: false,
    },
  });

  const totalSteps = 10;

  const updateFormData = (updates: Partial<ListingFormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const updateProductDetails = (updates: Partial<ListingFormData['productDetails']>) => {
    setFormData(prev => ({
      ...prev,
      productDetails: { ...prev.productDetails, ...updates }
    }));
  };

  const toggleEquipment = (equipment: string) => {
    const currentEquipment = formData.productDetails.equipment || [];
    const newEquipment = currentEquipment.includes(equipment)
      ? currentEquipment.filter(e => e !== equipment)
      : [...currentEquipment, equipment];
    updateProductDetails({ equipment: newEquipment });
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

  const shouldShowStep = (stepNumber: number): boolean => {
    switch (stepNumber) {
      case 5: // État du bien (previously step 6)
        return formData.listingType === 'sell' && formData.productType !== 'parts';
      default:
        return true;
    }
  };

  const getNextValidStep = (step: number): number => {
    let nextStep = step + 1;
    while (nextStep <= totalSteps && !shouldShowStep(nextStep)) {
      nextStep++;
    }
    return nextStep <= totalSteps ? nextStep : totalSteps;
  };

  const getPrevValidStep = (step: number): number => {
    let prevStep = step - 1;
    while (prevStep >= 1 && !shouldShowStep(prevStep)) {
      prevStep--;
    }
    return prevStep >= 1 ? prevStep : 1;
  };

  const handleNext = () => {
    const nextValidStep = getNextValidStep(currentStep);
    setCurrentStep(nextValidStep);
  };

  const handleSelection = (updates: Partial<ListingFormData>) => {
    updateFormData(updates);
    handleNext();
  };

  const handlePrev = () => {
    const prevValidStep = getPrevValidStep(currentStep);
    setCurrentStep(prevValidStep);
  };

  const canProceed = (): boolean => {
    switch (currentStep) {
      case 1: return formData.listingType !== null;
      case 2: return formData.productType !== null;
      case 3: return formData.title.trim().length > 0;
      case 4:
        const details = formData.productDetails;
        const isCarOrUtility = ['car', 'utility'].includes(formData.productType || '');
        
        if (isCarOrUtility) {
          return !!(details.brand && details.model && details.fuelType && details.transmission);
        }
        return !!(details.brand && details.model);
      case 5: return !shouldShowStep(5) || formData.condition !== undefined;
      case 7: return formData.description.trim().length > 0;
      case 8: return formData.price > 0;
      case 9: return !!(formData.location.city && formData.location.postalCode && formData.contact.phone.length > 0);
      default: return true;
    }
  };

  // Étape 1: Type d'annonce
  const renderStep1 = () => (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Type d'annonce</h2>
        <p className="text-gray-600 text-lg">Que souhaitez-vous faire ?</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
        <button
          onClick={() => handleSelection({ listingType: 'sell' })}
          className={`p-8 border-2 rounded-2xl transition-all duration-200 ${
            formData.listingType === 'sell'
              ? 'border-[#0CBFDE] bg-cyan-50 shadow-lg'
              : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
          }`}
        >
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-[#0CBFDE] to-[#0AA5C7] rounded-full flex items-center justify-center mx-auto mb-4">
              <DollarSign className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">VENTE</h3>
            <p className="text-gray-600">Je vends un véhicule ou une pièce</p>
          </div>
          {formData.listingType === 'sell' && (
            <div className="mt-4 flex justify-center">
              <Check className="h-6 w-6 text-[#0CBFDE]" />
            </div>
          )}
        </button>
        <button
          onClick={() => handleSelection({ listingType: 'buy' })}
          className={`p-8 border-2 rounded-2xl transition-all duration-200 ${
            formData.listingType === 'buy'
              ? 'border-[#0CBFDE] bg-cyan-50 shadow-lg'
              : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
          }`}
        >
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingCart className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">DEMANDE</h3>
            <p className="text-gray-600">Je recherche un véhicule ou une pièce</p>
          </div>
          {formData.listingType === 'buy' && (
            <div className="mt-4 flex justify-center">
              <Check className="h-6 w-6 text-[#0CBFDE]" />
            </div>
          )}
        </button>
      </div>
    </div>
  );

  // Étape 2: Type de produit
  const renderStep2 = () => (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Type de produit</h2>
        <p className="text-gray-600 text-lg">Quel type de produit ?</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
        {[
          { id: 'car', label: 'Voitures - Utilitaires', image: voitureIcon },
          { id: 'motorcycle', label: 'Motos, Scooters, Quads, Nautisme', image: motoIcon },
          { id: 'service', label: 'Services', image: piecesIcon },
          { id: 'parts', label: 'Pièces détachées', image: piecesIcon },
        ].map((product) => (
          <button
            key={product.id}
            onClick={() => handleSelection({ productType: product.id as any })}
            className={`p-6 border-2 rounded-2xl transition-all duration-200 ${
              formData.productType === product.id
                ? 'border-[#0CBFDE] bg-cyan-50 shadow-lg'
                : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
            }`}
          >
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <img
                  src={product.image}
                  alt={product.label}
                  className="w-12 h-12 object-contain"
                />
              </div>
              <h3 className="font-bold text-gray-900">{product.label}</h3>
            </div>
            {formData.productType === product.id && (
              <div className="mt-3 flex justify-center">
                <Check className="h-5 w-5 text-[#0CBFDE]" />
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );

  // Étape 3: Titre
  const renderStep3 = () => (
    <div className="space-y-8 max-w-2xl mx-auto">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Titre de l'annonce</h2>
        <p className="text-gray-600 text-lg">Décrivez votre {formData.productType === 'parts' ? 'pièce' : 'véhicule'} en quelques mots</p>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Titre de l'annonce
        </label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => updateFormData({ title: e.target.value })}
          className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0CBFDE] focus:border-[#0CBFDE] text-lg"
          placeholder={
            formData.productType === 'car' ? 'Ex: BMW 320d Série 3 - Excellent état' :
            formData.productType === 'motorcycle' ? 'Ex: Yamaha MT-07 - Comme neuve' :
            formData.productType === 'utility' ? 'Ex: Ford Transit Custom - Van aménagé' :
            'Ex: Moteur BMW 320d N47 - Révisé'
          }
          maxLength={100}
        />
        <div className="mt-2 text-right text-sm text-gray-500">
          {formData.title.length}/100 caractères
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <div className="flex items-start space-x-3">
          <Info className="h-5 w-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="font-semibold text-blue-900">Conseil</h4>
            <p className="text-blue-800 text-sm">
              Un bon titre inclut la marque, le modèle et l'état du véhicule. 
              Évitez les majuscules et les caractères spéciaux.
            </p>
          </div>
        </div>
      </div>

      {formData.listingType === 'sell' && ['car', 'motorcycle', 'utility'].includes(formData.productType || '') && (
        <div className="space-y-4 pt-8 border-t border-gray-200">
           <label className="block text-sm font-semibold text-gray-700 mb-3">
            Numéro d'immatriculation (facultatif)
          </label>
          <input
            type="text"
            value={formData.registrationNumber || ''}
            onChange={(e) => updateFormData({ registrationNumber: e.target.value })}
            className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0CBFDE] focus:border-[#0CBFDE] text-lg"
            placeholder="AB-123-CD"
            maxLength={20}
          />
           <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
            <div className="flex items-start space-x-3">
              <Info className="h-5 w-5 text-yellow-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-yellow-900">Information</h4>
                <p className="text-yellow-800 text-sm">
                  Nous utiliserons ce champ pour préremplir automatiquement les données du véhicule.
                  Vous pouvez laisser vide et remplir manuellement.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // Étape 5: Détails du produit
  const renderStep5 = () => {
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 50 }, (_, i) => currentYear - i);
    const carBrands = [
      'Abarth', 'Alfa Romeo', 'Alpine', 'Aston Martin', 'Audi', 'Bentley', 'BMW', 'Bugatti', 'Cadillac', 'Chevrolet',
      'Citroën', 'Cupra', 'Dacia', 'DS', 'Ferrari', 'Fiat', 'Ford', 'Honda', 'Hyundai', 'Jaguar', 'Jeep', 'Kia',
      'Lamborghini', 'Lancia', 'Land Rover', 'Lexus', 'Lotus', 'Maserati', 'Mazda', 'McLaren', 'Mercedes-Benz',
      'Mini', 'Mitsubishi', 'Nissan', 'Opel', 'Peugeot', 'Polestar', 'Porsche', 'Renault', 'Rolls-Royce', 'Seat',
      'Skoda', 'Smart', 'SsangYong', 'Subaru', 'Suzuki', 'Tesla', 'Toyota', 'Volkswagen', 'Volvo'
    ];

    return (
      <div className="space-y-8 max-w-4xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Détails du produit</h2>
          <p className="text-gray-600 text-lg">Renseignez les caractéristiques techniques</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Champs communs */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Marque *</label>
            <select
              value={formData.productDetails.brand}
              onChange={(e) => updateProductDetails({ brand: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0CBFDE] focus:border-[#0CBFDE]"
            >
              <option value="">Sélectionner une marque</option>
              {carBrands.map(brand => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Modèle *</label>
            <input
              type="text"
              value={formData.productDetails.model}
              onChange={(e) => updateProductDetails({ model: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0CBFDE] focus:border-[#0CBFDE]"
              placeholder="320d, 308, MT-07..."
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Année *</label>
            <select
              value={formData.productDetails.year}
              onChange={(e) => updateProductDetails({ year: parseInt(e.target.value) })}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0CBFDE] focus:border-[#0CBFDE]"
            >
              {years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>

          {/* Champs spécifiques selon le type */}
          {formData.productType === 'car' && (
            <>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Type de véhicule</label>
                <select
                  value={formData.productDetails.vehicleType || ''}
                  onChange={(e) => updateProductDetails({ vehicleType: e.target.value as any })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0CBFDE] focus:border-[#0CBFDE]"
                >
                  <option value="">Sélectionner</option>
                  <option value="citadine">Citadine</option>
                  <option value="berline">Berline</option>
                  <option value="suv">SUV</option>
                  <option value="break">Break</option>
                  <option value="coupe">Coupé</option>
                  <option value="cabriolet">Cabriolet</option>
                  <option value="monospace">Monospace</option>
                  <option value="pickup">Pick-up</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Kilométrage</label>
                <input
                  type="number"
                  value={formData.productDetails.mileage || ''}
                  onChange={(e) => updateProductDetails({ mileage: parseInt(e.target.value) || undefined })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0CBFDE] focus:border-[#0CBFDE]"
                  placeholder="150000"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Boîte de vitesses *</label>
                <select
                  value={formData.productDetails.transmission || ''}
                  onChange={(e) => updateProductDetails({ transmission: e.target.value as any })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0CBFDE] focus:border-[#0CBFDE]"
                >
                  <option value="">Sélectionner</option>
                  <option value="manual">Manuelle</option>
                  <option value="automatic">Automatique</option>
                  <option value="semi-automatic">Semi-automatique</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Carburant *</label>
                <select
                  value={formData.productDetails.fuelType || ''}
                  onChange={(e) => updateProductDetails({ fuelType: e.target.value as any })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0CBFDE] focus:border-[#0CBFDE]"
                >
                  <option value="">Sélectionner</option>
                  <option value="gasoline">Essence</option>
                  <option value="diesel">Diesel</option>
                  <option value="electric">Électrique</option>
                  <option value="hybrid">Hybride</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Couleur</label>
                <input
                  type="text"
                  value={formData.productDetails.color || ''}
                  onChange={(e) => updateProductDetails({ color: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0CBFDE] focus:border-[#0CBFDE]"
                  placeholder="Noir, Blanc, Rouge..."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Puissance (CV)</label>
                <input
                  type="number"
                  value={formData.productDetails.power || ''}
                  onChange={(e) => updateProductDetails({ power: parseInt(e.target.value) || undefined })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0CBFDE] focus:border-[#0CBFDE]"
                  placeholder="150"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Nombre de portes</label>
                <select
                  value={formData.productDetails.doors || ''}
                  onChange={(e) => updateProductDetails({ doors: parseInt(e.target.value) || undefined })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0CBFDE] focus:border-[#0CBFDE]"
                >
                  <option value="">Sélectionner</option>
                  <option value="3">3 portes</option>
                  <option value="5">5 portes</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Sellerie</label>
                <select
                  value={formData.productDetails.upholstery || ''}
                  onChange={(e) => updateProductDetails({ upholstery: e.target.value as any })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0CBFDE] focus:border-[#0CBFDE]"
                >
                  <option value="">Sélectionner</option>
                  <option value="tissu">Tissu</option>
                  <option value="cuir_partiel">Cuir partiel</option>
                  <option value="cuir">Cuir</option>
                  <option value="velours">Velours</option>
                  <option value="alcantara">Alcantara</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Classe d'émissions</label>
                <select
                  value={formData.productDetails.emissionClass || ''}
                  onChange={(e) => updateProductDetails({ emissionClass: e.target.value as any })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0CBFDE] focus:border-[#0CBFDE]"
                >
                  <option value="">Sélectionner</option>
                  <option value="euro1">Euro 1</option>
                  <option value="euro2">Euro 2</option>
                  <option value="euro3">Euro 3</option>
                  <option value="euro4">Euro 4</option>
                  <option value="euro5">Euro 5</option>
                  <option value="euro6">Euro 6</option>
                </select>
              </div>

              {/* Équipements - Section spéciale */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-4">Équipements</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {[
                    'Toit ouvrant',
                    'Toit panoramique',
                    'Climatisation',
                    'GPS',
                    'Sièges chauffants',
                    'Caméra de recul',
                    'Radar de recul',
                    'Jantes alliage',
                    'Feux LED Xénon',
                    'Vitres électriques',
                    'Airbags',
                    'Sièges électriques',
                    'Attelage',
                  ].map((equipment) => (
                    <button
                      key={equipment}
                      type="button"
                      onClick={() => toggleEquipment(equipment)}
                      className={`p-3 text-left border-2 rounded-xl transition-all text-sm ${
                        formData.productDetails.equipment?.includes(equipment)
                          ? 'border-[#0CBFDE] bg-cyan-50 text-[#0CBFDE]'
                          : 'border-gray-200 hover:border-gray-300 text-gray-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{equipment}</span>
                        {formData.productDetails.equipment?.includes(equipment) && (
                          <CheckCircle className="h-4 w-4" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Sélectionnez tous les équipements présents sur votre véhicule
                </p>
              </div>
            </>
          )}

          {formData.productType === 'motorcycle' && (
            <>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Cylindrée (cm³)</label>
                <input
                  type="number"
                  value={formData.productDetails.displacement || ''}
                  onChange={(e) => updateProductDetails({ displacement: parseInt(e.target.value) || undefined })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0CBFDE] focus:border-[#0CBFDE]"
                  placeholder="650"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Kilométrage</label>
                <input
                  type="number"
                  value={formData.productDetails.mileage || ''}
                  onChange={(e) => updateProductDetails({ mileage: parseInt(e.target.value) || undefined })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0CBFDE] focus:border-[#0CBFDE]"
                  placeholder="15000"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Type de moto</label>
                <select
                  value={formData.productDetails.motorcycleType || ''}
                  onChange={(e) => updateProductDetails({ motorcycleType: e.target.value as any })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0CBFDE] focus:border-[#0CBFDE]"
                >
                  <option value="">Sélectionner</option>
                  <option value="sport">Sportive</option>
                  <option value="touring">Routière</option>
                  <option value="urban">Urbaine</option>
                  <option value="trail">Trail</option>
                  <option value="custom">Custom</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Couleur</label>
                <input
                  type="text"
                  value={formData.productDetails.color || ''}
                  onChange={(e) => updateProductDetails({ color: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0CBFDE] focus:border-[#0CBFDE]"
                  placeholder="Noir, Blanc, Rouge..."
                />
              </div>
            </>
          )}

          {formData.productType === 'utility' && (
            <>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Type d'utilitaire</label>
                <select
                  value={formData.productDetails.utilityType || ''}
                  onChange={(e) => updateProductDetails({ utilityType: e.target.value as any })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0CBFDE] focus:border-[#0CBFDE]"
                >
                  <option value="">Sélectionner</option>
                  <option value="van">Fourgon</option>
                  <option value="truck">Camion</option>
                  <option value="pickup">Pick-up</option>
                  <option value="trailer">Remorque</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Kilométrage</label>
                <input
                  type="number"
                  value={formData.productDetails.mileage || ''}
                  onChange={(e) => updateProductDetails({ mileage: parseInt(e.target.value) || undefined })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0CBFDE] focus:border-[#0CBFDE]"
                  placeholder="80000"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">PTAC (kg)</label>
                <input
                  type="number"
                  value={formData.productDetails.gvw || ''}
                  onChange={(e) => updateProductDetails({ gvw: parseInt(e.target.value) || undefined })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0CBFDE] focus:border-[#0CBFDE]"
                  placeholder="3500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Volume utile (m³)</label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.productDetails.volume || ''}
                  onChange={(e) => updateProductDetails({ volume: parseFloat(e.target.value) || undefined })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0CBFDE] focus:border-[#0CBFDE]"
                  placeholder="12.5"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Carburant</label>
                <select
                  value={formData.productDetails.fuelType || ''}
                  onChange={(e) => updateProductDetails({ fuelType: e.target.value as any })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0CBFDE] focus:border-[#0CBFDE]"
                >
                  <option value="">Sélectionner</option>
                  <option value="gasoline">Essence</option>
                  <option value="diesel">Diesel</option>
                  <option value="electric">Électrique</option>
                </select>
              </div>
            </>
          )}

          {formData.productType === 'parts' && (
            <>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Catégorie</label>
                <select
                  value={formData.productDetails.partCategory || ''}
                  onChange={(e) => updateProductDetails({ partCategory: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0CBFDE] focus:border-[#0CBFDE]"
                >
                  <option value="">Sélectionner</option>
                  <option value="moteur">Moteur</option>
                  <option value="freinage">Freinage</option>
                  <option value="pneus">Pneus</option>
                  <option value="carrosserie">Carrosserie</option>
                  <option value="electronique">Électronique</option>
                  <option value="transmission">Transmission</option>
                  <option value="suspension">Suspension</option>
                  <option value="echappement">Échappement</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Référence (facultatif)</label>
                <input
                  type="text"
                  value={formData.productDetails.partReference || ''}
                  onChange={(e) => updateProductDetails({ partReference: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0CBFDE] focus:border-[#0CBFDE]"
                  placeholder="Référence constructeur"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Compatibilité véhicule</label>
                <input
                  type="text"
                  value={formData.productDetails.compatibility || ''}
                  onChange={(e) => updateProductDetails({ compatibility: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0CBFDE] focus:border-[#0CBFDE]"
                  placeholder="BMW Série 3 E90, Peugeot 308..."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">État</label>
                <select
                  value={formData.productDetails.partCondition || ''}
                  onChange={(e) => updateProductDetails({ partCondition: e.target.value as any })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0CBFDE] focus:border-[#0CBFDE]"
                >
                  <option value="">Sélectionner</option>
                  <option value="new">Neuf</option>
                  <option value="used">Occasion</option>
                </select>
              </div>
            </>
          )}
        </div>
      </div>
    );
  };

  // Étape 6: État du bien (conditionnelle)
  const renderStep6 = () => (
    <div className="space-y-8 max-w-3xl mx-auto">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">État du bien</h2>
        <p className="text-gray-600 text-lg">Évaluez l'état général de votre véhicule</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { id: 'like_new', label: 'Comme neuf', description: 'Excellent état, aucun défaut visible' },
          { id: 'good', label: 'Bon état', description: 'Quelques traces d\'usure normales' },
          { id: 'average', label: 'État moyen', description: 'Usure visible mais fonctionnel' },
          { id: 'poor', label: 'Mauvais état', description: 'Nombreux défauts, réparations nécessaires' },
          { id: 'damaged', label: 'Accidenté', description: 'Véhicule accidenté ou endommagé' },
        ].map((condition) => (
          <button
            key={condition.id}
            onClick={() => updateFormData({ condition: condition.id as any })}
            className={`p-6 border-2 rounded-2xl transition-all duration-200 text-left ${
              formData.condition === condition.id
                ? 'border-[#0CBFDE] bg-cyan-50 shadow-lg'
                : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
            }`}
          >
            <h3 className="font-bold text-gray-900 mb-2">{condition.label}</h3>
            <p className="text-sm text-gray-600">{condition.description}</p>
            {formData.condition === condition.id && (
              <div className="mt-3 flex justify-center">
                <Check className="h-5 w-5 text-[#0CBFDE]" />
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );

  // Étape 7: Description
  const renderStep7 = () => (
    <div className="space-y-8 max-w-2xl mx-auto">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Description</h2>
        <p className="text-gray-600 text-lg">Décrivez votre {formData.productType === 'parts' ? 'pièce' : 'véhicule'} en détail</p>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          Description détaillée *
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => updateFormData({ description: e.target.value })}
          rows={8}
          className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0CBFDE] focus:border-[#0CBFDE] text-lg"
          placeholder={
            formData.productType === 'parts' 
              ? 'Décrivez l\'état de la pièce, son historique, les raisons de la vente...'
              : 'Décrivez l\'état du véhicule, son historique, l\'entretien effectué, les équipements...'
          }
          maxLength={2000}
        />
        <div className="mt-2 text-right text-sm text-gray-500">
          {formData.description.length}/2000 caractères
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <div className="flex items-start space-x-3">
          <Info className="h-5 w-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="font-semibold text-blue-900">Conseils pour une bonne description</h4>
            <ul className="text-blue-800 text-sm mt-2 space-y-1">
              <li>• Mentionnez l'historique et l'entretien</li>
              <li>• Décrivez les équipements et options</li>
              <li>• Signalez les défauts éventuels</li>
              <li>• Indiquez les raisons de la vente</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  // Étape 8: Photos
  const renderStep8 = () => (
    <div className="space-y-8 max-w-2xl mx-auto">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Photos</h2>
        <p className="text-gray-600 text-lg">Ajoutez jusqu'à 10 photos de qualité</p>
      </div>

      <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-[#0CBFDE] transition-colors">
        <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Glissez vos photos ici</h3>
        <p className="text-gray-600 mb-4">ou cliquez pour sélectionner</p>
        <button className="bg-[#0CBFDE] text-white px-6 py-3 rounded-lg hover:bg-[#0AA5C7] transition-colors">
          Choisir des fichiers
        </button>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
        <div className="flex items-start space-x-3">
          <Info className="h-5 w-5 text-yellow-600 mt-0.5" />
          <div>
            <h4 className="font-semibold text-yellow-900">Conseils photo</h4>
            <ul className="text-yellow-800 text-sm mt-2 space-y-1">
              <li>• Prenez des photos en pleine lumière</li>
              <li>• Montrez l'extérieur, l'intérieur et le moteur</li>
              <li>• La première photo sera la miniature</li>
              <li>• Formats acceptés: JPG, PNG (max 5MB par photo)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  // Étape 9: Prix
  const renderStep9 = () => (
    <div className="space-y-8 max-w-2xl mx-auto">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Prix</h2>
        <p className="text-gray-600 text-lg">Fixez le prix de votre {formData.productType === 'parts' ? 'pièce' : 'véhicule'}</p>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          Prix de vente (€) *
        </label>
        <div className="relative">
          <input
            type="number"
            value={formData.price || ''}
            onChange={(e) => updateFormData({ price: parseFloat(e.target.value) || 0 })}
            className="w-full px-4 py-4 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0CBFDE] focus:border-[#0CBFDE] text-lg"
            placeholder="25000"
            min="0"
            step="100"
          />
          <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg">€</span>
        </div>
      </div>

      <div className="bg-green-50 border border-green-200 rounded-xl p-4">
        <div className="flex items-start space-x-3">
          <Info className="h-5 w-5 text-green-600 mt-0.5" />
          <div>
            <h4 className="font-semibold text-green-900">Estimation de prix</h4>
            <p className="text-green-800 text-sm">
              Consultez les annonces similaires pour fixer un prix attractif. 
              Un prix juste favorise une vente rapide.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  // Étape 9: Localisation et Coordonnées
  const renderStep10 = () => (
    <div className="space-y-8 max-w-2xl mx-auto">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Localisation & Contact</h2>
        <p className="text-gray-600 text-lg">Où se trouve le bien et comment vous contacter ?</p>
      </div>

      {/* Section Localisation */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">Localisation</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Ville *</label>
            <input
              type="text"
              value={formData.location.city}
              onChange={(e) => updateFormData({ location: { ...formData.location, city: e.target.value } })}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0CBFDE] focus:border-[#0CBFDE]"
              placeholder="Paris"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Code postal *</label>
            <input
              type="text"
              value={formData.location.postalCode}
              onChange={(e) => updateFormData({ location: { ...formData.location, postalCode: e.target.value } })}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0CBFDE] focus:border-[#0CBFDE]"
              placeholder="75001"
              maxLength={5}
            />
          </div>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start space-x-3">
            <MapPin className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-semibold text-blue-900">Confidentialité</h4>
              <p className="text-blue-800 text-sm">Seule votre ville sera affichée publiquement.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Section Coordonnées */}
      <div className="space-y-6 pt-6 border-t border-gray-200">
        <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">Coordonnées</h3>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Téléphone *</label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="tel"
              value={formData.contact.phone}
              onChange={(e) => updateFormData({ contact: { ...formData.contact, phone: e.target.value } })}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0CBFDE] focus:border-[#0CBFDE]"
              placeholder="+33 6 12 34 56 78"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Email (optionnel)</label>
          <input
            type="email"
            value={formData.contact.email || ''}
            onChange={(e) => updateFormData({ contact: { ...formData.contact, email: e.target.value } })}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0CBFDE] focus:border-[#0CBFDE]"
            placeholder="votre@email.com"
          />
        </div>
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            id="hidePhone"
            checked={formData.contact.hidePhone}
            onChange={(e) => updateFormData({ contact: { ...formData.contact, hidePhone: e.target.checked } })}
            className="h-4 w-4 text-[#0CBFDE] focus:ring-[#0CBFDE] border-gray-300 rounded"
          />
          <label htmlFor="hidePhone" className="text-sm text-gray-700">
            Masquer le téléphone dans l'annonce (contact par message uniquement)
          </label>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
          <div className="flex items-start space-x-3">
            <Info className="h-5 w-5 text-yellow-600 mt-0.5" />
            <div>
              <h4 className="font-semibold text-yellow-900">Protection des données</h4>
              <p className="text-yellow-800 text-sm">Vos coordonnées ne seront visibles que par les acheteurs intéressés.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Étape 12: Résumé
  const renderStep12 = () => (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Résumé de votre annonce</h2>
        <p className="text-gray-600 text-lg">Vérifiez les informations avant publication</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-lg">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Informations principales */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Informations principales</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Type d'annonce:</span>
                  <span className="font-medium">
                    {formData.listingType === 'buy' ? 'Demande' : 'Vente'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Produit:</span>
                  <span className="font-medium">
                    {formData.productType === 'car' ? 'Voiture' :
                     formData.productType === 'motorcycle' ? 'Moto' :
                     formData.productType === 'utility' ? 'Utilitaire' : 'Pièce détachée'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Titre:</span>
                  <span className="font-medium">{formData.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Prix:</span>
                  <span className="font-bold text-[#0CBFDE] text-lg">
                    {formData.price.toLocaleString()} €
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Localisation</h3>
              <p className="text-sm text-gray-600">
                {formData.location.city} ({formData.location.postalCode})
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Contact</h3>
              <div className="space-y-1 text-sm">
                <p className="text-gray-600">Téléphone: {formData.contact.phone}</p>
                {formData.contact.email && (
                  <p className="text-gray-600">Email: {formData.contact.email}</p>
                )}
                {formData.contact.hidePhone && (
                  <p className="text-yellow-600 text-xs">⚠️ Téléphone masqué dans l'annonce</p>
                )}
              </div>
            </div>
          </div>

          {/* Détails techniques */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Détails techniques</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Marque:</span>
                  <span className="font-medium">{formData.productDetails.brand}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Modèle:</span>
                  <span className="font-medium">{formData.productDetails.model}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Année:</span>
                  <span className="font-medium">{formData.productDetails.year}</span>
                </div>
                {formData.productDetails.mileage && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Kilométrage:</span>
                    <span className="font-medium">{formData.productDetails.mileage.toLocaleString()} km</span>
                  </div>
                )}
                {formData.productDetails.firstRegistrationDate && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">1ère mise en circulation:</span>
                    <span className="font-medium">{new Date(formData.productDetails.firstRegistrationDate).toLocaleDateString('fr-FR')}</span>
                  </div>
                )}
                {formData.productDetails.critAir && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Crit'Air:</span>
                    <span className="font-medium">
                      {formData.productDetails.critAir === 'non_classe' ? 'Non classé' : `Crit'Air ${formData.productDetails.critAir}`}
                    </span>
                  </div>
                )}
                {formData.productDetails.displacement && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Cylindrée:</span>
                    <span className="font-medium">{formData.productDetails.displacement} cm³</span>
                  </div>
                )}
                {formData.productDetails.licenseType && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Permis requis:</span>
                    <span className="font-medium">
                      {formData.productDetails.licenseType === 'sans_permis' ? 'Sans permis' :
                       formData.productDetails.licenseType === 'AL' ? 'Permis AL' :
                       `Permis ${formData.productDetails.licenseType}`}
                    </span>
                  </div>
                )}
                {formData.productDetails.vehicleType && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Type:</span>
                    <span className="font-medium">
                      {formData.productDetails.vehicleType === 'citadine' ? 'Citadine' :
                       formData.productDetails.vehicleType === 'berline' ? 'Berline' :
                       formData.productDetails.vehicleType === 'suv' ? 'SUV' :
                       formData.productDetails.vehicleType === 'break' ? 'Break' :
                       formData.productDetails.vehicleType === 'coupe' ? 'Coupé' :
                       formData.productDetails.vehicleType === 'cabriolet' ? 'Cabriolet' :
                       formData.productDetails.vehicleType === 'monospace' ? 'Monospace' :
                       formData.productDetails.vehicleType === 'pickup' ? 'Pick-up' : formData.productDetails.vehicleType}
                    </span>
                  </div>
                )}
                {formData.productDetails.upholstery && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sellerie:</span>
                    <span className="font-medium">
                      {formData.productDetails.upholstery === 'tissu' ? 'Tissu' :
                       formData.productDetails.upholstery === 'cuir_partiel' ? 'Cuir partiel' :
                       formData.productDetails.upholstery === 'cuir' ? 'Cuir' :
                       formData.productDetails.upholstery === 'velours' ? 'Velours' :
                       formData.productDetails.upholstery === 'alcantara' ? 'Alcantara' : formData.productDetails.upholstery}
                    </span>
                  </div>
                )}
                {formData.productDetails.emissionClass && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Émissions:</span>
                    <span className="font-medium">
                      {formData.productDetails.emissionClass.replace('euro', 'Euro ')}
                    </span>
                  </div>
                )}
                {formData.condition && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">État:</span>
                    <span className="font-medium">
                      {formData.condition === 'like_new' ? 'Comme neuf' :
                       formData.condition === 'good' ? 'Bon état' :
                       formData.condition === 'average' ? 'État moyen' :
                       formData.condition === 'poor' ? 'Mauvais état' : 'Accidenté'}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {formData.productDetails.equipment && formData.productDetails.equipment.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Équipements</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {formData.productDetails.equipment.map((equipment, index) => (
                    <div key={index} className="flex items-center space-x-2 p-2 bg-cyan-50 text-[#0CBFDE] rounded-lg">
                      <CheckCircle className="h-4 w-4" />
                      <span className="text-sm font-medium">{equipment}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
              <p className="text-sm text-gray-600 line-clamp-4">
                {formData.description}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <button className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-4 px-6 rounded-xl font-bold text-lg transition-all duration-200 shadow-lg hover:shadow-xl">
            🚀 Publier l'annonce
          </button>
          <p className="text-center text-sm text-gray-500 mt-3">
            Votre annonce sera en ligne dans quelques minutes après validation
          </p>
        </div>
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1: return renderStep1();
      case 2: return renderStep2();
      case 3: return renderStep3();
      case 4: return renderStep5();
      case 5: return renderStep6();
      case 6: return renderStep7();
      case 7: return renderStep8();
      case 8: return renderStep9();
      case 9: return renderStep10();
      case 10: return renderStep12();
      default: return renderStep1();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-900">Créer une annonce</h1>
            <span className="text-sm font-medium text-[#0CBFDE]">
              Étape {currentStep} sur {totalSteps}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-[#0CBFDE] to-[#0AA5C7] h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          {renderCurrentStep()}
        </div>

        {/* Navigation */}
        {currentStep < totalSteps && (
          <div className="flex justify-between items-center">
            <button
              onClick={handlePrev}
              disabled={currentStep === 1}
              className="flex items-center space-x-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Précédent</span>
            </button>

            {currentStep > 2 && (
              <button
                onClick={handleNext}
                disabled={!canProceed()}
                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-[#0CBFDE] to-[#0AA5C7] hover:from-[#0AA5C7] hover:to-[#0891B2] text-white rounded-xl font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>Suivant</span>
                <ArrowRight className="h-5 w-5" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};