import axios from "axios";

const getWeather = async (lat, lon) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.WEATHER_API_KEY}`
    );
    return {
      city: response.data.name,
      temperature: response.data.main.temp + "°C",
      humidity: response.data.main.humidity + "%",
      description: response.data.weather[0].description,
      windSpeed: response.data.wind.speed + " m/s",
    };
  } catch (error) {
    throw new Error("Failed to fetch weather data");
  }
};

export default getWeather;
