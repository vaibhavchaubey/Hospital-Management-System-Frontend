import { useSelector } from 'react-redux';
import type { PublicRouteProps, User } from '../types';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const token = useSelector((state: any) => state.jwt);

  if (token) {
    const user = jwtDecode(token) as User;
    return <Navigate to={`/${user?.role?.toLowerCase()}/dashboard`} replace />;
  }

  return <>{children}</>;
};

export default PublicRoute;
