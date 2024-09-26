import express from "express";
import {
  emailVerification,
  verifyEmailOtp,
  register,
  register_repo,
} from "../controllers/auth.js";

const router = express.Router();

// router.post("/generate-otp", localVariables, generateOTP);
// router.post("/verify-otp", localVariables, verifyOTP);
// router.post("/login", login);
router.post("/register", register);
router.post("/register-repo", register_repo);

router.post("/email_verification", emailVerification);
router.post("/email_verification-otp", verifyEmailOtp);

// router.post("/reset-password", reset_password);

export default router;
