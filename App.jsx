import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import AdminLogin from './Pages/AdminLogin';
import AdminDashboard from './Pages/AdminDashboard';
import UserRegister from './Pages/UserRegister';
import UserLogin from './Pages/UserLogin';
import UserDashboard from './Pages/UserDashboard';
// import ProtectedRoute from './Pages/ProtectedRouter';
import PublicRoute from './Pages/PublicRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        {/* 🔓 Public Routes (only when NOT logged in) */}
        <Route path="/admin/login" element={
          <PublicRoute><AdminLogin /></PublicRoute>
        } />
        <Route path="/user/register" element={
          <PublicRoute><UserRegister /></PublicRoute>
        } />
        <Route path="/user/login" element={
          <PublicRoute><UserLogin /></PublicRoute>
        } />

        {/* 🔐 Protected Routes (only when logged in) */}
        <Route path="/admin/dashboard" element={
         <AdminDashboard />
        } />
        <Route path="/user/dashboard" element={
       <UserDashboard />
        } />
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
