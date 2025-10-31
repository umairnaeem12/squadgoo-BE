import { Router } from "express";
import { jobSeekerMiddleware } from "../middlewares/auth.middleware";
import { JobSeekerProfileController } from "../controllers/jobSeekerProfile.controller";

const JobSeekerProfileRouter = Router();

JobSeekerProfileRouter.use(jobSeekerMiddleware);

JobSeekerProfileRouter.post("/updateBasicDetails", JobSeekerProfileController.updateBasicDetails);
JobSeekerProfileRouter.post("/updateProfile", JobSeekerProfileController.updateProfile);
JobSeekerProfileRouter.post("/updateTaxInfo", JobSeekerProfileController.updateTaxInfo);
JobSeekerProfileRouter.post("/updateSocialLinks", JobSeekerProfileController.updateSocialLinks);
JobSeekerProfileRouter.get("/getProfile", JobSeekerProfileController.getProfile);

export default JobSeekerProfileRouter;
