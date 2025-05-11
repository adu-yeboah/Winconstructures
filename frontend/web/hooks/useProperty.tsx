import { useState, useCallback } from 'react';
import { AxiosError } from 'axios';
import apiClient from '@/service/apiClient';
import { Property } from '@/types/property';
import { ErrorResponse } from '@/types/utills';



// Define error response structure


export const useProperties = () => {
    const [properties, setProperties] = useState<Property[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Fetch all properties
    const fetchProperties = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await apiClient.get<Property[]>("property");
            setProperties(response.data);
        } catch (err) {
            const error = err as AxiosError<ErrorResponse>;
            setError(error.response?.data.message || 'Failed to fetch properties');
        } finally {
            setLoading(false);
        }
    }, []);

    // Fetch single property by ID
    const fetchProperty = useCallback(async (id: string) => {
        setLoading(true);
        setError(null);
        try {
            const response = await apiClient.get<Property>(`property/${id}`);
            return response.data;
        } catch (err) {
            const error = err as AxiosError<ErrorResponse>;
            setError(error.response?.data.message || 'Failed to fetch property');
            throw error;
        } finally {
            setLoading(false);
        }
    }, []);

    // Create new property
    const createProperty = useCallback(async (propertyData: Omit<Property, '_id'>) => {
        setLoading(true);
        setError(null);
        try {
            const response = await apiClient.post<Property>("property/", propertyData);
            setProperties((prev) => [...prev, response.data]);
            return response.data;
        } catch (err) {
            const error = err as AxiosError<ErrorResponse>;
            setError(error.response?.data.message || 'Failed to create property');
            throw error;
        } finally {
            setLoading(false);
        }
    }, []);

    // Update existing property
    const updateProperty = useCallback(async (id: string, propertyData: Partial<Property>) => {
        setLoading(true);
        setError(null);
        try {
            const response = await apiClient.put<Property>(`property/${id}`, propertyData);
            setProperties((prev) =>
                prev.map((prop) => (prop._id === id ? response.data : prop))
            );
            return response.data;
        } catch (err) {
            const error = err as AxiosError<ErrorResponse>;
            setError(error.response?.data.message || 'Failed to update property');
            throw error;
        } finally {
            setLoading(false);
        }
    }, []);

    // Delete property
    const deleteProperty = useCallback(async (id: string) => {
        setLoading(true);
        setError(null);
        try {
            await apiClient.delete(`property/${id}`);
            setProperties((prev) => prev.filter((prop) => prop._id !== id));
        } catch (err) {
            const error = err as AxiosError<ErrorResponse>;
            setError(error.response?.data.message || 'Failed to delete property');
            throw error;
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        properties,
        loading,
        error,
        fetchProperties,
        fetchProperty,
        createProperty,
        updateProperty,
        deleteProperty,
    };
};