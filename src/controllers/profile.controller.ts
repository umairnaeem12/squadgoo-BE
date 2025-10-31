import { Request, Response, NextFunction } from "express";
import { sendApiResponse } from "../utils/sendApiResponse";
import { companyDetailsSchema, socialLinksSchema, taxInfoSchema, updateProfileSchema } from "../validators/profile.validation";
import { ProfileService } from "../services/profile.service";

export const updateProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const parsed = updateProfileSchema.parse(req.body);

        // You should already have user ID from JWT middleware
        const userId = (req as any).user?.id;
        if (!userId) return sendApiResponse(res, 401, "Unauthorized");

        const updated = await ProfileService.updateUserProfile(userId, parsed);

        return sendApiResponse(res, 200, "Profile updated successfully.", updated);
    } catch (error) {
        next(error);
    }
};

export const getProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = (req as any).user?.id;
        if (!userId) return sendApiResponse(res, 401, "Unauthorized");

        const profile = await ProfileService.getUserProfile(userId);

        return sendApiResponse(res, 200, "Profile fetched successfully.", profile);
    } catch (error) {
        next(error);
    }
};

export const updateCompanyDetails = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const parsed = companyDetailsSchema.parse(req.body);
        const userId = (req as any).user?.id;
        if (!userId) return sendApiResponse(res, 401, "Unauthorized");

        const updated = await ProfileService.updateCompanyDetails(userId, parsed);
        return sendApiResponse(res, 200, "Company details updated successfully", updated);
    } catch (error) {
        next(error);
    }
};

export const updateTaxInfo = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const parsed = taxInfoSchema.parse(req.body);
        const userId = (req as any).user?.id;
        if (!userId) return sendApiResponse(res, 401, "Unauthorized");

        const updated = await ProfileService.updateTaxInfo(userId, parsed);
        return sendApiResponse(res, 200, "Tax info updated successfully", updated);
    } catch (error) {
        next(error);
    }
};

export const updateSocialLinks = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const parsed = socialLinksSchema.parse(req.body);
        const userId = (req as any).user?.id;
        if (!userId) return sendApiResponse(res, 401, "Unauthorized");

        const updated = await ProfileService.updateSocialLinks(userId, parsed);
        return sendApiResponse(res, 200, "Social links updated successfully", updated);
    } catch (error) {
        next(error);
    }
};

export const getRecruiterProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = (req as any).user?.id;
        if (!userId) return sendApiResponse(res, 401, "Unauthorized");

        const profile = await ProfileService.getRecruiterProfile(userId);
        return sendApiResponse(res, 200, "Recruiter profile fetched successfully", profile);
    } catch (error) {
        next(error);
    }
};

export * as ProfileController from "./profile.controller";
