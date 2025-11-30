import mongoose from "mongoose";

const exerciseSchema = new mongoose.Schema(
  {
    exerciseName: { type: String, required: true },
    sets: { type: Number, required: true },
    step_1: { type: String, required: true },
    step_2: { type: String, required: true },
    weight: { type: String, required: false },
    calories: { type: Number, required: false },
    status: {
      type: String,
      enum: ["pending", "in-progress" ,"completed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Exercise", exerciseSchema);
