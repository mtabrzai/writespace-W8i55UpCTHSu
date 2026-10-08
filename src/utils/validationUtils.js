/**
 * Form validation utilities
 */

/**
 * Validate email format
 * @param {string} email - Email address to validate
 * @returns {boolean} True if email is valid
 */
export const validateEmail = (email) => {
  if (!email) return false;
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @returns {Object} Validation result with isValid and message
 */
export const validatePassword = (password) => {
  if (!password) {
    return {
      isValid: false,
      message: 'Password is required'
    };
  }

  if (password.length < 8) {
    return {
      isValid: false,
      message: 'Password must be at least 8 characters'
    };
  }

  if (!/[A-Z]/.test(password)) {
    return {
      isValid: false,
      message: 'Password must contain at least one uppercase letter'
    };
  }

  if (!/[a-z]/.test(password)) {
    return {
      isValid: false,
      message: 'Password must contain at least one lowercase letter'
    };
  }

  if (!/[0-9]/.test(password)) {
    return {
      isValid: false,
      message: 'Password must contain at least one number'
    };
  }

  return {
    isValid: true,
    message: 'Password is valid'
  };
};

/**
 * Validate username format
 * @param {string} username - Username to validate
 * @returns {Object} Validation result with isValid and message
 */
export const validateUsername = (username) => {
  if (!username) {
    return {
      isValid: false,
      message: 'Username is required'
    };
  }

  if (username.length < 3) {
    return {
      isValid: false,
      message: 'Username must be at least 3 characters'
    };
  }

  if (username.length > 30) {
    return {
      isValid: false,
      message: 'Username must be less than 30 characters'
    };
  }

  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    return {
      isValid: false,
      message: 'Username can only contain letters, numbers, and underscores'
    };
  }

  return {
    isValid: true,
    message: 'Username is valid'
  };
};

/**
 * Validate name format
 * @param {string} name - Name to validate
 * @returns {Object} Validation result with isValid and message
 */
export const validateName = (name) => {
  if (!name) {
    return {
      isValid: false,
      message: 'Name is required'
    };
  }

  if (name.length < 2) {
    return {
      isValid: false,
      message: 'Name must be at least 2 characters'
    };
  }

  if (name.length > 50) {
    return {
      isValid: false,
      message: 'Name must be less than 50 characters'
    };
  }

  return {
    isValid: true,
    message: 'Name is valid'
  };
};

/**
 * Validate that two values match
 * @param {string} value1 - First value
 * @param {string} value2 - Second value
 * @param {string} fieldName - Field name for error message
 * @returns {Object} Validation result with isValid and message
 */
export const validateMatch = (value1, value2, fieldName = 'Fields') => {
  if (value1 !== value2) {
    return {
      isValid: false,
      message: `${fieldName} do not match`
    };
  }

  return {
    isValid: true,
    message: `${fieldName} match`
  };
};

/**
 * Validate document title
 * @param {string} title - Document title to validate
 * @returns {Object} Validation result with isValid and message
 */
export const validateDocumentTitle = (title) => {
  if (!title) {
    return {
      isValid: false,
      message: 'Title is required'
    };
  }

  if (title.length < 3) {
    return {
      isValid: false,
      message: 'Title must be at least 3 characters'
    };
  }

  if (title.length > 100) {
    return {
      isValid: false,
      message: 'Title must be less than 100 characters'
    };
  }

  return {
    isValid: true,
    message: 'Title is valid'
  };
};

/**
 * Validate document content
 * @param {string} content - Document content to validate
 * @returns {Object} Validation result with isValid and message
 */
export const validateDocumentContent = (content) => {
  if (!content) {
    return {
      isValid: false,
      message: 'Content is required'
    };
  }

  if (content.length < 10) {
    return {
      isValid: false,
      message: 'Content must be at least 10 characters'
    };
  }

  return {
    isValid: true,
    message: 'Content is valid'
  };
};

/**
 * Validate tag format
 * @param {string} tag - Tag to validate
 * @returns {Object} Validation result with isValid and message
 */
export const validateTag = (tag) => {
  if (!tag) {
    return {
      isValid: false,
      message: 'Tag cannot be empty'
    };
  }

  if (tag.length > 20) {
    return {
      isValid: false,
      message: 'Tag must be less than 20 characters'
    };
  }

  if (!/^[a-zA-Z0-9-]+$/.test(tag)) {
    return {
      isValid: false,
      message: 'Tag can only contain letters, numbers, and hyphens'
    };
  }

  return {
    isValid: true,
    message: 'Tag is valid'
  };
};