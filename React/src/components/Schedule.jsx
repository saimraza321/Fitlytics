import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const API_BASE = "http://localhost:3000";

const timeslots = [
  { key: "morning", label: "Morning" },
  { key: "noon", label: "Noon" },
  { key: "evening", label: "Evening" },
  { key: "night", label: "Night" },
];

const todayISO = () => new Date().toISOString().split("T")[0];

const Schedule = () => {
  const [meals, setMeals] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [selectedDate, setSelectedDate] = useState(todayISO());
  const [schedules, setSchedules] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    exercise: "",
    meal: "",
    date: todayISO(),
    time: "morning",
  });
  const [summary, setSummary] = useState({
    thisDay: 0,
    completed: 0,
    remaining: 0,
    netCalories: 0,
  });

  // ✅ Token from localStorage
  const token = localStorage.getItem("token");
  const axiosConfig = { headers: { Authorization: `Bearer ${token}` } };

  useEffect(() => {
    fetchMeals();
    fetchExercises();
    fetchSchedule(selectedDate);
  }, []);

  useEffect(() => {
    fetchSchedule(selectedDate);
  }, [selectedDate]);

  const fetchMeals = async () => {
    try {
      const res = await axios.get(`${API_BASE}/meal`, axiosConfig);
      setMeals(res.data?.data ?? []);
    } catch (err) {
      console.error("Fetch meals error:", err);
      Swal.fire("Error", "Failed to fetch meals", "error");
    }
  };

  const fetchExercises = async () => {
    try {
      const res = await axios.get(`${API_BASE}/exercise/all`, axiosConfig);
      setExercises(res.data?.data ?? []);
    } catch (err) {
      console.error("Fetch exercises error:", err);
      Swal.fire("Error", "Failed to fetch exercises", "error");
    }
  };

  const fetchSchedule = async (date) => {
    try {
      const res = await axios.get(`${API_BASE}/schedule/${date}`, axiosConfig);
      const data = res.data?.data ?? [];
      setSchedules(Array.isArray(data) ? data : []);
      recalcSummary(data);
    } catch (err) {
      console.error("Fetch schedule error:", err);
      setSchedules([]);
      Swal.fire("Error", "Failed to fetch schedule", "error");
    }
  };

  const recalcSummary = (data) => {
    const arr = Array.isArray(data) ? data : [];
    const thisDay = arr.length;
    const completed = arr.filter(
      (s) => s.exerciseStatus === "completed"
    ).length;
    const remaining = Math.max(0, thisDay - completed);
    const netCalories = arr.reduce((acc, s) => {
      const mealCals = s.meal?.calories || 0;
      const burntCals = s.caloriesBurnt || 0;
      return acc + (mealCals - burntCals);
    }, 0);
    setSummary({ thisDay, completed, remaining, netCalories });
  };

  const openAddModal = () => {
    setForm({ exercise: "", meal: "", date: selectedDate, time: "morning" });
    setShowModal(true);
  };

  const closeModal = () => {
    if (submitting) return;
    setShowModal(false);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleAddSchedule = async (e) => {
    e.preventDefault();
    if (!form.exercise) {
      return Swal.fire("Validation", "Exercise is required.", "warning");
    }
    if (!form.date || !form.time) {
      return Swal.fire("Validation", "Date and time are required.", "warning");
    }

    setSubmitting(true);
    try {
      const payload = {
        exercise: form.exercise,
        ...(form.meal ? { meal: form.meal } : {}),
        date: form.date,
        time: form.time,
      };
      const res = await axios.post(
        `${API_BASE}/schedule/add`,
        payload,
        axiosConfig
      );
      if (res.data?.success) {
        Swal.fire({
          icon: "success",
          title: "Added",
          timer: 1400,
          showConfirmButton: false,
        });
        setShowModal(false);
        fetchSchedule(selectedDate);
      } else {
        Swal.fire(
          "Error",
          res.data?.message || "Failed to add schedule",
          "error"
        );
      }
    } catch (err) {
      console.error("Add schedule error:", err);
      const msg =
        err.response?.data?.message || err.response?.data?.error || err.message;
      Swal.fire("Error", msg, "error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleStart = async (id) => {
    try {
      await axios.post(`${API_BASE}/schedule/start/${id}`, {}, axiosConfig);
      fetchSchedule(selectedDate);
    } catch (err) {
      Swal.fire(
        "Error",
        err.response?.data?.message || "Failed to start exercise",
        "error"
      );
    }
  };

  const handleEnd = async (id) => {
    try {
      await axios.post(`${API_BASE}/schedule/end/${id}`, {}, axiosConfig);
      fetchSchedule(selectedDate);
    } catch (err) {
      Swal.fire(
        "Error",
        err.response?.data?.message || "Failed to end exercise",
        "error"
      );
    }
  };

  const grouped = timeslots.reduce((acc, t) => {
    acc[t.key] = schedules.filter((s) => s.time === t.key);
    return acc;
  }, {});

  return (
    <>
      <main className="flex-1 p-4 xl:p-6 overflow-y-scroll">
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">
              My Schedule
            </h1>
            <p className="text-sm text-slate-400">Plan your workouts & meals</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center bg-white rounded-full shadow p-1 pr-3">
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="bg-transparent text-sm p-2 focus:outline-none border-0"
              />
            </div>

            <button
              onClick={openAddModal}
              className="mt-3 sm:mt-0 px-6 py-2 bg-[#DAF17D] hover:bg-[#c5d96e] rounded-xl font-medium text-slate-900 transition duration-300 flex items-center"
            >
              <i className="fa-solid fa-plus mr-2"></i>Add Session
            </button>
          </div>
        </header>

        {/* summary cards */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 mb-6">
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
            <p className="text-xs text-slate-400 uppercase tracking-wide mb-1">
              This Day
            </p>
            <p className="text-2xl font-semibold text-slate-900">
              {summary.thisDay}
            </p>
            <p className="text-xs text-slate-500">sessions planned</p>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
            <p className="text-xs text-slate-400 uppercase tracking-wide mb-1">
              Completed
            </p>
            <p className="text-2xl font-semibold text-lime-600">
              {summary.completed}
            </p>
            <p className="text-xs text-slate-500">workouts done</p>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
            <p className="text-xs text-slate-400 uppercase tracking-wide mb-1">
              Remaining
            </p>
            <p className="text-2xl font-semibold text-sky-600">
              {summary.remaining}
            </p>
            <p className="text-xs text-slate-500">sessions left</p>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
            <p className="text-xs text-slate-400 uppercase tracking-wide mb-1">
              Net Calories
            </p>
            <p className="text-2xl font-semibold text-rose-600">
              {summary.netCalories}
            </p>
            <p className="text-xs text-slate-500">calories remaining</p>
          </div>
        </div>

        {/* Schedule grid */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            {timeslots.map((t) => (
              <div
                key={t.key}
                className="border border-slate-200 rounded-xl p-3"
              >
                <p className="text-xs text-slate-400 mb-2">{t.label}</p>
                <div className="space-y-2">
                  {grouped[t.key] && grouped[t.key].length > 0 ? (
                    grouped[t.key].map((entry) => {
                      const title =
                        entry.exercise?.exerciseName ||
                        entry.meal?.mealType ||
                        "Session";
                      return (
                        <div
                          key={entry._id}
                          className={`bg-white rounded-lg p-3 border-l-4 ${
                            entry.exerciseStatus === "completed"
                              ? "border-gray-400"
                              : entry.exerciseStatus === "started"
                              ? "border-blue-400"
                              : t.key === "morning"
                              ? "border-lime-400"
                              : t.key === "noon"
                              ? "border-amber-400"
                              : t.key === "evening"
                              ? "border-sky-400"
                              : "border-purple-400"
                          }`}
                        >
                          <p className="text-xs font-medium text-slate-800">
                            {title}
                          </p>
                          {entry.exercise && (
                            <p className="text-[10px] text-slate-500 mt-1">
                              Sets: {entry.exercise.sets}
                            </p>
                          )}
                          {entry.meal && (
                            <p className="text-[10px] text-slate-500 mt-1">
                              Food: {entry.meal.foodItems}
                            </p>
                          )}
                          <div className="mt-2 flex gap-2">
                            {entry.exercise &&
                              entry.exerciseStatus === "pending" && (
                                <button
                                  onClick={() => handleStart(entry._id)}
                                  className="px-2 py-1 text-xs bg-lime-400 hover:bg-lime-500 text-white rounded"
                                >
                                  Start
                                </button>
                              )}
                            {entry.exercise &&
                              entry.exerciseStatus === "started" && (
                                <button
                                  onClick={() => handleEnd(entry._id)}
                                  className="px-2 py-1 text-xs bg-blue-400 hover:bg-blue-500 text-white rounded"
                                >
                                  End
                                </button>
                              )}
                            {entry.exercise &&
                              entry.exerciseStatus === "completed" && (
                                <span className="px-2 py-1 text-xs bg-gray-300 rounded">
                                  Completed
                                </span>
                              )}
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <p className="text-xs text-slate-400">No sessions</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Next Up */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Next Up</h2>
          <div className="space-y-3">
            {schedules.slice(0, 3).map((s) => (
              <div
                key={s._id}
                className="flex items-center justify-between p-4 rounded-xl hover:bg-slate-50 border border-slate-200"
              >
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-xl bg-lime-200 flex items-center justify-center">
                    <i className="fa-solid fa-dumbbell text-lime-700"></i>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">
                      {s.exercise?.exerciseName ||
                        s.meal?.mealType ||
                        "Session"}
                    </p>
                    <p className="text-sm text-slate-500">
                      {s.time} • {s.date}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="relative p-4 w-full max-w-2xl max-h-full">
            <div className="relative bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between border-b pb-4 mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Add Session
                </h3>
                <button
                  onClick={closeModal}
                  type="button"
                  className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleAddSchedule}>
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                  <div className="col-span-2">
                    <label className="block mb-2 text-sm font-medium text-gray-900">
                      Exercise (required)
                    </label>
                    <select
                      name="exercise"
                      value={form.exercise}
                      onChange={handleFormChange}
                      required
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                    >
                      <option value="">Select exercise</option>
                      {exercises.map((ex) => (
                        <option key={ex._id} value={ex._id}>
                          {ex.exerciseName}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-span-2">
                    <label className="block mb-2 text-sm font-medium text-gray-900">
                      Meal (optional)
                    </label>
                    <select
                      name="meal"
                      value={form.meal}
                      onChange={handleFormChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                    >
                      <option value="">No meal</option>
                      {meals.map((m) => (
                        <option key={m._id} value={m._id}>
                          {m.mealType
                            ? `${m.mealType} — ${m.foodItems ?? ""}`
                            : m.foodItems}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900">
                      Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={form.date}
                      onChange={handleFormChange}
                      required
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900">
                      Time of day
                    </label>
                    <select
                      name="time"
                      value={form.time}
                      onChange={handleFormChange}
                      required
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                    >
                      <option value="morning">Morning</option>
                      <option value="noon">Noon</option>
                      <option value="evening">Evening</option>
                      <option value="night">Night</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center space-x-4 mt-6 pt-4 border-t">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="text-black bg-[#DAF17D] hover:bg-[#c5dc6a] font-medium rounded-lg text-sm px-5 py-2.5 disabled:opacity-50"
                  >
                    {submitting ? "Adding..." : "Add Session"}
                  </button>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="text-gray-700 bg-gray-200 hover:bg-gray-300 font-medium rounded-lg text-sm px-5 py-2.5"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Schedule;
