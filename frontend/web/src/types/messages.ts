export type MessageStatus = 'NEW_LEAD' | 'CONTACTED' | 'CLOSED';

export interface RelatedProperty {
  id: number;
  title: string;
  location?: string;
  price?: string;
}

export interface InquiryReply {
  id: number;
  message: string;
  repliedAt: Date;
  repliedBy: {
    firstName?: string;
    lastName?: string;
    email: string;
  };
}

export interface Message {
  id: number;
  title: string;
  email: string;
  subject: string;
  message?: string;
  read: boolean;
  date: string; // ISO date string
  status: MessageStatus;
  relatedPropertyId?: number;
  relatedProperty?: RelatedProperty;
  replies?: InquiryReply[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateMessageDto {
  title: string;
  email: string;
  subject: string;
  message?: string;
  relatedPropertyId?: number;
}

export interface UpdateMessageDto {
  title?: string;
  email?: string;
  subject?: string;
  message?: string;
  read?: boolean;
  status?: MessageStatus;
  relatedPropertyId?: number | null;
}