import userModel from "../models/userModel.js";

// Add item to user's cart
const addToCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cart = userData.cart || {}; // fallback

    if (!cart[req.body.itemId]) {
      cart[req.body.itemId] = 1;
    } else {
      cart[req.body.itemId] += 1;
    }

    await userModel.findByIdAndUpdate(req.body.userId, { cart });
    res.status(200).json({ success: true, message: "Item added to cart" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Error adding item to cart" });
  }
};

// Remove item from cart
const removeFromCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cart = userData.cart || {};

    if (cart[req.body.itemId] > 1) {
      cart[req.body.itemId] -= 1;
    } else {
      delete cart[req.body.itemId];
    }

    await userModel.findByIdAndUpdate(req.body.userId, { cart });
    res.status(200).json({ success: true, message: "Item removed from cart" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Error removing item from cart" });
  }
};

// Get user's cart
const getCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cart = userData.cart || {};
    res.status(200).json({ success: true, data: cart });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error fetching cart" });
  }
};

export { addToCart, removeFromCart, getCart };
