import { User, Vehicle, PremiumOption } from '../types';

export const mockUsers: User[] = [
  {
    id: 'demo',
    email: 'demo@demo.com',
    name: 'Utilisateur Démo',
    phone: '+33 6 00 00 00 00',
    type: 'individual',
    verified: true,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '1',
    email: 'john.doe@email.com',
    name: 'John Doe',
    phone: '+33 6 12 34 56 78',
    type: 'individual',
    verified: true,
    createdAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    email: 'garage.martin@email.com',
    name: 'Pierre Martin',
    phone: '+33 1 23 45 67 89',
    type: 'professional',
    companyName: 'Garage Martin Auto',
    address: '123 Avenue de la République, 75011 Paris',
    verified: true,
    createdAt: new Date('2024-01-10'),
  },
  {
    id: '3',
    email: 'marie.dupont@email.com',
    name: 'Marie Dupont',
    phone: '+33 6 98 76 54 32',
    type: 'individual',
    verified: true,
    createdAt: new Date('2024-02-01'),
  },
  {
    id: '4',
    email: 'moto.expert@email.com',
    name: 'Jean-Luc Moreau',
    phone: '+33 4 56 78 90 12',
    type: 'professional',
    companyName: 'Moto Expert Lyon',
    address: '45 Rue de la Moto, 69000 Lyon',
    verified: true,
    createdAt: new Date('2024-01-20'),
  },
];

