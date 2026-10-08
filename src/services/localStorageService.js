import { LOCAL_STORAGE_KEYS } from '../constants';

/**
 * Get item from localStorage
 * @param {string} key - One of LOCAL_STORAGE_KEYS
 * @returns {any} Parsed value or null if not found
 */
export const getItem = (key) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error(`Error reading localStorage key "${key}":`, error);
    return null;
  }
};

/**
 * Set item in localStorage
 * @param {string} key - One of LOCAL_STORAGE_KEYS
 * @param {any} value - Value to store (will be stringified)
 * @returns {boolean} True if successful, false if failed
 */
export const setItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Error setting localStorage key "${key}":`, error);
    return false;
  }
};

/**
 * Remove item from localStorage
 * @param {string} key - One of LOCAL_STORAGE_KEYS
 * @returns {boolean} True if successful, false if failed
 */
export const removeItem = (key) => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Error removing localStorage key "${key}":`, error);
    return false;
  }
};

/**
 * Clear all writespace-related items from localStorage
 * @returns {boolean} True if successful, false if failed
 */
export const clearWritespaceItems = () => {
  try {
    Object.values(LOCAL_STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
    return true;
  } catch (error) {
    console.error('Error clearing writespace localStorage items:', error);
    return false;
  }
};