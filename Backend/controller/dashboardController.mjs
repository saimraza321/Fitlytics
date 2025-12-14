import Schedule from "../models/Schedule.mjs";
export const getDashboardData = async (req, res) => {
  try {
    const userId = req.user.checkUser?._id || req.user._id;

    const allSchedules = await Schedule.find({ user: userId })
      .populate("meal")
      .populate("exercise")
      .sort({ date: -1 });

    console.log("🔍 Total Schedules:", allSchedules.length);

    if (allSchedules.length === 0) {
      return res.status(200).json({
        success: true,
        data: {
          today: {
            caloriesBurned: 0,
            caloriesConsumed: 0,
            date: new Date().toLocaleDateString(),
          },
          weeklyActivity: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
            (day) => ({ day, calories: 0, workouts: 0 })
          ),
          workoutProgress: { overall: 0, types: [] },
          todaySchedule: [],
          recentActivity: [],
        },
      });
    }

    const formatDate = (date) => {
      const d = new Date(date);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    const today = new Date();
    const todayStr = formatDate(today);

    // ✅ FIX: Week start calculation
    const weekStart = new Date(today);
    const dayOfWeek = today.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday

    // ✅ Agar Sunday (0) hai to 6 days peeche, warna (dayOfWeek - 1) days peeche
    const daysToSubtract = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    weekStart.setDate(today.getDate() - daysToSubtract);

    console.log("📅 Today:", todayStr, `(Day: ${dayOfWeek})`);
    console.log("📅 Week Start:", formatDate(weekStart));

    // --- TODAY'S STATS ---
    const todaySchedules = allSchedules.filter((s) => {
      const scheduleDate = formatDate(s.date);
      return scheduleDate === todayStr;
    });

    console.log("📅 Today's Schedules:", todaySchedules.length);

    let todayCaloriesBurned = 0;
    let todayCaloriesConsumed = 0;

    todaySchedules.forEach((schedule) => {
      if (schedule.exerciseStatus === "completed" && schedule.caloriesBurnt) {
        todayCaloriesBurned += schedule.caloriesBurnt;
      }
      if (schedule.meal && schedule.meal.calories) {
        todayCaloriesConsumed += schedule.meal.calories;
      }
    });

    console.log("📈 Today's Totals:", {
      burned: todayCaloriesBurned,
      consumed: todayCaloriesConsumed,
    });

    // --- WEEKLY ACTIVITY ---
    const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    const weeklyActivity = weekDays.map((day, index) => {
      const dayDate = new Date(weekStart);
      dayDate.setDate(weekStart.getDate() + index);
      const dayDateStr = formatDate(dayDate);

      const daySchedules = allSchedules.filter((s) => {
        const scheduleDate = formatDate(s.date);
        return scheduleDate === dayDateStr && s.exerciseStatus === "completed";
      });

      let dayCalories = 0;
      daySchedules.forEach((s) => {
        dayCalories += s.caloriesBurnt || 0;
      });

      console.log(`📊 ${day} (${dayDateStr}):`, {
        workouts: daySchedules.length,
        calories: dayCalories,
      });

      return {
        day,
        date: dayDateStr,
        calories: dayCalories,
        workouts: daySchedules.length,
      };
    });

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

    // --- TODAY'S SCHEDULE ---
    const todayScheduleItems = todaySchedules
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

    // --- RECENT ACTIVITY ---
    const recentActivity = completedWorkouts.slice(0, 3).map((s) => ({
      title: s.exercise.exerciseName,
      date: new Date(s.date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      time: s.endTime
        ? new Date(s.endTime).toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
          })
        : "Completed",
    }));

    // --- RESPONSE ---
    res.status(200).json({
      success: true,
      data: {
        today: {
          caloriesBurned: todayCaloriesBurned,
          caloriesConsumed: todayCaloriesConsumed,
          date: today.toLocaleDateString(),
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
