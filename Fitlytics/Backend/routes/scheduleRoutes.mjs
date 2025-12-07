import express from "express";
import {
  addSchedule,
  getScheduleByDate,
  startExercise,
  endExercise,
} from "../controller/scheduleController.mjs";

const scheduleRouter = express.Router();

scheduleRouter.post("/add", addSchedule);
scheduleRouter.get("/:date", getScheduleByDate);
scheduleRouter.post("/start/:id", startExercise); // changed to POST
scheduleRouter.post("/end/:id", endExercise); // added

export default scheduleRouter;
