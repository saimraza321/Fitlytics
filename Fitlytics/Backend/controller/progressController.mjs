import Schedule from "../models/Schedule.mjs";

export const getProgressStats = async (req, res) => {
  try {
    const { days = 30 } = req.query;

    // Get ALL schedules (without date filter for now)
    const schedules = await Schedule.find()
      .populate("meal")
      .populate("exercise");

    console.log("📊 Total Schedules:", schedules.length);

    // --- Calculate Stats ---

    let totalCaloriesBurned = 0;
    let workoutsCompleted = 0;
    let totalExerciseMinutes = 0;

    schedules.forEach((schedule) => {
      if (schedule.exerciseStatus === "completed" && schedule.caloriesBurnt) {
        totalCaloriesBurned += schedule.caloriesBurnt;
        workoutsCompleted++;

        if (schedule.startTime && schedule.endTime) {
          const duration =
            (new Date(schedule.endTime) - new Date(schedule.startTime)) /
            (1000 * 60);
          totalExerciseMinutes += duration;
        }
      }
    });

    let totalCaloriesConsumed = 0;
    let mealsCompleted = 0;

    schedules.forEach((schedule) => {
      if (schedule.meal && schedule.meal.calories) {
        totalCaloriesConsumed += schedule.meal.calories;
        mealsCompleted++;
      }
    });

    const hoursExercised = (totalExerciseMinutes / 60).toFixed(1);
    const netCalories = totalCaloriesConsumed - totalCaloriesBurned;

    // 🔥 WORKOUT TYPES - Exercise Name se group karo
    const workoutTypes = {};

    schedules.forEach((schedule) => {
      if (schedule.exercise && schedule.exerciseStatus === "completed") {
        // Exercise ka name use karo as type
        const exerciseName = schedule.exercise.exerciseName || "Other";
        workoutTypes[exerciseName] = (workoutTypes[exerciseName] || 0) + 1;
      }
    });

    console.log("🏋️ Workout Types Count:", workoutTypes);

    // Convert to array with percentage
    const workoutDistribution = Object.keys(workoutTypes).map((name) => ({
      type: name, // Exercise name as type
      count: workoutTypes[name],
      percentage:
        workoutsCompleted > 0
          ? ((workoutTypes[name] / workoutsCompleted) * 100).toFixed(0)
          : 0,
    }));

    console.log("📈 Final Stats:", {
      totalCaloriesBurned,
      totalCaloriesConsumed,
      workoutsCompleted,
      hoursExercised,
      workoutDistribution,
    });

    res.status(200).json({
      success: true,
      data: {
        totalCaloriesBurned,
        totalCaloriesConsumed,
        netCalories,
        workoutsCompleted,
        mealsCompleted,
        hoursExercised,
        workoutDistribution,
        dateRange: {
          start: null,
          end: null,
          days,
        },
      },
    });
  } catch (error) {
    console.error("❌ Error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Weekly progress bhi update karo
export const getWeeklyProgress = async (req, res) => {
  try {
    // Temporarily get ALL schedules
    const allSchedules = await Schedule.find({
      exerciseStatus: "completed",
    });

    console.log("📊 Total Completed Schedules:", allSchedules.length);

    // For now, divide equally in 4 weeks (temporary)
    const weeks = [];
    const schedulesPerWeek = Math.floor(allSchedules.length / 4);

    for (let i = 0; i < 4; i++) {
      const weekSchedules = allSchedules.slice(
        i * schedulesPerWeek,
        (i + 1) * schedulesPerWeek
      );

      let weekCalories = 0;
      weekSchedules.forEach((s) => {
        weekCalories += s.caloriesBurnt || 0;
      });

      weeks.push({
        week: `Week ${i + 1}`,
        calories: weekCalories,
        workouts: weekSchedules.length,
      });
    }

    console.log("📊 Weekly Data:", weeks);

    res.status(200).json({
      success: true,
      data: weeks,
    });
  } catch (error) {
    console.error("❌ Weekly Error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
