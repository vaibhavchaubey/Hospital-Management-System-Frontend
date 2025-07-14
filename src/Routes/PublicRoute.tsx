import { useSelector } from 'react-redux';
import type { PublicRouteProps } from '../types';
import { Navigate } from 'react-router-dom';

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const token = useSelector((state: any) => state.jwt);

  if (token) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default PublicRoute;
