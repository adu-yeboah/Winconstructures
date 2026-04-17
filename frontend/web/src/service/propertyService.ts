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

export interface UpdatePropertyDto extends Partial<CreatePropertyDto> {}

export interface PropertyListResponse {
  properties: Property[];
  total: number;
  page: number;
  pageSize: number;
}

class PropertyService {
  private baseUrl = '/property';

  /**
   * Get all properties with optional filtering
   */
  async getAll(filters?: {
    status?: 'FOR_SALE' | 'FOR_RENT';
    type?: 'HOUSE' | 'CONDO' | 'APARTMENT';
    featured?: boolean;
    search?: string;
  }): Promise<Property[]> {
    const params = new URLSearchParams();

    if (filters?.status) params.append('status', filters.status);
    if (filters?.type) params.append('type', filters.type);
    if (filters?.featured !== undefined) params.append('featured', filters.featured.toString());
    if (filters?.search) params.append('search', filters.search);

    const queryString = params.toString();
    const url = queryString ? `${this.baseUrl}?${queryString}` : this.baseUrl;

    const response = await apiClient.get<Property[]>(url);
    return response.data;
  }

  /**
   * Get a single property by ID
   */
  async getById(id: string | number): Promise<Property> {
    const response = await apiClient.get<Property>(`${this.baseUrl}/${id}`);
    return response.data;
  }

  /**
   * Create a new property (admin only)
   */
  async create(data: CreatePropertyDto): Promise<Property> {
    const response = await apiClient.post<Property>(this.baseUrl, data);
    return response.data;
  }

  /**
   * Update an existing property (admin only)
   */
  async update(id: string | number, data: UpdatePropertyDto): Promise<Property> {
    const response = await apiClient.put<Property>(`${this.baseUrl}/${id}`, data);
    return response.data;
  }

  /**
   * Delete a property (admin only)
   */
  async delete(id: string | number): Promise<void> {
    await apiClient.delete(`${this.baseUrl}/${id}`);
  }

  /**
   * Get featured properties
   */
  async getFeatured(): Promise<Property[]> {
    return this.getAll({ featured: true });
  }

  /**
   * Search properties
   */
  async search(query: string): Promise<Property[]> {
    return this.getAll({ search: query });
  }

  /**
   * Get properties by status
   */
  async getByStatus(status: 'FOR_SALE' | 'FOR_RENT'): Promise<Property[]> {
    return this.getAll({ status });
  }

  /**
   * Get properties by type
   */
  async getByType(type: 'HOUSE' | 'CONDO' | 'APARTMENT'): Promise<Property[]> {
    return this.getAll({ type });
  }
}

export default new PropertyService();