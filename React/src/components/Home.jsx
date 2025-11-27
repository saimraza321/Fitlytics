import Sidebar from "./sidebar";

const Home = () => {
  return (
    <>
      <main className="flex-1 p-4 xl:p-6 overflow-y-scroll">
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">
              My Schedule
            </h1>
            <p className="text-sm text-slate-400">
              Plan your workouts for the week
            </p>
          </div>
          <button className="mt-3 sm:mt-0 px-6 py-2 bg-[#DAF17D] hover:bg-[#c5d96e] rounded-xl font-medium text-slate-900 transition duration-300">
            <i className="fa-solid fa-plus mr-2"></i>Add Session
          </button>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 mb-6">
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
            <p className="text-xs text-slate-400 uppercase tracking-wide mb-1">
              This Week
            </p>
            <p className="text-2xl font-semibold text-slate-900">12</p>
            <p className="text-xs text-slate-500">sessions planned</p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
            <p className="text-xs text-slate-400 uppercase tracking-wide mb-1">
              Completed
            </p>
            <p className="text-2xl font-semibold text-lime-600">8</p>
            <p className="text-xs text-slate-500">workouts done</p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
            <p className="text-xs text-slate-400 uppercase tracking-wide mb-1">
              Remaining
            </p>
            <p className="text-2xl font-semibold text-sky-600">4</p>
            <p className="text-xs text-slate-500">sessions left</p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
            <p className="text-xs text-slate-400 uppercase tracking-wide mb-1">
              Streak
            </p>
            <p className="text-2xl font-semibold text-amber-600">5</p>
            <p className="text-xs text-slate-500">days in a row</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-slate-900">
              Week of Aug 1 - Aug 7
            </h2>
            <div className="flex gap-2">
              <button className="h-8 w-8 rounded-lg border border-slate-300 flex items-center justify-center hover:bg-slate-50">
                <i className="fa-solid fa-chevron-left text-xs"></i>
              </button>
              <button className="h-8 w-8 rounded-lg border border-slate-300 flex items-center justify-center hover:bg-slate-50">
                <i className="fa-solid fa-chevron-right text-xs"></i>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-7 gap-3">
            <div className="border border-slate-200 rounded-xl p-3">
              <div className="text-center mb-3">
                <p className="text-xs text-slate-400">Monday</p>
                <p className="text-lg font-semibold text-slate-900">1</p>
              </div>
              <div className="space-y-2">
                <div className="bg-lime-100 rounded-lg p-2 border-l-4 border-lime-400">
                  <p className="text-xs font-medium text-slate-800">
                    Morning Cardio
                  </p>
                  <p className="text-[10px] text-slate-500">7:00 - 8:00 AM</p>
                </div>
                <div className="bg-sky-100 rounded-lg p-2 border-l-4 border-sky-400">
                  <p className="text-xs font-medium text-slate-800">
                    Strength Training
                  </p>
                  <p className="text-[10px] text-slate-500">6:00 - 7:00 PM</p>
                </div>
              </div>
            </div>

            <div className="border border-slate-200 rounded-xl p-3">
              <div className="text-center mb-3">
                <p className="text-xs text-slate-400">Tuesday</p>
                <p className="text-lg font-semibold text-slate-900">2</p>
              </div>
              <div className="space-y-2">
                <div className="bg-amber-100 rounded-lg p-2 border-l-4 border-amber-400">
                  <p className="text-xs font-medium text-slate-800">
                    Yoga Flow
                  </p>
                  <p className="text-[10px] text-slate-500">7:30 - 8:30 AM</p>
                </div>
              </div>
            </div>

            <div className="border border-slate-200 rounded-xl p-3">
              <div className="text-center mb-3">
                <p className="text-xs text-slate-400">Wednesday</p>
                <p className="text-lg font-semibold text-slate-900">3</p>
              </div>
              <div className="space-y-2">
                <div className="bg-lime-100 rounded-lg p-2 border-l-4 border-lime-400">
                  <p className="text-xs font-medium text-slate-800">
                    HIIT Training
                  </p>
                  <p className="text-[10px] text-slate-500">6:30 - 7:15 AM</p>
                </div>
                <div className="bg-purple-100 rounded-lg p-2 border-l-4 border-purple-400">
                  <p className="text-xs font-medium text-slate-800">
                    Pilates Core
                  </p>
                  <p className="text-[10px] text-slate-500">5:30 - 6:30 PM</p>
                </div>
              </div>
            </div>

            <div className="border border-slate-200 rounded-xl p-3">
              <div className="text-center mb-3">
                <p className="text-xs text-slate-400">Thursday</p>
                <p className="text-lg font-semibold text-slate-900">4</p>
              </div>
              <div className="space-y-2">
                <div className="bg-sky-100 rounded-lg p-2 border-l-4 border-sky-400">
                  <p className="text-xs font-medium text-slate-800">
                    Upper Body
                  </p>
                  <p className="text-[10px] text-slate-500">7:00 - 8:00 AM</p>
                </div>
              </div>
            </div>

            <div className="border border-slate-200 rounded-xl p-3">
              <div className="text-center mb-3">
                <p className="text-xs text-slate-400">Friday</p>
                <p className="text-lg font-semibold text-slate-900">5</p>
              </div>
              <div className="space-y-2">
                <div className="bg-lime-100 rounded-lg p-2 border-l-4 border-lime-400">
                  <p className="text-xs font-medium text-slate-800">Running</p>
                  <p className="text-[10px] text-slate-500">6:00 - 7:00 AM</p>
                </div>
                <div className="bg-sky-100 rounded-lg p-2 border-l-4 border-sky-400">
                  <p className="text-xs font-medium text-slate-800">
                    Lower Body
                  </p>
                  <p className="text-[10px] text-slate-500">6:00 - 7:00 PM</p>
                </div>
              </div>
            </div>

            <div className="border border-slate-200 rounded-xl p-3">
              <div className="text-center mb-3">
                <p className="text-xs text-slate-400">Saturday</p>
                <p className="text-lg font-semibold text-slate-900">6</p>
              </div>
              <div className="space-y-2">
                <div className="bg-amber-100 rounded-lg p-2 border-l-4 border-amber-400">
                  <p className="text-xs font-medium text-slate-800">
                    Stretching
                  </p>
                  <p className="text-[10px] text-slate-500">9:00 - 10:00 AM</p>
                </div>
              </div>
            </div>

            <div className="border border-slate-200 rounded-xl p-3 bg-slate-50">
              <div className="text-center mb-3">
                <p className="text-xs text-slate-400">Sunday</p>
                <p className="text-lg font-semibold text-slate-900">7</p>
              </div>
              <p className="text-center text-xs text-slate-400 mt-4">
                Rest Day 😴
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Next Up</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 rounded-xl bg-lime-50 border border-lime-200">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-lime-200 flex items-center justify-center">
                  <i className="fa-solid fa-dumbbell text-lime-700"></i>
                </div>
                <div>
                  <p className="font-semibold text-slate-900">
                    Morning Cardio Blast
                  </p>
                  <p className="text-sm text-slate-500">
                    Tomorrow • 7:00 - 8:00 AM
                  </p>
                </div>
              </div>
              <button className="px-4 py-2 bg-lime-400 hover:bg-lime-500 rounded-lg text-sm font-medium transition">
                Start
              </button>
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl hover:bg-slate-50 border border-slate-200">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-sky-100 flex items-center justify-center">
                  <i className="fa-solid fa-person-running text-sky-700"></i>
                </div>
                <div>
                  <p className="font-semibold text-slate-900">
                    Strength Circuit
                  </p>
                  <p className="text-sm text-slate-500">
                    Tomorrow • 6:00 - 7:00 PM
                  </p>
                </div>
              </div>
              <button className="px-4 py-2 bg-slate-200 hover:bg-slate-300 rounded-lg text-sm font-medium transition">
                View
              </button>
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl hover:bg-slate-50 border border-slate-200">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-amber-100 flex items-center justify-center">
                  <i className="fa-solid fa-spa text-amber-700"></i>
                </div>
                <div>
                  <p className="font-semibold text-slate-900">Evening Yoga</p>
                  <p className="text-sm text-slate-500">Wed • 7:30 - 8:30 PM</p>
                </div>
              </div>
              <button className="px-4 py-2 bg-slate-200 hover:bg-slate-300 rounded-lg text-sm font-medium transition">
                View
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
