import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";
import JobSeeker from "./JobSeeker";
import Recruiter from "./Recruiter";

@Entity("basic_details")
export default class BasicDetails {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ nullable: true })
    firstName?: string;

    @Column({ nullable: true })
    lastName?: string;

    @Column({ nullable: true })
    email?: string;

    @Column({ nullable: true })
    contactNumber?: string;

    @Column({ type: "date", nullable: true })
    dateOfBirth?: Date;

    @Column({ nullable: true })
    homeAddress?: string;

    @Column({ type: "text", nullable: true })
    bio?: string;

    @OneToOne(() => JobSeeker, (jobSeeker) => jobSeeker.basicDetails)
    jobSeeker?: JobSeeker;

    @OneToOne(() => Recruiter, (recruiter) => recruiter.basicDetails)
    recruiter?: Recruiter;
}
