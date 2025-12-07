import express from "express";
import userController from "../controller/userController.mjs";
import { upload } from "../cloudinaryConfig.mjs"; // jo file aapne banayi

const userRouter = express.Router();

userRouter.post("/signup", upload.single("image"), userController.Signup);
userRouter.post("/login", userController.Login),
userRouter.post("/google-login", userController.GoogleLogin);
  userRouter.post("/forgot-password", userController.ForgotPassword);
userRouter.post("/reset-password", userController.ResetPassword);

export default userRouter;
