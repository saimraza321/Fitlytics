import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/userRoutes.mjs";
import exerciseRoutes from "./routes/exerciseRoutes.mjs";
import mealRouter from "./routes/mealRoutes.mjs";
import cors from "cors";
dotenv.config();
const app = express();
const port = 3000;
app.use(express.json());
app.use(cors());

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(
    "mongodb+srv://Chapatti:saim1234@cluster0.gujseap.mongodb.net/FitLytics"
  );
  console.log("✅ MongoDb Connected Successfully");
}

app.use("/users", userRouter);
app.use("/exercise", exerciseRoutes);
app.use("/meal", mealRouter);

app.listen(port, () => {
  console.log(`Sever listening on port ${port}`);
});
