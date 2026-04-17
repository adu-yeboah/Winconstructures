import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import prisma from '../config/database.prisma';
import { sendNewInquiryAlert } from '../utils/mailer';

// Get all messages (inquiries)
export const getMessages = asyncHandler(async (req: Request, res: Response) => {
  const inquiries = await prisma.inquiry.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      relatedProperty: {
        select: {
          id: true,
          title: true,
          location: true,
        }
      },
      replies: {
        include: {
          repliedBy: {
            select: {
              firstName: true,
              lastName: true,
              email: true,
            }
          }
        }
      } 
    }
  });

  // Transform to match frontend expectations
  const messages = inquiries.map(inquiry => ({
    id: inquiry.id,
    title: inquiry.title,
    email: inquiry.email,
    subject: inquiry.subject,
    message: inquiry.message,
    read: inquiry.read,
    date: inquiry.date.toISOString(),
    status: inquiry.status,
    relatedPropertyId: inquiry.relatedPropertyId,
    relatedProperty: inquiry.relatedProperty,
    replies: inquiry.replies,
    createdAt: inquiry.createdAt,
    updatedAt: inquiry.updatedAt,
  }));

  res.json(messages);
});

// Get a single message by ID
export const getMessageById = asyncHandler(async (req: Request, res: Response) => {
  const inquiry = await prisma.inquiry.findUnique({
    where: { id: parseInt(req.params.id) },
    include: {
      relatedProperty: {
        select: {
          id: true,
          title: true,
          location: true,
          price: true,
        }
      },
      replies: {
        include: {
          repliedBy: {
            select: {
              firstName: true,
              lastName: true,
              email: true,
            }
          }
        },
        orderBy: { repliedAt: 'asc' }
      }
    }
  });

  if (!inquiry) {
    res.status(404);
    throw new Error('Message not found');
  }

  // Transform to match frontend expectations
  const message = {
    id: inquiry.id,
    title: inquiry.title,
    email: inquiry.email,
    subject: inquiry.subject,
    message: inquiry.message,
    read: inquiry.read,
    date: inquiry.date.toISOString(),
    status: inquiry.status,
    relatedPropertyId: inquiry.relatedPropertyId,
    relatedProperty: inquiry.relatedProperty,
    replies: inquiry.replies,
    createdAt: inquiry.createdAt,
    updatedAt: inquiry.updatedAt,
  };

  res.json(message);
});

// Create a new message (inquiry)
export const createMessage = asyncHandler(async (req: Request, res: Response) => {
  const { title, email, subject, message, relatedPropertyId } = req.body;

  if (!title || !email || !subject) {
    res.status(400);
    throw new Error('Please provide title, email, and subject');
  }

  // Fetch related property data if provided
  let relatedProperty = null;
  if (relatedPropertyId) {
    try {
      const property = await prisma.property.findUnique({
        where: { id: parseInt(relatedPropertyId) },
        select: {
          id: true,
          title: true,
          location: true,
          price: true,
        }
      });
      relatedProperty = property;
    } catch (error) {
      console.error('Error fetching related property:', error);
    }
  }

  const inquiry = await prisma.inquiry.create({
    data: {
      title,
      email,
      subject,
      message: message || '',
      date: new Date(),
      status: 'NEW_LEAD',
      relatedPropertyId: relatedPropertyId ? parseInt(relatedPropertyId) : null,
    }
  });

  // Send email alert to admin (don't wait for email to complete)
  sendNewInquiryAlert({
    title: inquiry.title,
    email: inquiry.email,
    subject: inquiry.subject,
    message: inquiry.message,
    relatedPropertyId: inquiry.relatedPropertyId,
    relatedProperty: relatedProperty,
  }).catch(emailError => {
    console.error('Failed to send inquiry alert email:', emailError);
  });

  // Transform response to match frontend expectations
  const response = {
    id: inquiry.id,
    title: inquiry.title,
    email: inquiry.email,
    subject: inquiry.subject,
    message: inquiry.message,
    read: inquiry.read,
    date: inquiry.date.toISOString(),
    status: inquiry.status,
    relatedPropertyId: inquiry.relatedPropertyId || undefined,
    createdAt: inquiry.createdAt,
    updatedAt: inquiry.updatedAt,
  };

  res.status(201).json(response);
});

// Update a message
export const updateMessage = asyncHandler(async (req: Request, res: Response) => {
  const { title, email, subject, message, read, status, relatedPropertyId } = req.body;

  const inquiry = await prisma.inquiry.findUnique({
    where: { id: parseInt(req.params.id) }
  });

  if (!inquiry) {
    res.status(404);
    throw new Error('Message not found');
  }

  const updatedInquiry = await prisma.inquiry.update({
    where: { id: parseInt(req.params.id) },
    data: {
      title: title !== undefined ? title : inquiry.title,
      email: email !== undefined ? email : inquiry.email,
      subject: subject !== undefined ? subject : inquiry.subject,
      message: message !== undefined ? message : inquiry.message,
      read: read !== undefined ? read : inquiry.read,
      status: status !== undefined ? status : inquiry.status,
      relatedPropertyId: relatedPropertyId !== undefined ? (relatedPropertyId ? parseInt(relatedPropertyId) : null) : inquiry.relatedPropertyId,
    }
  });

  // Transform response to match frontend expectations
  const response = {
    id: updatedInquiry.id,
    title: updatedInquiry.title,
    email: updatedInquiry.email,
    subject: updatedInquiry.subject,
    message: updatedInquiry.message,
    read: updatedInquiry.read,
    date: updatedInquiry.date.toISOString(),
    status: updatedInquiry.status,
    relatedPropertyId: updatedInquiry.relatedPropertyId,
    createdAt: updatedInquiry.createdAt,
    updatedAt: updatedInquiry.updatedAt,
  };

  res.json(response);
});

// Delete a message
export const deleteMessage = asyncHandler(async (req: Request, res: Response) => {
  const inquiry = await prisma.inquiry.findUnique({
    where: { id: parseInt(req.params.id) }
  });

  if (!inquiry) {
    res.status(404);
    throw new Error('Message not found');
  }

  await prisma.inquiry.delete({
    where: { id: parseInt(req.params.id) }
  });

  res.json({ message: 'Message deleted successfully' });
});