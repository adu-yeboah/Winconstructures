"use client";
import { loginService, logoutService, isAuthenticated, getAccessToken } from '@/service/authServices';
import { AuthContextType, User } from '@/types/auth';
import React, { createContext, useState, useEffect, useCallback } from 'react';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Check for existing auth token on mount
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const authenticated = isAuthenticated();
        if (authenticated) {
          // If we have a token, restore user session
          // Note: Since backend doesn't have /auth/me endpoint, we'll just check token exists
          const token = getAccessToken();
          if (token) {
            // Decode JWT to get user info (basic implementation)
            const decoded = JSON.parse(atob(token.split('.')[1]));
            setUser({
              email: decoded.email,
              password: '', // We don't store password
            });
          }
        }
      } catch (error) {
        console.error('Auth initialization failed:', error);
        // Clear invalid tokens
        await logoutService();
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Login function
  const login = useCallback(async (credentials: User): Promise<{ success: boolean; message?: string }> => {
    try {
      setError(null);
      setLoading(true);

      const { accessToken, refreshToken, user: userData } = await loginService(credentials);

      // Store tokens
      localStorage.setItem('authToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      // Set user data
      setUser({
        email: userData.email,
        password: '', // We don't store password
      });

      return { success: true };
    } catch (error: any) {
      const errorMessage = error.message || 'Login failed';
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  // Logout function
  const logout = useCallback(async (): Promise<void> => {
    try {
      setLoading(true);
      await logoutService();
      setUser(null);
      setError(null);
    } catch (error) {
      console.error('Logout failed:', error);
      // Even if logout fails, clear local state
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // Check if user is authenticated
  const checkAuth = useCallback((): boolean => {
    return isAuthenticated();
  }, []);

  const value: AuthContextType = {
    user,
    login,
    logout,
    loading,
    error,
    checkAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};