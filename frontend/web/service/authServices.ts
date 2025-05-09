import { LoginResponse, User } from '@/types/auth';
import apiClient from './apiClient';




export const loginService = async (credentials: User): Promise<LoginResponse> => {
  const response = await apiClient.post<LoginResponse>('/auth/login', credentials);
  return response;
};

export const logoutService = async (): Promise<void> => {
  await apiClient.post('/auth/logout');
};