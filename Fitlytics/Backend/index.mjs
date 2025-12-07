import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/userRoutes.mjs";
import exerciseRoutes from "./routes/exerciseRoutes.mjs";
import mealRouter from "./routes/mealRoutes.mjs";
import cors from "cors";
import scheduleRouter from "./routes/scheduleRoutes.mjs";
import progressRouter from "./routes/progressRoutes.mjs";
import dashboardRouter from "./models/DashboardRoutes.mjs";
dotenv.config();
const app = express();
const port = 3000;
app.use(express.json());
app.use(cors());

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.DB_NAME);
  console.log("✅ MongoDb Connected Successfully");
}

app.use("/users", userRouter);
app.use("/exercise", exerciseRoutes);
app.use("/meal", mealRouter);
app.use("/schedule",scheduleRouter)
app.use("/progress", progressRouter);
app.use("/dashboard", dashboardRouter);
app.listen(port, () => {
  console.log(`Sever listening on port ${port}`);
});
