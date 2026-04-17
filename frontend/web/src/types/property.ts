export type PropertyStatus = 'FOR_SALE' | 'FOR_RENT';
export type PropertyType = 'HOUSE' | 'CONDO' | 'APARTMENT';

export interface PropertyImage {
  img: string;
}

export interface ListedBy {
  id: number;
  firstName?: string;
  lastName?: string;
  email: string;
}

export interface Property {
  id: number;
  images: PropertyImage[];
  title: string;
  description: string;
  location: string;
  price: string;
  bedrooms: number;
  bathrooms: number;
  area: string;
  status: PropertyStatus;
  type: PropertyType;
  featured: boolean;
  viewCount: number;
  listedById: number;
  listedBy?: ListedBy;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreatePropertyDto {
  title: string;
  description: string;
  location: string;
  price: string;
  bedrooms: number;
  bathrooms: number;
  area: string;
  status: PropertyStatus;
  type: PropertyType;
  images: PropertyImage[];
  featured?: boolean;
}

export interface UpdatePropertyDto extends Partial<CreatePropertyDto> {}

// Legacy type for backward compatibility
export interface Product {
  id: number;
  image: string;
  name: string;
  price: string;
  orders: number;
  stock: number;
  amount: number;
  type?: string;
  location?: string;
  bedrooms?: number;
  bathrooms?: number;
}