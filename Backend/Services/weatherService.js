import axios from "axios";

const getWeather = async (req, res) => {
  try {
    const { city } = req.query;
    if (!city) {
      return res.status(400).json({
        error: "You must provides a city name as an argument",
      });
    }
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WEATHER_API_KEY}`
    );
    res.status(201).json({
      city: response.data.name,
      temperature: (response.data.main.temp - 273.15).toFixed(2) + "°C",
      humidity: response.data.main.humidity + "%",
      description: response.data.weather[0].description,
      windSpeed: response.data.wind.speed + " m/s",
    });
  } catch (error) {
    throw new Error("Failed to fetch weather data");
  }
};

export default getWeather;
