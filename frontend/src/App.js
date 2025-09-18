import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import WhatIf from "./pages/WhatIf";
import ProtectedRoute from "./components/ProtectedRoute";


function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

// Separate component to access navigation hooks inside Router context
function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();

  // Check authentication status on app load and route changes
  useEffect(() => {
    const controllerName = localStorage.getItem('controllerName');
    const isAuthenticated = controllerName !== null && controllerName !== '';
    
    // If user is authenticated and on login page, redirect to dashboard
    if (isAuthenticated && location.pathname === '/login') {
      navigate('/dashboard', { replace: true });
    }
    // If user is not authenticated and trying to access protected routes
    else if (!isAuthenticated && location.pathname !== '/login' && location.pathname !== '/') {
      navigate('/login', { replace: true });
    }
    // If user is not authenticated and on root path, show login
    else if (!isAuthenticated && location.pathname === '/') {
      navigate('/login', { replace: true });
    }
  }, [navigate, location.pathname]);

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Login />} />

      {/* Protected routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Navbar />
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/what-if"
        element={
          <ProtectedRoute>
            <Navbar />
            <WhatIf />
          </ProtectedRoute>
        }
      />

      {/* Catch all route - redirect to login */}
      <Route path="*" element={<Login />} />
    </Routes>
  );
}

export default App;
