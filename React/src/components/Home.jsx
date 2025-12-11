import { useState, useEffect } from "react";
import axios from "axios";

const API_BASE = "http://localhost:3000";

const Home = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [user, setUser] = useState({ fullname: "", initials: "" }); // ✅ For user name
  const [loading, setLoading] = useState(true);

  // ✅ Get token from localStorage
  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return {
      Authorization: `Bearer ${token}`,
    };
  };

  // Fetch dashboard data
  const fetchDashboard = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE}/dashboard`, {
        headers: getAuthHeaders(),
      });
      setDashboardData(response.data.data);
    } catch (error) {
      console.error("❌ Error fetching dashboard:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch user profile
  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(`${API_BASE}/users/profile`, {
        headers: getAuthHeaders(),
      });
      const fullname = response.data.fullname || "";
      const initials = fullname
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase();
      setUser({ fullname, initials });
    } catch (error) {
      console.error("❌ Error fetching user profile:", error);
      setUser({ fullname: "", initials: "" });
    }
  };

  useEffect(() => {
    fetchUserProfile();
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-[#EFEFF1]">
        <div className="text-xl text-slate-600">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <>
      <main className="flex-1 flex flex-col xl:flex-row gap-4 p-4 xl:p-6 bg-[#EFEFF1] overflow-y-scroll">
        <section className="flex-1 flex flex-col gap-4">
          <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs text-slate-400">
                Hello, {user.fullname || "Wingman"}! 👋
              </p>
              <h1 className="text-2xl font-semibold text-slate-900">
                Let's get your workout started.
              </h1>
            </div>
          </header>

          {/* Today's Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Calories Burnt */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs uppercase tracking-wide text-slate-400">
                  Calories Burnt
                </p>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-lime-100 text-lime-700">
                  Today
                </span>
              </div>
              <p className="text-2xl font-semibold text-slate-900">
                {dashboardData?.today?.caloriesBurned || 0}
              </p>
              <p className="text-xs text-slate-400 mb-2">kcal burned</p>
              <div className="h-10 rounded-lg bg-gradient-to-r from-lime-200/60 to-sky-100 flex items-end overflow-hidden">
                {dashboardData?.weeklyActivity?.map((day, index) => {
                  const maxCalories = Math.max(
                    ...dashboardData.weeklyActivity.map((d) => d.calories),
                    1
                  );
                  const height = (day.calories / maxCalories) * 100;
                  return (
                    <div
                      key={index}
                      className="w-1/7 bg-lime-400 rounded-t-md mx-0.5"
                      style={{ height: `${Math.max(height, 10)}%` }}
                    ></div>
                  );
                })}
              </div>
            </div>

            {/* Calories Consumed */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs uppercase tracking-wide text-slate-400">
                  Calories Consumed
                </p>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-sky-100 text-sky-700">
                  Today
                </span>
              </div>
              <p className="text-2xl font-semibold text-slate-900">
                {dashboardData?.today?.caloriesConsumed || 0}
              </p>
              <p className="text-xs text-slate-400 mb-2">kcal consumed</p>
            </div>
          </div>

          {/* Weekly Activity & Progress */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
            {/* Weekly Activity Chart */}
            <div className="xl:col-span-2 bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    Weekly Activity
                  </p>
                  <p className="text-xs text-slate-400">
                    How much calories you've burnt this week
                  </p>
                </div>
              </div>
              <div className="flex items-end justify-between h-40">
                <div className="flex-1 flex justify-between items-end">
                  {dashboardData?.weeklyActivity?.map((day, index) => {
                    const maxCalories = Math.max(
                      ...dashboardData.weeklyActivity.map((d) => d.calories),
                      1
                    );
                    const height = (day.calories / maxCalories) * 100;
                    const colors =
                      day.workouts > 0 ? "bg-lime-400" : "bg-slate-200";

                    return (
                      <div
                        key={index}
                        className="flex flex-col items-center gap-1"
                      >
                        <div
                          className={`w-6 rounded-lg ${colors}`}
                          style={{ height: `${Math.max(height, 20)}px` }}
                        ></div>
                        <span className="text-[10px] text-slate-400">
                          {day.day}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Progress Circle */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex flex-col">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-semibold text-slate-900">Progress</p>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-lime-100 text-lime-700">
                  This week
                </span>
              </div>
              <div className="flex items-center justify-center my-4">
                <div className="relative h-32 w-32">
                  <svg
                    className="w-full h-full -rotate-90"
                    viewBox="0 0 100 100"
                  >
                    {/* Background circle */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#f1f5f9"
                      strokeWidth="10"
                    />
                    {/* Progress circle */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#a3e635"
                      strokeWidth="10"
                      strokeDasharray={`${
                        (dashboardData?.workoutProgress?.overall || 0) * 2.51
                      } 251`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-xl font-semibold text-slate-900">
                        {dashboardData?.workoutProgress?.overall || 0}%
                      </p>
                      <p className="text-[10px] text-slate-400">Weekly goal</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-2 text-xs">
                {dashboardData?.workoutProgress?.types
                  ?.slice(0, 3)
                  .map((workout, index) => {
                    const colors = [
                      "bg-lime-400",
                      "bg-sky-400",
                      "bg-amber-400",
                    ];
                    return (
                      <div
                        key={index}
                        className="flex justify-between items-center"
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className={`h-2 w-2 rounded-full ${colors[index]}`}
                          ></span>
                          <span className="truncate">{workout.type}</span>
                        </div>
                        <span className="font-medium text-slate-700">
                          {workout.percentage}%
                        </span>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </section>

        {/* Sidebar */}
        <aside className="w-full xl:w-80 flex flex-col gap-4">
          {/* User Profile */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-lime-300 to-sky-300 flex items-center justify-center font-semibold text-slate-800">
                {user.initials || "KW"} {/* ✅ Dynamic initials */}
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  {user.fullname || "Kalendra Wingman"}{" "}
                  {/* ✅ Dynamic full name */}
                </p>
                <p className="text-[11px] text-slate-400">Advanced • 1 yr</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-center text-[11px]">
              <div className="rounded-xl bg-slate-50 p-2">
                <p className="text-[10px] text-slate-400 uppercase tracking-wide">
                  Height
                </p>
                <p className="font-semibold text-slate-900">175 cm</p>
              </div>
              <div className="rounded-xl bg-slate-50 p-2">
                <p className="text-[10px] text-slate-400 uppercase tracking-wide">
                  Age
                </p>
                <p className="font-semibold text-slate-900">29 yrs</p>
              </div>
            </div>
          </div>

          {/* Today's Schedule */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-semibold text-slate-900">
                My Schedule
              </p>
              <a
                href="/schedule"
                className="text-xs text-sky-600 hover:underline"
              >
                View All
              </a>
            </div>
            <div className="space-y-2 text-xs">
              {dashboardData?.todaySchedule?.length > 0 ? (
                dashboardData.todaySchedule.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start justify-between p-2 rounded-xl bg-slate-50"
                  >
                    <div>
                      <p className="font-semibold text-slate-800">
                        {item.title}
                      </p>
                      <p className="text-[11px] text-slate-400">
                        Today • {item.time}
                      </p>
                    </div>
                    <span
                      className={`mt-0.5 h-2 w-2 rounded-full ${
                        item.status === "completed"
                          ? "bg-lime-400"
                          : "bg-sky-400"
                      }`}
                    ></span>
                  </div>
                ))
              ) : (
                <p className="text-slate-400 text-center py-4">
                  No schedule for today
                </p>
              )}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex-1">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-semibold text-slate-900">
                Recent Activity
              </p>
            </div>
            <div className="space-y-2 text-xs">
              {dashboardData?.recentActivity?.length > 0 ? (
                dashboardData.recentActivity.map((activity, index) => {
                  const colors = ["bg-lime-400", "bg-sky-400", "bg-amber-400"];
                  return (
                    <div key={index} className="flex gap-2 items-start">
                      <div
                        className={`mt-1 h-2 w-2 rounded-full ${colors[index]}`}
                      ></div>
                      <div>
                        <p className="font-semibold text-slate-800">
                          Completed {activity.title}
                        </p>
                        <p className="text-[11px] text-slate-400">
                          {activity.date} • {activity.time}
                        </p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-slate-400 text-center py-4">
                  No recent activity
                </p>
              )}
            </div>
          </div>
        </aside>
      </main>
    </>
  );
};

export default Home;
