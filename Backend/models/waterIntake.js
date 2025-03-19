import mongoose from "mongoose";

const waterIntakeSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  amount: {
    type: Number,
  },
  timestamp: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.Model("waterIntake", waterIntakeSchema);
