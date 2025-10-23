import { render, screen } from '@testing-library/react';
import { LogIn } from './LogIn';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { store } from '../../store/store';

// Мокаем useLoginForm чтобы избежать реальных API вызовов
jest.mock('../../hooks/useLoginForm', () => ({
  useLoginForm: () => ({
    errors: {},
    formData: { email: '', password: '' },
    loginMutation: { isPending: false, isError: false, error: null },
    handleChange: jest.fn(),
    handleSubmit: jest.fn(),
    getErrorMessage: jest.fn(),
    isFormFilled: false,
    apiError: null,
    showValidationErrors: false,
  }),
}));

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });
  
  return ({ children }: { children: React.ReactNode }) => (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </Provider>
  );
};

describe('LogIn Component', () => {
  test('renders login form', () => {
    render(<LogIn />, { wrapper: createWrapper() });
    
    expect(screen.getByText('Sign in to your account to continue')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByText('Log in')).toBeInTheDocument();
  });
});