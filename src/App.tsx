import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import WelcomePage from './pages/WelcomePage';
import SignupPage from './pages/SignupPage';
import Dashboard from './pages/Dashboard';

function App() {
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <Routes>
      {/* Signup/Login Page */}
      <Route path="/" element={<SignupPage />} />

      {/* Welcome Page after login */}
      <Route
        path="/welcome"
        element={isAuthenticated ? <WelcomePage /> : <Navigate to="/" />}
      />

      {/* Protected Dashboard */}
      <Route
        path="/dashboard"
        element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />}
      />

      {/* Redirect unknown routes to signup */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;



 