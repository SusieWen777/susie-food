import express from "express";
import {
  addFood,
  listFood,
  removeFood,
} from "../controllers/foodController.js";
import multer from "multer";
import mongoose from "mongoose";
import { GridFsStorage } from "multer-gridfs-storage";
import Grid from "gridfs-stream";

const foodRouter = express.Router();

// for adding food item
const conn = mongoose.connection;
export let gfs;

conn.once("open", () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("uploads");

  // Create storage engine
  const storage = new GridFsStorage({
    db: conn.db,
    file: (req, file) => {
      return {
        filename: `${Date.now()}-${file.originalname}`,
        bucketName: "uploads",
      };
    },
  });

  const upload = multer({ storage: storage });

  foodRouter.post("/add", upload.single("image"), addFood);
});

foodRouter.get("/list", listFood);

foodRouter.post("/remove/", removeFood);

export default foodRouter;
