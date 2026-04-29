import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import prisma from "../config/database.prisma";

export const getDashboardStats = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // Get total properties count
      const totalProperties = await prisma.property.count();

      // Get properties by status
      const propertiesForSale = await prisma.property.count({
        where: { status: 'FOR_SALE' }
      });

      const propertiesForRent = await prisma.property.count({
        where: { status: 'FOR_RENT' }
      });

      // Get properties by type
      const propertiesByType = await prisma.property.groupBy({
        by: ['type'],
        _count: {
          type: true
        }
      });

      // Get featured properties count
      const featuredProperties = await prisma.property.count({
        where: { featured: true }
      });

      // Get total messages count
      const totalMessages = await prisma.message.count();

      // Get recent messages (last 7 days)
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

      const recentMessages = await prisma.message.count({
        where: {
          createdAt: {
            gte: sevenDaysAgo
          }
        }
      });

      // Get total views across all properties
      const properties = await prisma.property.findMany({
        select: {
          viewCount: true
        }
      });

      const totalViews = properties.reduce((sum, prop) => sum + (prop.viewCount || 0), 0);

      // Get average views per property
      const avgViewsPerProperty = totalProperties > 0 ? Math.round(totalViews / totalProperties) : 0;

      // Get most viewed properties
      const mostViewedProperties = await prisma.property.findMany({
        take: 5,
        orderBy: {
          viewCount: 'desc'
        },
        select: {
          id: true,
          title: true,
          viewCount: true,
          location: true,
          price: true,
          status: true
        }
      });

      // Get recent properties (last 30 days)
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const recentProperties = await prisma.property.count({
        where: {
          createdAt: {
            gte: thirtyDaysAgo
          }
        }
      });

      // Get properties added per month for the last 6 months
      const monthlyPropertyData = await prisma.$queryRaw`
        SELECT
          DATE_FORMAT(createdAt, '%Y-%m') as month,
          COUNT(*) as count
        FROM Property
        WHERE createdAt >= DATE_SUB(NOW(), INTERVAL 6 MONTH)
        GROUP BY DATE_FORMAT(createdAt, '%Y-%m')
        ORDER BY month DESC
      `;

      // Get messages per month for the last 6 months
      const monthlyMessageData = await prisma.$queryRaw`
        SELECT
          DATE_FORMAT(createdAt, '%Y-%m') as month,
          COUNT(*) as count
        FROM Message
        WHERE createdAt >= DATE_SUB(NOW(), INTERVAL 6 MONTH)
        GROUP BY DATE_FORMAT(createdAt, '%Y-%m')
        ORDER BY month DESC
      `;

      // Get recent messages
      const latestMessages = await prisma.message.findMany({
        take: 5,
        orderBy: {
          createdAt: 'desc'
        },
        select: {
          id: true,
          title: true,
          email: true,
          subject: true,
          createdAt: true
        }
      });

      res.status(200).json({
        overview: {
          totalProperties,
          totalMessages,
          totalViews,
          avgViewsPerProperty,
          featuredProperties,
          recentProperties
        },
        properties: {
          byStatus: {
            forSale: propertiesForSale,
            forRent: propertiesForRent
          },
          byType: propertiesByType.map(item => ({
            type: item.type,
            count: item._count.type
          }))
        },
        messages: {
          total: totalMessages,
          recent: recentMessages
        },
        trends: {
          monthlyProperties: monthlyPropertyData,
          monthlyMessages: monthlyMessageData
        },
        topProperties: mostViewedProperties
      });
    } catch (error) {
      console.error('Analytics error:', error);
      res.status(500).json({
        detail: `Failed to fetch analytics: ${(error as Error).message}`
      });
    }
  }
);

export const getPropertyAnalytics = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const propertyId = parseInt(id);

      if (isNaN(propertyId)) {
        res.status(400).json({ detail: 'Invalid property ID' });
        return;
      }

      // Get property details
      const property = await prisma.property.findUnique({
        where: { id: propertyId }
      });

      if (!property) {
        res.status(404).json({ detail: 'Property not found' });
        return;
      }

      // Get view count
      const views = property.viewCount || 0;

      // Get messages related to this property (if you have that relationship)
      const relatedMessages = await prisma.message.findMany({
        where: {
          // Assuming you might add a propertyId field to messages later
          // For now, this might be empty
        }
      });

      // Calculate days since listing
      const daysSinceListing = Math.floor(
        (Date.now() - property.createdAt.getTime()) / (1000 * 60 * 60 * 24)
      );

      // Calculate average views per day
      const avgViewsPerDay = daysSinceListing > 0 ? Math.round(views / daysSinceListing) : 0;

      res.status(200).json({
        property: {
          id: property.id,
          title: property.title,
          location: property.location,
          price: property.price,
          status: property.status
        },
        analytics: {
          totalViews: views,
          avgViewsPerDay,
          daysSinceListing,
          featured: property.featured
        }
      });
    } catch (error) {
      console.error('Property analytics error:', error);
      res.status(500).json({
        detail: `Failed to fetch property analytics: ${(error as Error).message}`
      });
    }
  }
);

export const getMessageStats = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // Get messages from last 30 days
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const recentMessages = await prisma.message.findMany({
        where: {
          createdAt: {
            gte: thirtyDaysAgo
          }
        },
        orderBy: {
          createdAt: 'desc'
        }
      });

      // Get unread messages (assuming you might add a 'read' field later)
      const unreadCount = 0; // Update when you add read status

      // Get messages per day for last 30 days
      const dailyMessages = await prisma.$queryRaw`
        SELECT
          DATE(createdAt) as date,
          COUNT(*) as count
        FROM Message
        WHERE createdAt >= DATE_SUB(NOW(), INTERVAL 30 DAY)
        GROUP BY DATE(createdAt)
        ORDER BY date DESC
      `;

      res.status(200).json({
        total: recentMessages.length,
        unread: unreadCount,
        recent: recentMessages.slice(0, 10),
        dailyBreakdown: dailyMessages
      });
    } catch (error) {
      console.error('Message stats error:', error);
      res.status(500).json({
        detail: `Failed to fetch message stats: ${(error as Error).message}`
      });
    }
  }
);