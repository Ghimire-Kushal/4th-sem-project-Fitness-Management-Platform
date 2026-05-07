import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  // If token doesn't exist
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If token exists
  return children;
};

export default ProtectedRoute;