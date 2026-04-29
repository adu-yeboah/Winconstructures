import { useState, useCallback } from 'react';
import propertyService from '@/service/propertyService';
import { Property } from '@/types/property';
import { toast } from 'react-toastify';

export const useProperties = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all properties
  const fetchProperties = useCallback(async (filters?: {
    status?: 'FOR_SALE' | 'FOR_RENT';
    type?: 'HOUSE' | 'CONDO' | 'APARTMENT';
    featured?: boolean;
    search?: string;
  }) => {
    setLoading(true);
    setError(null);
    try {
      const data = await propertyService.getAll(filters);
      setProperties(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch properties';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch single property by ID
  const fetchProperty = useCallback(async (id: string | number) => {
    setLoading(true);
    setError(null);
    try {
      const data = await propertyService.getById(id);
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch property';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Create new property
  const createProperty = useCallback(async (propertyData: import('@/service/propertyService').CreatePropertyDto) => {
    setLoading(true);
    setError(null);
    try {
      const data = await propertyService.create(propertyData);
      setProperties((prev) => [...prev, data]);
      toast.success('Property created successfully!');
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create property';
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Update existing property
  const updateProperty = useCallback(async (id: string | number, propertyData: import('@/service/propertyService').UpdatePropertyDto) => {
    setLoading(true);
    setError(null);
    try {
      const data = await propertyService.update(id, propertyData);
      setProperties((prev) =>
        prev.map((prop) => (prop.id === id ? data : prop))
      );
      toast.success('Property updated successfully!');
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update property';
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Delete property
  const deleteProperty = useCallback(async (id: string | number) => {
    setLoading(true);
    setError(null);
    try {
      await propertyService.delete(id);
      setProperties((prev) => prev.filter((prop) => prop.id !== id));
      toast.success('Property deleted successfully!');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete property';
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Helper methods
  const fetchFeaturedProperties = useCallback(async () => {
    return fetchProperties({ featured: true });
  }, [fetchProperties]);

  const fetchByStatus = useCallback(async (status: 'FOR_SALE' | 'FOR_RENT') => {
    return fetchProperties({ status });
  }, [fetchProperties]);

  const fetchByType = useCallback(async (type: 'HOUSE' | 'CONDO' | 'APARTMENT') => {
    return fetchProperties({ type });
  }, [fetchProperties]);

  const searchProperties = useCallback(async (query: string) => {
    return fetchProperties({ search: query });
  }, [fetchProperties]);

  return {
    properties,
    loading,
    error,
    fetchProperties,
    fetchProperty,
    createProperty,
    updateProperty,
    deleteProperty,
    // Helper methods
    fetchFeaturedProperties,
    fetchByStatus,
    fetchByType,
    searchProperties,
  };
};