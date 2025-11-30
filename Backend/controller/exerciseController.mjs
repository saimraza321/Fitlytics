import Exercise from "../models/exercise.mjs";

// Create Exercise
export const createExercise = async (req, res) => {
  try {
    const { exerciseName, sets, step_1, step_2, weight, calories, status } =
      req.body;

    // Create new exercise using only the fields we want
    const exercise = await Exercise.create({
      exerciseName,
      sets,
      step_1,
      step_2,
      weight,
      calories,
      status, // optional, will default to "pending" if not provided
    });

    res.status(201).json({ success: true, data: exercise });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// Get all exercises
export const getExercises = async (req, res) => {
  try {
    const exercises = await Exercise.find();
    res.json({ success: true, data: exercises });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Get single exercise
export const getExercise = async (req, res) => {
  try {
    const exercise = await Exercise.findById(req.params.id);
    if (!exercise)
      return res.status(404).json({ success: false, msg: "Not found" });

    res.json({ success: true, data: exercise });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Update Exercise
  export const updateExercise = async (req, res) => {
    try {
      const exercise = await Exercise.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      res.json({ success: true, data: exercise });
    } catch (err) {
      res.status(400).json({ success: false, error: err.message });
    }
  };

// Delete Exercise
export const deleteExercise = async (req, res) => {
  try {
    await Exercise.findByIdAndDelete(req.params.id);
    res.json({ success: true, msg: "Exercise deleted" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
