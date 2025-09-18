import React from 'react';
import { Navigate } from 'react-router-dom';

/**
 * ProtectedRoute Component
 * 
 * This component wraps around protected pages and checks if the user is authenticated.
 * If the user is not authenticated, it redirects them to the login page.
 * If authenticated, it renders the protected content.
 */
export default function ProtectedRoute({ children }) {
  // Check if user is authenticated by looking for controller name in localStorage
  const isAuthenticated = () => {
    const controllerName = localStorage.getItem('controllerName');
    return controllerName !== null && controllerName !== '';
  };

  // If user is not authenticated, redirect to login page
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  // If authenticated, render the protected content
  return children;
}