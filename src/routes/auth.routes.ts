import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";

const router = Router();

router.post("/register", AuthController.register);
router.post("/verify-email", AuthController.verifyEmailController);
router.post("/resend-verification", AuthController.resendVerificationController);
router.post("/login", AuthController.login);
router.post("/forgot-password", AuthController.forgotPasswordController);
router.post("/verify-forgot-otp", AuthController.verifyForgotOtpController);
router.post("/reset-password", AuthController.resetPasswordController);


export default router;
