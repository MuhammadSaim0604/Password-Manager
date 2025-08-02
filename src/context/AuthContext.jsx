import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Set axios defaults and verify token on initial load
  useEffect(() => {
    const verifyToken = async () => {
      try {
        if (token) {
          // Verify token structure before making requests
          const decoded = jwtDecode(token);
          if (!decoded.userId || !decoded.exp) {
            throw new Error('Invalid token structure');
          }

          // Check if token is expired
          if (decoded.exp * 1000 < Date.now()) {
            throw new Error('Token expired');
          }

          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          
          // Verify token with backend
          const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/auth/verify`);
          setUser(res.data.user);
        }
      } catch (err) {
        console.error('Token verification failed:', err.message);
        logout();
        setError('Session expired. Please login again.');
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, [token]);

  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/login`, { email, password });
      
      localStorage.setItem('token', res.data.token);
      setToken(res.data.token);
      setUser(res.data.user);
      axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
      
      return { success: true };
    } catch (err) {
      console.error('Login failed:', err.response?.data?.message || err.message);
      setError(err.response?.data?.message || 'Login failed. Please try again.');
      return { success: false, error: err.response?.data?.message };
    } finally {
      setLoading(false);
    }
  };

// Update the signup function in AuthContext.jsx
const signup = async (email, password, name) => {
  try {
    setLoading(true);
    setError(null);
    const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/signup`, { 
      email, 
      password,
      name // Include name in the signup request
    });
    
    localStorage.setItem('token', res.data.token);
    setToken(res.data.token);
    setUser(res.data.user);
    axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
    
    return { success: true };
  } catch (err) {
    console.error('Signup failed:', err.response?.data?.message || err.message);
    setError(err.response?.data?.message || 'Signup failed. Please try again.');
    return { success: false, error: err.response?.data?.message };
  } finally {
    setLoading(false);
  }
};

  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setToken(null);
    setUser(null);
    setError(null);
  };

  const value = {
    user,
    setUser,
    token,
    loading,
    error,
    login,
    signup,
    logout,
    setError
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};