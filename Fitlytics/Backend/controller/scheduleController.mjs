import Schedule from "../models/Schedule.mjs";

export const addSchedule = async (req, res) => {
  try {
    const { meal, exercise, date, time } = req.body;

    if (!date || !time) {
      return res.status(400).json({
        success: false,
        msg: "Date and time are required",
      });
    }

    const schedule = await Schedule.create({
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
    const date = req.params.date;

    const schedules = await Schedule.find({ date })
      .populate("meal")
      .populate("exercise");

    res.json({
      success: true,
      data: schedules,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

// Start exercise
export const startExercise = async (req, res) => {
  try {
    const schedule = await Schedule.findById(req.params.id);
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

// End exercise
export const endExercise = async (req, res) => {
  try {
    const schedule = await Schedule.findById(req.params.id).populate(
      "exercise"
    );
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

    // Simple calories calculation (example: calories = exercise.calories * sets)
    schedule.caloriesBurnt = schedule.exercise.calories
      ? schedule.exercise.calories * (schedule.exercise.sets || 1)
      : 0;

    await schedule.save();

    res.json({ success: true, data: schedule });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
