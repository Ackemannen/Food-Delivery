import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

// Login User
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).send("User not found");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send("Invalid credentials");
    }

    const token = createToken(user._id);
    res.status(200).json({ token: token }).send("User logged in successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error logging in user");
  }
};

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

// Register User
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // Checking if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).send("User already exists");
    }
    // Validate email and strong password
    if (!validator.isEmail(email)) {
      return res.status(400).send("Invalid email");
    }
    if (password.length < 8) {
      return res.status(400).send("Password must be at least 8 characters");
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new userModel({ name, email, password: hashedPassword });
    const user = await newUser.save();

    // Create token
    const token = createToken(user._id);
    res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error registering user");
  }
};

export { loginUser, registerUser };
