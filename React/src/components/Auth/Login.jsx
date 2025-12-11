import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { GoogleLogin } from "@react-oauth/google";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:3000/users/login",
        formData
      );

      console.log("Login Success:", res.data);

      // If backend returns a token, save it (optional)
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }

      Swal.fire({
        icon: "success",
        title: "Login Successful!",
        text: "Welcome back to Fitlytics 💪",
        confirmButtonColor: "#8BC34A",
      }).then(() => {
        navigate("/"); // change to your dashboard route
      });
    } catch (error) {
      const msg = error.response?.data?.message || "Invalid email or password";

      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: msg,
      });
    }
  };

  // Google Login Success Handler
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const res = await axios.post("http://localhost:3000/users/google-login", {
        token: credentialResponse.credential,
      });

      console.log("Google Login Success:", res.data);

      // Token save karo
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }

      Swal.fire({
        icon: "success",
        title: "Login Successful!",
        text: "Welcome to Fitlytics 💪",
        confirmButtonColor: "#8BC34A",
      }).then(() => {
        navigate("/");
      });
    } catch (error) {
      const msg = error.response?.data?.message || "Google login failed";
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: msg,
      });
    }
  };

  // Google Login Error Handler
  const handleGoogleError = () => {
    Swal.fire({
      icon: "error",
      title: "Login Failed",
      text: "Google login was unsuccessful",
    });
  };

  return (
    <>
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <img src="logo.png" className="w-32 mx-auto mb-4" alt="Fit Logo" />
          <h1 className="text-3xl font-bold text-slate-900">Welcome Back</h1>
          <p className="text-sm text-slate-500 mt-2">
            Log in to continue your fitness journey
          </p>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
          <form id="loginForm" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent"
                required
              />
            </div>

            <div className="flex items-center justify-between mb-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  id="remember"
                  className="w-4 h-4 text-lime-400 border-slate-300 rounded focus:ring-lime-400"
                />
                <span className="text-sm text-slate-600">Remember me</span>
              </label>
              <a
                href="forgot-password"
                className="text-sm text-lime-600 hover:underline"
              >
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-[#DAF17D] hover:bg-[#c5d96e] text-slate-900 font-semibold py-3 rounded-xl transition duration-300"
            >
              Login
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-2 bg-white text-slate-400">OR</span>
            </div>
          </div>

          {/* <div className="space-y-3">
            <button
              type="button"
              className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition duration-300"
            >
              <i className="fa-brands fa-google text-red-500"></i>
              <span className="text-sm font-medium text-slate-700">
                Continue with Google
              </span>
            </button>
          </div> */}

          {/* Google Login Button - YAHAN UPDATE HAI */}
          <div className="space-y-3">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              theme="outline"
              size="large"
              text="continue_with"
              shape="rectangular"
              width="100%"
            />
          </div>

          <div className="text-center mt-6">
            <p className="text-sm text-slate-600">
              Don't have an account?
              <a
                href="register"
                className="text-lime-600 font-semibold hover:underline"
              >
                Register here
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
