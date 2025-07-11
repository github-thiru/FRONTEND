// src/components/PublicRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

function PublicRoute({ children }) {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  if (token && role === 'user') {
    return <Navigate to="/user/dashboard" replace />;
  }

  if (token && role === 'admin') {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return children;
}

export default PublicRoute;
