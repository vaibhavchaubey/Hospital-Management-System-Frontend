export interface RegisterUserInput {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: 'PATIENT' | 'DOCTOR' | 'ADMIN';
}
