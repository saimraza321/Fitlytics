import Logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; // Import SweetAlert2

const Sidebar = () => {
  const navigate = useNavigate(); // Hook for navigation

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
        // Proceed with the logout process
        localStorage.removeItem("token");
        navigate("/login");
      }
    });
  };

  return (
    <>
      <button
        id="hamburgerBtn"
        className="md:hidden p-4 fixed top-4 left-4 z-50"
      >
        <i className="fa-solid fa-bars text-2xl"></i>
      </button>

      <div id="overlay" className="fixed inset-0 bg-black/50 hidden z-40"></div>

      <aside
        id="sidebar"
        className="hidden xl:flex md:flex-col md:w-20 xl:w-64 bg-[#FFFCFB] rounded-[2rem] p-4 m-[1rem] md:sticky md:top-[1rem] md:h-[94vh] fixed top-0 left-0 h-full z-40 md:relative -translate-x-full md:translate-x-0 transition-all duration-300"
      >
        <div className="flex items-center w-full">
          <img src={Logo} className="mb-5 w-[60%] mx-auto" />
        </div>

        <nav className="space-y-1 text-sm">
          <a
            href="index.html"
            className="w-full flex items-center gap-3 p-[0.8rem] rounded-[2rem] hover:bg-[#DAF17D] text-black transition ease duration-300"
          >
            <i className="fa-regular fa-house"></i>
            <span className="hidden xl:inline">Dashboard</span>
          </a>

          <a
            href="/exercises"
            className="w-full flex items-center gap-3 p-[0.8rem] rounded-[2rem] hover:bg-[#DAF17D] text-black transition ease duration-300"
          >
            <i className="fa-solid fa-dumbbell"></i>
            <span className="hidden xl:inline">Exercises</span>
          </a>

          <a
            href="schedule"
            className="w-full flex items-center gap-3 p-[0.8rem] rounded-[2rem] bg-[#DAF17D] text-black transition ease duration-300"
          >
            <i className="fa-solid fa-calendar"></i>
            <span className="hidden xl:inline">Schedule</span>
          </a>

          <a
            href="progress"
            className="w-full flex items-center gap-3 p-[0.8rem] rounded-[2rem] hover:bg-[#DAF17D] text-black transition ease duration-300"
          >
            <i className="fa-solid fa-person-running"></i>
            <span className="hidden xl:inline">Progress</span>
          </a>

          <a
            href="mealplan"
            className="w-full flex items-center gap-3 p-[0.8rem] rounded-[2rem] hover:bg-[#DAF17D] text-black transition ease duration-300"
          >
            <i className="fa-solid fa-bowl-rice"></i>
            <span className="hidden xl:inline">Meal Plan</span>
          </a>

          <button
            onClick={handleLogout}
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
