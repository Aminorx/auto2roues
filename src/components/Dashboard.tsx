import React, { useState } from 'react';
import { Car, MessageCircle, User, BarChart3, Plus, Edit, Trash2, Eye, Heart, Crown, Settings, Calendar, MapPin, Euro, TrendingUp, Award, Bell, Filter } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { Vehicle } from '../types';

interface DashboardTab {
  id: string;
  label: string;
  icon: React.ReactNode;
  badge?: number;
}

const dashboardTabs: DashboardTab[] = [
  { id: 'overview', label: 'Vue d\'ensemble', icon: <BarChart3 className="h-5 w-5" /> },
  { id: 'listings', label: 'Mes annonces', icon: <Car className="h-5 w-5" /> },
  { id: 'messages', label: 'Messages', icon: <MessageCircle className="h-5 w-5" />, badge: 3 },
  { id: 'profile', label: 'Mon profil', icon: <User className="h-5 w-5" /> },
  { id: 'premium', label: 'Premium', icon: <Crown className="h-5 w-5" /> },
];

export const Dashboard: React.FC = () => {
  const { currentUser, vehicles, setVehicles } = useApp();
  const [activeTab, setActiveTab] = useState('overview');
  const [editingProfile, setEditingProfile] = useState(false);

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center bg-white p-12 rounded-2xl shadow-xl border border-gray-100">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">🔒</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Accès restreint</h2>
          <p className="text-gray-600 text-lg">Vous devez être connecté pour accéder à votre tableau de bord.</p>
        </div>
      </div>
    );
  }

  const userVehicles = vehicles.filter(v => v.userId === currentUser.id);
  const totalViews = userVehicles.reduce((sum, v) => sum + v.views, 0);
  const totalFavorites = userVehicles.reduce((sum, v) => sum + v.favorites, 0);
  const premiumListings = userVehicles.filter(v => v.isPremium).length;

  const handleDeleteListing = (vehicleId: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette annonce ?')) {
      setVehicles(vehicles.filter(v => v.id !== vehicleId));
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const renderOverview = () => (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="relative bg-gradient-to-r from-primary-bolt-500 via-primary-bolt-600 to-primary-bolt-700 rounded-2xl p-8 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">
                Bonjour, {currentUser.name} ! 👋
              </h1>
              <p className="text-cyan-100 text-lg font-medium">
                {currentUser.type === 'professional' 
                  ? 'Gérez votre activité professionnelle depuis votre tableau de bord'
                  : 'Bienvenue sur votre espace personnel'
                }
              </p>
            </div>
            <div className="hidden md:block">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                <Award className="h-12 w-12 text-white/80" />
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
              <span className="text-sm font-medium">Membre depuis</span>
              <p className="text-lg font-bold">
                {new Date(currentUser.createdAt).toLocaleDateString('fr-FR', { 
                  month: 'long', 
                  year: 'numeric' 
                })}
              </p>
            </div>
            {currentUser.verified && (
              <div className="bg-green-500/20 backdrop-blur-sm rounded-lg px-4 py-2 border border-green-400/30">
                <span className="text-sm font-medium text-green-100">✓ Compte vérifié</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-gradient-to-r from-primary-bolt-500 to-primary-bolt-600 p-3 rounded-xl shadow-lg">
              <Car className="h-6 w-6 text-white" />
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-gray-900">{userVehicles.length}</p>
              <p className="text-sm text-gray-600 font-medium">Mes annonces</p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-green-600 font-semibold text-sm bg-green-50 px-2 py-1 rounded-full">
              {userVehicles.filter(v => v.status === 'approved').length} actives
            </span>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-gradient-to-r from-green-500 to-green-600 p-3 rounded-xl shadow-lg">
              <Eye className="h-6 w-6 text-white" />
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-gray-900">{totalViews.toLocaleString()}</p>
              <p className="text-sm text-gray-600 font-medium">Vues totales</p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600 text-sm bg-gray-50 px-2 py-1 rounded-full">
              Moy: {userVehicles.length > 0 ? Math.round(totalViews / userVehicles.length) : 0}/annonce
            </span>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-gradient-to-r from-red-500 to-pink-600 p-3 rounded-xl shadow-lg">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-gray-900">{totalFavorites}</p>
              <p className="text-sm text-gray-600 font-medium">Favoris</p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-pink-600 text-sm bg-pink-50 px-2 py-1 rounded-full font-medium">
              Intérêt généré
            </span>
            <Heart className="h-4 w-4 text-pink-500" />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-3 rounded-xl shadow-lg">
              <Crown className="h-6 w-6 text-white" />
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-orange-600">{premiumListings}</p>
              <p className="text-sm text-gray-600 font-medium">Premium</p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-orange-600 font-semibold text-sm bg-orange-50 px-2 py-1 rounded-full">
              Mises en avant
            </span>
            <Crown className="h-4 w-4 text-orange-500" />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <button className="bg-gradient-to-r from-primary-bolt-500 to-primary-bolt-600 hover:from-primary-bolt-600 hover:to-primary-bolt-700 text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <Plus className="h-8 w-8 mb-3" />
          <h3 className="text-lg font-semibold mb-2">Nouvelle annonce</h3>
          <p className="text-primary-bolt-100 text-sm">Publiez votre véhicule en quelques clics</p>
        </button>

        <button className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <MessageCircle className="h-8 w-8 mb-3" />
          <h3 className="text-lg font-semibold mb-2">Messages</h3>
          <p className="text-green-100 text-sm">3 nouvelles conversations</p>
        </button>

        <button className="bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <Crown className="h-8 w-8 mb-3" />
          <h3 className="text-lg font-semibold mb-2">Booster mes annonces</h3>
          <p className="text-orange-100 text-sm">Augmentez votre visibilité</p>
        </button>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Activité récente</h2>
            <button className="text-primary-bolt-500 hover:text-primary-bolt-600 font-medium text-sm">
              Voir tout
            </button>
          </div>
        </div>
        <div className="p-6">
          {userVehicles.length > 0 ? (
            <div className="space-y-4">
              {userVehicles.slice(0, 5).map((vehicle) => (
                <div key={vehicle.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100/50 rounded-xl hover:from-primary-bolt-50 hover:to-primary-bolt-100/50 transition-all duration-200">
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 bg-gradient-to-r from-primary-bolt-500 to-primary-bolt-600 rounded-xl flex items-center justify-center shadow-lg">
                      <Car className="h-7 w-7 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg">{vehicle.title}</h3>
                      <p className="text-sm text-gray-500">
                        Créée le {new Date(vehicle.createdAt).toLocaleDateString('fr-FR')}
                      </p>
                      <div className="flex items-center space-x-3 mt-1">
                        <span className="text-xs bg-primary-bolt-100 text-primary-bolt-500 px-2 py-1 rounded-full font-medium">
                          {vehicle.views} vues
                        </span>
                        <span className="text-xs bg-pink-100 text-pink-800 px-2 py-1 rounded-full font-medium">
                          {vehicle.favorites} ❤️
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-primary-bolt-500">{formatPrice(vehicle.price)}</p>
                    {vehicle.isPremium && (
                      <span className="inline-flex items-center space-x-1 text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full font-medium">
                        <Crown className="h-3 w-3" />
                        <span>Premium</span>
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Car className="h-10 w-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Aucune annonce</h3>
              <p className="text-gray-600 mb-6">Vous n'avez pas encore publié d'annonce.</p>
              <button className="bg-gradient-to-r from-primary-bolt-500 to-primary-bolt-600 hover:from-primary-bolt-600 hover:to-primary-bolt-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                Publier ma première annonce
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderListings = () => (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Mes annonces</h1>
          <p className="text-gray-600 mt-2 text-lg">{userVehicles.length} annonce{userVehicles.length !== 1 ? 's' : ''} publiée{userVehicles.length !== 1 ? 's' : ''}</p>
        </div>
        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
            <Filter className="h-4 w-4" />
            <span>Filtrer</span>
          </button>
          <button className="bg-gradient-to-r from-primary-bolt-500 to-primary-bolt-600 hover:from-primary-bolt-600 hover:to-primary-bolt-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center space-x-2 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1">
            <Plus className="h-5 w-5" />
            <span>Nouvelle annonce</span>
          </button>
        </div>
      </div>

      {userVehicles.length > 0 ? (
        <div className="grid gap-8">
          {userVehicles.map((vehicle) => (
            <div key={vehicle.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="md:flex">
                <div className="md:w-80 h-64 bg-gradient-to-br from-gray-200 to-gray-300 relative overflow-hidden">
                  {vehicle.images.length > 0 ? (
                    <img
                      src={vehicle.images[0]}
                      alt={vehicle.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-6xl">
                      🚗
                    </div>
                  )}
                  {vehicle.isPremium && (
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center space-x-1 shadow-lg">
                      <Crown className="h-4 w-4" />
                      <span>Premium</span>
                    </div>
                  )}
                </div>
                
                <div className="flex-1 p-8">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{vehicle.title}</h3>
                      <p className="text-3xl font-bold text-primary-bolt-500 mb-4">{formatPrice(vehicle.price)}</p>
                      <div className="flex items-center space-x-6 text-gray-600 mb-4">
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-5 w-5" />
                          <span className="font-medium">{vehicle.year}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-5 w-5" />
                          <span className="font-medium">{vehicle.location}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end space-y-2">
                      <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                        vehicle.status === 'approved' 
                          ? 'bg-green-100 text-green-800 border border-green-200'
                          : vehicle.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                          : 'bg-red-100 text-red-800 border border-red-200'
                      }`}>
                        {vehicle.status === 'approved' ? '✓ Approuvée' : 
                         vehicle.status === 'pending' ? '⏳ En attente' : '❌ Rejetée'}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-8">
                      <div className="flex items-center space-x-2 text-gray-600">
                        <Eye className="h-5 w-5" />
                        <span className="font-semibold">{vehicle.views}</span>
                        <span className="text-sm">vues</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-600">
                        <Heart className="h-5 w-5" />
                        <span className="font-semibold">{vehicle.favorites}</span>
                        <span className="text-sm">favoris</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-600">
                        <MessageCircle className="h-5 w-5" />
                        <span className="font-semibold">3</span>
                        <span className="text-sm">messages</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      {!vehicle.isPremium && (
                        <button className="px-6 py-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl font-semibold transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl">
                          <Crown className="h-4 w-4" />
                          <span>Promouvoir</span>
                        </button>
                      )}
                      <button className="p-3 text-gray-400 hover:text-primary-bolt-500 hover:bg-primary-bolt-50 rounded-xl transition-all duration-200">
                        <Edit className="h-5 w-5" />
                      </button>
                      <button 
                        onClick={() => handleDeleteListing(vehicle.id)}
                        className="p-3 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-16 text-center">
          <div className="w-24 h-24 bg-gradient-to-r from-primary-bolt-100 to-primary-bolt-200 rounded-full flex items-center justify-center mx-auto mb-8">
            <Car className="h-12 w-12 text-primary-bolt-500" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Aucune annonce publiée</h3>
          <p className="text-gray-600 mb-8 text-lg">Commencez dès maintenant à vendre vos véhicules ou pièces détachées.</p>
          <button className="bg-gradient-to-r from-primary-bolt-500 to-primary-bolt-600 hover:from-primary-bolt-600 hover:to-primary-bolt-700 text-white px-10 py-4 rounded-xl font-semibold flex items-center space-x-3 mx-auto shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1">
            <Plus className="h-6 w-6" />
            <span>Publier une annonce</span>
          </button>
        </div>
      )}
    </div>
  );

  const renderMessages = () => (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Messages</h1>
        <p className="text-gray-600 mt-2 text-lg">Gérez vos conversations avec les acheteurs</p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-16 text-center">
        <div className="w-24 h-24 bg-gradient-to-r from-green-100 to-green-200 rounded-full flex items-center justify-center mx-auto mb-8">
          <MessageCircle className="h-12 w-12 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Aucun message</h3>
        <p className="text-gray-600 text-lg">Les conversations avec les acheteurs intéressés apparaîtront ici.</p>
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Mon profil</h1>
          <p className="text-gray-600 mt-2 text-lg">Gérez vos informations personnelles</p>
        </div>
        <button
          onClick={() => setEditingProfile(!editingProfile)}
          className="bg-gradient-to-r from-primary-bolt-500 to-primary-bolt-600 hover:from-primary-bolt-600 hover:to-primary-bolt-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center space-x-2 shadow-lg hover:shadow-xl transition-all duration-200"
        >
          <Edit className="h-4 w-4" />
          <span>{editingProfile ? 'Annuler' : 'Modifier'}</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
        <div className="flex items-center space-x-8 mb-10">
          <div className="w-24 h-24 bg-gradient-to-r from-primary-bolt-500 to-primary-bolt-600 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-3xl">
              {currentUser.name.charAt(0)}
            </span>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900">{currentUser.name}</h2>
            <p className="text-gray-600 text-lg mt-1">{currentUser.email}</p>
            <div className="flex items-center space-x-3 mt-4">
              <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                currentUser.verified
                  ? 'bg-green-100 text-green-800 border border-green-200'
                  : 'bg-yellow-100 text-yellow-800 border border-yellow-200'
              }`}>
                {currentUser.verified ? '✓ Compte vérifié' : '⏳ En attente de vérification'}
              </span>
              <span className="px-4 py-2 bg-primary-bolt-100 text-primary-bolt-500 rounded-full text-sm font-semibold border border-primary-bolt-200">
                {currentUser.type === 'professional' ? '🏢 Professionnel' : '👤 Particulier'}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">Nom complet</label>
            <input
              type="text"
              value={currentUser.name}
              disabled={!editingProfile}
              className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-bolt-500 focus:border-primary-bolt-500 disabled:bg-gray-50 text-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">Email</label>
            <input
              type="email"
              value={currentUser.email}
              disabled={!editingProfile}
              className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-bolt-500 focus:border-primary-bolt-500 disabled:bg-gray-50 text-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">Téléphone</label>
            <input
              type="tel"
              value={currentUser.phone || ''}
              disabled={!editingProfile}
              className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-bolt-500 focus:border-primary-bolt-500 disabled:bg-gray-50 text-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">Type de compte</label>
            <select
              value={currentUser.type}
              disabled={!editingProfile}
              className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-bolt-500 focus:border-primary-bolt-500 disabled:bg-gray-50 text-lg"
            >
              <option value="individual">Particulier</option>
              <option value="professional">Professionnel</option>
            </select>
          </div>

          {currentUser.type === 'professional' && (
            <>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-3">Nom de l'entreprise</label>
                <input
                  type="text"
                  value={currentUser.companyName || ''}
                  disabled={!editingProfile}
                  className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-bolt-500 focus:border-primary-bolt-500 disabled:bg-gray-50 text-lg"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-3">Adresse</label>
                <textarea
                  value={currentUser.address || ''}
                  disabled={!editingProfile}
                  rows={4}
                  className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-bolt-500 focus:border-primary-bolt-500 disabled:bg-gray-50 text-lg"
                />
              </div>
            </>
          )}
        </div>

        {editingProfile && (
          <div className="mt-10 flex justify-end space-x-4">
            <button
              onClick={() => setEditingProfile(false)}
              className="px-8 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-semibold"
            >
              Annuler
            </button>
            <button className="px-8 py-3 bg-gradient-to-r from-primary-bolt-500 to-primary-bolt-600 hover:from-primary-bolt-600 hover:to-primary-bolt-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200">
              Sauvegarder
            </button>
          </div>
        )}
      </div>
    </div>
  );

  const renderPremium = () => (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Options Premium</h1>
        <p className="text-gray-600 mt-2 text-lg">Boostez la visibilité de vos annonces</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Daily Boost */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="text-center mb-8">
            <div className="bg-gradient-to-r from-primary-bolt-500 to-primary-bolt-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Crown className="h-10 w-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Remontée quotidienne</h3>
            <div className="text-4xl font-bold text-primary-bolt-500 mb-3">2€</div>
            <p className="text-gray-600">Remontée automatique pendant 24h</p>
          </div>
          <ul className="space-y-4 mb-8">
            <li className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-primary-bolt-500 rounded-full"></div>
              <span className="font-medium">Remontée en tête de liste</span>
            </li>
            <li className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-primary-bolt-500 rounded-full"></div>
              <span className="font-medium">Badge "Urgent"</span>
            </li>
            <li className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-primary-bolt-500 rounded-full"></div>
              <span className="font-medium">Visibilité accrue</span>
            </li>
          </ul>
          <button className="w-full bg-gradient-to-r from-primary-bolt-500 to-primary-bolt-600 hover:from-primary-bolt-600 hover:to-primary-bolt-700 text-white py-4 px-6 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl">
            Choisir
          </button>
        </div>

        {/* Weekly Premium */}
        <div className="bg-white rounded-2xl shadow-lg border-2 border-orange-200 p-8 relative hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
            <span className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
              ⭐ Populaire
            </span>
          </div>
          <div className="text-center mb-8 mt-4">
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Crown className="h-10 w-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Pack Hebdomadaire</h3>
            <div className="text-4xl font-bold text-orange-600 mb-3">5€</div>
            <p className="text-gray-600">Mise en avant pendant 7 jours</p>
          </div>
          <ul className="space-y-4 mb-8">
            <li className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-orange-600 rounded-full"></div>
              <span className="font-medium">Mise en avant 7 jours</span>
            </li>
            <li className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-orange-600 rounded-full"></div>
              <span className="font-medium">Badge "Premium"</span>
            </li>
            <li className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-orange-600 rounded-full"></div>
              <span className="font-medium">Statistiques détaillées</span>
            </li>
          </ul>
          <button className="w-full bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white py-4 px-6 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl">
            Choisir
          </button>
        </div>

        {/* Monthly Pro */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="text-center mb-8">
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Crown className="h-10 w-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Pack Pro Mensuel</h3>
            <div className="text-4xl font-bold text-purple-600 mb-3">19,99€</div>
            <p className="text-gray-600">Solution complète pour pros</p>
          </div>
          <ul className="space-y-4 mb-8">
            <li className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
              <span className="font-medium">10 annonces en avant</span>
            </li>
            <li className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
              <span className="font-medium">Statistiques avancées</span>
            </li>
            <li className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
              <span className="font-medium">Support prioritaire</span>
            </li>
          </ul>
          <button className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white py-4 px-6 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl">
            Choisir
          </button>
        </div>
      </div>

      {/* Current Premium Status */}
      {premiumListings > 0 && (
        <div className="bg-gradient-to-r from-orange-50 to-orange-100 border-2 border-orange-200 rounded-2xl p-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-4 rounded-full shadow-lg">
                <Crown className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-orange-900">
                  Statut Premium Actif
                </h3>
                <p className="text-orange-700 text-lg">
                  Vous avez {premiumListings} annonce{premiumListings > 1 ? 's' : ''} premium active{premiumListings > 1 ? 's' : ''}
                </p>
              </div>
            </div>
            <button className="bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200">
              Gérer
            </button>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden sticky top-24">
              <div className="p-8 border-b border-gray-200 bg-gradient-to-r from-primary-bolt-50 to-primary-bolt-100">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-primary-bolt-500 to-primary-bolt-600 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-xl">
                      {currentUser.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{currentUser.name}</h3>
                    <p className="text-sm text-gray-600 font-medium">
                      {currentUser.type === 'professional' ? '🏢 Professionnel' : '👤 Particulier'}
                    </p>
                  </div>
                </div>
              </div>
              
              <nav className="p-4">
                {dashboardTabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center justify-between px-6 py-4 rounded-xl text-left transition-all duration-200 mb-2 ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-primary-bolt-500 to-primary-bolt-600 text-white shadow-lg transform scale-105'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-primary-bolt-500'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      {tab.icon}
                      <span className="font-semibold">{tab.label}</span>
                    </div>
                    {tab.badge && (
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                        activeTab === tab.id 
                          ? 'bg-white/20 text-white' 
                          : 'bg-red-500 text-white'
                      }`}>
                        {tab.badge}
                      </span>
                    )}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === 'overview' && renderOverview()}
            {activeTab === 'listings' && renderListings()}
            {activeTab === 'messages' && renderMessages()}
            {activeTab === 'profile' && renderProfile()}
            {activeTab === 'premium' && renderPremium()}
          </div>
        </div>
      </div>
    </div>
  );
};