export const mockVehicles: Vehicle[] = [
  // Voitures
  {
    id: '1',
    userId: '1',
    user: mockUsers[0],
    title: 'BMW 320d - Excellent état',
    description: 'BMW 320d en excellent état, entretien régulier, carnet de maintenance à jour. Véhicule non fumeur, pneus récents.',
    category: 'car',
    brand: 'BMW',
    model: '320d',
    year: 2020,
    mileage: 45000,
    fuelType: 'diesel',
    condition: 'used',
    price: 28500,
    location: 'Paris 75011',
    images: [
      'https://images.pexels.com/photos/100650/pexels-photo-100650.jpeg',
      'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg',
    ],
    features: ['GPS', 'Climatisation', 'Jantes alliage', 'Régulateur de vitesse'],
    isPremium: true,
    premiumType: 'weekly',
    premiumExpiresAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    createdAt: new Date('2024-12-01'),
    updatedAt: new Date('2024-12-01'),
    views: 156,
    favorites: 12,
    status: 'approved',
  },
  {
    id: '3',
    userId: '1',
    title: 'Peugeot 308 - Fiable et économique',
    description: 'Peugeot 308 essence, parfaite pour la ville. Véhicule bien entretenu, contrôle technique OK.',
    category: 'car',
    brand: 'Peugeot',
    model: '308',
    year: 2018,
    mileage: 72000,
    fuelType: 'gasoline',
    condition: 'used',
    price: 15900,
    location: 'Marseille 13001',
    images: [
      'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg',
    ],
    features: ['Climatisation', 'Bluetooth', 'Régulateur de vitesse'],
    isPremium: false,
    createdAt: new Date('2024-11-25'),
    updatedAt: new Date('2024-11-25'),
    views: 67,
    favorites: 4,
    status: 'approved',
  },
  {
    id: '4',
    userId: '2',
    user: mockUsers[1],
    title: 'Renault Clio V - Comme neuve',
    description: 'Renault Clio V essence, première main, garantie constructeur. Véhicule récent en parfait état.',
    category: 'car',
    brand: 'Renault',
    model: 'Clio',
    year: 2022,
    mileage: 15000,
    fuelType: 'gasoline',
    condition: 'used',
    price: 18500,
    location: 'Lyon 69003',
    images: [
      'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg',
    ],
    features: ['GPS', 'Caméra de recul', 'Climatisation automatique', 'Bluetooth'],
    isPremium: true,
    premiumType: 'daily',
    premiumExpiresAt: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    createdAt: new Date('2024-11-30'),
    updatedAt: new Date('2024-11-30'),
    views: 89,
    favorites: 8,
    status: 'approved',
  },
  {
    id: '5',
    userId: '3',
    user: mockUsers[2],
    title: 'Volkswagen Golf VII - Très bon état',
    description: 'Volkswagen Golf VII diesel, entretien suivi en concession. Véhicule familial spacieux et économique.',
    category: 'car',
    brand: 'Volkswagen',
    model: 'Golf',
    year: 2019,
    mileage: 58000,
    fuelType: 'diesel',
    condition: 'used',
    price: 22900,
    location: 'Toulouse 31000',
    images: [
      'https://images.pexels.com/photos/1149137/pexels-photo-1149137.jpeg',
    ],
    features: ['GPS', 'Régulateur adaptatif', 'Sièges chauffants', 'Jantes alliage'],
    isPremium: false,
    createdAt: new Date('2024-11-28'),
    updatedAt: new Date('2024-11-28'),
    views: 134,
    favorites: 9,
    status: 'approved',
  },

  // Motos
  {
    id: '2',
    userId: '2',
    user: mockUsers[1],
    title: 'Yamaha MT-07 - Comme neuve',
    description: 'Yamaha MT-07 en parfait état, révision complète effectuée. Moto parfaite pour débuter ou pour un usage quotidien.',
    category: 'motorcycle',
    brand: 'Yamaha',
    model: 'MT-07',
    year: 2022,
    mileage: 8500,
    fuelType: 'gasoline',
    condition: 'used',
    price: 6800,
    location: 'Lyon 69001',
    images: [
      'https://images.pexels.com/photos/2116475/pexels-photo-2116475.jpeg',
      'https://images.pexels.com/photos/1121123/pexels-photo-1121123.jpeg',
    ],
    features: ['ABS', 'Éclairage LED', 'Compteur digital'],
    isPremium: false,
    createdAt: new Date('2024-11-28'),
    updatedAt: new Date('2024-11-28'),
    views: 89,
    favorites: 7,
    status: 'approved',
  },
  {
    id: '6',
    userId: '4',
    user: mockUsers[3],
    title: 'Honda CB650R - Sportive élégante',
    description: 'Honda CB650R en excellent état, moto sportive au design moderne. Entretien régulier, pneus neufs.',
    category: 'motorcycle',
    brand: 'Honda',
    model: 'CB650R',
    year: 2021,
    mileage: 12000,
    fuelType: 'gasoline',
    condition: 'used',
    price: 8900,
    location: 'Nice 06000',
    images: [
      'https://images.pexels.com/photos/1121123/pexels-photo-1121123.jpeg',
    ],
    features: ['ABS', 'Modes de conduite', 'Éclairage LED', 'Quickshifter'],
    isPremium: true,
    premiumType: 'weekly',
    premiumExpiresAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    createdAt: new Date('2024-11-29'),
    updatedAt: new Date('2024-11-29'),
    views: 156,
    favorites: 15,
    status: 'approved',
  },
  {
    id: '7',
    userId: '1',
    title: 'Kawasaki Z900 - Puissance et style',
    description: 'Kawasaki Z900 en très bon état, moto puissante et agile. Parfaite pour les amateurs de sensations.',
    category: 'motorcycle',
    brand: 'Kawasaki',
    model: 'Z900',
    year: 2020,
    mileage: 18500,
    fuelType: 'gasoline',
    condition: 'used',
    price: 9500,
    location: 'Bordeaux 33000',
    images: [
      'https://images.pexels.com/photos/2116475/pexels-photo-2116475.jpeg',
    ],
    features: ['ABS', 'Contrôle de traction', 'Modes de conduite', 'Éclairage LED'],
    isPremium: false,
    createdAt: new Date('2024-11-27'),
    updatedAt: new Date('2024-11-27'),
    views: 98,
    favorites: 11,
    status: 'approved',
  },

  // Scooters
  {
    id: '8',
    userId: '3',
    user: mockUsers[2],
    title: 'Yamaha XMAX 300 - Confort urbain',
    description: 'Yamaha XMAX 300 en excellent état, scooter grand roues parfait pour la ville et les trajets quotidiens.',
    category: 'scooter',
    brand: 'Yamaha',
    model: 'XMAX 300',
    year: 2021,
    mileage: 9500,
    fuelType: 'gasoline',
    condition: 'used',
    price: 4200,
    location: 'Montpellier 34000',
    images: [
      'https://images.pexels.com/photos/1121123/pexels-photo-1121123.jpeg',
    ],
    features: ['ABS', 'Coffre sous selle', 'Éclairage LED', 'Prise USB'],
    isPremium: false,
    createdAt: new Date('2024-11-26'),
    updatedAt: new Date('2024-11-26'),
    views: 76,
    favorites: 6,
    status: 'approved',
  },

  // Quads
  {
    id: '22',
    userId: '4',
    user: mockUsers[3],
    title: 'Yamaha Raptor 700R - Quad sportif',
    description: 'Yamaha Raptor 700R en excellent état, quad sportif parfait pour les loisirs et le sport. Entretien régulier, pneus neufs.',
    category: 'quad',
    brand: 'Yamaha',
    model: 'Raptor 700R',
    year: 2020,
    mileage: 2500,
    fuelType: 'gasoline',
    condition: 'used',
    price: 8500,
    location: 'Annecy 74000',
    images: [
      'https://images.pexels.com/photos/2116475/pexels-photo-2116475.jpeg',
    ],
    features: ['Suspension sport', 'Freins à disque', 'Démarreur électrique', 'Pneus tout-terrain'],
    isPremium: false,
    createdAt: new Date('2024-11-30'),
    updatedAt: new Date('2024-11-30'),
    views: 145,
    favorites: 14,
    status: 'approved',
  },

  // Utilitaires
  {
    id: '14',
    userId: '2',
    user: mockUsers[1],
    title: 'Ford Transit Custom - Van aménagé',
    description: 'Ford Transit Custom diesel, aménagement professionnel. Parfait pour artisans ou transport de marchandises.',
    category: 'utility',
    brand: 'Ford',
    model: 'Transit Custom',
    year: 2020,
    mileage: 85000,
    fuelType: 'diesel',
    condition: 'used',
    price: 24500,
    location: 'Paris 75019',
    images: [
      'https://images.pexels.com/photos/1149137/pexels-photo-1149137.jpeg',
    ],
    features: ['Climatisation', 'Cloison de séparation', 'Attelage', 'GPS'],
    isPremium: true,
    premiumType: 'weekly',
    premiumExpiresAt: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
    createdAt: new Date('2024-11-30'),
    updatedAt: new Date('2024-11-30'),
    views: 134,
    favorites: 8,
    status: 'approved',
  },
  {
    id: '15',
    userId: '1',
    title: 'Renault Master - Fourgon grand volume',
    description: 'Renault Master diesel, grand volume de chargement. Idéal pour déménagements et transport volumineux.',
    category: 'utility',
    brand: 'Renault',
    model: 'Master',
    year: 2019,
    mileage: 120000,
    fuelType: 'diesel',
    condition: 'used',
    price: 18900,
    location: 'Lyon 69007',
    images: [
      'https://images.pexels.com/photos/100650/pexels-photo-100650.jpeg',
    ],
    features: ['Hayon arrière', 'Porte latérale', 'Radio Bluetooth'],
    isPremium: false,
    createdAt: new Date('2024-11-29'),
    updatedAt: new Date('2024-11-29'),
    views: 89,
    favorites: 5,
    status: 'approved',
  },
  {
    id: '16',
    userId: '3',
    user: mockUsers[2],
    title: 'Volkswagen Crafter - Utilitaire récent',
    description: 'Volkswagen Crafter diesel, utilitaire récent avec faible kilométrage. Entretien suivi en concession.',
    category: 'utility',
    brand: 'Volkswagen',
    model: 'Crafter',
    year: 2021,
    mileage: 45000,
    fuelType: 'diesel',
    condition: 'used',
    price: 32500,
    location: 'Marseille 13008',
    images: [
      'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg',
    ],
    features: ['Climatisation', 'GPS', 'Caméra de recul', 'Attelage'],
    isPremium: false,
    createdAt: new Date('2024-11-28'),
    updatedAt: new Date('2024-11-28'),
    views: 112,
    favorites: 7,
    status: 'approved',
  },
  {
    id: '17',
    userId: '4',
    user: mockUsers[3],
    title: 'Iveco Daily - Plateau benne',
    description: 'Iveco Daily diesel avec plateau benne basculante. Parfait pour les travaux et le transport de matériaux.',
    category: 'utility',
    brand: 'Iveco',
    model: 'Daily',
    year: 2018,
    mileage: 95000,
    fuelType: 'diesel',
    condition: 'used',
    price: 28900,
    location: 'Toulouse 31200',
    images: [
      'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg',
    ],
    features: ['Benne basculante', 'Attelage', 'Radio', 'Crochet de remorquage'],
    isPremium: false,
    createdAt: new Date('2024-11-27'),
    updatedAt: new Date('2024-11-27'),
    views: 67,
    favorites: 4,
    status: 'approved',
  },

  // Autres véhicules
  {
    id: '18',
    userId: '1',
    title: 'Jet Ski Yamaha VX Cruiser - Loisirs nautiques',
    description: 'Jet Ski Yamaha VX Cruiser en excellent état, parfait pour les loisirs nautiques. Entretien régulier, remorque incluse.',
    category: 'other',
    brand: 'Yamaha',
    model: 'VX Cruiser',
    year: 2020,
    mileage: 45,
    fuelType: 'gasoline',
    condition: 'used',
    price: 12500,
    location: 'Cannes 06400',
    images: [
      'https://images.pexels.com/photos/1149137/pexels-photo-1149137.jpeg',
    ],
    features: ['Remorque incluse', 'GPS étanche', 'Coffre étanche', 'Système audio'],
    isPremium: true,
    premiumType: 'weekly',
    premiumExpiresAt: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000),
    createdAt: new Date('2024-12-01'),
    updatedAt: new Date('2024-12-01'),
    views: 234,
    favorites: 18,
    status: 'approved',
  },
  {
    id: '19',
    userId: '2',
    user: mockUsers[1],
    title: 'Bateau Quicksilver 505 - Moteur Mercury',
    description: 'Bateau Quicksilver 505 avec moteur Mercury 90CV. Parfait pour la pêche et les balades en famille.',
    category: 'other',
    brand: 'Quicksilver',
    model: '505',
    year: 2019,
    fuelType: 'gasoline',
    condition: 'used',
    price: 18900,
    location: 'La Rochelle 17000',
    images: [
      'https://images.pexels.com/photos/100650/pexels-photo-100650.jpeg',
    ],
    features: ['Moteur Mercury 90CV', 'Remorque', 'Sondeur', 'Bimini'],
    isPremium: false,
    createdAt: new Date('2024-11-30'),
    updatedAt: new Date('2024-11-30'),
    views: 156,
    favorites: 12,
    status: 'approved',
  },
  {
    id: '20',
    userId: '3',
    user: mockUsers[2],
    title: 'Camion Renault Midlum - Transport professionnel',
    description: 'Camion Renault Midlum diesel, parfait pour le transport professionnel. Entretien suivi, contrôle technique OK.',
    category: 'other',
    brand: 'Renault',
    model: 'Midlum',
    year: 2017,
    mileage: 180000,
    fuelType: 'diesel',
    condition: 'used',
    price: 45000,
    location: 'Lille 59000',
    images: [
      'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg',
    ],
    features: ['Hayon élévateur', 'Climatisation', 'Tachygraphe', 'Radio'],
    isPremium: false,
    createdAt: new Date('2024-11-29'),
    updatedAt: new Date('2024-11-29'),
    views: 89,
    favorites: 6,
    status: 'approved',
  },
  {
    id: '21',
    userId: '4',
    user: mockUsers[3],
    title: 'Caravane Hobby De Luxe - Vacances familiales',
    description: 'Caravane Hobby De Luxe en excellent état, parfaite pour les vacances en famille. Équipement complet.',
    category: 'other',
    brand: 'Hobby',
    model: 'De Luxe',
    year: 2020,
    condition: 'used',
    price: 22500,
    location: 'Annecy 74000',
    images: [
      'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg',
    ],
    features: ['Cuisine équipée', 'Douche/WC', 'Chauffage', 'Auvent', 'TV'],
    isPremium: false,
    createdAt: new Date('2024-11-28'),
    updatedAt: new Date('2024-11-28'),
    views: 145,
    favorites: 14,
    status: 'approved',
  },

  // Pièces détachées
  {
    id: '12',
    userId: '2',
    user: mockUsers[1],
    title: 'Moteur BMW 320d N47 - Révisé',
    description: 'Moteur BMW 320d N47 entièrement révisé, garantie 6 mois. Distribution changée, joint de culasse neuf.',
    category: 'parts',
    brand: 'BMW',
    model: 'Moteur N47',
    year: 2015,
    fuelType: 'diesel',
    condition: 'used',
    price: 2500,
    location: 'Paris 75020',
    images: [
      'https://images.pexels.com/photos/190574/pexels-photo-190574.jpeg',
    ],
    features: ['Révisé', 'Garantie 6 mois', 'Distribution neuve', 'Joint culasse neuf'],
    isPremium: false,
    createdAt: new Date('2024-11-23'),
    updatedAt: new Date('2024-11-23'),
    views: 89,
    favorites: 7,
    status: 'approved',
  },
  {
    id: '13',
    userId: '4',
    user: mockUsers[3],
    title: 'Jantes alliage 17" BMW - Parfait état',
    description: 'Set de 4 jantes alliage BMW 17 pouces en parfait état, style 394. Avec pneus Michelin récents.',
    category: 'parts',
    brand: 'BMW',
    model: 'Jantes Style 394',
    year: 2020,
    condition: 'used',
    price: 800,
    location: 'Lyon 69007',
    images: [
      'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg',
    ],
    features: ['Set de 4', 'Pneus inclus', 'Parfait état', 'Style 394'],
    isPremium: true,
    premiumType: 'weekly',
    premiumExpiresAt: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
    createdAt: new Date('2024-11-30'),
    updatedAt: new Date('2024-11-30'),
    views: 156,
    favorites: 12,
    status: 'approved',
  },
  {
    id: '23',
    userId: '1',
    title: 'Pare-chocs avant Peugeot 308 - Neuf',
    description: 'Pare-chocs avant Peugeot 308 phase 2, neuf dans son emballage. Couleur gris métallisé, prêt à peindre.',
    category: 'parts',
    brand: 'Peugeot',
    model: 'Pare-chocs 308',
    year: 2018,
    condition: 'new',
    price: 320,
    location: 'Marseille 13005',
    images: [
      'https://images.pexels.com/photos/3806288/pexels-photo-3806288.jpeg',
    ],
    features: ['Neuf', 'Emballage d\'origine', 'Prêt à peindre', 'Phase 2'],
    isPremium: false,
    createdAt: new Date('2024-11-29'),
    updatedAt: new Date('2024-11-29'),
    views: 67,
    favorites: 5,
    status: 'approved',
  },
  {
    id: '24',
    userId: '3',
    user: mockUsers[2],
    title: 'Alternateur Renault Clio - Testé OK',
    description: 'Alternateur Renault Clio 4 en parfait état de fonctionnement. Testé et garanti 3 mois.',
    category: 'parts',
    brand: 'Renault',
    model: 'Alternateur Clio',
    year: 2019,
    condition: 'used',
    price: 150,
    location: 'Toulouse 31100',
    images: [
      'https://images.pexels.com/photos/2244746/pexels-photo-2244746.jpeg',
    ],
    features: ['Testé OK', 'Garantie 3 mois', 'Parfait état', 'Prêt à monter'],
    isPremium: false,
    createdAt: new Date('2024-11-28'),
    updatedAt: new Date('2024-11-28'),
    views: 45,
    favorites: 3,
    status: 'approved',
  },
];

