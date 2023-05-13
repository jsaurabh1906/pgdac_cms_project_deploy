import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema(
  {
    vehicleType: {
      type: String,
      enum: ["car", "truck", "van", "suv", "motorcycle"],
      required: true,
    },
    model: {
      type: String,
      required: true,
      trim: true,
    },
    color: {
      type: String,
      required: false,
      trim: true,
    },
    chassisNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    plateNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    slug: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Vehicles", vehicleSchema);
