import { z } from "zod";

// Basic Details
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

// Job Experience
export const experienceSchema = z.object({
  industry: z.string().optional(),
  jobTitle: z.string().optional(),
  jobDescription: z.string().optional(),
  payRateMin: z.coerce.number().optional(),
  payRateMax: z.coerce.number().optional(),
  fromDate: z.coerce.date().optional(),
  toDate: z.coerce.date().optional(),
});

export type ExperienceInput = z.infer<typeof experienceSchema>;

export const updateAddressSchema = z.object({
  fullAddress: z.string().min(2, "Full address is required"),
  country: z.string().min(2, "Country is required"),
  state: z.string().min(2, "State is required"),
  suburb: z.string().min(2, "Suburb is required"),
  unit: z.string().optional().nullable(),
  houseNumber: z.string().optional().nullable(),
  streetName: z.string().optional().nullable(),
});

export type updateAddressInput = z.infer<typeof updateAddressSchema>;

// Job Preferences
export const preferencesSchema = z.object({
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
});
export type PreferencesInput = z.infer<typeof preferencesSchema>;

// Education & Qualification
export const educationSchema = z.object({
  qualificationType: z.string().optional(),
  institution: z.string().optional(),
  yearCompleted: z.number().optional(),
  grade: z.string().optional(),
  certificationName: z.string().optional(),
  issuingOrganization: z.string().optional(),
  issueDate: z.string().optional(),
  expiryDate: z.string().optional(),
});
export type EducationInput = z.infer<typeof educationSchema>;

// Tax Info
export const taxInfoSchema = z.object({
  taxFileNumber: z.string().optional(),
  australianBusinessNumber: z.string().optional(),
  taxResidencyStatus: z.string().optional(),
});
export type TaxInfoInput = z.infer<typeof taxInfoSchema>;

// Social Links
export const socialLinksSchema = z.object({
  linkedinProfile: z.string().url().optional(),
  facebookProfile: z.string().url().optional(),
  twitterProfile: z.string().url().optional(),
  instagramProfile: z.string().url().optional(),
  githubProfile: z.string().url().optional(),
});

export type SocialLinksInput = z.infer<typeof socialLinksSchema>;
