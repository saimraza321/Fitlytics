import express from "express";
import { getDashboardData } from "../controller/dashboardController.mjs";
import userController from "../controller/userController.mjs";

const dashboardRouter = express.Router();

dashboardRouter.get("/", userController.authMiddleware, getDashboardData);

export default dashboardRouter;
