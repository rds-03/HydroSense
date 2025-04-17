import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import getWeather from "../Services/weatherService.js";
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, age, gender, weight } = req.body;
    if (await User.findOne({ email }))
      return res.status(400).json({ message: "User already exists" });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      age,
      gender,
      weight,
    });
    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
      });
      console.log(user);
    } else res.status(400).json({ message: "Invalid user data" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "20m",
      });
      if (!token)
        return res.status(400).json({ message: "Error in token generation" });
      res.json({ token });
    } else res.status(401).json({ message: "Invalid credentials" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const { latitude, longitude } = req.body;
    if (!latitude || !longitude) {
      return res
        .status(400)
        .json({ message: "Latitude and Longitude are required" });
    }
    const user = req.user.name;
    const weather = await getWeather(latitude, longitude);
    if (!weather)
      return res
        .status(404)
        .json({ message: "Weather not found some error with the api" });
    res.json({ ...weather, user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
