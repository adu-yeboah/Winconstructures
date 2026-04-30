import { useState } from 'react';
import axios from 'axios';
import { getAccessToken } from '@/service/authServices';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export interface DashboardStats {
  overview: {
    totalProperties: number;
    totalMessages: number;
    totalViews: number;
    avgViewsPerProperty: number;
    featuredProperties: number;
    recentProperties: number;
  };
  properties: {
    byStatus: {
      forSale: number;
      forRent: number;
    };
    byType: Array<{
      type: string;
      count: number;
    }>;
  };
  messages: {
    total: number;
    recent: Array<{
      id: number;
      title: string;
      email: string;
      subject: string;
      createdAt: string;
    }>;
  };
  trends: {
    monthlyProperties: Array<{ month: string; count: number }>;
    monthlyMessages: Array<{ month: string; count: number }>;
  };
  topProperties: Array<{
    id: number;
    title: string;
    viewCount: number;
    location: string;
    price: string;
    status: string;
  }>;
}

interface PropertyAnalytics {
  property: {
    id: number;
    title: string;
    location: string;
    price: string;
    status: string;
  };
  analytics: {
    totalViews: number;
    avgViewsPerDay: number;
    daysSinceListing: number;
    featured: boolean;
  };
}

interface MessageStats {
  total: number;
  unread: number;
  recent: Array<{ id: number; title: string; date: string }>;
  dailyBreakdown: Array<{ date: string; count: number }>;
}

export const useAnalytics = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getDashboardStats = async (): Promise<DashboardStats> => {
    setLoading(true);
    setError(null);

    try {
      const token = getAccessToken();
      if (!token) {
        throw new Error('No authentication token found. Please login again.');
      }

      const response = await axios.get(`${API_BASE_URL}/api/analytics/dashboard`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'An error occurred';
      throw new Error(message);
      const errorMessage = err.response?.data?.detail || 'Failed to fetch dashboard stats';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const getPropertyAnalytics = async (propertyId: string): Promise<PropertyAnalytics> => {
    setLoading(true);
    setError(null);

    try {
      const token = getAccessToken();
      if (!token) {
        throw new Error('No authentication token found. Please login again.');
      }

      const response = await axios.get(
        `${API_BASE_URL}/api/analytics/property/${propertyId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'An error occurred';
      throw new Error(message);
      const errorMessage = err.response?.data?.detail || 'Failed to fetch property analytics';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const getMessageStats = async (): Promise<MessageStats> => {
    setLoading(true);
    setError(null);

    try {
      const token = getAccessToken();
      if (!token) {
        throw new Error('No authentication token found. Please login again.');
      }

      const response = await axios.get(
        `${API_BASE_URL}/api/analytics/messages`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'An error occurred';
      throw new Error(message);
      const errorMessage = err.response?.data?.detail || 'Failed to fetch message stats';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    getDashboardStats,
    getPropertyAnalytics,
    getMessageStats,
  };
};