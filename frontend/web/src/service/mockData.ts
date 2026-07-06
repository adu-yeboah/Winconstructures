import { Property, PropertyStatus, PropertyType } from '@/types/property';
import { Message, MessageStatus } from '@/types/messages';
import { AuthUser } from '@/types/auth';

export const mockProperties: Property[] = [
  {
    id: 1,
    title: 'Luxury Villa in East Legon',
    description: 'Beautiful 5-bedroom villa with a swimming pool and spacious garden.',
    location: 'East Legon, Accra',
    price: '$500,000',
    bedrooms: 5,
    bathrooms: 6,
    area: '450 sq ft',
    status: 'FOR_SALE' as PropertyStatus,
    type: 'HOUSE' as PropertyType,
    featured: true,
    viewCount: 150,
    listedById: 1,
    images: [
      { img: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=2070&auto=format&fit=crop' },
      { img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop' },
      { img: 'https://images.unsplash.com/photo-1600607687931-cebf0746e58e?q=80&w=2070&auto=format&fit=crop' },
      { img: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2070&auto=format&fit=crop' }
    ],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 2,
    title: 'Modern Apartment Cantonments',
    description: '3-bedroom luxury apartment in the heart of Cantonments.',
    location: 'Cantonments, Accra',
    price: '$3,000/month',
    bedrooms: 3,
    bathrooms: 3,
    area: '200 sq ft',
    status: 'FOR_RENT' as PropertyStatus,
    type: 'APARTMENT' as PropertyType,
    featured: true,
    viewCount: 320,
    listedById: 1,
    images: [
      { img: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop' },
      { img: 'https://images.unsplash.com/photo-1502672260266-1c1e52d15461?q=80&w=2080&auto=format&fit=crop' },
      { img: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=2070&auto=format&fit=crop' }
    ],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 3,
    title: 'Cozy Condo Dzorwulu',
    description: '2-bedroom condo perfect for young professionals.',
    location: 'Dzorwulu, Accra',
    price: '$150,000',
    bedrooms: 2,
    bathrooms: 2,
    area: '120 sq ft',
    status: 'FOR_SALE' as PropertyStatus,
    type: 'CONDO' as PropertyType,
    featured: false,
    viewCount: 85,
    listedById: 1,
    images: [
      { img: 'https://images.unsplash.com/photo-1502672260266-1c1e52d15461?q=80&w=2080&auto=format&fit=crop' },
      { img: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?q=80&w=2070&auto=format&fit=crop' },
      { img: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop' }
    ],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 4,
    title: 'Seaview Penthouse Osu',
    description: 'Stunning penthouse with panoramic ocean views and top-tier amenities.',
    location: 'Osu, Accra',
    price: '$4,500/month',
    bedrooms: 4,
    bathrooms: 4,
    area: '300 sq ft',
    status: 'FOR_RENT' as PropertyStatus,
    type: 'APARTMENT' as PropertyType,
    featured: true,
    viewCount: 512,
    listedById: 1,
    images: [
      { img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop' },
      { img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop' },
      { img: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=2069&auto=format&fit=crop' }
    ],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 5,
    title: 'Family Home Spintex',
    description: 'Spacious family house with a large compound, ideal for kids.',
    location: 'Spintex, Accra',
    price: '$250,000',
    bedrooms: 4,
    bathrooms: 3,
    area: '350 sq ft',
    status: 'FOR_SALE' as PropertyStatus,
    type: 'HOUSE' as PropertyType,
    featured: false,
    viewCount: 220,
    listedById: 1,
    images: [
      { img: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2070&auto=format&fit=crop' },
      { img: 'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?q=80&w=2070&auto=format&fit=crop' },
      { img: 'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?q=80&w=2070&auto=format&fit=crop' }
    ],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 6,
    title: 'Executive Studio Labone',
    description: 'Fully furnished executive studio for expats and professionals.',
    location: 'Labone, Accra',
    price: '$1,200/month',
    bedrooms: 1,
    bathrooms: 1,
    area: '80 sq ft',
    status: 'FOR_RENT' as PropertyStatus,
    type: 'APARTMENT' as PropertyType,
    featured: true,
    viewCount: 400,
    listedById: 1,
    images: [
      { img: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=2070&auto=format&fit=crop' },
      { img: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=2080&auto=format&fit=crop' },
      { img: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2069&auto=format&fit=crop' }
    ],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 7,
    title: 'Modern Townhouse Airport Residential',
    description: 'A stylish 4-bedroom townhouse in a secure gated community.',
    location: 'Airport Residential, Accra',
    price: '$850,000',
    bedrooms: 4,
    bathrooms: 5,
    area: '400 sq ft',
    status: 'FOR_SALE' as PropertyStatus,
    type: 'HOUSE' as PropertyType,
    featured: true,
    viewCount: 195,
    listedById: 1,
    images: [
      { img: 'https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?q=80&w=2073&auto=format&fit=crop' },
      { img: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=2074&auto=format&fit=crop' },
      { img: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=2069&auto=format&fit=crop' }
    ],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 8,
    title: 'Minimalist Apartment Roman Ridge',
    description: 'Chic 2-bedroom apartment with great city views.',
    location: 'Roman Ridge, Accra',
    price: '$2,200/month',
    bedrooms: 2,
    bathrooms: 2,
    area: '150 sq ft',
    status: 'FOR_RENT' as PropertyStatus,
    type: 'APARTMENT' as PropertyType,
    featured: false,
    viewCount: 310,
    listedById: 1,
    images: [
      { img: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?q=80&w=2070&auto=format&fit=crop' },
      { img: 'https://images.unsplash.com/photo-1556020685-e631950269e3?q=80&w=2070&auto=format&fit=crop' },
      { img: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=2070&auto=format&fit=crop' }
    ],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 9,
    title: 'Beachfront Villa Kokrobite',
    description: 'A serene 6-bedroom villa right on the beach, perfect for vacations or retreats.',
    location: 'Kokrobite, Accra',
    price: '$1,200,000',
    bedrooms: 6,
    bathrooms: 7,
    area: '800 sq ft',
    status: 'FOR_SALE' as PropertyStatus,
    type: 'HOUSE' as PropertyType,
    featured: true,
    viewCount: 840,
    listedById: 1,
    images: [
      { img: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=2070&auto=format&fit=crop' },
      { img: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070&auto=format&fit=crop' },
      { img: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=2070&auto=format&fit=crop' },
      { img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop' }
    ],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 10,
    title: 'Cozy Studio East Legon',
    description: 'Affordable and stylish studio apartment close to major amenities.',
    location: 'East Legon, Accra',
    price: '$800/month',
    bedrooms: 1,
    bathrooms: 1,
    area: '60 sq ft',
    status: 'FOR_RENT' as PropertyStatus,
    type: 'APARTMENT' as PropertyType,
    featured: false,
    viewCount: 150,
    listedById: 1,
    images: [
      { img: 'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?q=80&w=2071&auto=format&fit=crop' },
      { img: 'https://images.unsplash.com/photo-1524061614234-8449637d36ce?q=80&w=1967&auto=format&fit=crop' },
      { img: 'https://images.unsplash.com/photo-1588854337236-6889d631faa8?q=80&w=2070&auto=format&fit=crop' }
    ],
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

export const mockMessages: Message[] = [
  {
    id: 1,
    title: 'Inquiry about Luxury Villa',
    email: 'johndoe@example.com',
    subject: 'Property Viewing',
    message: 'I would like to schedule a viewing for the East Legon villa.',
    read: false,
    date: new Date().toISOString(),
    status: 'NEW_LEAD' as MessageStatus,
    relatedPropertyId: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 2,
    title: 'Question about Cantonments Apartment',
    email: 'janedoe@example.com',
    subject: 'Rental terms',
    message: 'Is the price negotiable for a 2-year lease?',
    read: true,
    date: new Date(Date.now() - 86400000).toISOString(),
    status: 'CONTACTED' as MessageStatus,
    relatedPropertyId: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

export const mockUser: AuthUser = {
  email: 'admin@winconstructures.com',
  firstName: 'Super',
  lastName: 'Admin',
  role: 'Super Admin'
};

export const mockSettings = {
  contact_phone: '+233 24 000 0000',
  contact_email: 'info@winconstructures.com',
  contact_address: 'East Legon, Accra',
  site_name: 'Wincon Structures',
  site_tagline: 'Find Your Perfect Property',
  about_title: 'About Wincon Structures',
  about_description: 'Wincon Structures is a leading real estate company dedicated to helping you find your perfect property.',
  about_years_experience: '15',
  about_happy_clients: '850',
  about_properties_sold: '2500'
};

export const mockDashboardStats = {
  overview: {
    totalProperties: 3,
    totalMessages: 2,
    totalViews: 555,
    avgViewsPerProperty: 185,
    featuredProperties: 2,
    recentProperties: 3
  },
  properties: {
    byStatus: { forSale: 2, forRent: 1 },
    byType: [
      { type: 'HOUSE', count: 1 },
      { type: 'APARTMENT', count: 1 },
      { type: 'CONDO', count: 1 }
    ]
  },
  messages: {
    total: 2,
    recent: mockMessages
  },
  trends: {
    monthlyProperties: [{ month: '2023-10', count: 3 }],
    monthlyMessages: [{ month: '2023-10', count: 2 }]
  },
  topProperties: mockProperties.slice(0, 2)
};
