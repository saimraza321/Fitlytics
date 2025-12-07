import express from "express";
import {
  getProgressStats,
  getWeeklyProgress,
} from "../controller/progressController.mjs";

const progressRouter = express.Router();

progressRouter.get("/stats", getProgressStats);
progressRouter.get("/weekly", getWeeklyProgress);

export default progressRouter;
