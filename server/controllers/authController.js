import { User } from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";

const generateToken = (user) => {
  return jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" },
  );
};

const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email, password } = req.body;

    const exisitingUser = await User.findOne({ email });

    if (exisitingUser) {
      return res.status(400).json({ message: "Invalid same" });
    }

    const user = new User({ email, password });
    await user.save();

    const token = generateToken(user);

    req.session.token = token;

    res.status(201).json({ message: " user is registered" });
  } catch (error) {
    res.status(500).json({ message: "Failed to register" });
  }
};

const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "invalid wrong user" });
    }

    const isPassword = await User.comparePassword(password);
    if (!isPassword) {
      return res.status(400).json({ message: "invlid wrong password" });
    }

    const token = generateToken(user);

    req.sess.token = token;

    res.status(200).json({ message: "login successful" });
  } catch (error) {
    res.status(400).json({ message: "failed to login" });
  }
};

const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "failed to logout" });
    }
    res.status(200).json({ message: "logout successful" });
  });
};

export { register, login, logout };
