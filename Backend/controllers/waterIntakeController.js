import waterIntake from "../models/waterIntake";

const logWaterIntake = async (req, res) => {
  try {
    const { amount } = req.body;
    const waterEntry = new waterIntake({ user: req.user.id, amount });
    await waterEntry.save();
    res.json({ message: "Water intake logged", data: waterEntry });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { logWaterIntake };
