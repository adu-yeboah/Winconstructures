import apiClient from './apiClient';
import { Property } from '@/types/property';

export interface CreatePropertyDto {
  title: string;
  description: string;
  location: string;
  price: string;
  bedrooms: number;
  bathrooms: number;
  area: string;
  status: 'FOR_SALE' | 'FOR_RENT';
  type: 'HOUSE' | 'CONDO' | 'APARTMENT';
  images: { img: string }[];
  featured?: boolean;
}

export type UpdatePropertyDto = Partial<CreatePropertyDto>;

export interface PropertyListResponse {
  properties: Property[];
  total: number;
  page: number;
  pageSize: number;
}

import { mockProperties } from './mockData';

class PropertyService {
  private properties = [...mockProperties];

  async getAll(filters?: {
    status?: 'FOR_SALE' | 'FOR_RENT';
    type?: 'HOUSE' | 'CONDO' | 'APARTMENT';
    featured?: boolean;
    search?: string;
  }): Promise<Property[]> {
    let result = [...this.properties];

    if (filters?.status) result = result.filter(p => p.status === filters.status);
    if (filters?.type) result = result.filter(p => p.type === filters.type);
    if (filters?.featured !== undefined) result = result.filter(p => p.featured === filters.featured);
    if (filters?.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(p => 
        p.title.toLowerCase().includes(searchLower) || 
        p.location.toLowerCase().includes(searchLower) ||
        p.description.toLowerCase().includes(searchLower)
      );
    }

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return result;
  }

  async getById(id: string | number): Promise<Property> {
    const prop = this.properties.find(p => p.id.toString() === id.toString());
    if (!prop) throw new Error('Property not found');
    await new Promise(resolve => setTimeout(resolve, 300));
    return prop;
  }

  async create(data: CreatePropertyDto): Promise<Property> {
    const newProp: Property = {
      ...data,
      id: Math.max(...this.properties.map(p => p.id)) + 1,
      viewCount: 0,
      listedById: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      featured: data.featured || false
    };
    this.properties.push(newProp);
    await new Promise(resolve => setTimeout(resolve, 500));
    return newProp;
  }

  async update(id: string | number, data: UpdatePropertyDto): Promise<Property> {
    const index = this.properties.findIndex(p => p.id.toString() === id.toString());
    if (index === -1) throw new Error('Property not found');
    
    this.properties[index] = { ...this.properties[index], ...data, updatedAt: new Date() };
    await new Promise(resolve => setTimeout(resolve, 500));
    return this.properties[index];
  }

  async delete(id: string | number): Promise<void> {
    this.properties = this.properties.filter(p => p.id.toString() !== id.toString());
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  async getFeatured(): Promise<Property[]> {
    return this.getAll({ featured: true });
  }

  async search(query: string): Promise<Property[]> {
    return this.getAll({ search: query });
  }

  async getByStatus(status: 'FOR_SALE' | 'FOR_RENT'): Promise<Property[]> {
    return this.getAll({ status });
  }

  async getByType(type: 'HOUSE' | 'CONDO' | 'APARTMENT'): Promise<Property[]> {
    return this.getAll({ type });
  }

  async getSimilarProperties(propertyId: string | number, limit: number = 3): Promise<Property[]> {
    const prop = await this.getById(propertyId);
    let result = this.properties.filter(p => p.id.toString() !== propertyId.toString() && p.type === prop.type);
    await new Promise(resolve => setTimeout(resolve, 300));
    return result.slice(0, limit);
  }
}

export default new PropertyService();