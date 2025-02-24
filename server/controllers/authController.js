import { User } from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

const register = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    const exisitingUser = await User.findOne({ email });

    if (exisitingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      email,
      password: hashedPassword,
      role: role,
    });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    if (error.errors) {
      console.error("Mongoose validation errors:", error.errors);
    }
    res.status(500).json({ message: "Failed to register" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, msg: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, msg: "Invalid credentials" });
    }

    const token = generateToken(user);

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
        maxAge: 60 * 60 * 1000,
      })
      .json({ success: true, msg: "Login successful", role: user.role });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};

const logout = (req, res) => {
  res.clearCookie("token").json({ success: true, msg: "Logged out" });
};

export { register, logout };
