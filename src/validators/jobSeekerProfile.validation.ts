import { z } from "zod";

export const basicDetailsSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().email().optional(),
  contactNumber: z.string().optional(),
  dateOfBirth: z.string().optional(),
  homeAddress: z.string().optional(),
  bio: z.string().optional(),
});

export type BasicDetailsInput = z.infer<typeof basicDetailsSchema>;

export const taxInfoSchema = z.object({
  taxFileNumber: z.string().optional(),
  australianBusinessNumber: z.string().optional(),
  taxResidencyStatus: z.string().optional(),
});

export type TaxInfoInput = z.infer<typeof taxInfoSchema>;

export const socialLinksSchema = z.object({
  linkedinProfile: z.string().url().optional(),
  facebookProfile: z.string().url().optional(),
  twitterProfile: z.string().url().optional(),
  instagramProfile: z.string().url().optional(),
  githubProfile: z.string().url().optional(),
});

export type SocialLinksInput = z.infer<typeof socialLinksSchema>;

export const jobSeekerProfileSchema = z.object({
  resumeUrl: z.string().optional(),
  skills: z.string().optional(),
  jobTitle: z.string().optional(),
  industry: z.string().optional(),
  jobDescription: z.string().optional(),
  payRateMin: z.number().optional(),
  payRateMax: z.number().optional(),
  fromDate: z.string().optional(),
  toDate: z.string().optional(),
  preferredIndustry: z.string().optional(),
  preferredJobTitle: z.string().optional(),
  expectedPayMin: z.number().optional(),
  expectedPayMax: z.number().optional(),
  daysAvailable: z.string().optional(),
  startTime: z.string().optional(),
  endTime: z.string().optional(),
  manualOffers: z.boolean().optional(),
  quickOffers: z.boolean().optional(),
  receiveWithinKm: z.number().optional(),
  qualificationType: z.string().optional(),
  institution: z.string().optional(),
  yearCompleted: z.number().optional(),
  grade: z.string().optional(),
  certificationName: z.string().optional(),
  issuingOrganization: z.string().optional(),
  issueDate: z.string().optional(),
  expiryDate: z.string().optional(),
});

export type JobSeekerProfileInput = z.infer<typeof jobSeekerProfileSchema>;
