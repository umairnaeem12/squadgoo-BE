import PostgresDataSource from "../data-source";

// Entities
import User from "../models/User";
import Recruiter from "../models/Recruiter";
import JobSeeker from "../models/JobSeeker";
import UserVerification from "../models/UserVerification";
import BasicDetails from "../models/BasicDetails";
import TaxInfo from "../models/TaxInfo";
import SocialLinks from "../models/SocialLinks";

// Repositories
export const UserRepository = PostgresDataSource.getRepository(User);
export const RecruiterRepository = PostgresDataSource.getRepository(Recruiter);
export const JobSeekerRepository = PostgresDataSource.getRepository(JobSeeker);
export const UserVerificationRepository = PostgresDataSource.getRepository(UserVerification);
export const BasicDetailsRepository = PostgresDataSource.getRepository(BasicDetails);
export const TaxInfoRepository = PostgresDataSource.getRepository(TaxInfo);
export const SocialLinksRepository = PostgresDataSource.getRepository(SocialLinks);