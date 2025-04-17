import axios from "axios";

const findWaterStations = async (lat, long) => {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json`,
      {
        params: {
          location: `${lat},${long}`,
          radius: 1000,
          type: "restaurant",
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
        open_now: place.opening_hours?.open_now ?? null,
        types: place.types,
        url: `https://www.google.com/maps/place/?q=place_id:${place.place_id}`,
      };
    });
    const sortedResults = restraurents.sort((a, b) => {
      return b.rating - a.rating;
    });
    return sortedResults;
  } catch (error) {
    throw new Error("Error in API KEY");
  }
};

export default findWaterStations;
