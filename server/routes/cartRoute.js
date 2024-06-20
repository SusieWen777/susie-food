import express from "express";
import {
  addToCart,
  subtractFromCart,
  removeFromCart,
  getCart,
} from "../controllers/cartController.js";
import authMiddleware from "../middleware/auth.js";

const cartRouter = express.Router();

cartRouter.post("/add", authMiddleware, addToCart);
cartRouter.post("/subtract", authMiddleware, subtractFromCart);
cartRouter.post("/remove", authMiddleware, removeFromCart);
cartRouter.get("/", authMiddleware, getCart);

export default cartRouter;
