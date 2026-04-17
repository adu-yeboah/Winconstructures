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

class MessageService {
  private baseUrl = '/message';

  /**
   * Get all messages (admin only)
   */
  async getAll(filters?: {
    status?: 'NEW_LEAD' | 'CONTACTED' | 'CLOSED';
    read?: boolean;
    unread?: boolean;
  }): Promise<Message[]> {
    const params = new URLSearchParams();

    if (filters?.status) params.append('status', filters.status);
    if (filters?.read !== undefined) params.append('read', filters.read.toString());
    if (filters?.unread !== undefined) params.append('unread', filters.unread.toString());

    const queryString = params.toString();
    const url = queryString ? `${this.baseUrl}?${queryString}` : this.baseUrl;

    const response = await apiClient.get<Message[]>(url);
    return response.data;
  }

  /**
   * Get a single message by ID (admin only)
   */
  async getById(id: string | number): Promise<Message> {
    const response = await apiClient.get<Message>(`${this.baseUrl}/${id}`);
    return response.data;
  }

  /**
   * Create a new message (public)
   */
  async create(data: CreateMessageDto): Promise<Message> {
    const response = await apiClient.post<Message>(this.baseUrl, data);
    return response.data;
  }

  /**
   * Update a message (admin only)
   */
  async update(id: string | number, data: UpdateMessageDto): Promise<Message> {
    const response = await apiClient.put<Message>(`${this.baseUrl}/${id}`, data);
    return response.data;
  }

  /**
   * Delete a message (admin only)
   */
  async delete(id: string | number): Promise<void> {
    await apiClient.delete(`${this.baseUrl}/${id}`);
  }

  /**
   * Mark message as read
   */
  async markAsRead(id: string | number): Promise<Message> {
    return this.update(id, { read: true });
  }

  /**
   * Mark message as unread
   */
  async markAsUnread(id: string | number): Promise<Message> {
    return this.update(id, { read: false });
  }

  /**
   * Update message status
   */
  async updateStatus(id: string | number, status: 'NEW_LEAD' | 'CONTACTED' | 'CLOSED'): Promise<Message> {
    return this.update(id, { status });
  }

  /**
   * Get unread messages count (admin only)
   */
  async getUnreadCount(): Promise<number> {
    const messages = await this.getAll({ unread: true });
    return messages.length;
  }

  /**
   * Get new leads (admin only)
   */
  async getNewLeads(): Promise<Message[]> {
    return this.getAll({ status: 'NEW_LEAD' });
  }
}

export default new MessageService();