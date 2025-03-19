const axios = require("axios");

const findWaterStations = async (lat, lon) => {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lon}&radius=1000&type=water_station&key=${process.env.GOOGLE_MAPS_API_KEY}`
    );
    return response.data.results;
  } catch (error) {
    throw new Error("Failed to fetch nearby water stations");
  }
};

module.exports = { findWaterStations };
