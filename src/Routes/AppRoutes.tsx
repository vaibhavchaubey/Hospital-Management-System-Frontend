import AdminDashboard from '../components/Layout/AdminDashboard';
import Random from '../components/Random';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import PublicRoute from './PublicRoute';
import ProtectedRoute from './ProtectedRoute';
import PatientDashboard from '../components/Layout/PatientDashboard';
import DoctorDashboard from '../components/Layout/DoctorDashboard';
import DoctorProfilePage from '../pages/Doctor/DoctorProfilePage';
import PatientProfilePage from '../pages/Patient/PatientProfilePage';
import PatientAppointmentPage from '../pages/Patient/PatientAppointmentPage';
import DoctorAppointmentPage from '../pages/Doctor/DoctorAppointmentPage';
import DoctorAppointmentDetailsPage from '../pages/Doctor/DoctorAppointmentDetailsPage';
import AdminMedicinePage from '../pages/Admin/AdminMedicinePage';
import NotFoundPage from '../pages/NotFoundPage';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          path="/"
          element={
            <PublicRoute>
              <RegisterPage />
            </PublicRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<Random />} />
          <Route path="medicine" element={<AdminMedicinePage />} />
          <Route path="inventory" element={<Random />} />
          <Route path="sales" element={<Random />} />
          <Route path="patients" element={<Random />} />
          <Route path="doctors" element={<Random />} />
        </Route>

        <Route
          path="/doctor"
          element={
            <ProtectedRoute>
              <DoctorDashboard />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<Random />} />
          <Route path="profile" element={<DoctorProfilePage />} />
          <Route path="pharmacy" element={<Random />} />
          <Route path="patients" element={<Random />} />
          <Route path="appointments" element={<DoctorAppointmentPage />} />
          <Route
            path="appointments/:id"
            element={<DoctorAppointmentDetailsPage />}
          />
        </Route>

        <Route
          path="/patient"
          element={
            <ProtectedRoute>
              <PatientDashboard />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<Random />} />
          <Route path="profile" element={<PatientProfilePage />} />
          <Route path="appointments" element={<PatientAppointmentPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
