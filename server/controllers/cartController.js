import userModel from "../models/userModel.js";

// add items to user cart
const addToCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = userData.cartData;
    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }
    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({ success: true, message: "Item added to cart" });
  } catch (error) {
    console.error(error);
    res.json({
      success: false,
      message: "Error occurs when adding one item to the cart",
    });
  }
};

// subtract items from user cart
const subtractFromCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = userData.cartData;
    const itemId = req.body.itemId;
    if (cartData[itemId] && cartData[itemId] > 0) {
      cartData[itemId] -= 1;
    }
    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({ success: true, message: "Item subtracted from cart" });
  } catch (error) {
    console.error(error);
    res.json({
      success: false,
      message: "Error occurs when subtracting one item from the cart",
    });
  }
};

// remove items from user cart
const removeFromCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = userData.cartData;
    const itemId = req.body.itemId;

    if (cartData[itemId]) {
      delete cartData[itemId];
    }

    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({ success: true, message: "Items removed from cart" });
  } catch (error) {
    console.error(error);
    res.json({
      success: false,
      message: "Error occurs when removing the items from the cart",
    });
  }
};

// fetch user cart data
const getCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = userData.cartData;
    res.json({ success: true, cartData });
  } catch (error) {
    console.error(error);
    res.json({
      success: false,
      message: "Error occurs when fetching cartData",
    });
  }
};

export { addToCart, subtractFromCart, removeFromCart, getCart };
