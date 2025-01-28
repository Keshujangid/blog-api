/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from "../pages/api/axios";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    token: null,
    user: null, // Store user data if needed
  });
  const [isLoading, setIsLoading] = useState(true);

  // Check token validity on initial load
  useEffect(() => {
    const token = localStorage.getItem("token"); // Or retrieve from cookies

    if (token) {
      const verifyToken = async () => {
        try {
          const response = await axios.post("/auth/verify-token", { token });
          if (response.status === 200) {
            setAuth({ isAuthenticated: true, token, user: response.data.user });
            
          } else {
            localStorage.removeItem("token"); // Remove invalid token
            setAuth({ isAuthenticated: false, token: null, user: null });
          }
        } catch (err) {
          console.error(err);
          localStorage.removeItem("token"); // Remove invalid token on error
          setAuth({ isAuthenticated: false, token: null, user: null });
        } finally {
          setIsLoading(false); // Ensure loading state is updated
        }
      };

      verifyToken();
    } else {
      setAuth({ isAuthenticated: false, token: null, user: null });
      setIsLoading(false); // No token found, stop loading
      <Navigate to="/login" />;
    }
  }, []);

  const login = (token, user) => {
    localStorage.setItem("token", token);
    setAuth({ isAuthenticated: true, token, user });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setAuth({ isAuthenticated: false, token: null, user: null });
  };

  return (
    <AuthContext.Provider
      value={{ auth, setAuth, login, logout, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
