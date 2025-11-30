import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Password match check
    if (formData.password !== formData.confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Password mismatch",
        text: "Your passwords do not match!",
      });
      return;
    }

    try {
      const res = await axios.post("http://localhost:3000/users/signup", {
        username: formData.fullname,
        email: formData.email,
        password: formData.password,
      });

      console.log("Signup Success:", res.data);

      Swal.fire({
        icon: "success",
        title: "Account created!",
        text: "Your account has been successfully created.",
        confirmButtonColor: "#8BC34A",
      }).then(() => {
        navigate("/login");
      });
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Something went wrong while signing up!";

      Swal.fire({
        icon: "error",
        title: "Signup Failed",
        text: message,
      });
    }
  };

  return (
    <>
      <div className="text-center mb-8">
        <img src="logo.png" className="w-32 mx-auto mb-4" alt="Fit Logo" />
        <h1 className="text-3xl font-bold text-slate-900">Create Account</h1>
        <p className="text-sm text-slate-500 mt-2">
          Start your fitness journey today
        </p>
      </div>

      <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
        <form id="registerForm" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              id="fullname"
              placeholder="Enter your full name"
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent"
              required
            />
          </div>

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
              placeholder="Create a password"
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Re-enter your password"
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#DAF17D] hover:bg-[#c5d96e] text-slate-900 font-semibold py-3 rounded-xl transition duration-300"
          >
            Create Account
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

        <div className="space-y-3">
          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition duration-300"
          >
            <i className="fa-brands fa-google text-red-500"></i>
            <span className="text-sm font-medium text-slate-700">
              Continue with Google
            </span>
          </button>
        </div>

        <div className="text-center mt-6">
          <p className="text-sm text-slate-600">
            Already have an account?
            <a
              href="login"
              className="text-lime-600 font-semibold hover:underline"
            >
              Login here
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
