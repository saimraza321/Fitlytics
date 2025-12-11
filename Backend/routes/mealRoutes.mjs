import express from "express";
import userController from "../controller/userController.mjs";
import {
  createMeal,
  getAllMeals,
  getUserMeals,
  getMeal,
  updateMeal,
  updateMealStatus,
  deleteMeal,
} from "../controller/mealController.mjs";

const mealRouter = express.Router();

// ✅ HAR ROUTE PE AUTH MIDDLEWARE
const auth = userController.authMiddleware;

// Create a new meal
mealRouter.post("/", auth, createMeal);

// Get all meals (user's meals only)
mealRouter.get("/", auth, getAllMeals);

// Get meals by user
mealRouter.get("/user/:userId", auth, getUserMeals);

// Get single meal by ID
mealRouter.get("/:id", auth, getMeal);

// Update meal (all fields)
mealRouter.put("/:id", auth, updateMeal);

// Update only status
mealRouter.put("/:id/status", auth, updateMealStatus);

// Delete a meal
mealRouter.delete("/:id", auth, deleteMeal);

export default mealRouter;
