// src/utils/validation.ts
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

// Task form validation
export const validateTaskForm = (title: string, description?: string): ValidationResult => {
  const errors: string[] = [];

  // Title validation
  if (!title || title.trim().length === 0) {
    errors.push('Title is required');
  } else if (title.length > 255) {
    errors.push('Title must be 255 characters or less');
  }

  // Description validation
  if (description && description.length > 1000) {
    errors.push('Description must be 1000 characters or less');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

// Authentication form validation
export const validateEmail = (email: string): ValidationResult => {
  const errors: string[] = [];
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || email.trim().length === 0) {
    errors.push('Email is required');
  } else if (!emailRegex.test(email)) {
    errors.push('Please enter a valid email address');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

export const validatePassword = (password: string): ValidationResult => {
  const errors: string[] = [];

  if (!password || password.length === 0) {
    errors.push('Password is required');
  } else if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
    errors.push('Password must contain at least one uppercase letter, one lowercase letter, and one number');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

export const validateName = (name: string): ValidationResult => {
  const errors: string[] = [];

  if (name && name.length > 100) {
    errors.push('Name must be 100 characters or less');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

export const validateLoginForm = (email: string, password: string): ValidationResult => {
  const emailValidation = validateEmail(email);
  const passwordValidation = validatePassword(password);

  return {
    isValid: emailValidation.isValid && passwordValidation.isValid,
    errors: [...emailValidation.errors, ...passwordValidation.errors],
  };
};

export const validateSignupForm = (email: string, password: string, name: string): ValidationResult => {
  const emailValidation = validateEmail(email);
  const passwordValidation = validatePassword(password);
  const nameValidation = validateName(name);

  return {
    isValid: emailValidation.isValid && passwordValidation.isValid && nameValidation.isValid,
    errors: [
      ...emailValidation.errors, 
      ...passwordValidation.errors, 
      ...nameValidation.errors
    ],
  };
};