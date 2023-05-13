import express from "express";
import {
  addBookingController,
  getBookingController,
  updateBookingController,
} from "../controllers/bookingController.js";

const router = express.Router();

router.post("/", addBookingController);
router.get("/:id", getBookingController);
router.patch("/:trackingNumber", updateBookingController);
export default router;
