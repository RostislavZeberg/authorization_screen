export interface LoginCredentials {
  email: string;
  password: string;
}

export interface TwoFACredentials {
  code: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
  requires2FA?: boolean;
}

export interface ApiError {
  message: string;
  code: string;
  status: number;
}