import Schedule from "../models/Schedule.mjs";

export const getDashboardData = async (req, res) => {
  try {
    // ✅ Logged-in user ki ID
    const userId = req.user.checkUser?._id || req.user._id;

    // ✅ Sirf is user ke schedules fetch karo
    const allSchedules = await Schedule.find({ user: userId })
      .populate("meal")
      .populate("exercise")
      .sort({ date: -1 });

    console.log("📊 Total Schedules for this user:", allSchedules.length);
    console.log(
      "📅 Sample Schedule Dates:",
      allSchedules.slice(0, 3).map((s) => ({
        date: s.date,
        exercise: s.exercise?.exerciseName,
        status: s.exerciseStatus,
        calories: s.caloriesBurnt,
      }))
    );

    // --- TODAY'S STATS (Use ALL schedules for now) ---
    let todayCaloriesBurned = 0;
    let todayCaloriesConsumed = 0;

    allSchedules.forEach((schedule) => {
      console.log("🔍 Processing:", {
        exercise: schedule.exercise?.exerciseName,
        status: schedule.exerciseStatus,
        calories: schedule.caloriesBurnt,
        meal: schedule.meal?.foodItems,
        mealCalories: schedule.meal?.calories,
      });

      // Calories burned
      if (schedule.exerciseStatus === "completed" && schedule.caloriesBurnt) {
        todayCaloriesBurned += schedule.caloriesBurnt;
      }

      // Calories consumed
      if (schedule.meal && schedule.meal.calories) {
        todayCaloriesConsumed += schedule.meal.calories;
      }
    });

    console.log("📈 Totals:", {
      burned: todayCaloriesBurned,
      consumed: todayCaloriesConsumed,
    });

    // --- WEEKLY ACTIVITY (Use ALL schedules, divide by 7) ---
    const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const completedSchedules = allSchedules.filter(
      (s) => s.exerciseStatus === "completed"
    );
    const schedulesPerDay = Math.ceil(completedSchedules.length / 7);

    const weeklyActivity = weekDays.map((day, index) => {
      const daySchedules = completedSchedules.slice(
        index * schedulesPerDay,
        (index + 1) * schedulesPerDay
      );

      let dayCalories = 0;
      daySchedules.forEach((s) => {
        dayCalories += s.caloriesBurnt || 0;
      });

      return {
        day,
        calories: dayCalories,
        workouts: daySchedules.length,
      };
    });

    console.log("📊 Weekly Activity:", weeklyActivity);

    // --- WORKOUT PROGRESS ---
    const completedWorkouts = allSchedules.filter(
      (s) => s.exerciseStatus === "completed" && s.exercise
    );

    const workoutTypeStats = {};
    completedWorkouts.forEach((schedule) => {
      const type = schedule.exercise.exerciseName || "Other";
      workoutTypeStats[type] = (workoutTypeStats[type] || 0) + 1;
    });

    const workoutProgress = Object.keys(workoutTypeStats).map((type) => ({
      type,
      count: workoutTypeStats[type],
      percentage:
        completedWorkouts.length > 0
          ? Math.round(
              (workoutTypeStats[type] / completedWorkouts.length) * 100
            )
          : 0,
    }));

    const weeklyGoalPercentage = Math.min(
      Math.round((completedWorkouts.length / 7) * 100),
      100
    );

    console.log("🎯 Workout Progress:", {
      overall: weeklyGoalPercentage,
      types: workoutProgress,
    });

    // --- TODAY'S SCHEDULE (Show first 2 schedules) ---
    const todayScheduleItems = allSchedules
      .filter((s) => s.exercise || s.meal)
      .slice(0, 2)
      .map((s) => ({
        id: s._id,
        title: s.exercise
          ? s.exercise.exerciseName
          : s.meal
          ? s.meal.foodItems
          : "Activity",
        time: s.time || "Not scheduled",
        status: s.exerciseStatus || "pending",
        type: s.exercise ? "exercise" : "meal",
      }));

    console.log("📋 Today's Schedule:", todayScheduleItems);

    // --- RECENT ACTIVITY (Last 3 completed) ---
    const recentActivity = completedWorkouts.slice(0, 3).map((s) => ({
      title: s.exercise.exerciseName,
      date: s.date,
      time: s.endTime
        ? new Date(s.endTime).toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
          })
        : "Completed",
    }));

    console.log("⏱️ Recent Activity:", recentActivity);

    // --- RESPONSE ---
    res.status(200).json({
      success: true,
      data: {
        today: {
          caloriesBurned: todayCaloriesBurned,
          caloriesConsumed: todayCaloriesConsumed,
          date: new Date().toLocaleDateString(),
        },
        weeklyActivity,
        workoutProgress: {
          overall: weeklyGoalPercentage,
          types: workoutProgress,
        },
        todaySchedule: todayScheduleItems,
        recentActivity,
      },
    });
  } catch (error) {
    console.error("❌ Dashboard Error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
