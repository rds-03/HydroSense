import mongoose, { Mongoose } from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    unique: true,
  },
  waterIntake: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "waterIntake",
  },
});

export default mongoose.Model("User", userSchema);
