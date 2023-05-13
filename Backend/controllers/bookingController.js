import bookingModel from "../models/bookingModel.js";

function generateTrackingNumber() {
  let alphanumeric = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let trackingNumber = "";
  for (let i = 0; i < 10; i++) {
    trackingNumber += alphanumeric.charAt(
      Math.floor(Math.random() * alphanumeric.length)
    );
  }
  let timestamp = new Date().getTime().toString();
  trackingNumber += timestamp.substring(timestamp.length - 5);
  return trackingNumber;
}

export const addBookingController = async (req, res) => {
  try {
    const booking = req.body;
    const trackingNumber = generateTrackingNumber();
    const status = "booked";
    const newBooking = new bookingModel({ ...booking, trackingNumber, status });

    await newBooking.save();
    res.status(201).send({
      success: true,
      message: "Booking Created Successfully",
      newBooking,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in crreating Driver",
    });
  }
};

export const getBookingController = async (req, res) => {
  const id = req.params.id;
  const booking = await bookingModel.findOne({ id });
  //res.send(booking);
  res.json(booking);
};

export const updateBookingController = async (req, res) => {
  const trackingNumber = req.params.trackingNumber;
  const { status, deliveryDate } = req.body;
  const booking = await bookingModel.findOneAndUpdate(
    { trackingNumber },
    { status, deliveryDate },
    { new: true }
  );
  res.send(booking);
};
