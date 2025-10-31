import { Request, Response, NextFunction } from "express";
import { sendApiResponse } from "../utils/sendApiResponse";
import {
  basicDetailsSchema,
  experienceSchema,
  preferencesSchema,
  educationSchema,
  taxInfoSchema,
  socialLinksSchema,
} from "../validators/jobSeekerProfile.validation";
import { JobSeekerProfileService } from "../services/jobSeekerProfile.service";

const getUserId = (req: Request) => (req as any).user?.id;

export const updateBasicDetails = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parsed = basicDetailsSchema.parse(req.body);
    const userId = getUserId(req);
    const result = await JobSeekerProfileService.updateBasicDetails(userId, parsed);
    return sendApiResponse(res, 200, "Basic details updated successfully", result);
  } catch (error) {
    next(error);
  }
};

export const updateExperience = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parsed = experienceSchema.parse(req.body);
    const userId = getUserId(req);
    const result = await JobSeekerProfileService.updateExperience(userId, parsed);
    return sendApiResponse(res, 200, "Experience updated successfully", result);
  } catch (error) {
    next(error);
  }
};

export const updatePreferences = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parsed = preferencesSchema.parse(req.body);
    const userId = getUserId(req);
    const result = await JobSeekerProfileService.updatePreferences(userId, parsed);
    return sendApiResponse(res, 200, "Preferences updated successfully", result);
  } catch (error) {
    next(error);
  }
};

export const updateEducation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parsed = educationSchema.parse(req.body);
    const userId = getUserId(req);
    const result = await JobSeekerProfileService.updateEducation(userId, parsed);
    return sendApiResponse(res, 200, "Education updated successfully", result);
  } catch (error) {
    next(error);
  }
};

export const updateTaxInfo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parsed = taxInfoSchema.parse(req.body);
    const userId = getUserId(req);
    const result = await JobSeekerProfileService.updateTaxInfo(userId, parsed);
    return sendApiResponse(res, 200, "Tax info updated successfully", result);
  } catch (error) {
    next(error);
  }
};

export const updateSocialLinks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parsed = socialLinksSchema.parse(req.body);
    const userId = getUserId(req);
    const result = await JobSeekerProfileService.updateSocialLinks(userId, parsed);
    return sendApiResponse(res, 200, "Social links updated successfully", result);
  } catch (error) {
    next(error);
  }
};

export const getProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = getUserId(req);
    const profile = await JobSeekerProfileService.getProfile(userId);
    return sendApiResponse(res, 200, "Profile fetched successfully", profile);
  } catch (error) {
    next(error);
  }
};

export * as JobSeekerProfileController from "./jobSeekerProfile.controller";
