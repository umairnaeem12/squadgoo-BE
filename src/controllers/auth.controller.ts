import { Request, Response, NextFunction } from "express";
import { forgotPasswordSchema, loginSchema, registerSchema, resetPasswordSchema, verifyEmailSchema, verifyForgotOtpSchema } from "../validators/auth.validation";
import { AuthService } from "../services/auth.service";
import { sendApiResponse } from "../utils/sendApiResponse";

export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const parsed = registerSchema.parse(req.body);
        const result = await AuthService.registerUser(parsed);

        return sendApiResponse(res, 201, "Verification code sent to your email.", result);
    } catch (error) {
        next(error);
    }
};

export const verifyEmailController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const parsed = verifyEmailSchema.parse(req.body);
        const data = await AuthService.verifyEmail(parsed);

        return sendApiResponse(res, 200, "Email verified successfully.", data);
    } catch (error) {
        next(error);
    }
};

export const resendVerificationController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email } = req.body;
        if (!email) return sendApiResponse(res, 400, "Email is required");

        const result = await AuthService.resendVerification(email);
        return sendApiResponse(res, 200, "Verification code re-sent.", result);
    } catch (error) {
        next(error);
    }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const parsed = loginSchema.parse(req.body);
        const data = await AuthService.loginUser(parsed);
        return sendApiResponse(res, 200, "Logged in successfully.", data);
    } catch (error) {
        next(error);
    }
};

export const forgotPasswordController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const parsed = forgotPasswordSchema.parse(req.body);
        const data = await AuthService.forgotPassword(parsed);
        return sendApiResponse(res, 200, "Password reset code sent to your email.", data);
    } catch (error) {
        next(error);
    }
};

export const verifyForgotOtpController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const parsed = verifyForgotOtpSchema.parse(req.body);
        const data = await AuthService.verifyForgotOtp(parsed);
        return sendApiResponse(res, 200, "Verification code verified successfully.", data);
    } catch (error) {
        next(error);
    }
};

export const resetPasswordController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parsed = resetPasswordSchema.parse(req.body);
    const data = await AuthService.resetPassword(parsed);
    return sendApiResponse(res, 200, "Password reset successfully.", data);
  } catch (error) {
    next(error);
  }
};

export * as AuthController from "./auth.controller";
