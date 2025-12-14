import express from "express";
import {
  addSchedule,
  getScheduleByDate,
  startExercise,
  endExercise,
} from "../controller/scheduleController.mjs";
import userController from "../controller/userController.mjs";

const scheduleRouter = express.Router();

scheduleRouter.post("/add", userController.authMiddleware,addSchedule);
scheduleRouter.get("/:date", userController.authMiddleware,getScheduleByDate);
scheduleRouter.post("/start/:id",userController.authMiddleware, startExercise); // changed to POST
scheduleRouter.post("/end/:id",userController.authMiddleware, endExercise); // added

export default scheduleRouter;
