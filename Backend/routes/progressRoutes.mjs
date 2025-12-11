// progressRoutes.mjs
import express from "express";
import {
  getProgressStats,
  getWeeklyProgress,
} from "../controller/progressController.mjs";
import userController from "../controller/userController.mjs";

const progressRouter = express.Router();

// ✅ Add auth middleware so only logged-in user can access their progress
progressRouter.get("/stats", userController.authMiddleware, getProgressStats);
progressRouter.get("/weekly", userController.authMiddleware, getWeeklyProgress);

export default progressRouter;