export const premiumOptions: PremiumOption[] = [
  {
    id: '1',
    name: 'Remontée quotidienne',
    price: 2,
    duration: 1,
    features: ['Remontée automatique en tête de liste', 'Badge "Urgent"'],
  },
  {
    id: '2',
    name: 'Mise en avant hebdomadaire',
    price: 5,
    duration: 7,
    features: ['Mise en avant pendant 7 jours', 'Badge "Premium"', 'Statistiques détaillées'],
  },
  {
    id: '3',
    name: 'Pack Pro mensuel',
    price: 19.99,
    duration: 30,
    features: ['10 annonces mises en avant', 'Statistiques avancées', 'Support prioritaire'],
  },
];

export const brands = [
  // Cette liste est maintenant remplacée par des listes spécifiques par type de véhicule
];

// Marques par type de véhicule
export const brandsByVehicleType = {
  // Voitures
  car: [
    'Abarth', 'AC', 'Alfa Romeo', 'Alpina', 'Alpine', 'Aston Martin', 'Audi', 'Austin', 'Austin-Healey',
    'Baic', 'Bentley', 'BMW', 'Borgward', 'Buick', 'BYD', 'Cadillac', 'Chevrolet', 'Chrysler', 'Citroën',
    'Cupra', 'Dacia', 'DFSK', 'Dodge', 'Donkervoort', 'DS Automobiles', 'Ferrari', 'Fiat', 'Ford',
    'Forthing', 'Foton', 'GMC', 'Glas', 'Honda', 'Hummer', 'Hyundai', 'Ineos', 'Infiniti', 'Isuzu',
    'JAC', 'Jaecoo', 'Jaguar', 'Jeep', 'Kia', 'KTM', 'Lada', 'Lamborghini', 'Lancia', 'Land Rover',
    'Lexus', 'Ligier', 'Livan', 'London Taxi', 'Lotus', 'MAN', 'Maserati', 'Maxus', 'Maybach', 'Mazda',
    'McLaren', 'Mercedes-Benz', 'MG', 'Mini', 'Mitsubishi', 'Morgan', 'Nissan', 'Oldsmobile', 'Opel',
    'Packard', 'Peugeot', 'Plymouth', 'Polaris', 'Polestar', 'Pontiac', 'Porsche', 'Renault', 'Rolls-Royce',
    'Rover', 'Saab', 'Seat', 'Skoda', 'Smart', 'SsangYong', 'Subaru', 'Suzuki', 'SWM', 'Tesla', 'Toyota',
    'Triumph', 'Volkswagen', 'Volvo', 'Westfield', 'Wiesmann', 'Xpeng', 'Zastava', 'Autres voitures'
  ],

  // Utilitaires
  utility: [
    'Citroën', 'Fiat', 'Ford', 'Iveco', 'MAN', 'Maxus', 'Mercedes-Benz', 'Nissan', 'Opel', 'Peugeot',
    'Renault', 'Toyota', 'Volkswagen', 'Autres utilitaires'
  ],

  // Caravanes (utilise les mêmes marques que les utilitaires pour l'instant)
  caravan: [
    'Adria', 'Bürstner', 'Caravelair', 'Chausson', 'Dethleffs', 'Eriba', 'Fendt', 'Hobby', 'Hymer',
    'Knaus', 'LMC', 'Rapido', 'Sterckeman', 'Tabbert', 'Trigano', 'Weinsberg', 'Wilk', 'Autres caravanes'
  ],

  // Remorques
  trailer: [
    'Anssems', 'Böckmann', 'Brenderup', 'Hapert', 'Humbaur', 'Lider', 'Martz', 'Norauto', 'Saris',
    'Trigano', 'Unsinn', 'Autres remorques'
  ],

  // Motos
  motorcycle: [
    'Aprilia', 'Benelli', 'Beta', 'BMW', 'Brixton', 'CFMOTO', 'Daelim', 'Derbi', 'Ducati', 'Energica',
    'Fantic', 'GasGas', 'Harley-Davidson', 'Honda', 'Husaberg', 'Husqvarna', 'Indian', 'Kawasaki',
    'Keeway', 'KTM', 'Kymco', 'Mash', 'MBK', 'Moto Guzzi', 'MV Agusta', 'Norton', 'Orcal', 'Peugeot',
    'Piaggio', 'Quadro', 'Rieju', 'Royal Enfield', 'Sherco', 'Suzuki', 'SWM', 'Sym', 'TGB', 'Triumph',
    'Vespa', 'Victory', 'Yamaha', 'Zontes', 'Zündapp', 'Autres motos'
  ],

  // Scooters
  scooter: [
    'Aprilia', 'Baotian', 'BMW', 'Derbi', 'Gilera', 'Honda', 'Keeway', 'Kymco', 'MBK', 'Peugeot',
    'Piaggio', 'SYM', 'Vespa', 'Yamaha', 'Zontes', 'Autre scooter'
  ],

  // Quads
  quad: [
    'Aeon', 'Access Motor', 'Arctic Cat', 'Can-Am', 'CFMOTO', 'Goes', 'Honda', 'Hytrack', 'Kawasaki',
    'Kymco', 'Linhai', 'Polaris', 'Suzuki', 'TGB', 'Yamaha', 'Autres quads'
  ],

  // Jetskis
  jetski: [
    'Bombardier', 'Kawasaki', 'Sea-Doo', 'Yamaha', 'Autres jetski'
  ],

  // Bateaux
  boat: [
    'Antares', 'Bayliner', 'Bénéteau', 'Bombard', 'Cap Camarat', 'Flyer', 'Jeanneau', 'Ocqueteau',
    'Pacific Craft', 'Quicksilver', 'Ranieri', 'Sea Ray', 'Selva', 'White Shark', 'Zodiac', 'Autres bateaux'
  ],

  // Services (pas de marques spécifiques)
  repair: [],
  towing: [],
  maintenance: [],
  other: [],

  // Pièces détachées (utilise toutes les marques)
  'moto-parts': [
    'Aprilia', 'Benelli', 'Beta', 'BMW', 'Brixton', 'CFMOTO', 'Daelim', 'Derbi', 'Ducati', 'Energica',
    'Fantic', 'GasGas', 'Harley-Davidson', 'Honda', 'Husaberg', 'Husqvarna', 'Indian', 'Kawasaki',
    'Keeway', 'KTM', 'Kymco', 'Mash', 'MBK', 'Moto Guzzi', 'MV Agusta', 'Norton', 'Orcal', 'Peugeot',
    'Piaggio', 'Quadro', 'Rieju', 'Royal Enfield', 'Sherco', 'Suzuki', 'SWM', 'Sym', 'TGB', 'Triumph',
    'Vespa', 'Victory', 'Yamaha', 'Zontes', 'Zündapp', 'Autres motos'
  ],
  'vehicle-parts': [
    'Abarth', 'AC', 'Alfa Romeo', 'Alpina', 'Alpine', 'Aston Martin', 'Audi', 'Austin', 'Austin-Healey',
    'Baic', 'Bentley', 'BMW', 'Borgward', 'Buick', 'BYD', 'Cadillac', 'Chevrolet', 'Chrysler', 'Citroën',
    'Cupra', 'Dacia', 'DFSK', 'Dodge', 'Donkervoort', 'DS Automobiles', 'Ferrari', 'Fiat', 'Ford',
    'Forthing', 'Foton', 'GMC', 'Glas', 'Honda', 'Hummer', 'Hyundai', 'Ineos', 'Infiniti', 'Isuzu',
    'JAC', 'Jaecoo', 'Jaguar', 'Jeep', 'Kia', 'KTM', 'Lada', 'Lamborghini', 'Lancia', 'Land Rover',
    'Lexus', 'Ligier', 'Livan', 'London Taxi', 'Lotus', 'MAN', 'Maserati', 'Maxus', 'Maybach', 'Mazda',
    'McLaren', 'Mercedes-Benz', 'MG', 'Mini', 'Mitsubishi', 'Morgan', 'Nissan', 'Oldsmobile', 'Opel',
    'Packard', 'Peugeot', 'Plymouth', 'Polaris', 'Polestar', 'Pontiac', 'Porsche', 'Renault', 'Rolls-Royce',
    'Rover', 'Saab', 'Seat', 'Skoda', 'Smart', 'SsangYong', 'Subaru', 'Suzuki', 'SWM', 'Tesla', 'Toyota',
    'Triumph', 'Volkswagen', 'Volvo', 'Westfield', 'Wiesmann', 'Xpeng', 'Zastava', 'Autres voitures'
  ]
};

