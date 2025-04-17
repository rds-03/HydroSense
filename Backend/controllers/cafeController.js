import findWaterStations from "../Services/nearbyStationsService.js";

export const getCafeLocations = async (req, res) => {
  const { latitude, longitude } = req.body;
  console.log(latitude, longitude);

  if (!latitude || !longitude) {
    return res
      .status(400)
      .json({ message: "Latitude and Longitude are required" });
  }
  try {
    const cafeLocations = await findWaterStations(latitude, longitude);
    if (!cafeLocations) {
      return res.status(404).json({ message: "No cafe locations found" });
    }
    res.status(200).json(cafeLocations);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
