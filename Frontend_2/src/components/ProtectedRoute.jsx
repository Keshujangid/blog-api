import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/UseContexts";
import { ScaleLoader } from "react-spinners";
// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children }) => {

  const { auth, isLoading } = useContext(AuthContext);
  
  
  if (isLoading) {
    return <div className="h-screen w-screen flex justify-center items-center"><ScaleLoader/></div>; // Optional: Replace with a loading spinner
  }
  // Redirect to login if not authenticated
  if (!auth.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Render the protected component if authenticated
  return children;
};

export default ProtectedRoute;
