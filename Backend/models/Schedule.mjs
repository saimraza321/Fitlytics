import mongoose from "mongoose";

const scheduleSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Yahan "User" aapke User model ka naam hai
      required: true, // Ye zaruri hai
    },
    meal: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Meal",
    },
    exercise: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Exercise",
    },
    date: {
      type: Date,
      required: true,
    },
    time: String,
    exerciseStatus: {
      type: String,
      enum: ["pending", "started", "completed"],
      default: "pending",
    },
    startTime: Date,
    endTime: Date,
    caloriesBurnt: Number,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Schedule", scheduleSchema);
