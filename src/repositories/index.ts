import PostgresDataSource from '../data-source';
import User from '../models/User';
import UserVerification from '../models/UserVerification';

export const UserRepository = PostgresDataSource.getRepository(User);
export const UserVerificationRepository = PostgresDataSource.getRepository(UserVerification);
