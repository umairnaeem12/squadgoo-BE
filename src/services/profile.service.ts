import { BadRequestError } from "../errors/badRequest.error";
import {
    UserRepository,
    RecruiterRepository,
    BasicDetailsRepository,
    TaxInfoRepository,
    SocialLinksRepository,
} from "../repositories";
import {
    CompanyDetailsInput,
    TaxInfoInput,
    SocialLinksInput,
    UpdateProfileInput,
} from "../validators/profile.validation";

/**
 * 🔹 Update the main user table (name, email, password, etc.)
 */
export const updateUserProfile = async (userId: number, data: UpdateProfileInput) => {
    const user = await UserRepository.findOne({ where: { id: userId } });
    if (!user) throw new BadRequestError("User not found.");

    Object.assign(user, data);
    await UserRepository.save(user);
    return user;
};

/**
 * 🔹 Get the full user profile (with recruiter / jobseeker role info)
 */
export const getUserProfile = async (userId: number) => {
    const user = await UserRepository.findOne({
        where: { id: userId },
        relations: ["recruiter", "recruiter.basicDetails", "recruiter.taxInfo", "recruiter.socialLinks", "jobSeeker"],
    });

    if (!user) throw new BadRequestError("User not found.");
    return user;
};

/**
 * 🔹 Update Company Details (inside Recruiter table)
 */
export const updateCompanyDetails = async (userId: number, data: CompanyDetailsInput) => {
    const user = await UserRepository.findOne({
        where: { id: userId },
        relations: ["recruiter"],
    });

    if (!user) throw new BadRequestError("User not found.");

    let recruiter = user.recruiter;

    if (!recruiter) {
        recruiter = RecruiterRepository.create({ ...data, user });
    } else {
        Object.assign(recruiter, data);
    }

    await RecruiterRepository.save(recruiter);
    return recruiter;
};

/**
 * 🔹 Update Recruiter Tax Information (linked via recruiter.taxInfo)
 */
export const updateTaxInfo = async (userId: number, data: TaxInfoInput) => {
    const recruiter = await RecruiterRepository.findOne({
        where: { user: { id: userId } },
        relations: ["taxInfo"],
    });

    if (!recruiter) throw new BadRequestError("Recruiter profile not found.");

    let taxInfo = recruiter.taxInfo;

    if (!taxInfo) {
        taxInfo = TaxInfoRepository.create({ ...data });
        await TaxInfoRepository.save(taxInfo);
        recruiter.taxInfo = taxInfo;
    } else {
        Object.assign(taxInfo, data);
        await TaxInfoRepository.save(taxInfo);
    }

    await RecruiterRepository.save(recruiter);
    return taxInfo;
};

/**
 * 🔹 Update Recruiter Social Links (linked via recruiter.socialLinks)
 */
export const updateSocialLinks = async (userId: number, data: SocialLinksInput) => {
    const recruiter = await RecruiterRepository.findOne({
        where: { user: { id: userId } },
        relations: ["socialLinks"],
    });

    if (!recruiter) throw new BadRequestError("Recruiter profile not found.");

    let socialLinks = recruiter.socialLinks;

    if (!socialLinks) {
        socialLinks = SocialLinksRepository.create({ ...data });
        await SocialLinksRepository.save(socialLinks);
        recruiter.socialLinks = socialLinks;
    } else {
        Object.assign(socialLinks, data);
        await SocialLinksRepository.save(socialLinks);
    }

    await RecruiterRepository.save(recruiter);
    return socialLinks;
};

/**
 * 🔹 Get Full Recruiter Profile (with all nested details)
 */
export const getRecruiterProfile = async (userId: number) => {
    const recruiter = await RecruiterRepository.findOne({
        where: { user: { id: userId } },
        relations: ["user", "basicDetails", "taxInfo", "socialLinks"],
    });

    if (!recruiter) throw new BadRequestError("Recruiter profile not found.");

    return recruiter;
};

export * as ProfileService from "./profile.service";
