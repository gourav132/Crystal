import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Loading from '../../page/Loading/Loading';

const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <Loading />;
  }

  if (user) {
    // If user is authenticated, redirect to their gallery
    return <Navigate to={`/Gallery/${user.displayName}`} replace />;
  }

  return children;
};

export default PublicRoute;
