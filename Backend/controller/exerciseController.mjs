import Exercise from "../models/exercise.mjs";

// Create Exercise - WITH USER
export const createExercise = async (req, res) => {
  try {
    // ✅ Logged-in user ki ID
    const userId = req.user.checkUser?._id || req.user._id;

    console.log("💪 Creating exercise for user:", userId);

    const { exerciseName, sets, step_1, step_2, weight, calories } = req.body;

    const exercise = await Exercise.create({
      user: userId, // ✅ User ID add karo
      exerciseName,
      sets,
      step_1,
      step_2,
      weight,
      calories,
    });

    console.log("✅ Exercise created:", exercise._id);

    res.status(201).json({ success: true, data: exercise });
  } catch (err) {
    console.error("❌ Error:", err);
    res.status(400).json({ success: false, error: err.message });
  }
};

// Get all exercises - ONLY USER'S EXERCISES
export const getExercises = async (req, res) => {
  try {
    // ✅ Sirf logged-in user ke exercises
    const userId = req.user.checkUser?._id || req.user._id;

    console.log("🔍 Fetching exercises for user:", userId);

    const exercises = await Exercise.find({ user: userId }).sort({
      createdAt: -1,
    });

    console.log("✅ Found exercises:", exercises.length);

    res.json({ success: true, data: exercises });
  } catch (err) {
    console.error("❌ Error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};

// Get single exercise - WITH SECURITY
export const getExercise = async (req, res) => {
  try {
    const userId = req.user.checkUser?._id || req.user._id;

    // ✅ Sirf apna exercise get ho
    const exercise = await Exercise.findOne({
      _id: req.params.id,
      user: userId,
    });

    if (!exercise)
      return res.status(404).json({ success: false, msg: "Not found" });

    res.json({ success: true, data: exercise });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Update Exercise - WITH SECURITY
export const updateExercise = async (req, res) => {
  try {
    const userId = req.user.checkUser?._id || req.user._id;

    // ✅ Sirf apna exercise update ho
    const exercise = await Exercise.findOneAndUpdate(
      { _id: req.params.id, user: userId },
      req.body,
      { new: true }
    );

    if (!exercise)
      return res.status(404).json({ success: false, msg: "Not found" });

    res.json({ success: true, data: exercise });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// Delete Exercise - WITH SECURITY
export const deleteExercise = async (req, res) => {
  try {
    const userId = req.user.checkUser?._id || req.user._id;

    // ✅ Sirf apna exercise delete ho
    const exercise = await Exercise.findOneAndDelete({
      _id: req.params.id,
      user: userId,
    });

    if (!exercise)
      return res.status(404).json({ success: false, msg: "Not found" });

    res.json({ success: true, msg: "Exercise deleted" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
