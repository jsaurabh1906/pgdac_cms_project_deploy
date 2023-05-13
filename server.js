import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import officeRoutes from "./routes/officeRoutes.js";
import vehicleRoutes from "./routes/vehicleRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";

import cors from "cors";
import formidableMiddleware from "express-formidable-v2";
import bodyParser from "body-parser";
import path from "path";
//import Booking from "./models/booking.js";
//import Booking from "./models/booking.js";
//configure env
dotenv.config();

//databse config
connectDB();

//rest object
const app = express();

//middelwares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(formidableMiddleware());
app.use(bodyParser.json({ extende: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../cms_frontend/build")));
//routes
app.use("/api/auth", authRoutes);
app.use("/api/office", officeRoutes);
app.use("/api/vehicle", vehicleRoutes);
app.use("/api/user", userRoutes);
app.use("/api/booking", bookingRoutes);
//////////////////////////////////////////////////////////////////////////

// app.post("/api/bookings", async (req, res) => {
//   const {
//     sender,
//     recipient,
//     pickupAddress,
//     deliveryAddress,
//     packageType,
//     weight,
//     cost,
//     pickupDate,
//   } = req.body;
//   const trackingNumber = generateTrackingNumber();
//   const status = "booked";
//   const booking = new Booking({
//     sender,
//     recipient,
//     pickupAddress,
//     deliveryAddress,
//     packageType,
//     weight,
//     cost,
//     pickupDate,
//     trackingNumber,
//     status,
//   });
//   await booking.save();
//   res.send(booking);
// });

// app.get("/api/bookings/:trackingNumber", async (req, res) => {
//   const trackingNumber = req.params.trackingNumber;
//   const booking = await Booking.findOne({ trackingNumber });
//   res.send(booking);
// });

// app.patch("/api/bookings/:trackingNumber", async (req, res) => {
//   const trackingNumber = req.params.trackingNumber;
//   const { status, deliveryDate } = req.body;
//   const booking = await Booking.findOneAndUpdate(
//     { trackingNumber },
//     { status, deliveryDate },
//     { new: true }
//   );
//   res.send(booking);
// });

// function generateTrackingNumber() {
//   // You could use any method you like to generate tracking numbers
//   // For example, you could use a combination of letters and numbers
//   return "ABC123";
// }

// app.post("/api/booking", async (req, res) => {
//   try {
//     const booking = new Booking(req.body);
//     const savedBooking = await booking.save();
//     res.json(savedBooking);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

///////////////////////////////////////////////////////////////////////////

// app.use("/api/mail", mailRoutes);

//rest api
// app.get("/", (req, res) => {
//   res.send("<h1>Welcome to ASP COURIERS</h1>");
// });
app.use("*", function (req, res) {
  res.sendFile(path.join(__dirname, "../cms_frontend/build/index.html"));
});
//PORT
const PORT = process.env.PORT || 8080;

//run listen
app.listen(PORT, () => {
  console.log(
    `Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan
      .white
  );
});
