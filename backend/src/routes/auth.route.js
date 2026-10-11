import { authController } from "../controller/auth.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import validate from "../middlewares/validate.middleware.js";
import {
  loginSchema,
  registerSchema,
  resendOtpSchema,
  verifyOtpSchema,
} from "../validations/auth.validation.js";
import express from "express";

const router = express.Router();

router.post("/register", validate(registerSchema), authController.register);
router.post("/verify-otp", validate(verifyOtpSchema), authController.verifyOtp);
router.post("/login", validate(loginSchema), authController.login);
router.post("/resend-otp", validate(resendOtpSchema), authController.resendOtp);
router.post("/logout", isAuthenticated, authController.logout);
router.get("/get", isAuthenticated, authController.getMe);

export default router;
