import express from "express";
import {
  createExercise,
  getExercises,
  getExercise,
  updateExercise,
  deleteExercise
} from "../controller/exerciseController.mjs";

const exerciseRoutes = express.Router();

exerciseRoutes.post("/", createExercise);
exerciseRoutes.get("/all", getExercises);
exerciseRoutes.get("/:id", getExercise);
exerciseRoutes.put("/:id", updateExercise);
exerciseRoutes.delete("/:id", deleteExercise);

export default exerciseRoutes;
