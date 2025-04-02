import express from "express";
import connectDB from "./config/dbConfig.js";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./Routes/userRoutes.js";
import getWeather from "./Services/weatherService.js";
import findWaterStations from "./Services/nearbyStationsService.js";
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/users", userRoutes);
app.use("/api/water", findWaterStations);
app.use("/api/weather", getWeather);

// Start Server
app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT} 🚀`)
);
