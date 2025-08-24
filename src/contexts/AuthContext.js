import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../Firebase/config';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, loading, error] = useAuthState(auth);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // You can add additional user data fetching here if needed
    if (user) {
      // Set basic user data
      setUserData({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL
      });
    } else {
      setUserData(null);
    }
  }, [user]);

  const value = {
    user,
    userData,
    loading,
    error,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