// Fonction utilitaire pour obtenir les marques selon la sous-catégorie
export const getBrandsBySubcategory = (subcategory: string): string[] => {
  return brandsByVehicleType[subcategory as keyof typeof brandsByVehicleType] || [];
};
export const fuelTypes = [
  { value: 'gasoline', label: 'Essence' },
  { value: 'diesel', label: 'Diesel' },
  { value: 'electric', label: 'Électrique' },
  { value: 'hybrid', label: 'Hybride' },
];

export const conditions = [
  { value: 'new', label: 'Neuf' },
  { value: 'used', label: 'Occasion' },
  { value: 'damaged', label: 'Accidenté' },
];

// Équipements prédéfinis pour les véhicules
export const VEHICLE_EQUIPMENT = {
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
    'Attelage',
    'Cloison de séparation',
    'Hayon arrière',
    'Porte latérale',
    'Plancher bois',
    'Éclairage LED cargo',
    'Prise 12V',
    'Radio Bluetooth'
  ]
};

export const colors = [
  '#ef4444', // red
  '#f97316', // orange
  '#eab308', // yellow
  '#22c55e', // green
  '#06b6d4', // cyan
  '#3b82f6', // blue
  '#8b5cf6', // violet
  '#ec4899', // pink
  '#64748b', // slate
  '#6b7280', // gray
];

