import express from "express";
import { requireSignIn } from "../middlewares/authMiddleware.js";
import { isSystemUser } from "./../middlewares/authMiddleware.js";
import {
  addOfficeController,
  deleteOfficeController,
  getOfficeByIdController,
  getOfficesController,
  updateOfficeController,
  // deleteOfficeController,
  // getOfficeController,
  // getSingleOfficeController,
  // updateOfficeController,
} from "./../controllers/OfficeController.js";

const router = express.Router();

//route

router.post("/addoffice", requireSignIn, isSystemUser, addOfficeController);

//get Offices
router.get("/getoffice", getOfficesController);

//get Single Office
router.get("/getoffice/:id", getOfficeByIdController);

// //delete Office
router.delete("/deleteoffice/:id", deleteOfficeController);

// update office by id
router.put(
  "/updateoffice/:id",
  requireSignIn,
  isSystemUser,
  updateOfficeController
);

export default router;
