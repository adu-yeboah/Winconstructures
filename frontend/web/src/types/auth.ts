export type User = {
    email: string,
    password: string,
}

export interface AuthUser {
    email: string;
    firstName?: string;
    lastName?: string;
    role?: string;
}

export interface AuthContextType {
    user: AuthUser | null;
    login: (credentials: User) => Promise<{ success: boolean; message?: string }>;
    logout: () => Promise<void>;
    loading: boolean;
    error: string | null;
    checkAuth: () => boolean;
}

export interface LoginResponse {
    accessToken: string,
    refreshToken: string,
    detail: string,
    user: AuthUser;
}