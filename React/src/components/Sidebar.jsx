import { useState } from "react";
import Logo from "../assets/logo.png";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from "../utils/swalConfig";

const Sidebar = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // ✅ State

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to log out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, log me out!",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    });
  };

  const activeClass = "bg-[#DAF17D] text-black";
  const normalClass = "hover:bg-[#DAF17D] text-black";

  return (
    <>
      {/* ✅ Hamburger Button */}
      <button
        onClick={() => setIsSidebarOpen(true)}
        className="md:hidden p-4 fixed top-4 left-4 z-50"
      >
        <i className="fa-solid fa-bars text-2xl"></i>
      </button>

      {/* ✅ Overlay - Click to close */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
        ></div>
      )}

      {/* ✅ Sidebar with dynamic classes */}
      <aside
        className={`flex flex-col w-64 md:w-20 xl:w-64 bg-[#FFFCFB] rounded-[2rem] p-4 m-[1rem] md:sticky md:top-[1rem] md:h-[94vh] fixed top-0 left-0 h-full z-40 md:relative transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        {/* ✅ Close button (mobile only) */}
        <button
          onClick={() => setIsSidebarOpen(false)}
          className="md:hidden absolute top-4 right-4 text-xl"
        >
          <i className="fa-solid fa-xmark"></i>
        </button>

        <div className="flex items-center w-full">
          <img src={Logo} className="mb-5 w-[50%] mx-auto" alt="Logo" />
        </div>

        <nav className="space-y-1 text-sm">
          {/* Dashboard */}
          <NavLink
            to="/"
            onClick={() => setIsSidebarOpen(false)} // ✅ Close on click
            className={({ isActive }) =>
              `w-full flex items-center gap-3 p-[0.8rem] rounded-[2rem] ${
                isActive ? activeClass : normalClass
              }`
            }
          >
            <i className="fa-regular fa-house"></i>
            <span className="hidden xl:inline">Dashboard</span>
          </NavLink>

          {/* Exercises */}
          <NavLink
            to="/exercises"
            onClick={() => setIsSidebarOpen(false)}
            className={({ isActive }) =>
              `w-full flex items-center gap-3 p-[0.8rem] rounded-[2rem] ${
                isActive ? activeClass : normalClass
              }`
            }
          >
            <i className="fa-solid fa-dumbbell"></i>
            <span className="hidden xl:inline">Exercises</span>
          </NavLink>

          {/* Schedule */}
          <NavLink
            to="/schedule"
            onClick={() => setIsSidebarOpen(false)}
            className={({ isActive }) =>
              `w-full flex items-center gap-3 p-[0.8rem] rounded-[2rem] ${
                isActive ? activeClass : normalClass
              }`
            }
          >
            <i className="fa-solid fa-calendar"></i>
            <span className="hidden xl:inline">Schedule</span>
          </NavLink>

          {/* Progress */}
          <NavLink
            to="/progress"
            onClick={() => setIsSidebarOpen(false)}
            className={({ isActive }) =>
              `w-full flex items-center gap-3 p-[0.8rem] rounded-[2rem] ${
                isActive ? activeClass : normalClass
              }`
            }
          >
            <i className="fa-solid fa-person-running"></i>
            <span className="hidden xl:inline">Progress</span>
          </NavLink>

          {/* Meal Plan */}
          <NavLink
            to="/mealplan"
            onClick={() => setIsSidebarOpen(false)}
            className={({ isActive }) =>
              `w-full flex items-center gap-3 p-[0.8rem] rounded-[2rem] ${
                isActive ? activeClass : normalClass
              }`
            }
          >
            <i className="fa-solid fa-bowl-rice"></i>
            <span className="hidden xl:inline">Meal Plan</span>
          </NavLink>

          {/* Edit Profile */}
          <NavLink
            to="/edit-profile"
            onClick={() => setIsSidebarOpen(false)}
            className={({ isActive }) =>
              `w-full flex items-center gap-3 p-[0.8rem] rounded-[2rem] ${
                isActive ? activeClass : normalClass
              }`
            }
          >
            <i className="fa-solid fa-user-pen"></i>
            <span className="hidden xl:inline">Edit Profile</span>
          </NavLink>

          {/* Logout */}
          <button
            onClick={() => {
              setIsSidebarOpen(false);
              handleLogout();
            }}
            className="w-full flex items-center gap-3 p-[0.8rem] rounded-[2rem] hover:bg-[#DAF17D] text-black transition ease duration-300"
          >
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
            <span className="hidden xl:inline">Logout</span>
          </button>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
