import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

import Homepage from "../pages/HomeScreen";
import ExcercisePage from "../pages/ExercisesScreen";
import SchedulePage from "../pages/ScheduleScreen";
import ProgressPage from "../pages/ProgressScreen";
import MealPlanPage from "../pages/MealPlanScreen";
import LoginPage from "../pages/Auth/LoginScreen";
import RegisterPage from "../pages/Auth/RegisterScreen";
import ResetPasswordPage from "../pages/Auth/ResetPasswordPage";
import ForgotPasswordPage from "../pages/Auth/ForgotPasswordScreen";
import ProtectedRoute from "../components/ProtectedRoute";
import ProfilePage from "../pages/ProfileScreen";

function Navigation() {
  return (
    <GoogleOAuthProvider clientId="1041653961812-vlaae69tv06kkl2rgdo0qt4kfkt3uoj8.apps.googleusercontent.com">
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Homepage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/exercises"
            element={
              <ProtectedRoute>
                <ExcercisePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/schedule"
            element={
              <ProtectedRoute>
                <SchedulePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/progress"
            element={
              <ProtectedRoute>
                <ProgressPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/mealplan"
            element={
              <ProtectedRoute>
                <MealPlanPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit-profile"
            exact
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default Navigation;