// Nombre de portes pour les véhicules
export const doorCounts = [
  { value: 2, label: '2 portes' },
  { value: 3, label: '3 portes' },
  { value: 4, label: '4 portes' },
  { value: 5, label: '5 portes' },
];

// Types de véhicules
export const vehicleTypes = [
  { value: 'citadine', label: 'Citadine' },
  { value: 'berline', label: 'Berline' },
  { value: 'suv', label: 'SUV' },
  { value: 'break', label: 'Break' },
  { value: 'coupe', label: 'Coupé' },
  { value: 'cabriolet', label: 'Cabriolet' },
  { value: 'monospace', label: 'Monospace' },
  { value: 'pickup', label: 'Pick-up' },
];

// Types de transmission
export const transmissionTypes = [
  { value: 'manual', label: 'Manuelle' },
  { value: 'automatic', label: 'Automatique' },
  { value: 'semi-automatic', label: 'Semi-automatique' },
];

// Couleurs de véhicules
export const vehicleColors = [
  { value: 'blanc', label: 'Blanc' },
  { value: 'noir', label: 'Noir' },
  { value: 'gris', label: 'Gris' },
  { value: 'argent', label: 'Argent' },
  { value: 'rouge', label: 'Rouge' },
  { value: 'bleu', label: 'Bleu' },
  { value: 'vert', label: 'Vert' },
  { value: 'jaune', label: 'Jaune' },
  { value: 'orange', label: 'Orange' },
  { value: 'violet', label: 'Violet' },
  { value: 'marron', label: 'Marron' },
  { value: 'beige', label: 'Beige' },
];

