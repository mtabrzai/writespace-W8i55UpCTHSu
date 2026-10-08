import { create } from 'zustand';
import { getItem, setItem, removeItem } from '../services/localStorageService';
import { LOCAL_STORAGE_KEYS, API_ENDPOINTS, ERROR_MESSAGES } from '../constants';

const initialState = {
  user: null,
  token: getItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN) || null,
  isAuthenticated: !!getItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN),
  loading: false,
  error: null
};

export const useAuthStore = create((set) => ({
  ...initialState,

  login: async (credentials) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.AUTH.LOGIN}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || ERROR_MESSAGES.UNAUTHORIZED);
      }

      const { user, token } = await response.json();
      setItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN, token);
      set({
        user,
        token,
        isAuthenticated: true,
        loading: false
      });
    } catch (error) {
      set({
        error: error.message || ERROR_MESSAGES.NETWORK_ERROR,
        loading: false
      });
      throw error;
    }
  },

  register: async (userData) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.AUTH.LOGIN}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || ERROR_MESSAGES.SERVER_ERROR);
      }

      const { user, token } = await response.json();
      setItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN, token);
      set({
        user,
        token,
        isAuthenticated: true,
        loading: false
      });
    } catch (error) {
      set({
        error: error.message || ERROR_MESSAGES.NETWORK_ERROR,
        loading: false
      });
      throw error;
    }
  },

  logout: () => {
    removeItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN);
    set({
      user: null,
      token: null,
      isAuthenticated: false,
      error: null
    });
  },

  checkAuth: async () => {
    set({ loading: true, error: null });
    try {
      const token = getItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN);
      if (!token) {
        throw new Error(ERROR_MESSAGES.UNAUTHORIZED);
      }

      const response = await fetch(`${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.AUTH.REFRESH}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error(ERROR_MESSAGES.UNAUTHORIZED);
      }

      const { user } = await response.json();
      set({
        user,
        token,
        isAuthenticated: true,
        loading: false
      });
    } catch (error) {
      removeItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN);
      set({
        user: null,
        token: null,
        isAuthenticated: false,
        error: error.message || ERROR_MESSAGES.UNAUTHORIZED,
        loading: false
      });
    }
  },

  clearError: () => set({ error: null })
}));