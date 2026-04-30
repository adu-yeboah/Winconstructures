import axios, { AxiosError, InternalAxiosRequestConfig, AxiosResponse } from "axios";

// Get API base URL from environment or use default
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

// Create axios instance
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    },
    timeout: 15000, // 15 seconds timeout
});

// Flag to prevent multiple refresh attempts
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: any) => void;
  reject: (reason?: any) => void;
}> = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

// Helper function to clear auth and redirect
const clearAuthAndRedirect = () => {
  // Clear all auth-related storage
  localStorage.removeItem('authToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('user');

  // Dispatch custom event for auth context to listen to
  window.dispatchEvent(new CustomEvent('auth:logout'));

  // Redirect to login
  if (typeof window !== 'undefined' && window.location.pathname !== '/login') {
    window.location.href = '/login';
  }
};

// Request interceptor - Add auth token
apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem('authToken');
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

// Response interceptor - Handle errors and token refresh
apiClient.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

        // Handle 401 Unauthorized - Token expired
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            // If already refreshing, add to queue
            if (isRefreshing) {
              return new Promise((resolve, reject) => {
                failedQueue.push({ resolve, reject });
              })
              .then(token => {
                if (originalRequest.headers) {
                  originalRequest.headers.Authorization = `Bearer ${token}`;
                }
                return apiClient(originalRequest);
              })
              .catch(err => {
                return Promise.reject(err);
              });
            }

            isRefreshing = true;

            // Try to refresh token
            const refreshToken = localStorage.getItem('refreshToken');
            if (refreshToken) {
                try {
                    const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
                        refreshToken
                    });

                    const { accessToken } = response.data;
                    localStorage.setItem('authToken', accessToken);

                    processQueue(null, accessToken);

                    // Retry original request with new token
                    if (originalRequest.headers) {
                        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                    }
                    return apiClient(originalRequest);
                } catch (refreshError) {
                    // Refresh failed - Clear tokens and redirect to login
                    processQueue(refreshError, null);
                    clearAuthAndRedirect();
                    return Promise.reject({
                      ...error,
                      userMessage: 'Session expired. Please login again.',
                      originalError: error
                    });
                } finally {
                  isRefreshing = false;
                }
            } else {
                // No refresh token - Clear and redirect
                isRefreshing = false;
                clearAuthAndRedirect();
                return Promise.reject({
                  ...error,
                  userMessage: 'No authentication token found. Please login.',
                  originalError: error
                });
            }
        }

        // Handle other errors
        let errorMessage = 'An error occurred';
        if (error.response) {
            // Server responded with error status
            errorMessage = (error.response.data as { detail?: string; message?: string })?.detail ||
                          (error.response.data as { detail?: string; message?: string })?.message ||
                          errorMessage;
        } else if (error.request) {
            // Request made but no response
            errorMessage = 'Network error - Please check your connection';
        } else {
            // Error in request setup
            errorMessage = error.message || errorMessage;
        }

        return Promise.reject({
            ...error,
            userMessage: errorMessage,
            originalError: error
        });
    }
);

export default apiClient;