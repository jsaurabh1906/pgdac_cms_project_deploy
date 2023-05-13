import mongoose from "mongoose";

const officeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    contact: { type: String, required: true },
    email: { type: String, required: true },
    adminDetails: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
      match: { role: "systemUser" }, //need to check properly
    },
    
  },
  { timestamps: true }
);

export default mongoose.model("Offices", officeSchema);
