import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";

const Exercises = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [openExerciseModal, setOpenExerciseModal] = useState(false);
  const [formData, setFormData] = useState({
    exerciseName: "",
    sets: "",
    step_1: "",
    step_2: "",
    weight: "",
    calories: "",
    status: "pending",
    categoryColor: "#DAF17D",
    notes: "",
  });

  const [exercises, setExercises] = useState([]);

  // ✅ Helper function to get token
  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };

  // Fetch all exercises on component mount
  useEffect(() => {
    fetchExercises();
  }, []);

  const fetchExercises = async () => {
    try {
      // ✅ Token ke saath request
      const response = await axios.get(
        "http://localhost:3000/exercise/all",
        getAuthHeaders()
      );

      if (response.data.success) {
        setExercises(response.data.data);
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to fetch exercises.",
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // ✅ Token ke saath request
      await axios.post(
        "http://localhost:3000/exercise",
        formData,
        getAuthHeaders()
      );

      Swal.fire({
        icon: "success",
        title: "Exercise Added!",
        text: "Your exercise has been added successfully.",
        timer: 2000,
        showConfirmButton: false,
      });

      setFormData({
        exerciseName: "",
        sets: "",
        step_1: "",
        step_2: "",
        weight: "",
        calories: "",
        status: "pending",
        categoryColor: "#DAF17D",
        notes: "",
      });

      setOpenExerciseModal(false);
      fetchExercises();
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error.response?.data?.error ||
          "An error occurred while adding the exercise.",
      });
    }
  };

  // Update status
  const updateStatus = async (id, newStatus) => {
    try {
      // ✅ Token ke saath request
      const response = await axios.put(
        `http://localhost:3000/exercise/${id}`,
        { status: newStatus },
        getAuthHeaders()
      );

      if (response.data.success) {
        Swal.fire({
          icon: "success",
          title: "Status Updated",
          text: "Exercise status has been updated successfully.",
          timer: 1500,
          showConfirmButton: false,
        });

        fetchExercises();
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.error || "Failed to update status",
      });
    }
  };

  // Delete exercise
  const deleteExercise = async (id) => {
    try {
      const confirm = await Swal.fire({
        title: "Are you sure?",
        text: "This exercise will be deleted permanently!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (confirm.isConfirmed) {
        // ✅ Token ke saath request
        await axios.delete(
          `http://localhost:3000/exercise/${id}`,
          getAuthHeaders()
        );

        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "Exercise has been deleted.",
          timer: 2000,
          showConfirmButton: false,
        });

        fetchExercises();
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.error || "Failed to delete exercise",
      });
    }
  };

  // Filter exercises based on search and status filter
  const filteredExercises = exercises.filter((ex) => {
    const matchesSearch = ex.exerciseName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter ? ex.status === statusFilter : true;
    return matchesSearch && matchesStatus;
  });

  return (
    <>
      <main className="flex-1 flex flex-col gap-4 p-4 xl:p-6 bg-[#EFEFF1] overflow-y-scroll">
        {/* Header and Filters */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Exercises</h1>
        </div>

        {/* Search + Status Filter */}
        <div className="bg-white p-3 rounded-2xl shadow">
          <div className="flex items-center justify-between gap-3 flex-wrap mb-3">
            <div className="flex items-center bg-gray-100 px-4 py-2 rounded-full w-72">
              <i className="fa-solid fa-magnifying-glass text-gray-500 mr-2 text-sm"></i>
              <input
                placeholder="Search for exercise"
                className="bg-transparent focus:outline-none w-full text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button
              onClick={() => setOpenExerciseModal(true)}
              className="bg-[#daf27a] px-6 py-2 rounded-full font-medium text-sm shadow"
            >
              <i className="fa-solid fa-plus"></i> Add Exercise
            </button>
          </div>

          {/* Exercises Table */}
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
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredExercises.length > 0 ? (
                  filteredExercises.map((ex) => (
                    <tr key={ex._id} className="border-b hover:bg-gray-50">
                      <td className="py-4 px-5 flex items-center gap-3">
                        <span
                          className="w-8 h-8 rounded-full flex items-center justify-center text-lg"
                          style={{
                            backgroundColor: ex.categoryColor || "#DAF17D",
                          }}
                        ></span>
                        {ex.exerciseName}
                      </td>
                      <td className="py-4 px-5">{ex.sets}</td>
                      <td className="py-4 px-5">{ex.step_1}</td>
                      <td className="py-4 px-5">{ex.step_2}</td>
                      <td className="py-4 px-5">{ex.weight} kg</td>
                      <td className="py-4 px-5">{ex.calories} cal</td>
                      <td className="py-4 px-5 flex gap-2">
                        <button
                          className="bg-red-500 text-white px-2 py-1 rounded text-xs"
                          onClick={() => deleteExercise(ex._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="text-center py-4">
                      No exercises found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
      {openExerciseModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between border-b pb-4 mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Add New Exercise
              </h3>

              <button
                onClick={() => setOpenExerciseModal(false)}
                className="text-gray-500 hover:text-black"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 grid-cols-2">
                <div className="col-span-2">
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Exercise Name
                  </label>
                  <input
                    type="text"
                    name="exerciseName"
                    value={formData.exerciseName}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
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
                    name="sets"
                    value={formData.sets}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 rounded-lg block w-full p-2.5"
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
                    name="step_1"
                    value={formData.step_1}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 rounded-lg block w-full p-2.5"
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
                    name="step_2"
                    value={formData.step_2}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 rounded-lg block w-full p-2.5"
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
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 rounded-lg block w-full p-2.5"
                    placeholder="40"
                  />
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Calories
                  </label>
                  <input
                    type="number"
                    name="calories"
                    value={formData.calories}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 rounded-lg block w-full p-2.5"
                    placeholder="180"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Notes (Optional)
                  </label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows="3"
                    className="bg-gray-50 border border-gray-300 rounded-lg block w-full p-2.5"
                    placeholder="Add any additional notes..."
                  ></textarea>
                </div>
              </div>

              <div className="flex items-center space-x-4 mt-6 pt-4 border-t">
                <button
                  type="submit"
                  className="text-black bg-[#DAF17D] hover:bg-[#c5dc6a] font-medium rounded-lg text-sm px-5 py-2.5"
                >
                  Add Exercise
                </button>

                <button
                  type="button"
                  onClick={() => setOpenExerciseModal(false)}
                  className="text-gray-700 bg-gray-200 hover:bg-gray-300 font-medium rounded-lg text-sm px-5 py-2.5"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Exercises;
