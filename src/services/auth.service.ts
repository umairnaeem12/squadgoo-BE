import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { BadRequestError } from "../errors/badRequest.error";
import { UserRepository, UserVerificationRepository } from "../repositories";
import { sendEmail } from "../utils/sendEmail";
import {
    ForgotPasswordInput,
    loginInput,
    RegisterInput,
    ResetPasswordInput,
    verifyEmailInput,
    VerifyForgotOtpInput,
} from "../validators/auth.validation";
import { VerificationPurpose } from "../enums/Verification.enums";
import { RoleEnum } from "../enums/Role.enums";
import { JobSeekerRepository, RecruiterRepository } from "../repositories";

export const registerUser = async (data: RegisterInput) => {
    const { firstName, lastName, email, password, referralCode, role } = data;

    const existing = await UserRepository.findOne({
        where: { email: email.toLowerCase() },
    });
    if (existing) throw new BadRequestError("Email already registered.");

    // Create base user
    const user = UserRepository.create({
        firstName,
        lastName,
        email: email.toLowerCase(),
        referralCode,
        role,
        isEmailVerified: false,
    });
    await UserRepository.save(user);

    // Create linked entity based on role
    if (role === RoleEnum.JOBSEEKER) {
        const jobSeeker = JobSeekerRepository.create({ user });
        await JobSeekerRepository.save(jobSeeker);
    }

    if (role === RoleEnum.RECRUITER) {
        const recruiter = RecruiterRepository.create({
            user,
            companyName: "", // you can require this later via onboarding
        });
        await RecruiterRepository.save(recruiter);
    }

    // Create password hash
    const passwordHash = await bcrypt.hash(password, 10);
    const passwordRecord = UserVerificationRepository.create({
        user,
        passwordHash,
        purpose: VerificationPurpose.PASSWORD,
        isUsed: true,
        expiresAt: new Date(),
    });
    await UserVerificationRepository.save(passwordRecord);

    // Create signup OTP
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

    const signupRecord = UserVerificationRepository.create({
        user,
        code: verificationCode,
        purpose: VerificationPurpose.SIGNUP,
        expiresAt,
    });
    await UserVerificationRepository.save(signupRecord);

    // Send email
    await sendEmail({
        to: user.email,
        subject: "SquadGoo Email Verification",
        text: `Welcome to SquadGoo!\n\nYour verification code is: ${verificationCode}`,
    });

    return { email: user.email };
};

// VERIFY EMAIL (SIGNUP OTP)
export const verifyEmail = async (data: verifyEmailInput) => {
    const { email, code } = data;

    const user = await UserRepository.findOne({
        where: { email: email.toLowerCase() },
        relations: ["verifications"],
    });
    if (!user) throw new BadRequestError("User not found.");

    if (user.isEmailVerified) {
        throw new BadRequestError("Account is already verified.");
    }

    const record = await UserVerificationRepository.findOne({
        where: {
            user: { id: user.id },
            code,
            purpose: VerificationPurpose.SIGNUP,
            isUsed: false,
        },
    });
    if (!record) throw new BadRequestError("Invalid or expired verification code.");
    if (record.expiresAt < new Date()) throw new BadRequestError("Code has expired.");

    record.isUsed = true;
    await UserVerificationRepository.save(record);

    user.isEmailVerified = true;
    await UserRepository.save(user);

    return {
        userId: user.id,
        email: user.email,
        role: user.role,
    };
};

// RESEND VERIFICATION CODE
export const resendVerification = async (email: string) => {
    const user = await UserRepository.findOne({ where: { email: email.toLowerCase() } });
    if (!user) throw new BadRequestError("User not found.");

    if (user.isEmailVerified) {
        throw new BadRequestError("User is already verified.");
    }

    const newCode = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

    const newRecord = UserVerificationRepository.create({
        user,
        code: newCode,
        purpose: VerificationPurpose.SIGNUP,
        expiresAt,
    });
    await UserVerificationRepository.save(newRecord);

    await sendEmail({
        to: user.email,
        subject: "SquadGoo Email Verification - New Code",
        text: `Your new verification code is: ${newCode}`,
    });

    return { email: user.email };
};

