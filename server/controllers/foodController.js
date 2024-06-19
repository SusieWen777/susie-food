import foodModel from "../models/foodModel.js";
import fs from "fs";
import { gfs } from "../routes/foodRoute.js";
import mongoose from "mongoose";

// add food item
const addFood = async (req, res) => {
  let image_filename = `${req.file.filename}`;

  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    image: image_filename,
    category: req.body.category,
  });

  try {
    await food.save();
    res.json({ success: true, message: "Food item added successfully" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Failed to add food item" });
  }
};

// all food list
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Failed to fetch food items" });
  }
};

// remove food item
const removeFood = async (req, res) => {
  const foodId = req.body.id;

  try {
    // find the food document
    const food = await foodModel.findById(foodId);
    if (!food) {
      return res
        .status(404)
        .json({ success: false, message: "Food item not found" });
    }

    // get the image filename of the food item
    const imageFilename = food.image;

    // create a GridFSBucket instance
    const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
      bucketName: "uploads",
    });

    // find the image file in GridFS
    const files = await bucket.find({ filename: imageFilename }).toArray();
    if (files.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Image file not found" });
    }

    const fileId = files[0]._id;

    // delete the image file from GridFS
    bucket.delete(fileId, async (err) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Failed to delete image from GridFS",
        });
      }
    });

    try {
      // delete the food document from MongoDB
      await foodModel.deleteOne({ _id: foodId });
      res.json({
        success: true,
        message: "Food item and image deleted successfully",
      });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ success: false, message: "Failed to delete food item" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred while deleting food item",
    });
  }
};

export { addFood, listFood, removeFood };
