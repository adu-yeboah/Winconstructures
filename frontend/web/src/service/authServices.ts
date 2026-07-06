import { LoginResponse } from '@/types/auth';
import apiClient from './apiClient';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  data?: LoginResponse;
}

import { mockUser } from './mockData';

export const loginService = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  if (credentials.email === mockUser.email) {
    return {
      accessToken: 'mock-access-token',
      refreshToken: 'mock-refresh-token',
      detail: 'Login successful',
      user: mockUser
    };
  }
  throw new Error('Invalid credentials');
};

export const logoutService = async (): Promise<void> => {
  try {
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  }
};

export const getCurrentUser = async (): Promise<Record<string, unknown>> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return { user: mockUser };
};

export const refreshToken = async (refreshToken: string): Promise<{ accessToken: string }> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  if (refreshToken === 'mock-refresh-token') {
    return { accessToken: 'new-mock-access-token' };
  }
  throw new Error('Session expired. Please login again');
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem('authToken');
  return !!token;
};

/**
 * Get stored access token
 */
export const getAccessToken = (): string | null => {
  return localStorage.getItem('authToken');
};

/**
 * Get stored refresh token
 */
export const getRefreshToken = (): string | null => {
  return localStorage.getItem('refreshToken');
};

/**
 * Store auth tokens
 */
export const storeTokens = (accessToken: string, refreshToken: string): void => {
  localStorage.setItem('authToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
};