// // src/components/ProtectedRoute.js
// import React from 'react';
// import { Navigate } from 'react-router-dom';

// function ProtectedRoute({ children, role }) {
//   const token = localStorage.getItem('token');
//   const userRole = localStorage.getItem('role');

//   if (!token) {
//     return <Navigate to="/" replace />;
//   }

//   if (userRole !== role) {
//     return <Navigate to="/" replace />;
//   }

//   return children;
// }

// export default ProtectedRoute;
