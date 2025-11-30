import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />; // redirect if not logged in
  }

  return children; // show the page if logged in
};

export default ProtectedRoute;
