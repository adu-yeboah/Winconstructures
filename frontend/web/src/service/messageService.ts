import apiClient from './apiClient';
import { Message } from '@/types/messages';

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
  status?: 'NEW_LEAD' | 'CONTACTED' | 'CLOSED';
  relatedPropertyId?: number | null;
}

export interface MessageReplyDto {
  message: string;
}

import { mockMessages } from './mockData';

class MessageService {
  private messages = [...mockMessages];

  async getAll(filters?: {
    status?: 'NEW_LEAD' | 'CONTACTED' | 'CLOSED';
    read?: boolean;
    unread?: boolean;
  }): Promise<Message[]> {
    let result = [...this.messages];

    if (filters?.status) result = result.filter(m => m.status === filters.status);
    if (filters?.read !== undefined) result = result.filter(m => m.read === filters.read);
    if (filters?.unread !== undefined) result = result.filter(m => m.read === !filters.unread);

    await new Promise(resolve => setTimeout(resolve, 300));
    return result;
  }

  async getById(id: string | number): Promise<Message> {
    const msg = this.messages.find(m => m.id.toString() === id.toString());
    if (!msg) throw new Error('Message not found');
    await new Promise(resolve => setTimeout(resolve, 200));
    return msg;
  }

  async create(data: CreateMessageDto): Promise<Message> {
    const newMsg: Message = {
      ...data,
      id: Math.max(0, ...this.messages.map(m => m.id)) + 1,
      read: false,
      date: new Date().toISOString(),
      status: 'NEW_LEAD',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.messages.push(newMsg);
    await new Promise(resolve => setTimeout(resolve, 400));
    return newMsg;
  }

  async update(id: string | number, data: UpdateMessageDto): Promise<Message> {
    const index = this.messages.findIndex(m => m.id.toString() === id.toString());
    if (index === -1) throw new Error('Message not found');
    
    this.messages[index] = { ...this.messages[index], ...data, updatedAt: new Date() };
    await new Promise(resolve => setTimeout(resolve, 300));
    return this.messages[index];
  }

  async delete(id: string | number): Promise<void> {
    this.messages = this.messages.filter(m => m.id.toString() !== id.toString());
    await new Promise(resolve => setTimeout(resolve, 300));
  }

  async markAsRead(id: string | number): Promise<Message> {
    return this.update(id, { read: true });
  }

  async markAsUnread(id: string | number): Promise<Message> {
    return this.update(id, { read: false });
  }

  async updateStatus(id: string | number, status: 'NEW_LEAD' | 'CONTACTED' | 'CLOSED'): Promise<Message> {
    return this.update(id, { status });
  }

  async getUnreadCount(): Promise<number> {
    const messages = await this.getAll({ unread: true });
    return messages.length;
  }

  async getNewLeads(): Promise<Message[]> {
    return this.getAll({ status: 'NEW_LEAD' });
  }
}

export default new MessageService();