import { createContext, useContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const API = import.meta.env.VITE_API_URL ;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const register = async (formData) => {
    return await axios.post(`${API}/api/auth/register`, formData);
  };

  const login = async (formData) => {
    const response = await axios.post(`${API}/api/auth/login`, formData);
    localStorage.setItem('token', response.data.token);
    setUser(response.data.user);
    return response;
  };

  const forgotPassword = async (email) => {
    return await axios.post(`${API}/api/auth/forgot-password`, { email });
  };

  const resetPassword = async (token, password) => {
    return await axios.post(`${API}/api/auth/reset-password/${token}`, { password });
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    setUser(null);
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        register,
        login,
        forgotPassword,
        resetPassword,
        logout,
      
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
