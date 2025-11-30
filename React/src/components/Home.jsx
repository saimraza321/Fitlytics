import Sidebar from "./sidebar";

const Home = () => {
  return (
    <>
      <main className="flex-1 flex flex-col xl:flex-row gap-4 p-4 xl:p-6 bg-[#EFEFF1] overflow-y-scroll">
        <section className="flex-1 flex flex-col gap-4">
          <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs text-slate-400">Hello, Wingman! 👋</p>
              <h1 className="text-2xl font-semibold text-slate-900">
                Let’s get your workout started.
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search anything"
                  className="pl-9 pr-3 py-2 rounded-full bg-white border border-slate-200 text-sm w-64 max-w-full focus:outline-none focus:ring-2 focus:ring-lime-400"
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">
                  🔍
                </span>
              </div>
              <button className="relative h-9 w-9 rounded-full bg-white border border-slate-200 flex items-center justify-center">
                🔔
                <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-lime-400 border border-white"></span>
              </button>
            </div>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs uppercase tracking-wide text-slate-400">
                  Calories
                </p>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-lime-100 text-lime-700">
                  Today
                </span>
              </div>
              <p className="text-2xl font-semibold text-slate-900">520</p>
              <p className="text-xs text-slate-400 mb-2">kcal burned</p>
              <div className="h-10 rounded-lg bg-gradient-to-r from-lime-200/60 to-sky-100 flex items-end overflow-hidden">
                <div className="w-1/6 h-2 bg-lime-400 rounded-t-md mx-0.5"></div>
                <div className="w-1/6 h-4 bg-lime-400 rounded-t-md mx-0.5"></div>
                <div className="w-1/6 h-6 bg-lime-400 rounded-t-md mx-0.5"></div>
                <div className="w-1/6 h-7 bg-lime-400 rounded-t-md mx-0.5"></div>
                <div className="w-1/6 h-5 bg-lime-400 rounded-t-md mx-0.5"></div>
                <div className="w-1/6 h-8 bg-lime-400 rounded-t-md mx-0.5"></div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs uppercase tracking-wide text-slate-400">
                  Heart Rate
                </p>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-sky-100 text-sky-700">
                  Live
                </span>
              </div>
              <p className="text-2xl font-semibold text-slate-900">110</p>
              <p className="text-xs text-slate-400 mb-2">bpm</p>
              <div className="h-10 relative overflow-hidden rounded-lg bg-sky-50">
                <div className="absolute inset-0 flex items-center">
                  <svg
                    viewBox="0 0 100 30"
                    className="w-full h-full text-sky-400"
                  >
                    <polyline
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      points="0,15 10,16 20,14 30,18 40,10 50,22 60,8 70,18 80,12 90,18 100,10"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs uppercase tracking-wide text-slate-400">
                  Steps
                </p>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">
                  Goal 10k
                </span>
              </div>
              <p className="text-2xl font-semibold text-slate-900">10,050</p>
              <p className="text-xs text-slate-400 mb-2">steps walked</p>
              <div className="h-10 rounded-lg bg-slate-50 flex items-center px-2">
                <div className="h-2 w-full rounded-full bg-slate-200 overflow-hidden">
                  <div className="h-full w-[82%] bg-gradient-to-r from-lime-400 to-emerald-400"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
            <div className="xl:col-span-2 bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    Weekly Activity
                  </p>
                  <p className="text-xs text-slate-400">
                    How you’ve moved this week
                  </p>
                </div>
                <button className="text-xs px-3 py-1 rounded-full bg-slate-100 text-slate-600">
                  1 – 7 Aug
                </button>
              </div>
              <div className="flex items-end justify-between h-40">
                <div className="flex-1 flex justify-between items-end">
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-6 rounded-lg bg-slate-100 h-10"></div>
                    <span className="text-[10px] text-slate-400">Mon</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-6 rounded-lg bg-lime-300 h-16"></div>
                    <span className="text-[10px] text-slate-400">Tue</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-6 rounded-lg bg-lime-400 h-24"></div>
                    <span className="text-[10px] text-slate-400">Wed</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-6 rounded-lg bg-sky-300 h-14"></div>
                    <span className="text-[10px] text-slate-400">Thu</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-6 rounded-lg bg-lime-400 h-28"></div>
                    <span className="text-[10px] text-slate-400">Fri</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-6 rounded-lg bg-slate-200 h-11"></div>
                    <span className="text-[10px] text-slate-400">Sat</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-6 rounded-lg bg-slate-200 h-8"></div>
                    <span className="text-[10px] text-slate-400">Sun</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex flex-col">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-semibold text-slate-900">Progress</p>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-lime-100 text-lime-700">
                  This week
                </span>
              </div>
              <div className="flex items-center justify-center my-4">
                <div className="relative h-32 w-32">
                  <div className="absolute inset-0 rounded-full border-[10px] border-slate-100"></div>
                  <div className="absolute inset-0 rounded-full border-[10px] border-lime-400 border-t-lime-400 border-r-lime-300 border-b-slate-100 rotate-45"></div>
                  <div className="absolute inset-3 rounded-full bg-white flex items-center justify-center flex-col">
                    <p className="text-xl font-semibold text-slate-900">75%</p>
                    <p className="text-[10px] text-slate-400">Weekly goal</p>
                  </div>
                </div>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-lime-400"></span>
                    <span>Cardio training</span>
                  </div>
                  <span className="font-medium text-slate-700">85%</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-sky-400"></span>
                    <span>Strength training</span>
                  </div>
                  <span className="font-medium text-slate-700">69%</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-amber-400"></span>
                    <span>Flexibility & mobility</span>
                  </div>
                  <span className="font-medium text-slate-700">52%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    Today’s Activity
                  </p>
                  <p className="text-xs text-slate-400">Morning Run</p>
                </div>
                <span className="text-[11px] px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700">
                  Running
                </span>
              </div>
              <div className="overflow-hidden rounded-xl h-40 bg-slate-200 mb-3 flex items-center justify-center text-xs text-slate-500">
                Map / route placeholder
              </div>
              <div className="grid grid-cols-4 gap-2 text-[11px] text-slate-500">
                <div>
                  <p className="text-[10px] uppercase tracking-wide text-slate-400">
                    Duration
                  </p>
                  <p className="font-semibold text-slate-800">45 min</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wide text-slate-400">
                    Distance
                  </p>
                  <p className="font-semibold text-slate-800">6.2 km</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wide text-slate-400">
                    Pace
                  </p>
                  <p className="font-semibold text-slate-800">7'12"</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wide text-slate-400">
                    Calories
                  </p>
                  <p className="font-semibold text-slate-800">340 kcal</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex flex-col">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-semibold text-slate-900">
                  My classNamees
                </p>
                <button className="text-xs text-sky-600 hover:underline">
                  See all
                </button>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50">
                  <div>
                    <p className="font-semibold text-slate-800">
                      Strength & Conditioning
                    </p>
                    <p className="text-[11px] text-slate-400">
                      Today • 6:30 AM
                    </p>
                  </div>
                  <span className="px-2 py-1 rounded-full bg-lime-100 text-lime-700 text-[10px]">
                    Reserved
                  </span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50">
                  <div>
                    <p className="font-semibold text-slate-800">Core Blast</p>
                    <p className="text-[11px] text-slate-400">
                      Today • 5:00 PM
                    </p>
                  </div>
                  <span className="px-2 py-1 rounded-full bg-slate-100 text-slate-600 text-[10px]">
                    Join
                  </span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50">
                  <div>
                    <p className="font-semibold text-slate-800">Evening Yoga</p>
                    <p className="text-[11px] text-slate-400">
                      Tomorrow • 7:30 PM
                    </p>
                  </div>
                  <span className="px-2 py-1 rounded-full bg-slate-100 text-slate-600 text-[10px]">
                    Waitlist
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <aside className="w-full xl:w-80 flex flex-col gap-4">
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-lime-300 to-sky-300 flex items-center justify-center font-semibold text-slate-800">
                KW
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  Kalendra Wingman
                </p>
                <p className="text-[11px] text-slate-400">Advanced • 1 yr</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center text-[11px]">
              <div className="rounded-xl bg-slate-50 p-2">
                <p className="text-[10px] text-slate-400 uppercase tracking-wide">
                  Weight
                </p>
                <p className="font-semibold text-slate-900">75 kg</p>
              </div>
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

          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-semibold text-slate-900">
                August 2028
              </p>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <button className="h-5 w-5 rounded-full border border-slate-300 flex items-center justify-center">
                  ‹
                </button>
                <button className="h-5 w-5 rounded-full border border-slate-300 flex items-center justify-center">
                  ›
                </button>
              </div>
            </div>
            <div className="grid grid-cols-7 gap-1 text-[10px] text-center mb-1 text-slate-400">
              <span>Su</span>
              <span>Mo</span>
              <span>Tu</span>
              <span>We</span>
              <span>Th</span>
              <span>Fr</span>
              <span>Sa</span>
            </div>
            <div className="grid grid-cols-7 gap-1 text-[11px] text-center">
              <span className="text-slate-300">28</span>
              <span className="text-slate-300">29</span>
              <span className="text-slate-300">30</span>
              <span>1</span>
              <span>2</span>
              <span>3</span>
              <span>4</span>
              <span>5</span>
              <span>6</span>
              <span className="relative">
                <span className="absolute inset-0 m-auto h-6 w-6 rounded-full bg-lime-100"></span>
                <span className="relative">7</span>
              </span>
              <span>8</span>
              <span>9</span>
              <span>10</span>
              <span>11</span>
              <span>12</span>
              <span>13</span>
              <span>14</span>
              <span>15</span>
              <span>16</span>
              <span>17</span>
              <span>18</span> <span>19</span>
              <span>20</span>
              <span>21</span>
              <span>22</span>
              <span>23</span>
              <span>24</span>
              <span>25</span> <span>26</span>
              <span>27</span>
              <span>28</span>
              <span>29</span>
              <span>30</span>
              <span>31</span>
              <span className="text-slate-300">1</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-semibold text-slate-900">
                My Schedule
              </p>
              <button className="text-xs text-sky-600 hover:underline">
                Add
              </button>
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex items-start justify-between p-2 rounded-xl bg-slate-50">
                <div>
                  <p className="font-semibold text-slate-800">
                    Morning Cardio Blast
                  </p>
                  <p className="text-[11px] text-slate-400">
                    Today • 7:00 – 7:45
                  </p>
                </div>
                <span className="mt-0.5 h-2 w-2 rounded-full bg-lime-400"></span>
              </div>
              <div className="flex items-start justify-between p-2 rounded-xl hover:bg-slate-50">
                <div>
                  <p className="font-semibold text-slate-800">
                    Strength Circuit
                  </p>
                  <p className="text-[11px] text-slate-400">
                    Today • 18:00 – 19:00
                  </p>
                </div>
                <span className="mt-0.5 h-2 w-2 rounded-full bg-sky-400"></span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex-1">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-semibold text-slate-900">
                Recent Activity
              </p>
              <button className="text-xs text-sky-600 hover:underline">
                View all
              </button>
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex gap-2 items-start">
                <div className="mt-1 h-2 w-2 rounded-full bg-lime-400"></div>
                <div>
                  <p className="font-semibold text-slate-800">
                    Completed Morning Cardio
                  </p>
                  <p className="text-[11px] text-slate-400">Today • 8:02 AM</p>
                </div>
              </div>
              <div className="flex gap-2 items-start">
                <div className="mt-1 h-2 w-2 rounded-full bg-sky-400"></div>
                <div>
                  <p className="font-semibold text-slate-800">
                    Completed Strength Training
                  </p>
                  <p className="text-[11px] text-slate-400">
                    Yesterday • 6:43 PM
                  </p>
                </div>
              </div>
              <div className="flex gap-2 items-start">
                <div className="mt-1 h-2 w-2 rounded-full bg-amber-400"></div>
                <div>
                  <p className="font-semibold text-slate-800">
                    Completed Yoga Flow
                  </p>
                  <p className="text-[11px] text-slate-400">Mon • 7:12 PM</p>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </main>
    </>
  );
};

export default Home;
