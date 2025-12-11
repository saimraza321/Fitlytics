import Schedule from "../models/Schedule.mjs";

export const addSchedule = async (req, res) => {
  try {
    console.log("🔍 req.user:", req.user); // ✅ Debug log
    console.log("🔍 req.user._id:", req.user?._id); // ✅ Debug log

    const { meal, exercise, date, time } = req.body;
    const userId = req.user._id;

    if (!date || !time) {
      return res.status(400).json({
        success: false,
        msg: "Date and time are required",
      });
    }

    const schedule = await Schedule.create({
      user: userId,
      meal,
      exercise,
      date,
      time,
    });

    res.status(201).json({
      success: true,
      data: schedule,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

export const getScheduleByDate = async (req, res) => {
  try {
    const dateParam = req.params.date; // "2025-12-11"
    const userId = req.user.checkUser?._id || req.user._id;

    console.log("🔍 Query params:", { dateParam, userId });

    // ✅ String comparison (agar date string hai database mein)
    const schedules = await Schedule.find({
      user: userId,
      date: new Date(dateParam), // Convert to Date object
    })
      .populate("meal")
      .populate("exercise");

    console.log("✅ Schedules found:", schedules.length);
    console.log("📋 Schedules:", schedules);

    res.json({
      success: true,
      data: schedules,
    });
  } catch (err) {
    console.error("❌ Error:", err);
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};
// Start exercise - WITH SECURITY ✅
export const startExercise = async (req, res) => {
  try {
    const schedule = await Schedule.findOne({
      _id: req.params.id,
      user: req.user._id, // ✅ Security: Sirf apna schedule
    });

    if (!schedule)
      return res
        .status(404)
        .json({ success: false, message: "Schedule not found" });

    schedule.exerciseStatus = "started";
    schedule.startTime = new Date();
    await schedule.save();

    res.json({ success: true, data: schedule });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// End exercise - WITH SECURITY ✅
export const endExercise = async (req, res) => {
  try {
    const schedule = await Schedule.findOne({
      _id: req.params.id,
      user: req.user._id, // ✅ Security: Sirf apna schedule
    }).populate("exercise");

    if (!schedule)
      return res
        .status(404)
        .json({ success: false, message: "Schedule not found" });

    if (!schedule.startTime)
      return res
        .status(400)
        .json({ success: false, message: "Exercise not started yet" });

    schedule.endTime = new Date();
    schedule.exerciseStatus = "completed";

    schedule.caloriesBurnt = schedule.exercise.calories
      ? schedule.exercise.calories * (schedule.exercise.sets || 1)
      : 0;

    await schedule.save();

    res.json({ success: true, data: schedule });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
