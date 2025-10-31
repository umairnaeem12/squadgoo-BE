import { z } from "zod";

export const updateProfileSchema = z.object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    fullAddress: z.string().optional(),
    country: z.string().optional(),
    state: z.string().optional(),
    suburb: z.string().optional(),
    unit: z.string().optional(),
    houseNumber: z.string().optional(),
    streetName: z.string().optional(),
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;

// Company Details
export const companyDetailsSchema = z.object({
    companyName: z.string().min(1, "Company name is required."),
    businessName: z.string().optional(),
    email: z.string().email("Invalid email").optional(),
    businessAddress: z.string().optional(),
    directorName: z.string().optional(),
    directorContactNumber: z.string().optional(),
    directorContactEmail: z.string().email().optional(),
});

export type CompanyDetailsInput = z.infer<typeof companyDetailsSchema>;

// Tax Information
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