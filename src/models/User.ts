import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    OneToOne,
    OneToMany,
} from "typeorm";
import Recruiter from "./Recruiter";
import JobSeeker from "./JobSeeker";
import Individual from "./Individual";
import { RoleEnum } from "../enums/Role.enums";
import UserVerification from "./UserVerification";

@Entity("users")
export default class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    firstName!: string;

    @Column()
    lastName!: string;

    @Column({ unique: true })
    email!: string;

    @Column({
        type: "enum",
        enum: RoleEnum,
    })
    role!: RoleEnum;

    @Column({ nullable: true })
    referralCode?: string;

    @Column({ default: false })
    isEmailVerified!: boolean;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @DeleteDateColumn()
    deletedAt?: Date;

    @OneToOne(() => Recruiter, (recruiter) => recruiter.user)
    recruiter!: Recruiter;

    @OneToOne(() => JobSeeker, (jobSeeker) => jobSeeker.user)
    jobSeeker!: JobSeeker;

    @OneToOne(() => Individual, (individual) => individual.user)
    individual!: Individual;

    @OneToMany(() => UserVerification, (v) => v.user)
    verifications!: UserVerification[];
}
