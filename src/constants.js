export const LOCAL_STORAGE_KEYS = {
  AUTH_TOKEN: 'writespace_auth_token',
  USER_PREFERENCES: 'writespace_user_preferences',
  RECENT_DOCUMENTS: 'writespace_recent_documents'
};

export const ADMIN_EMAILS = [
  'admin@writespace.com',
  'support@writespace.com'
];

export const DEFAULT_DOCUMENT_SETTINGS = {
  fontSize: '16px',
  lineHeight: 1.5,
  theme: 'light'
};

export const API_ENDPOINTS = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'https://api.writespace.com/v1',
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh'
  },
  DOCUMENTS: {
    LIST: '/documents',
    CREATE: '/documents',
    DETAIL: (id) => `/documents/${id}`,
    UPDATE: (id) => `/documents/${id}`,
    DELETE: (id) => `/documents/${id}`
  }
};

export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'You are not authorized. Please log in.',
  NOT_FOUND: 'The requested resource was not found.',
  SERVER_ERROR: 'An unexpected server error occurred.',
  INVALID_INPUT: 'Please check your input and try again.'
};