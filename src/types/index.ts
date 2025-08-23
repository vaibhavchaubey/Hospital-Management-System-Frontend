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

export interface ScheduleAppointmentPayload {
  doctorId: number;
  patientId: number;
  appointmentTime: string;
  reason: string;
  notes?: string;
}

export interface ScheduleAppointmentFormValues {
  doctorId: string;
  patientId: number;
  appointmentTime: Date;
  reason: string;
  notes?: string;
}

export type AppointmentStatus = 'SCHEDULED' | 'CANCELLED' | 'COMPLETED';

export interface Appointment {
  id: number;
  patientId: number;
  patientName: string | null;
  patientEmail: string | null;
  patientPhone: string | null;
  doctorId: number;
  doctorName: string;
  doctorEmail: string | null;
  doctorPhone: string | null;
  appointmentTime: string;
  status: AppointmentStatus;
  reason: string;
  notes: string;
}

export interface Doctor {
  id: number;
  name: string;
}

// For dropdown UI
export interface DocotrDropdownOption {
  value: string;
  label: string;
}
