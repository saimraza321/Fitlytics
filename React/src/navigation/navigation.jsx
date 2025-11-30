import { BrowserRouter, Routes, Route } from "react-router-dom";

import Homepage from "../pages/HomeScreen";
import ExcercisePage from "../pages/ExercisesScreen";
import SchedulePage from "../pages/ScheduleScreen";
import ProgressPage from "../pages/ProgressScreen";
import MealPlanPage from "../pages/MealPlanScreen";
import LoginPage from "../pages/Auth/LoginScreen";
import RegisterPage from "../pages/Auth/RegisterScreen";
import ResetPasswordPage from "../pages/Auth/ResetPasswordPage";
import ForgotPasswordPage from "../pages/Auth/ForgotPasswordScreen";
import ProtectedRoute from "../components/ProtectedRoute"; // import the component

function Navigation() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Protected Routes */}
        <Route
          path="/"
          exact
          element={
            <ProtectedRoute>
              <Homepage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/exercises"
          exact
          element={
            <ProtectedRoute>
              <ExcercisePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/schedule"
          exact
          element={
            <ProtectedRoute>
              <SchedulePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/progress"
          exact
          element={
            <ProtectedRoute>
              <ProgressPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/mealplan"
          exact
          element={
            <ProtectedRoute>
              {" "}
              <MealPlanPage />{" "}
            </ProtectedRoute>
          }
        />

        {/* Public Routes */}
        <Route path="/login" exact element={<LoginPage />} />
        <Route path="/register" exact element={<RegisterPage />} />
        <Route path="/forgot-password" exact element={<ForgotPasswordPage />} />
        <Route path="/reset-password" exact element={<ResetPasswordPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Navigation;
