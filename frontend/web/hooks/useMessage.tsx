import apiClient from "@/service/apiClient";
import { Message } from "@/types/messages";
import { ErrorResponse } from "@/types/utills";
import { AxiosError } from "axios";
import { useCallback, useState } from "react";

export const useMessages = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);


    // Fetch all Messages
    const fetchMessages = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await apiClient.get<Message[]>("property");
            setMessages(response.data);
        } catch (err) {
            const error = err as AxiosError<ErrorResponse>;
            setError(error.response?.data.message || 'Failed to fetch properties');
        } finally {
            setLoading(false);
        }
    }, [])


    // Fetch single property by ID
    const fetchMessage = useCallback(async (id: string) => {
        setLoading(true);
        setError(null);
        try {
            const response = await apiClient.get<Message>(`message/${id}`);
            return response.data;
        } catch (err) {
            const error = err as AxiosError<ErrorResponse>;
            setError(error.response?.data.message || 'Failed to fetch property');
            throw error;
        } finally {
            setLoading(false);
        }
    }, []);

    const createMessage = useCallback(async (propertyData: Omit<Message, 'id'>) => {
        setLoading(true);
        setError(null);
        try {
            const response = await apiClient.post<Message>("property/", propertyData);
            setMessages((prev) => [...prev, response.data]);
            return response.data;
        } catch (err) {
            const error = err as AxiosError<ErrorResponse>;
            setError(error.response?.data.message || 'Failed to create property');
            throw error;
        } finally {
            setLoading(false);
        }
    }, []);

    // Update existing property
    const updateMessage = useCallback(async (id: string, messageData: Partial<Message>) => {
        setLoading(true);
        setError(null);
        try {
            const response = await apiClient.put<Message>(`message/${id}`, messageData);
            setMessages((prev) =>
                prev.map((prop) => (prop.id as unknown as string === id ? response.data : prop))
            );
            return response.data;
        } catch (err) {
            const error = err as AxiosError<ErrorResponse>;
            setError(error.response?.data.message || 'Failed to update property');
            throw error;
        } finally {
            setLoading(false);
        }
    }, []);

    // Delete property
    const deleteMessage = useCallback(async (id: string) => {
        setLoading(true);
        setError(null);
        try {
            await apiClient.delete(`property/${id}`);
            setMessages((prev) => prev.filter((prop) => prop.id as unknown !== id));
        } catch (err) {
            const error = err as AxiosError<ErrorResponse>;
            setError(error.response?.data.message || 'Failed to delete property');
            throw error;
        } finally {
            setLoading(false);
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
    };

}