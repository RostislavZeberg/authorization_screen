import { validateEmail, validatePassword, loginFormValidator } from './validation';

describe('Validation utils', () => {
  describe('validateEmail', () => {
    test('should return error for empty email', () => {
      expect(validateEmail('')).toBe('Email is required');
    });

    test('should return error for invalid email', () => {
      expect(validateEmail('invalid')).toBe('Email is invalid');
      expect(validateEmail('invalid@')).toBe('Email is invalid');
      expect(validateEmail('invalid@domain')).toBe('Email is invalid');
    });

    test('should return undefined for valid email', () => {
      expect(validateEmail('test@example.com')).toBeUndefined();
    });
  });

  describe('validatePassword', () => {
    test('should return error for empty password', () => {
      expect(validatePassword('')).toBe('Password is required');
    });

    test('should return error for short password', () => {
      expect(validatePassword('12345')).toBe('Password must be at least 6 characters');
    });

    test('should return undefined for valid password', () => {
      expect(validatePassword('123456')).toBeUndefined();
    });
  });

  describe('loginFormValidator', () => {
    test('should validate complete form data', () => {
      const validData = {
        email: 'test@example.com',
        password: '123456'
      };
      
      const invalidData = {
        email: 'invalid',
        password: '123'
      };

      expect(loginFormValidator(validData)).toEqual({});
      expect(loginFormValidator(invalidData)).toEqual({
        email: 'Email is invalid',
        password: 'Password must be at least 6 characters'
      });
    });
  });
});