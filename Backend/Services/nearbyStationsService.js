import axios from "axios";

const findWaterStations = async (req, res) => {
  try {
    const { lat, lon } = req.query;
    if (!lat || !lon) {
      return res.status(400).json({
        error: "You must provide latitude and longitude as arguments",
      });
    }
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json`,
      {
        params: {
          location: `${lat},${lon}`,
          radius: 5000,
          type: "rest rooms",
          key: process.env.MAPS_KEY,
        },
      }
    );
    if (!response) {
      throw new Error("Failed to fetch water stations");
    }
    const restraurents = response.data.results.map((place) => {
      return {
        name: place.name,
        address: place.vicinity,
        rating: place.rating,
      };
    });
    const sortedResults = restraurents.sort((a, b) => {
      return b.rating - a.rating;
    });
    res.status(200).json(sortedResults);
  } catch (error) {
    throw new Error("Error in API KEY");
  }
};

export default findWaterStations;
