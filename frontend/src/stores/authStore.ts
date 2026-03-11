import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { apiClient } from '@/lib/api';
import Cookies from 'js-cookie';

export interface User {
  id: string;
  email: string;
  name: string;
  surname: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
          // Use legacy API format for compatibility
          const response = await apiClient.post('/api/users/login', {
            user: { email, password },
          });

          const { user } = response.data;

          set({
            user: {
              id: user.id,
              email: user.email,
              name: user.name,
              surname: user.surname,
            },
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error: any) {
          const errorMessage =
            error.response?.data?.errors?.email ||
            error.response?.data?.message ||
            'Login failed';

          set({
            error: errorMessage,
            isLoading: false,
            isAuthenticated: false,
            user: null,
          });
          throw new Error(errorMessage);
        }
      },

      register: async (name: string, email: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
          const response = await apiClient.post('/api/users/signup', {
            name,
            email,
            password,
            surname: ' ',
          });

          // Store email in cookie for pre-filling login form
          Cookies.set('new_user', email, { expires: 1 });

          set({ isLoading: false });
        } catch (error: any) {
          const errorMessage =
            error.response?.data?.errors?.email ||
            error.response?.data?.message ||
            'Registration failed';

          set({
            error: errorMessage,
            isLoading: false,
          });
          throw new Error(errorMessage);
        }
      },

      logout: async () => {
        try {
          await apiClient.post('/api/auth/logout');
        } catch (error) {
          console.error('Logout error:', error);
        }

        Cookies.remove('new_user');
        set({
          user: null,
          isAuthenticated: false,
          error: null,
        });
      },

      checkAuth: () => {
        const state = get();
        if (state.user) {
          set({ isAuthenticated: true });
        }
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);