import { Router } from "express";
import { ProfileController } from "../controllers/profile.controller";
import { recruiterMiddleware } from "../middlewares/auth.middleware";

const ProfileRouter = Router();

ProfileRouter.use(recruiterMiddleware);

ProfileRouter.post("/updateProfile", ProfileController.updateProfile);
ProfileRouter.get("/getProfile", ProfileController.getProfile);
ProfileRouter.post("/updateCompanyDetails", ProfileController.updateCompanyDetails);
ProfileRouter.post("/updateTaxInfo", ProfileController.updateTaxInfo);
ProfileRouter.post("/updateSocialLinks", ProfileController.updateSocialLinks);
ProfileRouter.get("/getRecruiterProfile", ProfileController.getRecruiterProfile);

export default ProfileRouter;
