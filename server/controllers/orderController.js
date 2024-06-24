import Stripe from "stripe";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import dotenv from "dotenv";

dotenv.config();

// set up stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// placing user order
const placeOrder = async (req, res) => {
  const client_url = "http://localhost:5173";

  try {
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });
    await newOrder.save();
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    // for stripe payment
    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "aud",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: "aud",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: 8 * 100,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: "payment",
      success_url: `${client_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${client_url}/verify?success=false&orderId=${newOrder._id}`,
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({
      success: false,
      message: "Failed to place order",
      error: error.message,
    });
  }
};

const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;
  try {
    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      res.json({ success: true, message: "Paid" });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false, message: "Not paid" });
    }
  } catch (error) {
    console.error(error);
    res.json({
      success: false,
      message: "Error happens when updating the payment in database",
    });
  }
};

export { placeOrder, verifyOrder };
