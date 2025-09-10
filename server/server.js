import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import foodRouter from "./routes/food.route.js";
import userRouter from "./routes/user.route.js";

dotenv.config();

// App configuration
const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares
app.use(express.json());
app.use(cors());

// DB connection
connectDB();

// API Routes
app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));
app.use("/api/user", userRouter);

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
