import mongoose from "mongoose";

const exerciseSchema = new mongoose.Schema(
  {
    user: {
      // ✅ User field add karo
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    exerciseName: { type: String, required: true },
    sets: { type: Number, required: true },
    step_1: { type: String, required: true },
    step_2: { type: String, required: true },
    weight: { type: String, required: false },
    calories: { type: Number, required: false },
  },
  { timestamps: true }
);

const Exercise =
  mongoose.models.Exercise || mongoose.model("Exercise", exerciseSchema);

export default Exercise;
