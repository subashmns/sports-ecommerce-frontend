// ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({allowedRoles, children }) => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  // If no token, redirect to login
  if (!token) {
    return <Navigate to="/login" />;
  }

  // If the user doesn't have the required role, redirect to home
  if ((allowedRoles) && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" />;
  }

   // Redirect based on the user's role
  if (user.role === 'seller') {
    return <Navigate to="/seller/*" />;
  } else if (user.role === 'customer') {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
