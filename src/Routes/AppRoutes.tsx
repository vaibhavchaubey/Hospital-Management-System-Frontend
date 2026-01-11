import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PublicRoute from './PublicRoute';
import ProtectedRoute from './ProtectedRoute';

const AdminDashboard = React.lazy(
  () => import('../components/Layout/AdminDashboard')
);
const Random = React.lazy(() => import('../components/Random'));
const LoginPage = React.lazy(() => import('../pages/LoginPage'));
const RegisterPage = React.lazy(() => import('../pages/RegisterPage'));
const PatientDashboard = React.lazy(
  () => import('../components/Layout/PatientDashboard')
);
const DoctorDashboard = React.lazy(
  () => import('../components/Layout/DoctorDashboard')
);
const DoctorProfilePage = React.lazy(
  () => import('../pages/Doctor/DoctorProfilePage')
);
const PatientProfilePage = React.lazy(
  () => import('../pages/Patient/PatientProfilePage')
);
const PatientAppointmentPage = React.lazy(
  () => import('../pages/Patient/PatientAppointmentPage')
);
const DoctorAppointmentPage = React.lazy(
  () => import('../pages/Doctor/DoctorAppointmentPage')
);
const DoctorAppointmentDetailsPage = React.lazy(
  () => import('../pages/Doctor/DoctorAppointmentDetailsPage')
);
const AdminMedicinePage = React.lazy(
  () => import('../pages/Admin/AdminMedicinePage')
);
const NotFoundPage = React.lazy(() => import('../pages/NotFoundPage'));
const AdminInventoryPage = React.lazy(
  () => import('../pages/Admin/AdminInventoryPage')
);
const AdminSalesPage = React.lazy(
  () => import('../pages/Admin/AdminSalesPage')
);

const AdminPatientsPage = React.lazy(
  () => import('../pages/Admin/AdminPatientsPage')
);

const AdminDoctorsPage = React.lazy(
  () => import('../pages/Admin/AdminDoctorsPage')
);

const AdminDashboardPage = React.lazy(
  () => import('../pages/Admin/AdminDashboardPage')
);

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
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
            <Route path="dashboard" element={<AdminDashboardPage />} />
            <Route path="medicine" element={<AdminMedicinePage />} />
            <Route path="inventory" element={<AdminInventoryPage />} />
            <Route path="sales" element={<AdminSalesPage />} />
            <Route path="patients" element={<AdminPatientsPage />} />
            <Route path="doctors" element={<AdminDoctorsPage />} />
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
      </Suspense>
    </BrowserRouter>
  );
};

export default AppRoutes;
