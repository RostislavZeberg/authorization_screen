import { useMutation } from '@tanstack/react-query';
import { authApi } from '../services/authApi';
import type { AuthResponse, ApiError, LoginCredentials, TwoFACredentials } from '../types/auth';

export const useLogin = () => {
  return useMutation<AuthResponse, ApiError, LoginCredentials>({
    mutationFn: authApi.login,
    retry: (failureCount, error) => {
      // Не повторяем при ошибках клиента (4xx), кроме 429
      if (error.status >= 400 && error.status < 500 && error.status !== 429) {
        return false;
      }
      // Повторяем до 3 раз для других ошибок
      return failureCount < 3;
    },
  });
};

export const useVerify2FA = () => {
  return useMutation<AuthResponse, ApiError, TwoFACredentials>({
    mutationFn: authApi.verify2FA,
    retry: (failureCount, error) => {
      if (error.status >= 400 && error.status < 500) {
        return false;
      }
      return failureCount < 3;
    },
  });
};