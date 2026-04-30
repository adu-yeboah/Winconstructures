import { useState, useEffect } from 'react';
import apiClient from '@/service/apiClient';
import { logoutService } from '@/service/authServices';
import { useRouter } from 'next/navigation';

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
  const router = useRouter();

  const getDashboardStats = async (): Promise<DashboardStats> => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiClient.get<DashboardStats>('/analytics/dashboard');
      return response.data;
    } catch (err: any) {
      const errorMessage = err.response?.data?.detail || err.userMessage || 'Failed to fetch dashboard stats';
      setError(errorMessage);

      // If unauthorized, logout and redirect
      if (err.response?.status === 401 || errorMessage === 'Not authorized, token failed') {
        await logoutService();
        router.push('/login');
      }

      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const getPropertyAnalytics = async (propertyId: string): Promise<PropertyAnalytics> => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiClient.get<PropertyAnalytics>(`/analytics/property/${propertyId}`);
      return response.data;
    } catch (err: any) {
      const errorMessage = err.response?.data?.detail || err.userMessage || 'Failed to fetch property analytics';
      setError(errorMessage);

      // If unauthorized, logout and redirect
      if (err.response?.status === 401) {
        await logoutService();
        router.push('/login');
      }

      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const getMessageStats = async (): Promise<MessageStats> => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiClient.get<MessageStats>('/analytics/messages');
      return response.data;
    } catch (err: any) {
      const errorMessage = err.response?.data?.detail || err.userMessage || 'Failed to fetch message stats';
      setError(errorMessage);

      // If unauthorized, logout and redirect
      if (err.response?.status === 401) {
        await logoutService();
        router.push('/login');
      }

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