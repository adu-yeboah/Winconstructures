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
    images: [{ img: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=2070&auto=format&fit=crop' }],
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
    images: [{ img: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop' }],
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
    images: [{ img: 'https://images.unsplash.com/photo-1502672260266-1c1e52d15461?q=80&w=2080&auto=format&fit=crop' }],
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
    images: [{ img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop' }],
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
    images: [{ img: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2070&auto=format&fit=crop' }],
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
    images: [{ img: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=2070&auto=format&fit=crop' }],
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
