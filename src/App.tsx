import React, { useState } from 'react';
import { AppProvider, useApp } from './contexts/AppContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { VehicleListings } from './components/VehicleListings';
import { VehicleDetail } from './components/VehicleDetail';
import { AuthModal } from './components/AuthModal';
import { Dashboard } from './components/Dashboard';
import { CreateListingForm } from './components/CreateListingForm';

function AppContent() {
  const [currentView, setCurrentView] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { currentUser, selectedVehicle, setSelectedVehicle } = useApp();

  // If a vehicle is selected, show its details regardless of current view
  if (selectedVehicle) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <Header 
          currentView={currentView}
          setCurrentView={setCurrentView}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />
        
        <VehicleDetail 
          vehicle={selectedVehicle} 
          onBack={() => setSelectedVehicle(null)} 
        />
        
        <AuthModal />
      </div>
    );
  }
  const renderContent = () => {
    switch (currentView) {
      case 'listings':
        return <VehicleListings />;
      case 'dashboard':
        return <Dashboard />;
      case 'create-listing':
        return <CreateListingForm />;
      case 'messages':
        return (
          <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
            <div className="text-center bg-white p-12 rounded-2xl shadow-xl border border-gray-100">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">💬</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Messages</h2>
              <p className="text-gray-600 text-lg">Fonctionnalité en cours de développement</p>
            </div>
          </div>
        );
      case 'admin':
        return (
          <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
            <div className="text-center bg-white p-12 rounded-2xl shadow-xl border border-gray-100">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">⚙️</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Administration</h2>
              <p className="text-gray-600 text-lg">Fonctionnalité en cours de développement</p>
            </div>
          </div>
        );
      default:
        return <Hero setCurrentView={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <Header 
        currentView={currentView}
        setCurrentView={setCurrentView}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />
      
      {renderContent()}
      
      <AuthModal />
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;