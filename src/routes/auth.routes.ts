import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";

const AuthRouter = Router();

AuthRouter.post("/register", AuthController.register);
AuthRouter.post("/verify-email", AuthController.verifyEmailController);
AuthRouter.post("/resend-verification", AuthController.resendVerificationController);
AuthRouter.post("/login", AuthController.login);
AuthRouter.post("/forgot-password", AuthController.forgotPasswordController);
AuthRouter.post("/verify-forgot-otp", AuthController.verifyForgotOtpController);
AuthRouter.post("/reset-password", AuthController.resetPasswordController);


export default AuthRouter;