// LOGIN USER
export const loginUser = async (data: loginInput) => {
    const { email, password } = data;
    const user = await UserRepository.findOne({
        where: { email: email.toLowerCase() },
        relations: ["verifications"],
    });
    if (!user) throw new BadRequestError("Invalid email or password.");

    if (!user.isEmailVerified) {
        throw new BadRequestError("Please verify your email before logging in.");
    }

    // Get user's latest password record
    const passwordRecord = await UserVerificationRepository.findOne({
        where: {
            user: { id: user.id },
            purpose: VerificationPurpose.PASSWORD,
        },
        order: { createdAt: "DESC" },
    });

    if (!passwordRecord || !passwordRecord.passwordHash) {
        throw new BadRequestError("No password found for this account.");
    }

    const isPasswordMatch = await bcrypt.compare(password, passwordRecord.passwordHash);
    if (!isPasswordMatch) throw new BadRequestError("Invalid email or password.");

    const token = jwt.sign(
        { userId: user.id, role: user.role },
        process.env.JWT_SECRET as string,
        { expiresIn: "7d" }
    );

    return {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        token,
    };
};

// FORGOT PASSWORD (SEND OTP)
export const forgotPassword = async (data: ForgotPasswordInput) => {
    const { email } = data;
    const user = await UserRepository.findOne({ where: { email: email.toLowerCase() } });
    if (!user) throw new BadRequestError("No account found with this email.");

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

    const record = UserVerificationRepository.create({
        user,
        code,
        purpose: VerificationPurpose.FORGOT_PASSWORD,
        expiresAt,
    });
    await UserVerificationRepository.save(record);

    await sendEmail({
        to: user.email,
        subject: "SquadGoo Password Reset Code",
        text: `Your reset code is ${code}. It expires in 15 minutes.`,
    });

    return { email: user.email };
};

// VERIFY FORGOT PASSWORD OTP
export const verifyForgotOtp = async (data: VerifyForgotOtpInput) => {
    const { email, code } = data;

    const user = await UserRepository.findOne({ where: { email: email.toLowerCase() } });
    if (!user) throw new BadRequestError("User not found.");

    const record = await UserVerificationRepository.findOne({
        where: {
            user: { id: user.id },
            code,
            purpose: VerificationPurpose.FORGOT_PASSWORD,
            isUsed: false,
        },
    });

    if (!record) throw new BadRequestError("Invalid or expired code.");
    if (record.expiresAt < new Date()) throw new BadRequestError("Code has expired.");

    record.isUsed = true;
    await UserVerificationRepository.save(record);

    return { email: user.email };
};

// RESET PASSWORD (AFTER OTP VERIFIED)
export const resetPassword = async (data: ResetPasswordInput) => {
    const { email, newPassword } = data;

    const user = await UserRepository.findOne({ where: { email: email.toLowerCase() } });
    if (!user) throw new BadRequestError("User not found.");

    // ensure OTP was verified
    const verifiedOtp = await UserVerificationRepository.findOne({
        where: {
            user: { id: user.id },
            purpose: VerificationPurpose.FORGOT_PASSWORD,
            isUsed: true,
        },
        order: { createdAt: "DESC" },
    });

    if (!verifiedOtp) {
        throw new BadRequestError("Please verify your OTP before resetting your password.");
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Save new password record
    const passwordRecord = UserVerificationRepository.create({
        user,
        passwordHash: hashedPassword,
        purpose: VerificationPurpose.PASSWORD,
        isUsed: true,
        expiresAt: new Date(),
    });
    await UserVerificationRepository.save(passwordRecord);

    return { email: user.email };
};

export * as AuthService from "./auth.service";
