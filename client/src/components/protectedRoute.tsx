// src/components/ProtectedRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './authContext'; // Adjust the path as necessary

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { isLoggedIn } = useAuth();

    if (!isLoggedIn) {
        // Redirect to login if not logged in
        return <Navigate to="/login" />;
    }

    return <>{children};</>; // Render children if logged in
};

export default ProtectedRoute;
