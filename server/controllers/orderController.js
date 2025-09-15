import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Placeing user order for frontend
const placeOrder = async (req, res) => {
  const frontendUrl = "http://localhost:5173";
  try {
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      total: req.body.total,
      address: req.body.address,
    });
    await newOrder.save();
    await userModel.findByIdAndUpdate(req.body.userId, { cart: {} });

    // Payment processing with stripe
    const lineItems = req.body.items.map((item) => {
      return {
        price_data: {
          currency: "sek",
          product_data: {
            name: item.name,
          },
          unit_amount: item.price * 100,
        },
        quantity: item.quantity,
      };
    });

    lineItems.push({
      price_data: {
        currency: "sek",
        product_data: {
          name: "Delivery Fee",
        },
        unit_amount: 49 * 100, // Delivery fee amount in öre
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: "payment",
      success_url: `${frontendUrl}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontendUrl}/verify?success=false&orderId=${newOrder._id}`,
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message, success: false });
  }
};

const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;
  try {
    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      res.json({ message: "Payment successful", success: true });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ message: "Payment failed", success: false });
    }
  } catch (error) {}
  console.log(error);
  res.status(500).json({ message: error.message, success: false });
};

// user orders for frontend
const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.body.userId });
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message, success: false });
  }
};

export { placeOrder, verifyOrder, userOrders };
