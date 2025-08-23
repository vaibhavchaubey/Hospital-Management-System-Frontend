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
  profileId: number;
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

export interface PatientProfile {
  id: number;
  name: string;
  email: string;
  dob: string;
  phone: string;
  address: string;
  aadharNo: string;
  bloodGroup: string;
  allergies: string;
  chronicDisease: string;
}

export interface ScheduleAppointmentInput {
  doctorId: string;
  patientId: string;
  appointmentTime: Date;
  reason: string;
  notes?: string;
}
