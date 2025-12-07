import mongoose from "mongoose";
const { Schema } = mongoose;

const mealSchema = new Schema(
  {
    userId: {
      type: String,
      required: [true, "userId is required"],
    },
    mealType: {
      type: String,
      required: [true, "meal type is required"],
    },
    foodItems: {
      type: String,
      required: [true, "food items required"],
    },
    calories: {
      type: Number,
      required: [true, "calories required"],
    },
    protein: {
      type: Number,
      required: [true, "protein required"],
    },
    carbs: {
      type: Number,
      required: [true, "carbs required"],
    },
    fats: {
      type: Number,
      required: [true, "fats required"],
    },
    date: {
      type: String,
      required: [true, "date required"],
    },
  },
  { timestamps: true }
);

const Meal = mongoose.model("Meal", mealSchema);
export default Meal;
