import { create } from 'zustand';
import { getItem } from '../services/localStorageService';
import { LOCAL_STORAGE_KEYS, API_ENDPOINTS, ERROR_MESSAGES } from '../constants';

const initialState = {
  posts: [],
  currentPost: null,
  loading: false,
  error: null,
  hasMore: false,
  page: 1
};

export const usePostStore = create((set, get) => ({
  ...initialState,

  fetchPosts: async (page = 1, limit = 10) => {
    set({ loading: true, error: null });
    try {
      const token = getItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN);
      if (!token) {
        throw new Error(ERROR_MESSAGES.UNAUTHORIZED);
      }

      const response = await fetch(
        `${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.DOCUMENTS.LIST}?page=${page}&limit=${limit}`,
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
        posts: page === 1 ? data : [...get().posts, ...data],
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

  fetchPostById: async (id) => {
    set({ loading: true, error: null });
    try {
      const token = getItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN);
      if (!token) {
        throw new Error(ERROR_MESSAGES.UNAUTHORIZED);
      }

      const response = await fetch(
        `${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.DOCUMENTS.DETAIL(id)}`,
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

      const post = await response.json();
      set({
        currentPost: post,
        loading: false
      });
      return post;
    } catch (error) {
      set({
        error: error.message || ERROR_MESSAGES.NETWORK_ERROR,
        loading: false
      });
      throw error;
    }
  },

  createPost: async (postData) => {
    set({ loading: true, error: null });
    try {
      const token = getItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN);
      if (!token) {
        throw new Error(ERROR_MESSAGES.UNAUTHORIZED);
      }

      const response = await fetch(
        `${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.DOCUMENTS.CREATE}`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(postData)
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || ERROR_MESSAGES.SERVER_ERROR);
      }

      const newPost = await response.json();
      set((state) => ({
        posts: [newPost, ...state.posts],
        loading: false
      }));
      return newPost;
    } catch (error) {
      set({
        error: error.message || ERROR_MESSAGES.NETWORK_ERROR,
        loading: false
      });
      throw error;
    }
  },

  updatePost: async (id, postData) => {
    set({ loading: true, error: null });
    try {
      const token = getItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN);
      if (!token) {
        throw new Error(ERROR_MESSAGES.UNAUTHORIZED);
      }

      const response = await fetch(
        `${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.DOCUMENTS.UPDATE(id)}`,
        {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(postData)
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || ERROR_MESSAGES.SERVER_ERROR);
      }

      const updatedPost = await response.json();
      set((state) => ({
        posts: state.posts.map(post =>
          post.id === id ? updatedPost : post
        ),
        currentPost: updatedPost,
        loading: false
      }));
      return updatedPost;
    } catch (error) {
      set({
        error: error.message || ERROR_MESSAGES.NETWORK_ERROR,
        loading: false
      });
      throw error;
    }
  },

  deletePost: async (id) => {
    set({ loading: true, error: null });
    try {
      const token = getItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN);
      if (!token) {
        throw new Error(ERROR_MESSAGES.UNAUTHORIZED);
      }

      const response = await fetch(
        `${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.DOCUMENTS.DELETE(id)}`,
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
        posts: state.posts.filter(post => post.id !== id),
        currentPost: state.currentPost?.id === id ? null : state.currentPost,
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

  isPostOwner: (post) => {
    const { user } = useAuthStore.getState();
    return user && post && post.authorId === user.id;
  },

  clearCurrentPost: () => set({ currentPost: null }),
  clearError: () => set({ error: null }),
  reset: () => set(initialState)
}));