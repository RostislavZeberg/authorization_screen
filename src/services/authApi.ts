import type { LoginCredentials, AuthResponse, TwoFACredentials } from "../types/auth";

// Моковые данные для имитации API
const mockUsers = [
  { email: 'user@example.com', password: 'password123', id: '1', name: 'Test User' },
  { email: '2fa@example.com', password: 'password123', id: '2', name: '2FA User' },
];

// Имитация задержки сети
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Моковые ошибки
const mockErrors = {
  INVALID_CREDENTIALS: {
    message: 'Invalid email or password',
    code: 'AUTH_001',
    status: 401,
  },
  ACCOUNT_LOCKED: {
    message: 'Account temporarily locked due to too many failed attempts',
    code: 'AUTH_002',
    status: 423,
  },
  INVALID_2FA_CODE: {
    message: 'Invalid two-factor authentication code',
    code: 'AUTH_003',
    status: 401,
  },
  NETWORK_ERROR: {
    message: 'Network error occurred',
    code: 'NET_001',
    status: 0,
  },
  SERVER_ERROR: {
    message: 'Internal server error',
    code: 'SRV_001',
    status: 500,
  },
};

export const authApi = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    await delay(1000); // Имитация задержки сети

    // Случайная ошибка сети (10% chance)
    if (Math.random() < 0.1) {
      throw mockErrors.NETWORK_ERROR;
    }

    // Случайная ошибка сервера (5% chance)
    if (Math.random() < 0.05) {
      throw mockErrors.SERVER_ERROR;
    }

    const user = mockUsers.find(u => u.email === credentials.email);

    if (!user) {
      throw mockErrors.INVALID_CREDENTIALS;
    }

    if (user.password !== credentials.password) {
      // Для определенного пользователя имитируем блокировку аккаунта
      if (credentials.email === 'locked@example.com') {
        throw mockErrors.ACCOUNT_LOCKED;
      }
      throw mockErrors.INVALID_CREDENTIALS;
    }

    // Для определенного пользователя требуем 2FA
    if (user.email === '2fa@example.com') {
      return {
        token: '',
        user,
        requires2FA: true,
      };
    }

    return {
      token: 'mock-jwt-token',
      user,
      requires2FA: false,
    };
  },

  async verify2FA(credentials: TwoFACredentials): Promise<AuthResponse> {
    await delay(800);

    // Случайная ошибка сети
    if (Math.random() < 0.1) {
      throw mockErrors.NETWORK_ERROR;
    }

    if (credentials.code !== '123456') {
      throw mockErrors.INVALID_2FA_CODE;
    }

    return {
      token: 'mock-jwt-token-2fa',
      user: {
        id: '2',
        email: '2fa@example.com',
        name: '2FA User',
      },
      requires2FA: false,
    };
  },
};