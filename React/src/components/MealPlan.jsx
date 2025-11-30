import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";

const MealPlan = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [dayFilter, setDayFilter] = useState("");
  const [meals, setMeals] = useState([]);

  const [formData, setFormData] = useState({
    userId: "1", // adjust for logged-in user
    mealType: "",
    foodItems: "",
    time: "",
    calories: "",
    protein: "",
    carbs: "",
    fats: "",
    status: "Pending",
    date: new Date().toISOString().split("T")[0], // default today
  });

  // Fetch meals
  useEffect(() => {
    fetchMeals();
  }, []);

  const fetchMeals = async () => {
    try {
      const response = await axios.get("http://localhost:3000/meal");
      const data = response.data.data || []; // <-- use response.data.data
      setMeals(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Failed to fetch meals", "error");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddMeal = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/meal", formData);
      Swal.fire({
        icon: "success",
        title: "Meal added!",
        timer: 1500,
        showConfirmButton: false,
      });
      setFormData({
        userId: "1",
        mealType: "",
        foodItems: "",
        time: "",
        calories: "",
        protein: "",
        carbs: "",
        fats: "",
        status: "Pending",
        date: new Date().toISOString().split("T")[0],
      });
      fetchMeals();
    } catch (error) {
      console.error(error);
      Swal.fire(
        "Error",
        error.response?.data?.message || "Failed to add meal",
        "error"
      );
    }
  };

  const updateMealStatus = async (id, newStatus) => {
    if (newStatus === "Completed") {
      Swal.fire("Info", "Cannot change status once completed", "info");
      return;
    }
    try {
      await axios.put(`http://localhost:3000/meal/${id}/status`, {
        status: newStatus,
      });
      Swal.fire({
        icon: "success",
        title: "Status updated",
        timer: 1000,
        showConfirmButton: false,
      });
      fetchMeals();
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Failed to update status", "error");
    }
  };

  const deleteMeal = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This meal will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        await axios.delete(`http://localhost:3000/meal/${id}`);
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          timer: 1500,
          showConfirmButton: false,
        });
        fetchMeals();
      } catch (error) {
        console.error(error);
        Swal.fire("Error", "Failed to delete meal", "error");
      }
    }
  };

  // Filter meals
  const filteredMeals = Array.isArray(meals)
    ? meals.filter((meal) => {
        const matchesSearch = meal.foodItems
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter
          ? meal.status === statusFilter
          : true;
        const matchesDay = dayFilter ? meal.date === dayFilter : true;
        return matchesSearch && matchesStatus && matchesDay;
      })
    : [];

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

        {/* Filters + Add Button */}
        <div className="bg-white p-3 rounded-2xl shadow mb-3">
          <div className="flex items-center gap-3 flex-wrap mb-3">
            <div className="flex items-center bg-gray-100 px-4 py-2 rounded-full w-72">
              <i className="fa-solid fa-magnifying-glass text-gray-500 mr-2 text-sm"></i>
              <input
                placeholder="Search for meal"
                className="bg-transparent focus:outline-none w-full text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <select
              className="bg-gray-100 p-2 px-4 rounded-full text-sm"
              value={dayFilter}
              onChange={(e) => setDayFilter(e.target.value)}
            >
              <option value="">All Days</option>
              <option value={new Date().toISOString().split("T")[0]}>
                Today
              </option>
            </select>

            <select
              className="bg-gray-100 p-2 px-4 rounded-full text-sm"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">All Status</option>
              <option value="Completed">Completed</option>
              <option value="Pending">Pending</option>
            </select>

            <button
              data-modal-target="meal-modal"
              data-modal-toggle="meal-modal"
              className="bg-[#daf27a] px-6 py-2 rounded-full font-medium text-sm shadow"
            >
              <i className="fa-solid fa-plus"></i> Add Meal
            </button>
          </div>
        </div>

        {/* Meals Table */}
        <div className="bg-white overflow-hidden rounded-2xl shadow">
          <table className="min-w-full text-sm">
            <thead className="bg-[#f2f9ff] text-gray-600 text-xs uppercase">
              <tr>
                <th className="py-4 px-5 text-left">Meal Type</th>
                <th className="py-4 px-5 text-left">Food Items</th>
                <th className="py-4 px-5 text-left">Time</th>
                <th className="py-4 px-5 text-left">Calories</th>
                <th className="py-4 px-5 text-left">Protein</th>
                <th className="py-4 px-5 text-left">Carbs</th>
                <th className="py-4 px-5 text-left">Fats</th>
                <th className="py-4 px-5 text-left">Status</th>
                <th className="py-4 px-5 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredMeals.length > 0 ? (
                filteredMeals.map((meal) => (
                  <tr key={meal._id} className="border-b hover:bg-gray-50">
                    <td className="py-4 px-5">{meal.mealType}</td>
                    <td className="py-4 px-5">{meal.foodItems}</td>
                    <td className="py-4 px-5">{meal.time}</td>
                    <td className="py-4 px-5">{meal.calories}</td>
                    <td className="py-4 px-5">{meal.protein}</td>
                    <td className="py-4 px-5">{meal.carbs}</td>
                    <td className="py-4 px-5">{meal.fats}</td>
                    <td className="py-4 px-5">
                      {meal.status === "Completed" ? (
                        <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-xs">
                          Completed
                        </span>
                      ) : (
                        <select
                          value={meal.status}
                          onChange={(e) =>
                            updateMealStatus(meal._id, e.target.value)
                          }
                          className="bg-gray-100 px-2 py-1 rounded-full text-xs"
                        >
                          <option value="Pending">Pending</option>
                        </select>
                      )}
                    </td>
                    <td className="py-4 px-5 flex gap-2">
                      <button
                        onClick={() => deleteMeal(meal._id)}
                        className="bg-red-500 text-white px-2 py-1 rounded text-xs"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9} className="text-center py-4">
                    No meals found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>

      {/* Add Meal Modal */}
      <div
        id="meal-modal"
        tabIndex="-1"
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
                ✕
              </button>
            </div>

            <form onSubmit={handleAddMeal}>
              <div className="grid gap-4 grid-cols-2">
                <div className="col-span-2">
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Meal Type
                  </label>
                  <select
                    name="mealType"
                    value={formData.mealType}
                    onChange={handleChange}
                    required
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                  >
                    <option value="">Select meal type</option>
                    <option value="Breakfast">Breakfast</option>
                    <option value="Snack">Snack</option>
                    <option value="Lunch">Lunch</option>
                    <option value="Dinner">Dinner</option>
                  </select>
                </div>

                <div className="col-span-2">
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Food Items
                  </label>
                  <input
                    name="foodItems"
                    value={formData.foodItems}
                    onChange={handleChange}
                    required
                    placeholder="e.g., Chicken, Rice, Salad"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                  />
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Time
                  </label>
                  <input
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    type="time"
                    required
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                  />
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Calories
                  </label>
                  <input
                    name="calories"
                    value={formData.calories}
                    onChange={handleChange}
                    type="number"
                    required
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                  />
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Protein (g)
                  </label>
                  <input
                    name="protein"
                    value={formData.protein}
                    onChange={handleChange}
                    type="number"
                    required
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                  />
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Carbs (g)
                  </label>
                  <input
                    name="carbs"
                    value={formData.carbs}
                    onChange={handleChange}
                    type="number"
                    required
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                  />
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Fats (g)
                  </label>
                  <input
                    name="fats"
                    value={formData.fats}
                    onChange={handleChange}
                    type="number"
                    required
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                  />
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Date
                  </label>
                  <input
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    type="date"
                    required
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-4 mt-6 pt-4 border-t">
                <button
                  type="submit"
                  className="text-black bg-[#DAF17D] hover:bg-[#c5dc6a] font-medium rounded-lg text-sm px-5 py-2.5"
                >
                  <i className="fa-solid fa-plus mr-1"></i> Add Meal
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
