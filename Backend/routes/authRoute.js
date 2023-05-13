import express from "express";
import {
  registerController,
  loginController,
  testController,
  forgotPasswordController,
  resetPasswordController,
} from "../controllers/authController.js";
import { registerMail } from "../controllers/mailController.js";
import {
  isAdmin,
  isDeliveryValet,
  isSystemUser,
  requireSignIn,
} from "../middlewares/authMiddleware.js";

//router object
const router = express.Router();

//routing
//REGISTER || METHOD POST
router.post("/register", registerController);

//LOGIN || POST
router.post("/login", loginController);

//test routes
router.get("/test", requireSignIn, isAdmin, testController);

//protected route auth
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});
router.get("/systemUser-auth", requireSignIn, isSystemUser, (req, res) => {
  res.status(200).send({ ok: true });
});
router.get(
  "/deliveryValet-auth",
  requireSignIn,
  isDeliveryValet,
  (req, res) => {
    res.status(200).send({ ok: true });
  }
);

//router.post("/forgot-password", forgotPasswordController);

//router.post("reset-password", resetPasswordController);

router.post("/send-email",registerMail)

export default router;
