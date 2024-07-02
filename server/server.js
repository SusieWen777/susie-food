import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/useRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import bodyParser from "body-parser";
import { webhook } from "./controllers/orderController.js";
import adminRouter from "./routes/adminRoute.js";

// app config
dotenv.config();
const app = express();
const port = process.env.PORT || 4000;

// middleware
// app.use(express.json());
app.use((req, res, next) => {
  if (req.path === "/api/order/webhook") {
    bodyParser.raw({ type: "application/json" })(req, res, next);
  } else {
    express.json()(req, res, next);
  }
});
app.use(cors());

// db connection
connectDB();

// api endpoints
app.use("/api/food", foodRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/admin", adminRouter);

// app.use("/images", express.static("uploads"));

app.get("/", (req, res) => {
  res.status(200).send("API Working");
});

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
