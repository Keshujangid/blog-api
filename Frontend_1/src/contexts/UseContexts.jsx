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

  useEffect(() => {
    const token = localStorage.getItem("token"); 

    if (token) {
      const verifyToken = async () => {
        try {
          const response = await axios.post("/auth/verify-token", { token });
          // console.log(response.data);
          if (response.status === 200) {
            console.log(auth)
            setAuth({ isAuthenticated: true, token, user: response.data.user });
            
          } else {
            localStorage.removeItem("token"); 
            setAuth({ isAuthenticated: false, token: null, user: null });
          }
        } catch (err) {
          console.error(err);
          localStorage.removeItem("token"); 
          setAuth({ isAuthenticated: false, token: null, user: null });
        } finally {
          setIsLoading(false); 
        }
      };

      verifyToken();
    } else {
      setAuth({ isAuthenticated: false, token: null, user: null });
      setIsLoading(false); 
      <Navigate to="/login" />;
    }
  },[]);

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
