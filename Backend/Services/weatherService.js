const axios = require("axios");

const getWeather = async (city) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WEATHER_API_KEY}`
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch weather data");
  }
};

module.exports = { getWeather };
