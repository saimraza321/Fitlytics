import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const Progress = () => {
  const [stats, setStats] = useState(null);
  const [weeklyData, setWeeklyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState(30); // 7 or 30 days

  // Fetch progress stats
  const fetchStats = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        `http://localhost:3000/progress/stats?days=${selectedPeriod}`
      );

      setStats(response.data.data);
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to load progress data",
      });
    } finally {
      setLoading(false);
    }
  };

  // Fetch weekly data for chart
  const fetchWeeklyData = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/progress/weekly`);

      setWeeklyData(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchStats();
    fetchWeeklyData();
  }, [selectedPeriod]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl text-slate-600">Loading progress...</div>
      </div>
    );
  }

  return (
    <>
      <main className="flex-1 p-4 xl:p-6 overflow-y-scroll">
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">
              My Progress
            </h1>
            <p className="text-sm text-slate-400">Track your fitness journey</p>
          </div>
          <div className="flex gap-2 mt-3 sm:mt-0">
            <button
              onClick={() => setSelectedPeriod(7)}
              className={`px-4 py-2 rounded-xl text-sm ${
                selectedPeriod === 7
                  ? "bg-[#DAF17D] font-medium"
                  : "bg-white border border-slate-200 hover:bg-slate-50"
              }`}
            >
              Last 7 Days
            </button>
            <button
              onClick={() => setSelectedPeriod(30)}
              className={`px-4 py-2 rounded-xl text-sm ${
                selectedPeriod === 30
                  ? "bg-[#DAF17D] font-medium"
                  : "bg-white border border-slate-200 hover:bg-slate-50"
              }`}
            >
              Last 30 Days
            </button>
          </div>
        </header>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {/* Calories Burned */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-3">
              <div className="h-10 w-10 rounded-xl bg-red-100 flex items-center justify-center">
                <i className="fa-solid fa-fire text-red-600"></i>
              </div>
            </div>
            <p className="text-2xl font-semibold text-slate-900 mb-1">
              {stats?.totalCaloriesBurned || 0}
            </p>
            <p className="text-xs text-slate-400">Calories Burned</p>
          </div>

          {/* Calories Consumed */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-3">
              <div className="h-10 w-10 rounded-xl bg-green-100 flex items-center justify-center">
                <i className="fa-solid fa-utensils text-green-600"></i>
              </div>
            </div>
            <p className="text-2xl font-semibold text-slate-900 mb-1">
              {stats?.totalCaloriesConsumed || 0}
            </p>
            <p className="text-xs text-slate-400">Calories Consumed</p>
          </div>

          {/* Workouts Completed */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-3">
              <div className="h-10 w-10 rounded-xl bg-sky-100 flex items-center justify-center">
                <i className="fa-solid fa-dumbbell text-sky-600"></i>
              </div>
            </div>
            <p className="text-2xl font-semibold text-slate-900 mb-1">
              {stats?.workoutsCompleted || 0}
            </p>
            <p className="text-xs text-slate-400">Workouts Completed</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-4 mb-6">
          {/* Weekly Calories Chart */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">
                  Weekly Calories Burned
                </h3>
                <p className="text-xs text-slate-400">Last 4 weeks</p>
              </div>
            </div>
            <div className="flex items-end justify-between h-48">
              <div className="flex-1 flex justify-between items-end gap-1">
                {weeklyData.length > 0 ? (
                  weeklyData.map((week, index) => {
                    const maxCalories = Math.max(
                      ...weeklyData.map((w) => w.calories)
                    );
                    const heightPercentage =
                      maxCalories > 0
                        ? (week.calories / maxCalories) * 100
                        : 20;

                    return (
                      <div
                        key={index}
                        className="flex flex-col items-center gap-1 flex-1"
                      >
                        <div
                          className="w-full rounded-t-lg bg-lime-400"
                          style={{
                            height: `${Math.max(heightPercentage, 20)}%`,
                          }}
                        ></div>
                        <span className="text-[9px] text-slate-400">
                          {week.week}
                        </span>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-sm text-slate-400">No data available</p>
                )}
              </div>
            </div>
          </div>

          {/* Workout Types Distribution */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">
                  Workout Types
                </h3>
                <p className="text-xs text-slate-400">
                  Distribution this period
                </p>
              </div>
            </div>

            <div className="flex items-center justify-center my-6">
              <div className="relative h-40 w-40">
                {/* Background circle */}
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  {/* Render pie slices */}
                  {stats?.workoutDistribution?.length > 0 ? (
                    (() => {
                      let currentAngle = 0;
                      const colors = [
                        "#a3e635",
                        "#38bdf8",
                        "#fbbf24",
                        "#c084fc",
                        "#ec4899",
                        "#818cf8",
                      ];

                      return stats.workoutDistribution.map((workout, index) => {
                        const percentage = parseFloat(workout.percentage);
                        const angle = (percentage / 100) * 360;

                        // Calculate arc path
                        const startAngle = currentAngle;
                        const endAngle = currentAngle + angle;
                        currentAngle = endAngle;

                        const startX =
                          50 + 40 * Math.cos((Math.PI * startAngle) / 180);
                        const startY =
                          50 + 40 * Math.sin((Math.PI * startAngle) / 180);
                        const endX =
                          50 + 40 * Math.cos((Math.PI * endAngle) / 180);
                        const endY =
                          50 + 40 * Math.sin((Math.PI * endAngle) / 180);

                        const largeArc = angle > 180 ? 1 : 0;

                        const pathData = [
                          `M 50 50`,
                          `L ${startX} ${startY}`,
                          `A 40 40 0 ${largeArc} 1 ${endX} ${endY}`,
                          `Z`,
                        ].join(" ");

                        return (
                          <path
                            key={index}
                            d={pathData}
                            fill={colors[index % colors.length]}
                            stroke="white"
                            strokeWidth="0.5"
                          />
                        );
                      });
                    })()
                  ) : (
                    <circle cx="50" cy="50" r="40" fill="#f1f5f9" />
                  )}

                  {/* Center white circle */}
                  <circle cx="50" cy="50" r="28" fill="white" />
                </svg>

                {/* Center text */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-2xl font-semibold text-slate-900">
                      {stats?.workoutsCompleted || 0}
                    </p>
                    <p className="text-[10px] text-slate-400">Sessions</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="grid grid-cols-2 gap-3">
              {stats?.workoutDistribution?.length > 0 ? (
                stats.workoutDistribution.map((workout, index) => {
                  const colors = [
                    "bg-lime-400",
                    "bg-sky-400",
                    "bg-amber-400",
                    "bg-purple-400",
                    "bg-pink-400",
                    "bg-indigo-400",
                  ];
                  return (
                    <div key={index} className="flex items-center gap-2">
                      <div
                        className={`h-3 w-3 rounded-full flex-shrink-0 ${
                          colors[index % colors.length]
                        }`}
                      ></div>
                      <div className="min-w-0">
                        <p className="text-xs font-medium text-slate-900 truncate">
                          {workout.type}
                        </p>
                        <p className="text-[10px] text-slate-400">
                          {workout.percentage}% • {workout.count}{" "}
                          {workout.count === 1 ? "session" : "sessions"}
                        </p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-sm text-slate-400 col-span-2 text-center">
                  No workout data
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Net Calories Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">
            Calorie Balance
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <p className="text-xs text-slate-400">Consumed</p>
              <p className="text-2xl font-semibold text-green-600">
                +{stats?.totalCaloriesConsumed || 0}
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-400">Burned</p>
              <p className="text-2xl font-semibold text-red-600">
                -{stats?.totalCaloriesBurned || 0}
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-400">Net Balance</p>
              <p
                className={`text-2xl font-semibold ${
                  (stats?.netCalories || 0) > 0
                    ? "text-orange-600"
                    : "text-blue-600"
                }`}
              >
                {(stats?.netCalories || 0) > 0 ? "+" : ""}
                {stats?.netCalories || 0}
              </p>
            </div>
          </div>
          <p className="text-xs text-slate-400 mt-3">
            {(stats?.netCalories || 0) > 0
              ? "Calorie surplus - You consumed more than you burned"
              : "Calorie deficit - You burned more than you consumed"}
          </p>
        </div>
      </main>
    </>
  );
};

export default Progress;
