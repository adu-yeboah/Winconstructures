import { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

interface DashboardStats {
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
    monthlyProperties: Array<any>;
    monthlyMessages: Array<any>;
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
  recent: Array<any>;
  dailyBreakdown: Array<any>;
}

export const useAnalytics = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getDashboardStats = async (): Promise<DashboardStats> => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.get(`${API_BASE_URL}/api/analytics/dashboard`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (err: any) {
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
      const token = localStorage.getItem('accessToken');
      const response = await axios.get(
        `${API_BASE_URL}/api/analytics/property/${propertyId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (err: any) {
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
      const token = localStorage.getItem('accessToken');
      const response = await axios.get(
        `${API_BASE_URL}/api/analytics/messages`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (err: any) {
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