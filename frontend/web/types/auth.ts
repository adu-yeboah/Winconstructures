export type User = {
    email: string,
    password: string,
}


export interface AuthContextType {
    user: User | null;
    login: (credentials: User) => Promise<{ success: boolean; message?: string }>;
    logout: () => Promise<void>;
    loading: boolean;
}

export interface LoginResponse {
    accessToken: string,
    refreshToken: string,
    detail: string,
}