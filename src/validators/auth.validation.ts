import { z } from "zod";
import { RoleEnum } from "../enums/Role.enums";

export const registerSchema = z.object({
    firstName: z.string().min(2, "First name is required"),
    lastName: z.string().min(2, "Last name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    referralCode: z.string().optional(),
    role: z.enum(RoleEnum),
});

export type RegisterInput = z.infer<typeof registerSchema>;

export const verifyEmailSchema = z.object({
    email: z.string().email(),
    code: z.string().length(6, "Verification code must be 6 digits"),
});

export type verifyEmailInput = z.infer<typeof verifyEmailSchema>;

export const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

export type loginInput = z.infer<typeof loginSchema>;

export const forgotPasswordSchema = z.object({
    email: z.string().email("Invalid email address"),
});

export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;

export const verifyForgotOtpSchema = z.object({
    email: z.string().email(),
    code: z.string().length(6, "Verification code must be 6 digits"),
});

export type VerifyForgotOtpInput = z.infer<typeof verifyForgotOtpSchema>;

export const resetPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
  newPassword: z.string().min(6, "Password must be at least 6 characters"),
});
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;