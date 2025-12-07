import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token"); // get token from URL

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Passwords do not match!",
      });
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:3000/users/reset-password",
        {
          token,
          newPassword: password,
        }
      );

      Swal.fire({
        icon: "success",
        title: "Success",
        text: res.data.message,
        confirmButtonColor: "#8BC34A",
      }).then(() => {
        navigate("/login"); // redirect to login
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Something went wrong!",
      });
    }
  };

  return (
    <>
      <div className="text-center mb-8">
        <img src="logo.png" className="w-32 mx-auto mb-4" alt="Fit Logo" />
        <h1 className="text-3xl font-bold text-slate-900">Reset Password?</h1>
        <p className="text-sm text-slate-500 mt-2">Reset your password here</p>
      </div>

      <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              New Password
            </label>
            <input
              type="password"
              placeholder="Enter your new password"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label className="block text-sm font-medium text-slate-700 mb-2 mt-3">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Confirm your new password"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#DAF17D] hover:bg-[#c5d96e] text-slate-900 font-semibold py-3 rounded-xl transition duration-300"
          >
            Reset Password
          </button>
        </form>
      </div>
    </>
  );
};

export default ResetPassword;
