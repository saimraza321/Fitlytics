import express from "express";
import userController from "../controller/userController.mjs";
import {
  createExercise,
  getExercises,
  getExercise,
  updateExercise,
  deleteExercise,
} from "../controller/exerciseController.mjs";

const exerciseRoutes = express.Router();

// ✅ HAR ROUTE PE AUTH MIDDLEWARE
const auth = userController.authMiddleware;

exerciseRoutes.post("/", auth, createExercise);
exerciseRoutes.get("/all", auth, getExercises);
exerciseRoutes.get("/:id", auth, getExercise);
exerciseRoutes.put("/:id", auth, updateExercise);
exerciseRoutes.delete("/:id", auth, deleteExercise);

export default exerciseRoutes;
