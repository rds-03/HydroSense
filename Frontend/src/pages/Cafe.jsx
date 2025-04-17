import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const HydrationCenters = () => {
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [geoError, setGeoError] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStations = (latitude, longitude) => {
      if (!token) {
        navigate("/unauthorized");
        return;
      }
      axios
        .post(
          "http://localhost:3000/api/services/water",
          { latitude, longitude },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          setStations(res.data);
        })
        .catch((err) => {
          console.error("Error fetching stations:", err);
        })
        .finally(() => setLoading(false));
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchStations(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          setGeoError("Geolocation permission denied or unavailable.");
          setLoading(false);
        }
      );
    } else {
      setGeoError("Geolocation is not supported by your browser.");
      setLoading(false);
    }
  }, []);

  if (loading)
    return <p className="text-center mt-8 text-blue-500">Loading...</p>;
  if (geoError)
    return <p className="text-center mt-8 text-red-500">{geoError}</p>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">
        Nearby Refreshment Centers 💧
      </h2>
      {stations.length === 0 ? (
        <p className="text-center text-gray-600">
          No refreshment centers found nearby.
        </p>
      ) : (
        <div className="space-y-6">
          {stations.map((station, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-xl p-5 border border-gray-100"
            >
              <h3 className="text-xl font-semibold text-gray-800">
                {station.name}
              </h3>
              <p className="text-gray-600 mb-1">{station.address}</p>
              <p className="text-sm text-yellow-500 mb-1">
                ⭐ {station.rating ?? "Not Rated"}
              </p>
              <p
                className={`text-sm mb-3 ${
                  station.open_now ? "text-green-600" : "text-red-600"
                }`}
              >
                {station.open_now !== null
                  ? station.open_now
                    ? "Open Now"
                    : "Closed Now"
                  : "Opening Hours Unknown"}
              </p>
              <button
                onClick={() => window.open(station.url, "_blank")}
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md"
              >
                Get Directions
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HydrationCenters;
