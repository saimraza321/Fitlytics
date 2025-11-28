const Exercises = () => {
  return (
    <>
      <main className="flex-1 flex flex-col gap-4 p-4 xl:p-6 bg-[#EFEFF1] overflow-y-scroll">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Exercises</h1>

          <div className="flex items-center gap-3">
            <button className="p-2 bg-white rounded-full shadow">
              <i className="fa-solid fa-bell text-gray-500"></i>
            </button>

            <button className="p-2 bg-white rounded-full shadow">
              <i className="fa-solid fa-gear text-gray-500"></i>
            </button>

            <div className="flex items-center gap-2 bg-white p-1 pr-3 rounded-full shadow">
              <img
                src="https://i.pravatar.cc/40"
                className="w-8 h-8 rounded-full"
              />
              <span className="text-sm font-medium">Kalendra Wingman</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-3 rounded-2xl shadow">
          <div className="flex items-center justify-between bg-white p-3 mb-3">
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center bg-gray-100 px-4 py-2 rounded-full w-72">
                <i className="fa-solid fa-magnifying-glass text-gray-500 mr-2 text-sm"></i>
                <input
                  placeholder="Search for exercise"
                  className="bg-transparent focus:outline-none w-full text-sm"
                />
              </div>

              <select className="bg-gray-100 p-2 px-4 rounded-full text-sm">
                <option>Status</option>
                <option>Completed</option>
                <option>In Progress</option>
                <option>Not Started</option>
              </select>

              <select className="bg-gray-100 p-2 px-4 rounded-full text-sm">
                <option>This Week</option>
                <option>Last Week</option>
              </select>
            </div>

            <button
              data-modal-target="exercise-modal"
              data-modal-toggle="exercise-modal"
              className="bg-[#daf27a] px-6 py-2 rounded-full font-medium text-sm shadow"
            >
              <i className="fa-solid fa-plus"></i>
              Add Exercise
            </button>
          </div>

          <div className="bg-white overflow-hidden">
            <table className="min-w-full text-sm">
              <thead className="bg-[#f2f9ff] text-gray-600 text-xs uppercase rounded-2xl">
                <tr className="rounded-2xl">
                  <th className="py-4 px-5 text-left font-xl font-medium">
                    Exercise Name
                  </th>
                  <th className="py-4 px-5 text-left font-xl font-medium">
                    Sets
                  </th>
                  <th className="py-4 px-5 text-left font-xl font-medium">
                    Step 1
                  </th>
                  <th className="py-4 px-5 text-left font-xl font-medium">
                    Step 2
                  </th>
                  <th className="py-4 px-5 text-left font-xl font-medium">
                    Weight
                  </th>
                  <th className="py-4 px-5 text-left font-xl font-medium">
                    Calories
                  </th>
                  <th className="py-4 px-5 text-left font-xl font-medium">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-4 px-5 flex items-center gap-3">
                    <span className="w-8 h-8 bg-[#DAF17D] rounded-full flex items-center justify-center text-lg"></span>
                    Squats
                  </td>
                  <td className="py-4 px-5">4</td>
                  <td className="py-4 px-5">12 repetitions</td>
                  <td className="py-4 px-5">60 seconds</td>
                  <td className="py-4 px-5">40 kg</td>
                  <td className="py-4 px-5">180 cal</td>
                  <td className="py-4 px-5">
                    <span className="px-3 py-1 bg-[#DFF7D8] text-green-600 rounded-full text-xs">
                      Completed
                    </span>
                  </td>
                </tr>

                <tr className="border-b hover:bg-gray-50">
                  <td className="py-4 px-5 flex items-center gap-3">
                    <span className="w-8 h-8 bg-[#FFD46F] rounded-full flex items-center justify-center text-lg"></span>
                    Deadlift
                  </td>
                  <td className="py-4 px-5">3</td>
                  <td className="py-4 px-5">10 repetitions</td>
                  <td className="py-4 px-5">90 seconds</td>
                  <td className="py-4 px-5">250 kg</td>
                  <td className="py-4 px-5">220 cal</td>
                  <td className="py-4 px-5">
                    <span className="px-3 py-1 bg-[#FFF2CC] text-yellow-600 rounded-full text-xs">
                      In Progress
                    </span>
                  </td>
                </tr>

                <tr className="hover:bg-gray-50">
                  <td className="py-4 px-5 flex items-center gap-3">
                    <span className="w-8 h-8 bg-[#CFE2FF] rounded-full flex items-center justify-center text-lg"></span>
                    Bench Press
                  </td>
                  <td className="py-4 px-5">1</td>
                  <td className="py-4 px-5">8 repetitions</td>
                  <td className="py-4 px-5">60 seconds</td>
                  <td className="py-4 px-5">60 kg</td>
                  <td className="py-4 px-5">150 cal</td>
                  <td className="py-4 px-5">
                    <span className="px-3 py-1 bg-gray-200 text-gray-600 rounded-full text-xs">
                      Not Started
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <div
        id="exercise-modal"
        tabindex="-1"
        aria-hidden="true"
        className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <div className="relative p-4 w-full max-w-2xl max-h-full">
          <div className="relative bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between border-b pb-4 mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Add New Exercise
              </h3>
              <button
                type="button"
                className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
                data-modal-hide="exercise-modal"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>

            <form>
              <div className="grid gap-4 grid-cols-2">
                <div className="col-span-2">
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Exercise Name
                  </label>
                  <input
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#DAF17D] focus:border-[#DAF17D] block w-full p-2.5"
                    placeholder="e.g., Squats, Push-ups"
                    required
                  />
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Sets
                  </label>
                  <input
                    type="number"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#DAF17D] focus:border-[#DAF17D] block w-full p-2.5"
                    placeholder="4"
                    required
                  />
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Step 1 (Repetitions)
                  </label>
                  <input
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#DAF17D] focus:border-[#DAF17D] block w-full p-2.5"
                    placeholder="12 repetitions"
                    required
                  />
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Step 2 (Rest Time)
                  </label>
                  <input
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#DAF17D] focus:border-[#DAF17D] block w-full p-2.5"
                    placeholder="60 seconds"
                    required
                  />
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Weight (kg)
                  </label>
                  <input
                    type="number"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#DAF17D] focus:border-[#DAF17D] block w-full p-2.5"
                    placeholder="40"
                    required
                  />
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Calories
                  </label>
                  <input
                    type="number"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#DAF17D] focus:border-[#DAF17D] block w-full p-2.5"
                    placeholder="180"
                    required
                  />
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Status
                  </label>
                  <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#DAF17D] focus:border-[#DAF17D] block w-full p-2.5">
                    <option>Not Started</option>
                    <option>In Progress</option>
                    <option>Completed</option>
                  </select>
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Category Color
                  </label>
                  <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#DAF17D] focus:border-[#DAF17D] block w-full p-2.5">
                    <option value="#DAF17D">Green</option>
                    <option value="#FFD46F">Yellow</option>
                    <option value="#CFE2FF">Blue</option>
                    <option value="#FFB4B4">Red</option>
                    <option value="#D4C5F9">Purple</option>
                  </select>
                </div>

                <div className="col-span-2">
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Notes (Optional)
                  </label>
                  <textarea
                    rows="3"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#DAF17D] focus:border-[#DAF17D] block w-full p-2.5"
                    placeholder="Add any additional notes about this exercise..."
                  ></textarea>
                </div>
              </div>

              <div className="flex items-center space-x-4 mt-6 pt-4 border-t">
                <button
                  type="submit"
                  className="text-black bg-[#DAF17D] hover:bg-[#c5dc6a] font-medium rounded-lg text-sm px-5 py-2.5"
                >
                  <i className="fa-solid fa-plus mr-1"></i>
                  Add Exercise
                </button>
                <button
                  data-modal-hide="exercise-modal"
                  type="button"
                  className="text-gray-700 bg-gray-200 hover:bg-gray-300 font-medium rounded-lg text-sm px-5 py-2.5"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Exercises;
