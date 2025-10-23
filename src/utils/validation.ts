export const validateEmail = (email: string): string | undefined => {
  if (!email) return 'Email is required';
  if (!/\S+@\S+\.\S+/.test(email)) return 'Email is invalid';
  return undefined;
};

export const validatePassword = (password: string): string | undefined => {
  if (!password) return 'Password is required';
  if (password.length < 6) return 'Password must be at least 6 characters';
  return undefined;
};

export type FormData = Record<string, string>;

export const createValidator = (rules: Record<string, (value: string) => string | undefined>) => {
  return (data: FormData) => {
    const errors: FormData = {};
    
    Object.keys(rules).forEach(key => {
      const error = rules[key](data[key]);
      if (error) {
        errors[key] = error;
      }
    });
    
    return errors;
  };
};

// Специфичная валидация для формы логина
export const loginFormValidator = createValidator({
  email: validateEmail,
  password: validatePassword,
});