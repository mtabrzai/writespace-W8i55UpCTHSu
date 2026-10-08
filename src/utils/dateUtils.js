/**
 * Date formatting utilities
 */

/**
 * Format a date string or Date object to a localized date string
 * @param {string|Date} date - Date string or Date object
 * @param {Object} [options] - Formatting options
 * @param {string} [options.locale='en-US'] - Locale for formatting
 * @param {Object} [options.options] - Intl.DateTimeFormat options
 * @returns {string} Formatted date string
 */
export const formatDate = (date, { locale = 'en-US', options = {} } = {}) => {
  if (!date) return '';

  const dateObj = typeof date === 'string' ? new Date(date) : date;

  if (isNaN(dateObj.getTime())) {
    console.warn('Invalid date provided to formatDate:', date);
    return '';
  }

  const defaultOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options
  };

  return new Intl.DateTimeFormat(locale, defaultOptions).format(dateObj);
};

/**
 * Format a date string or Date object to a localized time string
 * @param {string|Date} date - Date string or Date object
 * @param {Object} [options] - Formatting options
 * @param {string} [options.locale='en-US'] - Locale for formatting
 * @param {Object} [options.options] - Intl.DateTimeFormat options
 * @returns {string} Formatted time string
 */
export const formatTime = (date, { locale = 'en-US', options = {} } = {}) => {
  if (!date) return '';

  const dateObj = typeof date === 'string' ? new Date(date) : date;

  if (isNaN(dateObj.getTime())) {
    console.warn('Invalid date provided to formatTime:', date);
    return '';
  }

  const defaultOptions = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    ...options
  };

  return new Intl.DateTimeFormat(locale, defaultOptions).format(dateObj);
};

/**
 * Format a date string or Date object to a relative time string (e.g., "2 hours ago")
 * @param {string|Date} date - Date string or Date object
 * @param {Object} [options] - Formatting options
 * @param {string} [options.locale='en'] - Locale for formatting
 * @returns {string} Relative time string
 */
export const formatRelativeTime = (date, { locale = 'en' } = {}) => {
  if (!date) return '';

  const dateObj = typeof date === 'string' ? new Date(date) : date;

  if (isNaN(dateObj.getTime())) {
    console.warn('Invalid date provided to formatRelativeTime:', date);
    return '';
  }

  const now = new Date();
  const seconds = Math.floor((now - dateObj) / 1000);
  const units = [
    { max: 2764800, value: 31536000, name: 'year' },
    { max: 604800, value: 2592000, name: 'month' },
    { max: 86400, value: 604800, name: 'week' },
    { max: 3600, value: 86400, name: 'day' },
    { max: 60, value: 3600, name: 'hour' },
    { max: 1, value: 60, name: 'minute' }
  ];

  const unit = units.find(u => seconds >= u.max) || { value: 1, name: 'second' };
  const value = Math.floor(seconds / unit.value);

  return new Intl.RelativeTimeFormat(locale, { numeric: 'auto' }).format(-value, unit.name);
};

/**
 * Format a date string or Date object to ISO string
 * @param {string|Date} date - Date string or Date object
 * @returns {string} ISO formatted date string
 */
export const formatISO = (date) => {
  if (!date) return '';

  const dateObj = typeof date === 'string' ? new Date(date) : date;

  if (isNaN(dateObj.getTime())) {
    console.warn('Invalid date provided to formatISO:', date);
    return '';
  }

  return dateObj.toISOString();
};

/**
 * Check if a date is today
 * @param {string|Date} date - Date string or Date object
 * @returns {boolean} True if the date is today
 */
export const isToday = (date) => {
  if (!date) return false;

  const dateObj = typeof date === 'string' ? new Date(date) : date;

  if (isNaN(dateObj.getTime())) {
    console.warn('Invalid date provided to isToday:', date);
    return false;
  }

  const today = new Date();
  return dateObj.getDate() === today.getDate() &&
         dateObj.getMonth() === today.getMonth() &&
         dateObj.getFullYear() === today.getFullYear();
};

/**
 * Check if a date is yesterday
 * @param {string|Date} date - Date string or Date object
 * @returns {boolean} True if the date is yesterday
 */
export const isYesterday = (date) => {
  if (!date) return false;

  const dateObj = typeof date === 'string' ? new Date(date) : date;

  if (isNaN(dateObj.getTime())) {
    console.warn('Invalid date provided to isYesterday:', date);
    return false;
  }

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return dateObj.getDate() === yesterday.getDate() &&
         dateObj.getMonth() === yesterday.getMonth() &&
         dateObj.getFullYear() === yesterday.getFullYear();
};

/**
 * Get the start of day for a date
 * @param {string|Date} date - Date string or Date object
 * @returns {Date} Start of day date
 */
export const startOfDay = (date) => {
  if (!date) return new Date();

  const dateObj = typeof date === 'string' ? new Date(date) : date;

  if (isNaN(dateObj.getTime())) {
    console.warn('Invalid date provided to startOfDay:', date);
    return new Date();
  }

  const start = new Date(dateObj);
  start.setHours(0, 0, 0, 0);
  return start;
};

/**
 * Get the end of day for a date
 * @param {string|Date} date - Date string or Date object
 * @returns {Date} End of day date
 */
export const endOfDay = (date) => {
  if (!date) return new Date();

  const dateObj = typeof date === 'string' ? new Date(date) : date;

  if (isNaN(dateObj.getTime())) {
    console.warn('Invalid date provided to endOfDay:', date);
    return new Date();
  }

  const end = new Date(dateObj);
  end.setHours(23, 59, 59, 999);
  return end;
};