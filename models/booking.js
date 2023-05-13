// import mongoose from "mongoose";

// const bookingSchema = new mongoose.Schema({
//   sender: {
//     type: String,
//     required: true,
//   },
//   recipient: {
//     type: String,
//     required: true,
//   },
//   pickupAddress: {
//     type: String,
//     required: true,
//   },
//   deliveryAddress: {
//     type: String,
//     required: true,
//   },
//   packageType: {
//     type: String,
//     required: true,
//   },
//   weight: {
//     type: Number,
//     required: true,
//   },
//   cost: {
//     type: Number,
//     required: true,
//   },
//   status: {
//     type: String,
//     //required: true,
//     enum: ["booked", "in transit", "out for delivery", "delivered"],
//   },
//   pickupDate: {
//     type: Date,
//     required: true,
//   },
//   deliveryDate: {
//     type: Date,
//   },
//   trackingNumber: {
//     type: String,
//     //required: true,
//     //sunique: true,
//   },
// });

// // const Booking = mongoose.model('Booking', bookingSchema);

// // export default module.exports = Booking;

// export default mongoose.model("Booking", bookingSchema);

import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  senderName: String,
  senderAddress: String,
  senderPhone: String,
  receiverName: String,
  receiverAddress: String,
  receiverPhone: String,
  courierType: String,
  courierWeight: Number,
  courierDescription: String,
});

// const Booking = mongoose.model("Booking", bookingSchema);

// module.exports = Booking;
export default mongoose.model("Booking", bookingSchema);
