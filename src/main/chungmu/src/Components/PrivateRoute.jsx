// src/components/PrivateRoute.js
import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import axios from 'axios';

const PrivateRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await axios.get('/api/checkSession', { withCredentials: true });
        setIsAuthenticated(response.data === 'Session is active');
      } catch (error) {
        console.error('Error checking session', error);
        setIsAuthenticated(false);
      }
    };
    
    checkSession();
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/Login" />;
};

export default PrivateRoute;
