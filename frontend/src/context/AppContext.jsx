import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  // Check if user is logged in
  const checkUserLoggedIn = async () => {
    if (token) {
      try {
        const res = await axios.get('/api/auth/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    checkUserLoggedIn();
  }, [token]);

  return (
    <AppContext.Provider value={{ user, setUser, token, setToken }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;