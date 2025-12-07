import mongoose from "mongoose";

const ScheduleSchema = new mongoose.Schema(
  {
    meal: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Meal",
      required: false,
    },
    exercise: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Exercise",
      required: true, // exercise required
    },
    date: {
      type: String, // YYYY-MM-DD
      required: true,
    },
    time: {
      type: String,
      enum: ["morning", "noon", "evening", "night"],
      required: true,
    },
    // NEW FIELDS
    exerciseStatus: {
      type: String,
      enum: ["pending", "started", "completed"],
      default: "pending",
    },
    startTime: { type: Date },
    endTime: { type: Date },
    caloriesBurnt: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Schedule", ScheduleSchema);
