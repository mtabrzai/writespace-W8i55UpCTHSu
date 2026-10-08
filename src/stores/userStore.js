import { create } from 'zustand';
import { getItem } from '../services/localStorageService';
import { LOCAL_STORAGE_KEYS, API_ENDPOINTS, ERROR_MESSAGES, ADMIN_EMAILS } from '../constants';

const initialState = {
  users: [],
  currentUser: null,
  loading: false,
  error: null,
  hasMore: false,
  page: 1
};

export const useUserStore = create((set, get) => ({
  ...initialState,

  fetchUsers: async (page = 1, limit = 10) => {
    set({ loading: true, error: null });
    try {
      const token = getItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN);
      if (!token) {
        throw new Error(ERROR_MESSAGES.UNAUTHORIZED);
      }

      const response = await fetch(
        `${API_ENDPOINTS.BASE_URL}/users?page=${page}&limit=${limit}`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || ERROR_MESSAGES.SERVER_ERROR);
      }

      const { data, hasMore } = await response.json();
      set({
        users: page === 1 ? data : [...get().users, ...data],
        hasMore,
        page,
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

  fetchUserById: async (id) => {
    set({ loading: true, error: null });
    try {
      const token = getItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN);
      if (!token) {
        throw new Error(ERROR_MESSAGES.UNAUTHORIZED);
      }

      const response = await fetch(
        `${API_ENDPOINTS.BASE_URL}/users/${id}`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || ERROR_MESSAGES.NOT_FOUND);
      }

      const user = await response.json();
      set({
        currentUser: user,
        loading: false
      });
      return user;
    } catch (error) {
      set({
        error: error.message || ERROR_MESSAGES.NETWORK_ERROR,
        loading: false
      });
      throw error;
    }
  },

  createUser: async (userData) => {
    set({ loading: true, error: null });
    try {
      const token = getItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN);
      if (!token) {
        throw new Error(ERROR_MESSAGES.UNAUTHORIZED);
      }

      const response = await fetch(
        `${API_ENDPOINTS.BASE_URL}/users`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(userData)
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || ERROR_MESSAGES.SERVER_ERROR);
      }

      const newUser = await response.json();
      set((state) => ({
        users: [newUser, ...state.users],
        loading: false
      }));
      return newUser;
    } catch (error) {
      set({
        error: error.message || ERROR_MESSAGES.NETWORK_ERROR,
        loading: false
      });
      throw error;
    }
  },

  updateUser: async (id, userData) => {
    set({ loading: true, error: null });
    try {
      const token = getItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN);
      if (!token) {
        throw new Error(ERROR_MESSAGES.UNAUTHORIZED);
      }

      const response = await fetch(
        `${API_ENDPOINTS.BASE_URL}/users/${id}`,
        {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(userData)
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || ERROR_MESSAGES.SERVER_ERROR);
      }

      const updatedUser = await response.json();
      set((state) => ({
        users: state.users.map(user =>
          user.id === id ? updatedUser : user
        ),
        currentUser: updatedUser,
        loading: false
      }));
      return updatedUser;
    } catch (error) {
      set({
        error: error.message || ERROR_MESSAGES.NETWORK_ERROR,
        loading: false
      });
      throw error;
    }
  },

  deleteUser: async (id) => {
    set({ loading: true, error: null });
    try {
      const token = getItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN);
      if (!token) {
        throw new Error(ERROR_MESSAGES.UNAUTHORIZED);
      }

      const response = await fetch(
        `${API_ENDPOINTS.BASE_URL}/users/${id}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || ERROR_MESSAGES.SERVER_ERROR);
      }

      set((state) => ({
        users: state.users.filter(user => user.id !== id),
        currentUser: state.currentUser?.id === id ? null : state.currentUser,
        loading: false
      }));
    } catch (error) {
      set({
        error: error.message || ERROR_MESSAGES.NETWORK_ERROR,
        loading: false
      });
      throw error;
    }
  },

  isAdmin: () => {
    const { user } = useAuthStore.getState();
    return user && ADMIN_EMAILS.includes(user.email);
  },

  clearCurrentUser: () => set({ currentUser: null }),
  clearError: () => set({ error: null }),
  reset: () => set(initialState)
}));