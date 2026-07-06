import apiClient from './apiClient';

export interface DashboardOverview {
  totalProperties: number;
  totalMessages: number;
  totalViews: number;
  avgViewsPerProperty: number;
  featuredProperties: number;
  recentProperties: number;
}

export interface PropertiesStats {
  byStatus: {
    forSale: number;
    forRent: number;
  };
  byType: {
    type: string;
    count: number;
  }[];
}

export interface MessagesStats {
  total: number;
  recent: any[];
}

export interface TrendsStats {
  monthlyProperties: any[];
  monthlyMessages: any[];
}

export interface DashboardStatsResponse {
  overview: DashboardOverview;
  properties: PropertiesStats;
  messages: MessagesStats;
  trends: TrendsStats;
  topProperties: any[];
}

export interface PropertyAnalyticsResponse {
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

export interface MessageStatsResponse {
  total: number;
  unread: number;
  recent: any[];
  dailyBreakdown: any[];
}

import { mockDashboardStats } from './mockData';

class AnalyticsService {
  async getDashboardStats(): Promise<DashboardStatsResponse> {
    await new Promise(resolve => setTimeout(resolve, 400));
    return mockDashboardStats;
  }

  async getPropertyAnalytics(id: string | number): Promise<PropertyAnalyticsResponse> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return {
      property: {
        id: Number(id),
        title: 'Mocked Property',
        location: 'Mocked Location',
        price: '$0',
        status: 'FOR_SALE'
      },
      analytics: {
        totalViews: 150,
        avgViewsPerDay: 10,
        daysSinceListing: 15,
        featured: true
      }
    };
  }

  async getMessageStats(): Promise<MessageStatsResponse> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return {
      total: mockDashboardStats.messages.total,
      unread: 1,
      recent: mockDashboardStats.messages.recent,
      dailyBreakdown: []
    };
  }
}

export default new AnalyticsService();
