import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Homepage from "../pages/HomeScreen";
import ExcercisePage from "../pages/ExercisesScreen";
import SchedulePage from "../pages/ScheduleScreen";
import ProgressPage from "../pages/ProgressScreen";
import MealPlanPage from "../pages/MealPlanScreen";
import LoginPage from "../pages/Auth/LoginScreen";
import Register from "../components/Auth/Register";
import RegisterPage from "../pages/Auth/RegisterScreen";
import ResetPasswordPage from "../pages/Auth/ResetPasswordPage";
import ForgotPasswordPage from "../pages/Auth/ForgotPasswordScreen";

function Navigation() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Homepage />} />
        <Route path="/exercises" exact element={<ExcercisePage />} />
        <Route path="/schedule" exact element={<SchedulePage />} />
        <Route path="/progress" exact element={<ProgressPage />} />
        <Route path="/mealplan" exact element={<MealPlanPage />} />
        <Route path="/login" exact element={<LoginPage />} />
        <Route path="/register" exact element={<RegisterPage />} />
        <Route path="/forgot-password" exact element={<ForgotPasswordPage />} />
        <Route path="/reset-password" exact element={<ResetPasswordPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Navigation;
