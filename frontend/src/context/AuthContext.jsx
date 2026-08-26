import React, { createContext, useContext, useState, useEffect } from 'react';
import { authApi } from '../api/resumeApi';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const initGuestUser = async () => {
    const guestUser = { username: 'Guest User', isGuest: true };
    try {
      // Try logging in with default guest credentials
      const res = await authApi.login('guest_user', 'guestpass123');
      localStorage.setItem('access_token', res.data.access);
      localStorage.setItem('refresh_token', res.data.refresh);
      localStorage.setItem('user_data', JSON.stringify(guestUser));
      setUser(guestUser);
    } catch (e) {
      // If login fails, try registering the guest user
      try {
        await authApi.register({
          username: 'guest_user',
          email: 'guest@resumatch.ai',
          password: 'guestpass123'
        });
        const res = await authApi.login('guest_user', 'guestpass123');
        localStorage.setItem('access_token', res.data.access);
        localStorage.setItem('refresh_token', res.data.refresh);
        localStorage.setItem('user_data', JSON.stringify(guestUser));
        setUser(guestUser);
      } catch (err) {
        // Fallback session state if backend is offline or unreachable
        setUser(guestUser);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    const savedUser = localStorage.getItem('user_data');
    if (token && savedUser) {
      try {
        setUser(JSON.parse(savedUser));
        setLoading(false);
      } catch (e) {
        localStorage.removeItem('user_data');
        initGuestUser();
      }
    } else {
      initGuestUser();
    }
  }, []);

  const login = async (username, password) => {
    const res = await authApi.login(username, password);
    localStorage.setItem('access_token', res.data.access);
    localStorage.setItem('refresh_token', res.data.refresh);
    const userData = { username };
    localStorage.setItem('user_data', JSON.stringify(userData));
    setUser(userData);
    return res.data;
  };

  const register = async (userData) => {
    const res = await authApi.register(userData);
    await login(userData.username, userData.password);
    return res.data;
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user_data');
    initGuestUser();
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
