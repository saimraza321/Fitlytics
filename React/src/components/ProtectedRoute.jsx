import { Navigate } from "react-router-dom";
import jwt_decode from "jwt-decode"; // ✅ Default import use karo

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  // ✅ No token hai
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    // ✅ Token decode karo aur expiry check karo
    const decoded = jwt_decode(token); // ✅ Underscore wala use karo
    const currentTime = Date.now() / 1000; // seconds mein

    // ✅ Agar token expire ho gaya
    if (decoded.exp < currentTime) {
      console.log("Token expired, removing...");
      localStorage.removeItem("token"); // ✅ Remove token
      return <Navigate to="/login" replace />;
    }

    // ✅ Token valid hai
    return children;
  } catch (error) {
    // ✅ Agar token invalid/corrupted hai
    console.error("Invalid token:", error);
    localStorage.removeItem("token");
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedRoute;
