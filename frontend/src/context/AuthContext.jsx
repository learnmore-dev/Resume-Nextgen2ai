import React, { createContext, useContext, useState, useEffect } from 'react';
import { authApi } from '../api/resumeApi';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user_data');
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        if (parsed && !parsed.isGuest) return parsed;
      } catch (e) {
        return null;
      }
    }
    return null;
  });
  const [loading, setLoading] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authRedirectPath, setAuthRedirectPath] = useState('/templates');

  const loginWithGoogle = async (googlePayload) => {
    setLoading(true);
    try {
      const res = await authApi.googleLogin(googlePayload);
      if (res?.data?.access) {
        localStorage.setItem('access_token', res.data.access);
        localStorage.setItem('refresh_token', res.data.refresh);
        const userData = res.data.user;
        localStorage.setItem('user_data', JSON.stringify(userData));
        setUser(userData);
        return userData;
      }
      throw new Error('Invalid authentication response from server');
    } finally {
      setLoading(false);
    }
  };

  const login = async (username, password) => {
    const res = await authApi.login(username, password);
    localStorage.setItem('access_token', res.data.access);
    localStorage.setItem('refresh_token', res.data.refresh);
    const userData = res.data.user || { username, name: username, email: `${username}@nextgen.com` };
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
    setUser(null);
  };

  const openAuthModal = (redirectPath = '/templates') => {
    setAuthRedirectPath(redirectPath);
    setShowAuthModal(true);
  };
  const closeAuthModal = () => setShowAuthModal(false);

  const isAuthenticated = Boolean(user && !user.isGuest);
  const isAdmin = Boolean(
    user && !user.isGuest && (user.isAdmin || user.is_staff || user.is_superuser)
  );

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      isAuthenticated,
      isAdmin,
      showAuthModal,
      authRedirectPath,
      openAuthModal,
      closeAuthModal,
      loginWithGoogle, 
      login, 
      register, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);