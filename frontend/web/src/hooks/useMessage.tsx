import { useCallback, useState } from 'react';
import messageService from '@/service/messageService';
import { Message } from '@/types/messages';

export const useMessages = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all messages
  const fetchMessages = useCallback(async (filters?: {
    status?: 'NEW_LEAD' | 'CONTACTED' | 'CLOSED';
    read?: boolean;
    unread?: boolean;
  }) => {
    setLoading(true);
    setError(null);
    try {
      const data = await messageService.getAll(filters);
      setMessages(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch messages';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch single message by ID
  const fetchMessage = useCallback(async (id: string | number) => {
    setLoading(true);
    setError(null);
    try {
      const data = await messageService.getById(id);
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch message';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Create new message
  const createMessage = useCallback(async (messageData: import('@/service/messageService').CreateMessageDto) => {
    setLoading(true);
    setError(null);
    try {
      const data = await messageService.create(messageData);
      setMessages((prev) => [...prev, data]);
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create message';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Update existing message
  const updateMessage = useCallback(async (id: string | number, messageData: import('@/service/messageService').UpdateMessageDto) => {
    setLoading(true);
    setError(null);
    try {
      const data = await messageService.update(id, messageData);
      setMessages((prev) =>
        prev.map((msg) => (msg.id === id ? data : msg))
      );
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update message';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Delete message
  const deleteMessage = useCallback(async (id: string | number) => {
    setLoading(true);
    setError(null);
    try {
      await messageService.delete(id);
      setMessages((prev) => prev.filter((msg) => msg.id !== id));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete message';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Helper methods
  const markAsRead = useCallback(async (id: string | number) => {
    try {
      const data = await messageService.markAsRead(id);
      setMessages((prev) =>
        prev.map((msg) => (msg.id === id ? data : msg))
      );
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to mark as read';
      setError(errorMessage);
      throw err;
    }
  }, []);

  const markAsUnread = useCallback(async (id: string | number) => {
    try {
      const data = await messageService.markAsUnread(id);
      setMessages((prev) =>
        prev.map((msg) => (msg.id === id ? data : msg))
      );
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to mark as unread';
      setError(errorMessage);
      throw err;
    }
  }, []);

  const updateStatus = useCallback(async (id: string | number, status: 'NEW_LEAD' | 'CONTACTED' | 'CLOSED') => {
    try {
      const data = await messageService.updateStatus(id, status);
      setMessages((prev) =>
        prev.map((msg) => (msg.id === id ? data : msg))
      );
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update status';
      setError(errorMessage);
      throw err;
    }
  }, []);

  const getNewLeads = useCallback(async () => {
    return fetchMessages({ status: 'NEW_LEAD' });
  }, [fetchMessages]);

  const getUnreadCount = useCallback(async () => {
    try {
      return await messageService.getUnreadCount();
    } catch (err) {
      console.error('Failed to get unread count:', err);
      return 0;
    }
  }, []);

  return {
    messages,
    loading,
    error,
    fetchMessages,
    fetchMessage,
    createMessage,
    updateMessage,
    deleteMessage,
    // Helper methods
    markAsRead,
    markAsUnread,
    updateStatus,
    getNewLeads,
    getUnreadCount,
  };
};