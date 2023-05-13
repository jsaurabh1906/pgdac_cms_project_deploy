import express from "express";
import {
  createVehicleController,
  deleteVehicleController,
  getSingleVehicleController,
  getVehicleController,
  updateVehicleController,
} from "../controllers/vehicleController.js";
import {
  isSystemUser,
  requireSignIn,
} from "./../middlewares/authMiddleware.js";

const router = express.Router();

//route

router.post(
  "/create-vehicle",
  requireSignIn,
  isSystemUser,
  createVehicleController
);

//get vehicles
router.get("/get-vehicle", getVehicleController);

//get Single Office
router.get("/get-vehicle/:_id", getSingleVehicleController);

router.put(
  "/update-vehicle/:pid",
  requireSignIn,
  isSystemUser,
  updateVehicleController
);

router.delete(
  "/delete-vehicle/:pid",
  requireSignIn,
  isSystemUser,
  deleteVehicleController
);
export default router;
