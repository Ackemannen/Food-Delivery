import foodModel from "../models/foodModel.js";
import fs from "fs";

// Add food item

const addFood = async (req, res) => {
  let imageFilename = `${req.file.filename}`;
  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: imageFilename,
  });
  try {
    await food.save();
    res.status(201).send("Food item added successfully");
  } catch (error) {
    res.status(500).send("Error adding food item");
  }
};

// All food list
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.status(200).json({ success: true, data: foods });
  } catch (error) {
    res.status(500).send("Error fetching food items: " + error);
  }
};

// Remove food item
const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);
    fs.unlink(`uploads/${food.image}`, (err) => {});
    await foodModel.findByIdAndDelete(req.body.id);
    res.status(200).send("Food item removed successfully");
  } catch (error) {
    res.status(500).send("Error removing food item: " + error);
  }
};

export { addFood, listFood, removeFood };
