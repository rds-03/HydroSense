const WaterIntake = require("../models/WaterIntake");

const logWaterIntake = async (req, res) => {
  try {
    const { amount } = req.body;
    const waterEntry = new WaterIntake({ user: req.user.id, amount });
    await waterEntry.save();
    res.json({ message: "Water intake logged", data: waterEntry });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { logWaterIntake };
