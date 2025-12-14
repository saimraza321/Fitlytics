// progressController.mjs
import Schedule from "../models/Schedule.mjs";
import userController from "./userController.mjs"; // auth middleware

// User-specific Progress Stats
export const getProgressStats = async (req, res) => {
  try {
    const { days = 30 } = req.query;
    const userId = req.user.checkUser?._id || req.user._id; // ✅ User-based

    // Get schedules ONLY for logged-in user
    const schedules = await Schedule.find({ user: userId })
      .populate("meal")
      .populate("exercise");

    console.log("📊 Total Schedules for user:", schedules.length);

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

    const workoutTypes = {};
    schedules.forEach((schedule) => {
      if (schedule.exercise && schedule.exerciseStatus === "completed") {
        const exerciseName = schedule.exercise.exerciseName || "Other";
        workoutTypes[exerciseName] = (workoutTypes[exerciseName] || 0) + 1;
      }
    });

    const workoutDistribution = Object.keys(workoutTypes).map((name) => ({
      type: name,
      count: workoutTypes[name],
      percentage:
        workoutsCompleted > 0
          ? ((workoutTypes[name] / workoutsCompleted) * 100).toFixed(0)
          : 0,
    }));

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

// User-specific Weekly Progress
export const getWeeklyProgress = async (req, res) => {
  try {
    const userId = req.user.checkUser?._id || req.user._id;

    // Only completed exercises for the user
    const allSchedules = await Schedule.find({
      user: userId,
      exerciseStatus: "completed",
    });

    console.log("📊 Total Completed Schedules for user:", allSchedules.length);

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
