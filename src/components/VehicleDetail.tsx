import React, { useState } from 'react';
import { ArrowLeft, Calendar, Gauge, MapPin, Heart, MessageCircle, Share2, Crown, Eye, Phone, Mail, CheckCircle } from 'lucide-react';
import { Vehicle } from '../types';

interface VehicleDetailProps {
  vehicle: Vehicle;
  onBack: () => void;
}

export const VehicleDetail: React.FC<VehicleDetailProps> = ({ vehicle, onBack }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showContactInfo, setShowContactInfo] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatMileage = (mileage: number) => {
    return new Intl.NumberFormat('fr-FR').format(mileage) + ' km';
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === vehicle.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? vehicle.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-gray-600 hover:text-primary-bolt-500 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Retour aux annonces</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images and Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            {vehicle.images.length > 0 && (
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="relative h-96 bg-gray-200">
                  <img
                    src={vehicle.images[currentImageIndex]}
                    alt={vehicle.title}
                    className="w-full h-full object-cover"
                  />
                  
                  {vehicle.images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all"
                      >
                        ←
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all"
                      >
                        →
                      </button>
                    </>
                  )}

                  {/* Premium Badge */}
                  {vehicle.isPremium && (
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center space-x-1">
                      <Crown className="h-4 w-4" />
                      <span>Premium</span>
                    </div>
                  )}

                  {/* Image Counter */}
                  {vehicle.images.length > 1 && (
                    <div className="absolute bottom-4 right-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-sm">
                      {currentImageIndex + 1} / {vehicle.images.length}
                    </div>
                  )}
                </div>

                {/* Image Thumbnails */}
                {vehicle.images.length > 1 && (
                  <div className="p-4 flex space-x-2 overflow-x-auto">
                    {vehicle.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                          currentImageIndex === index
                            ? 'border-[#0CBFDE]'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <img
                          src={image}
                          alt={`${vehicle.title} ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Vehicle Details */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">{vehicle.title}</h1>
                  <div className="flex items-center space-x-4 text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Eye className="h-4 w-4" />
                      <span>{vehicle.views} vues</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Heart className="h-4 w-4" />
                      <span>{vehicle.favorites} favoris</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-primary-bolt-500 mb-1">
                    {formatPrice(vehicle.price)}
                  </div>
                  {vehicle.user?.type === 'professional' && (
                    <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-sm font-medium">
                      Professionnel
                    </span>
                  )}
                </div>
              </div>

              {/* Key Information */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                  <Calendar className="h-5 w-5 text-gray-400" />
                  <div>
                    <div className="text-sm text-gray-600">Année</div>
                    <div className="font-semibold">{vehicle.year}</div>
                  </div>
                </div>

                {vehicle.mileage && (
                  <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                    <Gauge className="h-5 w-5 text-gray-400" />
                    <div>
                      <div className="text-sm text-gray-600">Kilométrage</div>
                      <div className="font-semibold">{formatMileage(vehicle.mileage)}</div>
                    </div>
                  </div>
                )}

                <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                  <MapPin className="h-5 w-5 text-gray-400" />
                  <div>
                    <div className="text-sm text-gray-600">Localisation</div>
                    <div className="font-semibold">{vehicle.location}</div>
                  </div>
                </div>

                <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl">{vehicle.category === 'car' ? '🚗' : '🏍️'}</div>
                  <div>
                    <div className="text-sm text-gray-600">Marque</div>
                    <div className="font-semibold">{vehicle.brand}</div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
                <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                  {vehicle.description}
                </p>
              </div>

              {/* Features */}
              {vehicle.features.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Équipements</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {vehicle.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2 p-2 bg-cyan-50 text-[#0CBFDE] rounded-lg">
                        <CheckCircle className="h-4 w-4" />
                        <span className="text-sm font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Contact and Actions */}
          <div className="space-y-6">
            {/* Contact Card */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center">
                  <span className="text-[#0CBFDE] font-semibold text-lg">
                    {vehicle.user?.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{vehicle.user?.name}</h3>
                  {vehicle.user?.type === 'professional' && vehicle.user?.companyName && (
                    <p className="text-sm text-gray-600">{vehicle.user.companyName}</p>
                  )}
                  <div className="flex items-center space-x-1 text-green-600 text-sm">
                    <CheckCircle className="h-4 w-4" />
                    <span>Compte vérifié</span>
                  </div>
                </div>
              </div>

              {/* Contact Actions */}
              <div className="space-y-3">
                <button
                  onClick={() => setShowContactInfo(!showContactInfo)}
                  className="w-full bg-primary-bolt-500 text-white py-3 px-4 rounded-lg hover:bg-primary-bolt-600 transition-colors font-semibold flex items-center justify-center space-x-2"
                >
                  <Phone className="h-5 w-5" />
                  <span>Voir le téléphone</span>
                </button>

                {showContactInfo && vehicle.user?.phone && (
                  <div className="p-3 bg-primary-bolt-50 rounded-lg text-center">
                    <a
                      href={`tel:${vehicle.user.phone}`}
                      className="text-lg font-semibold text-primary-bolt-500 hover:text-primary-bolt-600"
                    >
                      {vehicle.user.phone}
                    </a>
                  </div>
                )}

                <button className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors font-semibold flex items-center justify-center space-x-2">
                  <MessageCircle className="h-5 w-5" />
                  <span>Envoyer un message</span>
                </button>

                <button className="w-full bg-gray-600 text-white py-3 px-4 rounded-lg hover:bg-gray-700 transition-colors font-semibold flex items-center justify-center space-x-2">
                  <Mail className="h-5 w-5" />
                  <span>Envoyer un email</span>
                </button>
              </div>
            </div>

            {/* Actions Card */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Actions</h3>
              <div className="space-y-3">
                <button className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2">
                  <Heart className="h-5 w-5" />
                  <span>Ajouter aux favoris</span>
                </button>

                <button className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2">
                  <Share2 className="h-5 w-5" />
                  <span>Partager l'annonce</span>
                </button>
              </div>
            </div>

            {/* Safety Tips */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
              <h3 className="font-semibold text-yellow-800 mb-3">🛡️ Conseils de sécurité</h3>
              <ul className="text-sm text-yellow-700 space-y-2">
                <li>• Rencontrez le vendeur en personne</li>
                <li>• Inspectez le véhicule avant l'achat</li>
                <li>• Vérifiez les papiers du véhicule</li>
                <li>• Méfiez-vous des prix trop attractifs</li>
                <li>• Préférez un paiement sécurisé</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};