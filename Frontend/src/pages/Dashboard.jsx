import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { WiHumidity, WiStrongWind } from "react-icons/wi";
import { FaTemperatureHigh } from "react-icons/fa";
import { BsFillCloudSunFill } from "react-icons/bs";
const Dashboard = () => {
  const [weather, setWeather] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWeather = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/unauthorized");
        return;
      }

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          try {
            const response = await axios.post(
              "http://localhost:3000/api/users/dashboard",
              { latitude, longitude },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            setWeather(response.data);
          } catch (error) {
            if (error.response && error.response.status === 401) {
              navigate("/unauthorized");
            } else {
              console.error("Weather fetch error:", error);
            }
          }
        });
      }
    };
    fetchWeather();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-white to-blue-100 flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">
        Weather Dashboard
      </h1>

      {!weather ? (
        <p className="text-gray-700 text-lg">Fetching weather details...</p>
      ) : (
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl p-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex items-center space-x-4">
            <FaTemperatureHigh className="text-4xl text-red-500" />
            <div>
              <h2 className="text-lg font-semibold">Temperature</h2>
              <p className="text-gray-700">{weather.temperature}°C</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <WiHumidity className="text-5xl text-blue-500" />
            <div>
              <h2 className="text-lg font-semibold">Humidity</h2>
              <p className="text-gray-700">{weather.humidity}%</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <WiStrongWind className="text-5xl text-green-600" />
            <div>
              <h2 className="text-lg font-semibold">Wind Speed</h2>
              <p className="text-gray-700">{weather.windSpeed} m/s</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <BsFillCloudSunFill className="text-4xl text-yellow-500" />
            <div>
              <h2 className="text-lg font-semibold">Overview</h2>
              <p className="text-gray-700 capitalize">{weather.weather}</p>
            </div>
          </div>

          <div className="col-span-1 sm:col-span-2 text-center mt-4 text-gray-600">
            <p className="text-md">
              Location: <strong>{weather.city}</strong>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
