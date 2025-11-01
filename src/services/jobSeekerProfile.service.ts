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
  ExperienceInput,
  PreferencesInput,
  EducationInput,
  TaxInfoInput,
  SocialLinksInput,
  updateAddressInput,
} from "../validators/jobSeekerProfile.validation";

async function ensureJobSeeker(userId: number) {
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

  let jobSeeker = user.jobSeeker;
  if (!jobSeeker) {
    jobSeeker = JobSeekerRepository.create({ user });
    await JobSeekerRepository.save(jobSeeker);
  }
  return jobSeeker;
}

// Basic Details
export const updateBasicDetails = async (userId: number, data: BasicDetailsInput) => {
  const jobSeeker = await ensureJobSeeker(userId);
  let basicDetails = jobSeeker.basicDetails;

  if (!basicDetails) basicDetails = BasicDetailsRepository.create(data);
  else Object.assign(basicDetails, data);

  await BasicDetailsRepository.save(basicDetails);
  jobSeeker.basicDetails = basicDetails;
  await JobSeekerRepository.save(jobSeeker);
  return basicDetails;
};

// Job Experience
export const updateExperience = async (userId: number, data: ExperienceInput) => {
  const jobSeeker = await ensureJobSeeker(userId);

  // Map each field explicitly so TypeORM picks up changes
  jobSeeker.industry = data.industry ?? jobSeeker.industry;
  jobSeeker.jobTitle = data.jobTitle ?? jobSeeker.jobTitle;
  jobSeeker.jobDescription = data.jobDescription ?? jobSeeker.jobDescription;
  jobSeeker.payRateMin = data.payRateMin ?? jobSeeker.payRateMin;
  jobSeeker.payRateMax = data.payRateMax ?? jobSeeker.payRateMax;
  jobSeeker.fromDate = data.fromDate ?? jobSeeker.fromDate;
  jobSeeker.toDate = data.toDate ?? jobSeeker.toDate;

  await JobSeekerRepository.save(jobSeeker);
  return jobSeeker;
};

export const updateAddress = async (userId: number, input: updateAddressInput) => {
  const user = await UserRepository.findOne({ where: { id: userId } });
  if (!user) throw new BadRequestError("User not found.");

  user.fullAddress = input.fullAddress;
  user.country = input.country;
  user.state = input.state;
  user.suburb = input.suburb;
  user.unit = input.unit ?? undefined;
  user.houseNumber = input.houseNumber ?? undefined;
  user.streetName = input.streetName ?? undefined;

  await UserRepository.save(user);

  return {
    id: user.id,
    fullAddress: user.fullAddress,
    country: user.country,
    state: user.state,
    suburb: user.suburb,
    unit: user.unit,
    houseNumber: user.houseNumber,
    streetName: user.streetName,
    updatedAt: user.updatedAt,
  };
};

// Job Preferences
export const updatePreferences = async (userId: number, data: PreferencesInput) => {
  const jobSeeker = await ensureJobSeeker(userId);
  Object.assign(jobSeeker, data);
  await JobSeekerRepository.save(jobSeeker);
  return jobSeeker;
};

// Education & Qualifications
export const updateEducation = async (userId: number, data: EducationInput) => {
  const jobSeeker = await ensureJobSeeker(userId);
  Object.assign(jobSeeker, data);
  await JobSeekerRepository.save(jobSeeker);
  return jobSeeker;
};

// Tax Info
export const updateTaxInfo = async (userId: number, data: TaxInfoInput) => {
  const jobSeeker = await ensureJobSeeker(userId);
  let taxInfo = jobSeeker.taxInfo;

  if (!taxInfo) taxInfo = TaxInfoRepository.create(data);
  else Object.assign(taxInfo, data);

  await TaxInfoRepository.save(taxInfo);
  jobSeeker.taxInfo = taxInfo;
  await JobSeekerRepository.save(jobSeeker);
  return taxInfo;
};

// Social Links
export const updateSocialLinks = async (userId: number, data: SocialLinksInput) => {
  const jobSeeker = await ensureJobSeeker(userId);
  let socialLinks = jobSeeker.socialLinks;

  if (!socialLinks) socialLinks = SocialLinksRepository.create(data);
  else Object.assign(socialLinks, data);

  await SocialLinksRepository.save(socialLinks);
  jobSeeker.socialLinks = socialLinks;
  await JobSeekerRepository.save(jobSeeker);
  return socialLinks;
};

// Full Profile
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