// Types de sellerie
export const upholsteryTypes = [
  { value: 'tissu', label: 'Tissu' },
  { value: 'cuir_partiel', label: 'Cuir partiel' },
  { value: 'cuir', label: 'Cuir' },
  { value: 'velours', label: 'Velours' },
  { value: 'alcantara', label: 'Alcantara' },
];

// Classes d'émission
export const emissionClasses = [
  { value: 'euro1', label: 'Euro 1' },
  { value: 'euro2', label: 'Euro 2' },
  { value: 'euro3', label: 'Euro 3' },
  { value: 'euro4', label: 'Euro 4' },
  { value: 'euro5', label: 'Euro 5' },
  { value: 'euro6', label: 'Euro 6' },
];

// Types d'utilitaires
export const utilityTypes = [
  { value: 'van', label: 'Fourgon' },
  { value: 'truck', label: 'Camion' },
  { value: 'pickup', label: 'Pick-up' },
  { value: 'trailer', label: 'Remorque' },
];

// Types de caravanes
export const caravanTypes = [
  { value: 'travel_trailer', label: 'Caravane de voyage' },
  { value: 'motorhome', label: 'Camping-car' },
  { value: 'popup', label: 'Caravane pliante' },
  { value: 'fifth_wheel', label: 'Caravane à sellette' },
];

