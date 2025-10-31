import { BadRequestError } from "../errors/badRequest.error";
import {
  UserRepository,
  JobSeekerRepository,
  BasicDetailsRepository,
  TaxInfoRepository,
  SocialLinksRepository,
} from "../repositories";
import {
  BasicDetailsInput,
  TaxInfoInput,
  SocialLinksInput,
  JobSeekerProfileInput,
} from "../validators/jobSeekerProfile.validation";

export const updateBasicDetails = async (userId: number, data: BasicDetailsInput) => {
  const user = await UserRepository.findOne({
    where: { id: userId },
    relations: ["jobSeeker", "jobSeeker.basicDetails"],
  });
  if (!user) throw new BadRequestError("User not found.");
  let jobSeeker = user.jobSeeker;
  if (!jobSeeker) throw new BadRequestError("Job Seeker profile not found.");

  let basicDetails = jobSeeker.basicDetails;
  if (!basicDetails) {
    basicDetails = BasicDetailsRepository.create({ ...data });
    await BasicDetailsRepository.save(basicDetails);
    jobSeeker.basicDetails = basicDetails;
  } else {
    Object.assign(basicDetails, data);
    await BasicDetailsRepository.save(basicDetails);
  }

  await JobSeekerRepository.save(jobSeeker);
  return basicDetails;
};

export const updateProfile = async (userId: number, data: JobSeekerProfileInput) => {
  const user = await UserRepository.findOne({
    where: { id: userId },
    relations: ["jobSeeker"],
  });
  if (!user) throw new BadRequestError("User not found.");
  let jobSeeker = user.jobSeeker;
  if (!jobSeeker) throw new BadRequestError("Job Seeker profile not found.");

  Object.assign(jobSeeker, data);
  await JobSeekerRepository.save(jobSeeker);
  return jobSeeker;
};

export const updateTaxInfo = async (userId: number, data: TaxInfoInput) => {
  const user = await UserRepository.findOne({
    where: { id: userId },
    relations: ["jobSeeker", "jobSeeker.taxInfo"],
  });
  if (!user) throw new BadRequestError("User not found.");
  let jobSeeker = user.jobSeeker;
  if (!jobSeeker) throw new BadRequestError("Job Seeker profile not found.");

  let taxInfo = jobSeeker.taxInfo;
  if (!taxInfo) {
    taxInfo = TaxInfoRepository.create({ ...data });
    await TaxInfoRepository.save(taxInfo);
    jobSeeker.taxInfo = taxInfo;
  } else {
    Object.assign(taxInfo, data);
    await TaxInfoRepository.save(taxInfo);
  }

  await JobSeekerRepository.save(jobSeeker);
  return taxInfo;
};

export const updateSocialLinks = async (userId: number, data: SocialLinksInput) => {
  const user = await UserRepository.findOne({
    where: { id: userId },
    relations: ["jobSeeker", "jobSeeker.socialLinks"],
  });
  if (!user) throw new BadRequestError("User not found.");
  let jobSeeker = user.jobSeeker;
  if (!jobSeeker) throw new BadRequestError("Job Seeker profile not found.");

  let socialLinks = jobSeeker.socialLinks;
  if (!socialLinks) {
    socialLinks = SocialLinksRepository.create({ ...data });
    await SocialLinksRepository.save(socialLinks);
    jobSeeker.socialLinks = socialLinks;
  } else {
    Object.assign(socialLinks, data);
    await SocialLinksRepository.save(socialLinks);
  }

  await JobSeekerRepository.save(jobSeeker);
  return socialLinks;
};

export const getProfile = async (userId: number) => {
  const user = await UserRepository.findOne({
    where: { id: userId },
    relations: [
      "jobSeeker",
      "jobSeeker.basicDetails",
      "jobSeeker.taxInfo",
      "jobSeeker.socialLinks",
    ],
  });

  if (!user) throw new BadRequestError("User not found.");
  return user.jobSeeker;
};

export * as JobSeekerProfileService from "./jobSeekerProfile.service";
