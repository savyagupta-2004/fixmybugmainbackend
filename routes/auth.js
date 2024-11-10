import express from "express";
import {
  emailVerification,
  verifyEmailOtp,
  register,
  register_repo,
  register_part,
  register_full,
  login,
  get_repo_details,
} from "../controllers/auth.js";

const router = express.Router();

// router.post("/generate-otp", localVariables, generateOTP);
// router.post("/verify-otp", localVariables, verifyOTP);
router.post("/login", login);
router.post("/register", register);
router.post("/register-repo", register_repo);
router.get("/GetRepoDetails/:email", get_repo_details);
router.post("/register-partTime", register_part);
router.post("/register-fullTime", register_full);
router.post("/email_verification", emailVerification);
router.post("/email_verification-otp", verifyEmailOtp);

// router.post("/reset-password", reset_password);

export default router;
