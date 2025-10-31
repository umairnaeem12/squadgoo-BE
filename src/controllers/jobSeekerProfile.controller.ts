import { Request, Response, NextFunction } from "express";
import { sendApiResponse } from "../utils/sendApiResponse";
import {
  basicDetailsSchema,
  taxInfoSchema,
  socialLinksSchema,
  jobSeekerProfileSchema,
} from "../validators/jobSeekerProfile.validation";
import { JobSeekerProfileService } from "../services/jobSeekerProfile.service";

export const updateBasicDetails = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parsed = basicDetailsSchema.parse(req.body);
    const userId = (req as any).user?.id;
    if (!userId) return sendApiResponse(res, 401, "Unauthorized");

    const result = await JobSeekerProfileService.updateBasicDetails(userId, parsed);
    return sendApiResponse(res, 200, "Basic details updated successfully", result);
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parsed = jobSeekerProfileSchema.parse(req.body);
    const userId = (req as any).user?.id;
    if (!userId) return sendApiResponse(res, 401, "Unauthorized");

    const result = await JobSeekerProfileService.updateProfile(userId, parsed);
    return sendApiResponse(res, 200, "Profile updated successfully", result);
  } catch (error) {
    next(error);
  }
};

export const updateTaxInfo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parsed = taxInfoSchema.parse(req.body);
    const userId = (req as any).user?.id;
    if (!userId) return sendApiResponse(res, 401, "Unauthorized");

    const result = await JobSeekerProfileService.updateTaxInfo(userId, parsed);
    return sendApiResponse(res, 200, "Tax info updated successfully", result);
  } catch (error) {
    next(error);
  }
};

export const updateSocialLinks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parsed = socialLinksSchema.parse(req.body);
    const userId = (req as any).user?.id;
    if (!userId) return sendApiResponse(res, 401, "Unauthorized");

    const result = await JobSeekerProfileService.updateSocialLinks(userId, parsed);
    return sendApiResponse(res, 200, "Social links updated successfully", result);
  } catch (error) {
    next(error);
  }
};

export const getProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) return sendApiResponse(res, 401, "Unauthorized");

    const profile = await JobSeekerProfileService.getProfile(userId);
    return sendApiResponse(res, 200, "Profile fetched successfully", profile);
  } catch (error) {
    next(error);
  }
};

export * as JobSeekerProfileController from "./jobSeekerProfile.controller";