// Types de remorques
export const trailerTypes = [
  { value: 'utility', label: 'Utilitaire' },
  { value: 'boat', label: 'Porte-bateau' },
  { value: 'car', label: 'Porte-voiture' },
  { value: 'cargo', label: 'Cargo fermée' },
];

// Types de motos
export const motorcycleTypes = [
  { value: 'sport', label: 'Sportive' },
  { value: 'touring', label: 'Routière' },
  { value: 'urban', label: 'Urbaine' },
  { value: 'trail', label: 'Trail' },
  { value: 'custom', label: 'Custom' },
  { value: 'roadster', label: 'Roadster' },
  { value: 'enduro', label: 'Enduro' },
  { value: 'cross', label: 'Cross' },
];

// Types de quads
export const quadTypes = [
  { value: 'sport', label: 'Sport' },
  { value: 'utility', label: 'Utilitaire' },
  { value: 'touring', label: 'Tourisme' },
  { value: 'youth', label: 'Jeune' },
];

// Types de jetskis
export const jetskiTypes = [
  { value: 'recreation', label: 'Loisir' },
  { value: 'performance', label: 'Performance' },
  { value: 'luxury', label: 'Luxe' },
  { value: 'touring', label: 'Tourisme' },
];

// Types de bateaux
export const boatTypes = [
  { value: 'motor', label: 'Bateau à moteur' },
  { value: 'sailing', label: 'Voilier' },
  { value: 'fishing', label: 'Bateau de pêche' },
  { value: 'inflatable', label: 'Pneumatique' },
  { value: 'cabin', label: 'Cabine' },
];

// Types de services
export const serviceTypes = [
  { value: 'repair', label: 'Réparation' },
  { value: 'maintenance', label: 'Entretien' },
  { value: 'towing', label: 'Remorquage' },
  { value: 'inspection', label: 'Contrôle technique' },
  { value: 'bodywork', label: 'Carrosserie' },
  { value: 'painting', label: 'Peinture' },
  { value: 'tuning', label: 'Préparation' },
];

export const categories = [
  { value: 'car', label: 'Voitures', icon: '🚗' },
  { value: 'motorcycle', label: 'Motos', icon: '🏍️' },
  { value: 'scooter', label: 'Scooters', icon: '🛵' },
  { value: 'quad', label: 'Quads', icon: '🏎️' },
  { value: 'utility', label: 'Utilitaires', icon: '🚚' },
  { value: 'other', label: 'Autres', icon: '🚤' },
  { value: 'parts', label: 'Pièces détachées', icon: '🔧' },
  { value: 'services', label: 'Services', icon: '🛠️' },
];