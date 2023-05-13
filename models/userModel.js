import mongoose from "mongoose";
//import autoincrement from "mongoose-auto-increment";
//import connectDB from "./../config/db";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: false,
      minlength: [8, "Password must be at least 8 characters long"],
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: false,
      enum: ["customer", "superAdmin", "systemUser", "deliveryValet"],
      default: "customer",
    },

    dateOfBirth: {
      type: Date,
      required: false,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: false,
    },
    address: {
      type: String,
      required: true,
    },
    mobileNo: {
      type: String,
      required: true,
      unique: true,
    },
    licenseNumber: {
      type: String,
      validate: [
        function () {
          // check if licenseNumber is required for deliveryValet role
          if (this.role === "deliveryValet") {
            return this.licenseNumber && this.licenseNumber.length > 0;
          }
          return true;
        },

        "License number is required for delivery valet role",
      ],
    },
    isActive: { type: String },
    salary: { type: Number, required: false },
  },
  { timestamps: true }
);
//autoincrement.initialize(mongoose.connection);
//userSchema.plugin(autoincrement.plugin,'User');
//modelname, schema to refer

// autoincrement.initialize(mongoose.connection);
// userSchema.plugin(autoincrement.plugin, "User");
//
//

const User = mongoose.model("User", userSchema);
export default User;

// // to join orders with customer
//db.orders.aggregate([
//     {
//         $lookup: {
//             from: "customers",
//             localField: "customerId",
//             foreignField: "_id",
//             as: "customer"
//         }
//     }
// ])
