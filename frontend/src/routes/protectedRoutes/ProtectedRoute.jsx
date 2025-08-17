import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';


const ProtectedRoute = ({
  isAuthenticated,
  redirectPath = '/login',
  children
}) => {

  return !isAuthenticated ? <Navigate to={redirectPath} replace /> : children || <Outlet />;
};

export default ProtectedRoute;