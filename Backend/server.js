import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import connectDB from "./config/dbConfig.js";
dotenv.config();
connectDB();
const app = express();
const port = 3000;

app.get("/", (req, res) =>
  res.send("HydroSense: An Application for dehydration")
);

app.get("/weather", async (req, res) => {
  try {
    const { city } = req.query;
    if (!city) {
      return res.status(400).send({
        error: "You must provide city as argument",
      });
    }
    const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WEATHER_API_KEY}&units=metric`;
    const response = await axios.get(weatherURL);
    res.json({
      temparature: response.data.main.temp,
      humidity: response.data.main.humidity,
      heat_index: response.data.main.feels_like,
      description: response.data.weather[0].description,
    });
  } catch (error) {
    console.error(error.message);

    res
      .status(500)
      .json({ error: "An error occurred while fetching weather data" });
  }
});

app.get("/water-station", async (req, res) => {
  try {
    const { lat, lng } = req.query;
    if (!lat || !lng)
      return res
        .status(400)
        .json({ error: "You must provide lat and long as argument" });
    const googleURL = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=5000&type=shops&key=${process.env.MAPS_KEY}`;
    const response = await axios.get(googleURL);
    console.log(googleURL);

    const stations = response.data.results.map((place) => ({
      name: place.name,
      address: place.vicinity,
      lat: place.geometry.location.lat,
      lng: place.geometry.location.lng,
    }));

    res.json(stations);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching water station data" });
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
