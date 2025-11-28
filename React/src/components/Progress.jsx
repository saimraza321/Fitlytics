const Progress = () => {
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
            <button className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-sm hover:bg-slate-50">
              Last 7 Days
            </button>
            <button className="px-4 py-2 rounded-xl bg-[#DAF17D] text-sm font-medium">
              Last 30 Days
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-3">
              <div className="h-10 w-10 rounded-xl bg-lime-100 flex items-center justify-center">
                <i className="fa-solid fa-fire text-lime-600"></i>
              </div>
              <span className="text-xs px-2 py-1 rounded-full bg-lime-100 text-lime-700">
                +12%
              </span>
            </div>
            <p className="text-2xl font-semibold text-slate-900 mb-1">2,450</p>
            <p className="text-xs text-slate-400">Total Calories Burned</p>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-3">
              <div className="h-10 w-10 rounded-xl bg-sky-100 flex items-center justify-center">
                <i className="fa-solid fa-dumbbell text-sky-600"></i>
              </div>
              <span className="text-xs px-2 py-1 rounded-full bg-sky-100 text-sky-700">
                +8%
              </span>
            </div>
            <p className="text-2xl font-semibold text-slate-900 mb-1">24</p>
            <p className="text-xs text-slate-400">Workouts Completed</p>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-3">
              <div className="h-10 w-10 rounded-xl bg-amber-100 flex items-center justify-center">
                <i className="fa-solid fa-clock text-amber-600"></i>
              </div>
              <span className="text-xs px-2 py-1 rounded-full bg-amber-100 text-amber-700">
                +15%
              </span>
            </div>
            <p className="text-2xl font-semibold text-slate-900 mb-1">18.5</p>
            <p className="text-xs text-slate-400">Hours Exercised</p>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-3">
              <div className="h-10 w-10 rounded-xl bg-purple-100 flex items-center justify-center">
                <i className="fa-solid fa-trophy text-purple-600"></i>
              </div>
              <span className="text-xs px-2 py-1 rounded-full bg-purple-100 text-purple-700">
                New!
              </span>
            </div>
            <p className="text-2xl font-semibold text-slate-900 mb-1">15</p>
            <p className="text-xs text-slate-400">Goals Achieved</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">
                  Weight Progress
                </h3>
                <p className="text-xs text-slate-400">Last 30 days</p>
              </div>
              <span className="text-sm font-medium text-lime-600">-2.5 kg</span>
            </div>
            <div className="flex items-end justify-between h-48">
              <div className="flex-1 flex justify-between items-end gap-1">
                <div className="flex flex-col items-center gap-1">
                  <div className="w-full rounded-t-lg bg-lime-200 h-32"></div>
                  <span className="text-[9px] text-slate-400">Week 1</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="w-full rounded-t-lg bg-lime-300 h-36"></div>
                  <span className="text-[9px] text-slate-400">Week 2</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="w-full rounded-t-lg bg-lime-400 h-40"></div>
                  <span className="text-[9px] text-slate-400">Week 3</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="w-full rounded-t-lg bg-lime-500 h-44"></div>
                  <span className="text-[9px] text-slate-400">Week 4</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-slate-100">
              <div>
                <p className="text-xs text-slate-400">Starting Weight</p>
                <p className="text-lg font-semibold text-slate-900">77.5 kg</p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Current Weight</p>
                <p className="text-lg font-semibold text-lime-600">75.0 kg</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">
                  Workout Types
                </h3>
                <p className="text-xs text-slate-400">
                  Distribution this month
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center my-6">
              <div className="relative h-40 w-40">
                <div className="absolute inset-0 rounded-full border-[20px] border-slate-100"></div>
                <div className="absolute inset-0 rounded-full border-[20px] border-transparent border-t-lime-400 border-r-sky-400 border-b-amber-400 border-l-purple-400 rotate-45"></div>
                <div className="absolute inset-6 rounded-full bg-white flex items-center justify-center flex-col">
                  <p className="text-2xl font-semibold text-slate-900">24</p>
                  <p className="text-[10px] text-slate-400">Sessions</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-lime-400"></div>
                <div>
                  <p className="text-xs font-medium text-slate-900">Cardio</p>
                  <p className="text-[10px] text-slate-400">35% • 8 sessions</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-sky-400"></div>
                <div>
                  <p className="text-xs font-medium text-slate-900">Strength</p>
                  <p className="text-[10px] text-slate-400">
                    40% • 10 sessions
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-amber-400"></div>
                <div>
                  <p className="text-xs font-medium text-slate-900">Yoga</p>
                  <p className="text-[10px] text-slate-400">15% • 4 sessions</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-purple-400"></div>
                <div>
                  <p className="text-xs font-medium text-slate-900">Other</p>
                  <p className="text-[10px] text-slate-400">10% • 2 sessions</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">
              Body Measurements
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-lime-100 flex items-center justify-center">
                    <i className="fa-solid fa-ruler-horizontal text-lime-600 text-sm"></i>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">Chest</p>
                    <p className="text-xs text-slate-400">
                      Current measurement
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-slate-900">98 cm</p>
                  <p className="text-xs text-lime-600">+2 cm</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-sky-100 flex items-center justify-center">
                    <i className="fa-solid fa-ruler-horizontal text-sky-600 text-sm"></i>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">Waist</p>
                    <p className="text-xs text-slate-400">
                      Current measurement
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-slate-900">82 cm</p>
                  <p className="text-xs text-lime-600">-3 cm</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-amber-100 flex items-center justify-center">
                    <i className="fa-solid fa-ruler-horizontal text-amber-600 text-sm"></i>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">Biceps</p>
                    <p className="text-xs text-slate-400">
                      Current measurement
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-slate-900">35 cm</p>
                  <p className="text-xs text-lime-600">+1 cm</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-purple-100 flex items-center justify-center">
                    <i className="fa-solid fa-ruler-horizontal text-purple-600 text-sm"></i>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">Thighs</p>
                    <p className="text-xs text-slate-400">
                      Current measurement
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-slate-900">58 cm</p>
                  <p className="text-xs text-lime-600">+2 cm</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">
              Personal Records
            </h3>
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-gradient-to-r from-lime-50 to-lime-100 border border-lime-200">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-semibold text-slate-900">
                    Bench Press
                  </p>
                  <span className="text-xs px-2 py-1 rounded-full bg-lime-200 text-lime-800">
                    New PR!
                  </span>
                </div>
                <p className="text-2xl font-bold text-lime-700">85 kg</p>
                <p className="text-xs text-slate-500 mt-1">
                  Previous: 80 kg • 2 days ago
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <p className="text-sm font-semibold text-slate-900 mb-2">
                  Deadlift
                </p>
                <p className="text-2xl font-bold text-slate-700">120 kg</p>
                <p className="text-xs text-slate-500 mt-1">
                  Last updated: 5 days ago
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <p className="text-sm font-semibold text-slate-900 mb-2">
                  Running (5K)
                </p>
                <p className="text-2xl font-bold text-slate-700">24:30</p>
                <p className="text-xs text-slate-500 mt-1">
                  Last updated: 1 week ago
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-900">
              Recent Achievements
            </h3>
            <button className="text-sm text-lime-600 hover:underline">
              View All
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200 text-center">
              <div className="h-16 w-16 mx-auto mb-3 rounded-full bg-amber-200 flex items-center justify-center">
                <i className="fa-solid fa-fire text-2xl text-amber-600"></i>
              </div>
              <p className="font-semibold text-slate-900 text-sm mb-1">
                7-Day Streak
              </p>
              <p className="text-xs text-slate-500">Unlocked today</p>
            </div>

            <div className="p-4 rounded-xl bg-gradient-to-br from-lime-50 to-lime-100 border border-lime-200 text-center">
              <div className="h-16 w-16 mx-auto mb-3 rounded-full bg-lime-200 flex items-center justify-center">
                <i className="fa-solid fa-dumbbell text-2xl text-lime-600"></i>
              </div>
              <p className="font-semibold text-slate-900 text-sm mb-1">
                50 Workouts
              </p>
              <p className="text-xs text-slate-500">Unlocked 3 days ago</p>
            </div>

            <div className="p-4 rounded-xl bg-gradient-to-br from-sky-50 to-sky-100 border border-sky-200 text-center">
              <div className="h-16 w-16 mx-auto mb-3 rounded-full bg-sky-200 flex items-center justify-center">
                <i className="fa-solid fa-heart text-2xl text-sky-600"></i>
              </div>
              <p className="font-semibold text-slate-900 text-sm mb-1">
                Cardio Master
              </p>
              <p className="text-xs text-slate-500">Unlocked 1 week ago</p>
            </div>

            <div className="p-4 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 text-center">
              <div className="h-16 w-16 mx-auto mb-3 rounded-full bg-purple-200 flex items-center justify-center">
                <i className="fa-solid fa-trophy text-2xl text-purple-600"></i>
              </div>
              <p className="font-semibold text-slate-900 text-sm mb-1">
                Goal Crusher
              </p>
              <p className="text-xs text-slate-500">Unlocked 2 weeks ago</p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Progress;
