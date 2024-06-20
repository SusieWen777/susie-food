import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/useRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

// app config
dotenv.config();
const app = express();
const port = process.env.PORT;

// middleware
app.use(express.json());
app.use(cors());

// db connection
connectDB();

// api endpoints
app.use("/api/food", foodRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

// app.use("/images", express.static("uploads"));

app.get("/", (req, res) => {
  res.status(200).send("API Working");
});

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
