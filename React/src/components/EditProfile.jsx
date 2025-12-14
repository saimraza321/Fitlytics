import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "../utils/swalConfig";

const API_BASE = "http://localhost:3000";

const EditProfile = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(true);

  // Load Existing Data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No auth token found");

        const res = await axios.get(`${API_BASE}/users/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setFormData({
          fullname: res.data.fullname || "",
          email: res.data.email || "",
          password: "",
        });
      } catch (error) {
        console.error("Fetch profile error:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text:
            error.response?.data?.message ||
            error.response?.data?.error ||
            "Failed to load profile",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No auth token found");

      const res = await axios.put(
        `${API_BASE}/users/update-profile`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      Swal.fire({
        icon: "success",
        title: "Profile Updated!",
        text: "Your profile details have been saved successfully.",
        confirmButtonColor: "#8BC34A",
      });

      // ✅ Prefill again with latest data (optional)
      setFormData({
        fullname: res.data.fullname,
        email: res.data.email,
        password: "",
      });
    } catch (error) {
      console.error("Update profile error:", error);
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text:
          error.response?.data?.message ||
          error.response?.data?.error ||
          "Something went wrong.",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen w-full">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <main className="flex-1 flex flex-col gap-4 p-4 xl:p-6 bg-[#EFEFF1] overflow-y-scroll">
      <div className="w-full">
        <h1 className="text-3xl font-bold text-slate-900 text-center mb-2">
          Edit Profile
        </h1>
        <p className="text-center text-slate-500 mb-10">
          Update your personal details anytime
        </p>

        <div className="bg-white rounded-2xl p-10 shadow-sm border border-slate-100 w-full">
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Full Name */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-slate-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="fullname"
                value={formData.fullname}
                placeholder="Enter your full name"
                onChange={handleChange}
                className="px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-lime-400"
                required
              />
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-slate-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                placeholder="Enter your email"
                onChange={handleChange}
                className="px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-lime-400"
                required
              />
            </div>

            {/* Password */}
            <div className="flex flex-col md:col-span-2">
              <label className="text-sm font-medium text-slate-700 mb-2">
                New Password (optional)
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter new password"
                onChange={handleChange}
                className="px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-lime-400"
              />
            </div>

            {/* Save Button */}
            <div className="md:col-span-2 mt-4">
              <button
                type="submit"
                className="w-full bg-[#DAF17D] hover:bg-[#c5d96e] text-slate-900 font-semibold py-3 rounded-xl transition"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default EditProfile;
