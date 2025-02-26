import { User } from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role ,name:user.name,level:user.level}, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

const register = async (req, res) => {
  try {
    const { email, password, contactNumber, role, name, level } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Validate name only if level is not National
    if (level !== "National" && !name) {
      return res
        .status(400)
        .json({ message: "Name is required when level is not National" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      email,
      password: hashedPassword,
      contactNumber,
      role,
      name: level !== "National" ? name : undefined, // Set name only if level is not National
      level, // Add level to the user document
    });
    await user.save();
    console.log(user);
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
      .json({ success: true, msg: "Login successful", user:user });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};

const logout = (req, res) => {
  res.clearCookie("token").json({ success: true, msg: "Logged out" });
};

const getlevelnames = async (req, res) => {
  try {
    const { level } = req.params; 
    const formattedLevel =
      level.charAt(0).toUpperCase() + level.slice(1).toLowerCase();
   

    // Find all documents matching the level and return only 'name'
    const results = await User.find({ level: formattedLevel });

    // Extract names into an array
    const names = results.map((item) => item.name);

    return res.status(200).json({ names });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }

};


const getUserByName = async (req, res) => {
  try {
    const { name } = req.params;
    
    if (!name) {
      return res.status(400).json({ message: "Name parameter is required" });
    }

    const user = await User.findOne({ name }, "email contactNumber name level");
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
const getUserForNational = async (req, res) => {
    try {
      
      const user = await User.findOne({ level:"National" }, "email contactNumber name level");
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };




export { register, logout,getlevelnames,getUserByName,getUserForNational};
