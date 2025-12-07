import express from "express";
import {
  createMeal,
  getAllMeals,
  getUserMeals,
  updateMeal,
  updateMealStatus,
  deleteMeal,
} from "../controller/mealController.mjs";

const mealRouter = express.Router();

// Create a new meal
mealRouter.post("/", createMeal);

// Get all meals
mealRouter.get("/", getAllMeals);

// Get meals by user
mealRouter.get("/user/:userId", getUserMeals);

// Get single meal by ID
mealRouter.get("/:id", async (req, res) => {
  try {
    const meal = await Meal.findById(req.params.id);
    if (!meal)
      return res
        .status(404)
        .json({ success: false, message: "Meal not found" });
    res.status(200).json({ success: true, data: meal });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update meal (all fields)
mealRouter.put("/:id", updateMeal);

// Update only status
mealRouter.put("/:id/status", updateMealStatus);

// Delete a meal
mealRouter.delete("/:id", deleteMeal);

export default mealRouter;
