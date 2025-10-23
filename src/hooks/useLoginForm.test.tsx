import { renderHook, act } from '@testing-library/react';
import { useLoginForm } from './useLoginForm';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';

// Мокаем useAuth чтобы избежать реальных API вызовов
jest.mock('./useAuth', () => ({
  useLogin: () => ({
    mutateAsync: jest.fn(),
    isPending: false,
    isError: false,
    error: null,
  }),
}));

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });
  
  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

describe('useLoginForm', () => {
  test('should update form data on change', () => {
    const { result } = renderHook(() => useLoginForm({}), {
      wrapper: createWrapper(),
    });
    
    act(() => {
      result.current.handleChange({
        target: { name: 'email', value: 'test@example.com' }
      } as React.ChangeEvent<HTMLInputElement>);
    });
    
    expect(result.current.formData.email).toBe('test@example.com');
  });

  test('should validate empty form', () => {
    const { result } = renderHook(() => useLoginForm({}), {
      wrapper: createWrapper(),
    });
    
    expect(result.current.isFormFilled).toBe(false);
  });
});