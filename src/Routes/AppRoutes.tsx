import AdminDashboard from '../components/Layout/AdminDashboard';
import Random from '../components/Random';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import PublicRoute from './PublicRoute';
import ProtectedRoute from './ProtectedRoute';
import PatientDashboard from '../components/Layout/PatientDashboard';
import PatientProfilePage from '../pages/PatientProfilePage';

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
          path="/register"
          element={
            <PublicRoute>
              <RegisterPage />
            </PublicRoute>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Random />} />
          <Route path="/pharmacy" element={<Random />} />
          <Route path="/patients" element={<Random />} />
          <Route path="/doctors" element={<Random />} />
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
          <Route path="appointments" element={<Random />} />
          <Route path="book" element={<Random />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
