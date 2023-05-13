import express from "express";

import {
  addUserController,
  deleteUser,
  editUser,
  getUserById,
  getUsers,
  addDriverController,
  getDriversController,
  getDriverByIdController,
  deleteDriverController,
  editDriverController,
} from "../controllers/userController.js";
import {
  isAdmin,
  isSystemUser,
  requireSignIn,
} from "./../middlewares/authMiddleware.js";

const router = express.Router();

//addUser
router.post("/adduser", requireSignIn, isAdmin, addUserController);

router.get("/getuser", requireSignIn, isAdmin, getUsers);

router.get("/getuser/:id", requireSignIn, isAdmin, getUserById);
router.put("/updateuser/:id", requireSignIn, isAdmin, editUser);
router.delete("/deleteuser/:id", requireSignIn, isAdmin, deleteUser);

//////Routes for deliveryValet managed by systemUser

router.post("/adddriver", requireSignIn, isSystemUser, addDriverController);
router.get("/getdriver", requireSignIn, isSystemUser, getDriversController);
router.get(
  "/getdriver/:id",
  requireSignIn,
  isSystemUser,
  getDriverByIdController
);

router.put(
  "/updatedriver/:id",
  requireSignIn,
  isSystemUser,
  editDriverController
);
router.delete(
  "/deletedriver/:id",
  requireSignIn,
  isSystemUser,
  deleteDriverController
);
export default router;
