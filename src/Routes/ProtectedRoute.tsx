import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import type { ProtectedRouteProps } from '../types';

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const token = useSelector((state: any) => state.jwt);

  if (token) {
    return <>{children}</>;
  }

  return <Navigate to="/login" replace />;
};

export default ProtectedRoute;
