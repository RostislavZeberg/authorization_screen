import { useState, useEffect } from 'react';
import { useLogin } from './useAuth';
import { loginFormValidator } from '../utils/validation';
import type { ApiError } from '../types/auth';

interface UseLoginFormProps {
  onSuccess?: (requires2FA: boolean) => void;
}

export const useLoginForm = ({ onSuccess }: UseLoginFormProps) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [apiError, setApiError] = useState<ApiError | null>(null);
  const [showValidationErrors, setShowValidationErrors] = useState(false);

  const loginMutation = useLogin();

  // Проверяем, что оба поля заполнены
  const isFormFilled = formData.email.trim() !== '' && formData.password.trim() !== '';

  // Очистка ошибок при изменении полей - ТОЛЬКО для ошибок валидации
  useEffect(() => {
    if (showValidationErrors && (formData.email || formData.password)) {
      setShowValidationErrors(false);
      setErrors({}); // Очищаем ошибки валидации при начале ввода
    }

    if (apiError && (formData.email || formData.password)) {
      setApiError(null); // Очищаем API ошибки при начале ввода
    }
  }, [formData.email, formData.password, apiError, showValidationErrors]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Функция для очистки формы
  const resetForm = () => {
    setFormData({
      email: '',
      password: ''
    });
    setErrors({});
    setApiError(null);
    setShowValidationErrors(false);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Сбрасываем все ошибки перед валидацией
    setApiError(null);
    setShowValidationErrors(false);
    setErrors({});

    // Валидируем форму
    const validationErrors = loginFormValidator(formData);

    if (Object.keys(validationErrors).length > 0) {
      // Если есть ошибки валидации - очищаем поля и показываем ошибки
      setFormData({
        email: '',
        password: ''
      });
      setErrors(validationErrors);
      setShowValidationErrors(true);
      return;
    }

    try {
      const result = await loginMutation.mutateAsync(formData);

      // Очищаем форму при успешном входе
      resetForm();

      if (onSuccess) {
        onSuccess(result.requires2FA || false);
      }
    } catch (error) {
      const apiError = error as ApiError;
      console.error('Login error:', apiError);
      setApiError(apiError);
      // Также очищаем поля при API ошибке
      setFormData({
        email: '',
        password: ''
      });
    }
  };

  const getErrorMessage = (error: ApiError): string => {
    switch (error.code) {
      case 'AUTH_001':
        return 'Invalid email or password. Please try again.';
      case 'AUTH_002':
        return 'Your account has been temporarily locked. Please try again in 15 minutes.';
      case 'NET_001':
        return 'Network error. Please check your connection and try again.';
      case 'SRV_001':
        return 'Server error. Please try again later.';
      default:
        return 'An unexpected error occurred. Please try again.';
    }
  };

  return {
    errors,
    formData,
    loginMutation,
    handleChange,
    handleSubmit,
    getErrorMessage,
    resetForm,
    isFormFilled,
    apiError,
    showValidationErrors
  };
};