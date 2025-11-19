import express from "express";
import userController from "../controller/userController.mjs";
import { upload } from "../cloudinaryConfig.mjs"; // jo file aapne banayi

const userRouter = express.Router();

userRouter.post("/signup", upload.single("image"), userController.Signup);
userRouter.post("/login", userController.Login),
userRouter.post("/forgot-password", userController.ForgotPassword),  // Forgot password route
userRouter.post("/reset-password/:token", userController.ResetPassword); 

export default userRouter; 
 