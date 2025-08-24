import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Loading from '../../page/Loading/Loading';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    // Redirect to login page with the current location as state
    // so we can redirect back after login
    return <Navigate to="/Auth" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
