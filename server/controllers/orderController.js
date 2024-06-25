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
      metadata: { orderId: newOrder._id.toString() }, // deliver orderId to webhook
      expires_at: Math.floor(Date.now() / 1000) + 30 * 60, // expire in 30 minutes
    });

    await orderModel.findByIdAndUpdate(newOrder._id, {
      session_url: session.url,
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

// const verifyOrder = async (req, res) => {
//   const { orderId, success } = req.body;
//   try {
//     if (success === "true") {
//       await orderModel.findByIdAndUpdate(orderId, { payment: true });
//       res.json({ success: true, message: "Paid" });
//     } else {
//       await orderModel.findByIdAndDelete(orderId);
//       res.json({ success: false, message: "Not paid" });
//     }
//   } catch (error) {
//     console.error(error);
//     res.json({
//       success: false,
//       message: "Error happens when updating the payment in database",
//     });
//   }
// };

const webhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  console.log("Received webhook request.");

  // verify the signature from the Stripe webhook
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
    console.log("Webhook event parsed successfully.");
  } catch (err) {
    console.error("Webhook event parsing failed.", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  //handle the event
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    // access metadata to get orderId
    const orderId = session.metadata.orderId;
    console.log(`Handling checkout.session.completed for order ID: ${orderId}`);

    // update order payment status
    try {
      await orderModel.findByIdAndUpdate(orderId, {
        payment: "paid",
        status: "Food Processing",
      });
      console.log("Order payment status updated successfully.");
    } catch (err) {
      console.error("Failed to update order payment status.", err);
    }
  } else if (event.type === "checkout.session.expired") {
    const session = event.data.object;

    // access metadata to get orderId
    const orderId = session.metadata.orderId;
    console.log(`Handling checkout.session.expired for order ID: ${orderId}`);

    // delete the order from database
    try {
      await orderModel.findByIdAndDelete(orderId);
      console.log("Order deleted successfully due to session expiration.");
    } catch (err) {
      console.error("Failed to delete order.", err);
    }
  } else {
    console.log(`Unhandled event type: ${event.type}`);
  }

  // return a response to acknowledge receipt of the event
  res.json({ received: true });
};

// user orders for client
const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.body.userId });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.error("Error getting orders:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get orders",
    });
  }
};

// list orders for admin panel
const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ payment: "paid" });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.error("Error getting orders:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get orders",
    });
  }
};

// for updating order status
const updateStatus = async (req, res) => {
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId, {
      status: req.body.status,
    });
    res.json({ success: true, message: "Status updated" });
  } catch (error) {
    console.error("Error updating status", error);
    res.status(500).json({
      success: false,
      message: "Failed to update status",
    });
  }
};

export { placeOrder, webhook, userOrders, listOrders, updateStatus };
