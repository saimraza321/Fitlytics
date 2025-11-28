const MealPlan = () => {
  return (
    <>
      <main className="flex-1 flex flex-col gap-4 p-4 xl:p-6 bg-[#EFEFF1] overflow-y-scroll">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Meal Plan</h1>

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
                  placeholder="Search for meal"
                  className="bg-transparent focus:outline-none w-full text-sm"
                />
              </div>

              <select className="bg-gray-100 p-2 px-4 rounded-full text-sm">
                <option>Day</option>
                <option>Monday</option>
                <option>Tuesday</option>
                <option>Wednesday</option>
                <option>Thursday</option>
                <option>Friday</option>
                <option>Saturday</option>
                <option>Sunday</option>
              </select>

              <select className="bg-gray-100 p-2 px-4 rounded-full text-sm">
                <option>Status</option>
                <option>Completed</option>
                <option>Pending</option>
                <option>Skipped</option>
              </select>
            </div>

            <button
              data-modal-target="meal-modal"
              data-modal-toggle="meal-modal"
              className="bg-[#daf27a] px-6 py-2 rounded-full font-medium text-sm shadow"
            >
              <i className="fa-solid fa-plus"></i>
              Add Meal
            </button>
          </div>

          <div className="bg-white overflow-hidden">
            <table className="min-w-full text-sm">
              <thead className="bg-[#f2f9ff] text-gray-600 text-xs uppercase rounded-2xl">
                <tr className="rounded-2xl">
                  <th className="py-4 px-5 text-left font-xl font-medium">
                    Meal Type
                  </th>
                  <th className="py-4 px-5 text-left font-xl font-medium">
                    Food Items
                  </th>
                  <th className="py-4 px-5 text-left font-xl font-medium">
                    Time
                  </th>
                  <th className="py-4 px-5 text-left font-xl font-medium">
                    Calories
                  </th>
                  <th className="py-4 px-5 text-left font-xl font-medium">
                    Protein
                  </th>
                  <th className="py-4 px-5 text-left font-xl font-medium">
                    Carbs
                  </th>
                  <th className="py-4 px-5 text-left font-xl font-medium">
                    Fats
                  </th>
                  <th className="py-4 px-5 text-left font-xl font-medium">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-4 px-5 flex items-center gap-3">
                    <span className="w-8 h-8 bg-[#FFD46F] rounded-full flex items-center justify-center text-lg">
                      🍳
                    </span>
                    Breakfast
                  </td>
                  <td className="py-4 px-5">Oats + Banana + Eggs</td>
                  <td className="py-4 px-5">8:00 AM</td>
                  <td className="py-4 px-5">450 cal</td>
                  <td className="py-4 px-5">25g</td>
                  <td className="py-4 px-5">60g</td>
                  <td className="py-4 px-5">12g</td>
                  <td className="py-4 px-5">
                    <span className="px-3 py-1 bg-[#DFF7D8] text-green-600 rounded-full text-xs">
                      Completed
                    </span>
                  </td>
                </tr>

                <tr className="border-b hover:bg-gray-50">
                  <td className="py-4 px-5 flex items-center gap-3">
                    <span className="w-8 h-8 bg-[#DAF17D] rounded-full flex items-center justify-center text-lg">
                      🍎
                    </span>
                    Snack
                  </td>
                  <td className="py-4 px-5">Apple + Almonds</td>
                  <td className="py-4 px-5">11:00 AM</td>
                  <td className="py-4 px-5">200 cal</td>
                  <td className="py-4 px-5">8g</td>
                  <td className="py-4 px-5">25g</td>
                  <td className="py-4 px-5">10g</td>
                  <td className="py-4 px-5">
                    <span className="px-3 py-1 bg-[#DFF7D8] text-green-600 rounded-full text-xs">
                      Completed
                    </span>
                  </td>
                </tr>

                <tr className="border-b hover:bg-gray-50">
                  <td className="py-4 px-5 flex items-center gap-3">
                    <span className="w-8 h-8 bg-[#FFB4B4] rounded-full flex items-center justify-center text-lg">
                      🍗
                    </span>
                    Lunch
                  </td>
                  <td className="py-4 px-5">Chicken Breast + Rice + Salad</td>
                  <td className="py-4 px-5">1:30 PM</td>
                  <td className="py-4 px-5">600 cal</td>
                  <td className="py-4 px-5">45g</td>
                  <td className="py-4 px-5">70g</td>
                  <td className="py-4 px-5">15g</td>
                  <td className="py-4 px-5">
                    <span className="px-3 py-1 bg-[#FFF2CC] text-yellow-600 rounded-full text-xs">
                      Pending
                    </span>
                  </td>
                </tr>

                <tr className="border-b hover:bg-gray-50">
                  <td className="py-4 px-5 flex items-center gap-3">
                    <span className="w-8 h-8 bg-[#D4C5F9] rounded-full flex items-center justify-center text-lg">
                      🥤
                    </span>
                    Snack
                  </td>
                  <td className="py-4 px-5">Protein Shake</td>
                  <td className="py-4 px-5">4:00 PM</td>
                  <td className="py-4 px-5">250 cal</td>
                  <td className="py-4 px-5">30g</td>
                  <td className="py-4 px-5">20g</td>
                  <td className="py-4 px-5">5g</td>
                  <td className="py-4 px-5">
                    <span className="px-3 py-1 bg-[#FFF2CC] text-yellow-600 rounded-full text-xs">
                      Pending
                    </span>
                  </td>
                </tr>

                <tr className="hover:bg-gray-50">
                  <td className="py-4 px-5 flex items-center gap-3">
                    <span className="w-8 h-8 bg-[#CFE2FF] rounded-full flex items-center justify-center text-lg">
                      🍲
                    </span>
                    Dinner
                  </td>
                  <td className="py-4 px-5">
                    Grilled Fish + Vegetables + Quinoa
                  </td>
                  <td className="py-4 px-5">7:30 PM</td>
                  <td className="py-4 px-5">550 cal</td>
                  <td className="py-4 px-5">40g</td>
                  <td className="py-4 px-5">55g</td>
                  <td className="py-4 px-5">18g</td>
                  <td className="py-4 px-5">
                    <span className="px-3 py-1 bg-gray-200 text-gray-600 rounded-full text-xs">
                      Pending
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-[#f2f9ff] p-4 rounded-xl">
              <p className="text-xs text-gray-500 uppercase">Total Calories</p>
              <p className="text-2xl font-semibold mt-1">2,050 cal</p>
            </div>
            <div className="bg-[#fff5e6] p-4 rounded-xl">
              <p className="text-xs text-gray-500 uppercase">Total Protein</p>
              <p className="text-2xl font-semibold mt-1">148g</p>
            </div>
            <div className="bg-[#e6ffe6] p-4 rounded-xl">
              <p className="text-xs text-gray-500 uppercase">Total Carbs</p>
              <p className="text-2xl font-semibold mt-1">230g</p>
            </div>
            <div className="bg-[#ffe6f0] p-4 rounded-xl">
              <p className="text-xs text-gray-500 uppercase">Total Fats</p>
              <p className="text-2xl font-semibold mt-1">60g</p>
            </div>
          </div>
        </div>
      </main>

      <div
        id="meal-modal"
        tabindex="-1"
        aria-hidden="true"
        className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <div className="relative p-4 w-full max-w-2xl max-h-full">
          <div className="relative bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between border-b pb-4 mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Add New Meal
              </h3>
              <button
                type="button"
                className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
                data-modal-hide="meal-modal"
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
                    Meal Type
                  </label>
                  <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#DAF17D] focus:border-[#DAF17D] block w-full p-2.5">
                    <option>Select meal type</option>
                    <option>Breakfast</option>
                    <option>Snack</option>
                    <option>Lunch</option>
                    <option>Dinner</option>
                  </select>
                </div>

                <div className="col-span-2">
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Food Items
                  </label>
                  <input
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#DAF17D] focus:border-[#DAF17D] block w-full p-2.5"
                    placeholder="e.g., Chicken, Rice, Salad"
                  />
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Time
                  </label>
                  <input
                    type="time"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#DAF17D] focus:border-[#DAF17D] block w-full p-2.5"
                  />
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Calories
                  </label>
                  <input
                    type="number"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#DAF17D] focus:border-[#DAF17D] block w-full p-2.5"
                    placeholder="450"
                  />
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Protein (g)
                  </label>
                  <input
                    type="number"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#DAF17D] focus:border-[#DAF17D] block w-full p-2.5"
                    placeholder="25"
                  />
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Carbs (g)
                  </label>
                  <input
                    type="number"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#DAF17D] focus:border-[#DAF17D] block w-full p-2.5"
                    placeholder="60"
                  />
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Fats (g)
                  </label>
                  <input
                    type="number"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#DAF17D] focus:border-[#DAF17D] block w-full p-2.5"
                    placeholder="12"
                  />
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Day
                  </label>
                  <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#DAF17D] focus:border-[#DAF17D] block w-full p-2.5">
                    <option>Monday</option>
                    <option>Tuesday</option>
                    <option>Wednesday</option>
                    <option>Thursday</option>
                    <option>Friday</option>
                    <option>Saturday</option>
                    <option>Sunday</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center space-x-4 mt-6 pt-4 border-t">
                <button
                  type="submit"
                  className="text-black bg-[#DAF17D] hover:bg-[#c5dc6a] font-medium rounded-lg text-sm px-5 py-2.5"
                >
                  <i className="fa-solid fa-plus mr-1"></i>
                  Add Meal
                </button>
                <button
                  data-modal-hide="meal-modal"
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

export default MealPlan;
