import { loginService, logoutService } from '@/service/authServices';
import { AuthContextType, User } from '@/types/auth';
import React, { createContext, useState, useEffect } from 'react';


export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    // Check for existing auth token on mount
    useEffect(() => {
        const initializeAuth = async () => {
            try {
                const token = localStorage.getItem('authToken');
                if (token) {
                    const userData = await fetchUserData(token);
                    setUser(userData);
                }
            } catch (error) {
                console.error('Auth initialization failed:', error);
            } finally {
                setLoading(false);
            }
        };
        initializeAuth();
    }, []);

    const fetchUserData = async (token: string): Promise<any> => {
        return null
    };

    // Login function
    const login = async (credentials: User): Promise<{ success: boolean; message?: string }> => {
        try {
            const { accessToken, refreshToken, detail } = await loginService(credentials);
            localStorage.setItem('authToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            setUser(user);
            return { success: true };
        } catch (error: any) {
            console.error('Login failed:', error);
            return { success: false, message: error.message || 'Login failed' };
        }
    };

    // Logout function
    const logout = async (): Promise<void> => {
        try {
            await logoutService();
            localStorage.removeItem('authToken');
            localStorage.removeItem('refreshToken');

            setUser(null);
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    const value: AuthContextType = { user, login, logout, loading };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};


