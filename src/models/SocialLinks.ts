import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";
import JobSeeker from "./JobSeeker";
import Recruiter from "./Recruiter";

@Entity("social_links")
export default class SocialLinks {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  linkedinProfile?: string;

  @Column({ nullable: true })
  facebookProfile?: string;

  @Column({ nullable: true })
  twitterProfile?: string;

  @Column({ nullable: true })
  instagramProfile?: string;

  @Column({ nullable: true })
  githubProfile?: string;

  @OneToOne(() => JobSeeker, (jobSeeker) => jobSeeker.socialLinks)
  jobSeeker?: JobSeeker;

  @OneToOne(() => Recruiter, (recruiter) => recruiter.socialLinks)
  recruiter?: Recruiter;
}
