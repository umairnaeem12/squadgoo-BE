import { Router } from "express";
import { jobSeekerMiddleware } from "../middlewares/auth.middleware";
import { JobSeekerProfileController } from "../controllers/jobSeekerProfile.controller";

const JobSeekerProfileRouter = Router();

JobSeekerProfileRouter.use(jobSeekerMiddleware);

JobSeekerProfileRouter.post("/updateBasicDetails", JobSeekerProfileController.updateBasicDetails);
JobSeekerProfileRouter.post("/updateExperience", JobSeekerProfileController.updateExperience);
JobSeekerProfileRouter.post("/updatePreferences", JobSeekerProfileController.updatePreferences);
JobSeekerProfileRouter.post("/updateEducation", JobSeekerProfileController.updateEducation);
JobSeekerProfileRouter.post("/updateTaxInfo", JobSeekerProfileController.updateTaxInfo);
JobSeekerProfileRouter.post("/updateSocialLinks", JobSeekerProfileController.updateSocialLinks);
JobSeekerProfileRouter.get("/getProfile", JobSeekerProfileController.getProfile);

export default JobSeekerProfileRouter;
