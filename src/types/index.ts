import type { JSX } from 'react';

export interface RegisterUserInput {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: 'PATIENT' | 'DOCTOR' | 'ADMIN';
}

export interface LoginUserInput {
  email: string;
  password: string;
}

export interface User {
  role: string;
  name: string;
  id: number;
  email: string;
  sub: string;
  iat: number;
  exp: number;
}

export interface PublicRouteProps {
  children: JSX.Element;
}

export interface ProtectedRouteProps {
  children: JSX.Element;
}
