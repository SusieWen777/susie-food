import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

// login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    // check if user exists
    const user = await userModel.findOne({ email });
    if (!user)
      return res.json({ success: false, message: "User doesn't exist" });

    // check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.json({ success: false, message: "Invalid credentials" });

    // create token and send response
    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Error" });
  }
};

// create token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

// register user
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // check if email is already used
    const exists = await userModel.findOne({ email });
    if (exists)
      return res.json({ success: false, message: "User already exists" });

    // validate email format
    if (!validator.isEmail(email))
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });

    //  validate strong password
    if (!validator.isStrongPassword(password)) {
      return res.json({
        success: false,
        message:
          "Password must be at least 8 characters long & should contain at least 1 lowercase, 1 uppercase, 1 number & 1 symbol",
      });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create new user
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    // save user
    const user = await newUser.save();

    // create token and send response
    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Error" });
  }
};

export { loginUser, registerUser };
