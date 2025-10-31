import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from "typeorm";
import User from "./User";
import BasicDetails from "./BasicDetails";
import TaxInfo from "./TaxInfo";
import SocialLinks from "./SocialLinks";

@Entity("job_seekers")
export default class JobSeeker {
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToOne(() => User, (user) => user.jobSeeker)
  @JoinColumn()
  user!: User;

  // Add JoinColumn to own the relationship
  @OneToOne(() => BasicDetails, (b) => b.jobSeeker, { cascade: true })
  @JoinColumn()
  basicDetails!: BasicDetails;

  @OneToOne(() => TaxInfo, (t) => t.jobSeeker, { cascade: true })
  @JoinColumn()
  taxInfo!: TaxInfo;

  @OneToOne(() => SocialLinks, (s) => s.jobSeeker, { cascade: true })
  @JoinColumn()
  socialLinks!: SocialLinks;

  // Resume & Skills
  @Column({ nullable: true })
  resumeUrl?: string;

  @Column({ type: "text", nullable: true })
  skills?: string;

  // Job Experience
  @Column({ nullable: true })
  jobTitle?: string;

  @Column({ nullable: true })
  industry?: string;

  @Column({ type: "text", nullable: true })
  jobDescription?: string;

  @Column({ type: "numeric", nullable: true })
  payRateMin?: number;

  @Column({ type: "numeric", nullable: true })
  payRateMax?: number;

  @Column({ type: "date", nullable: true })
  fromDate?: Date;

  @Column({ type: "date", nullable: true })
  toDate?: Date;

  // Job Preferences
  @Column({ nullable: true })
  preferredIndustry?: string;

  @Column({ nullable: true })
  preferredJobTitle?: string;

  @Column({ type: "numeric", nullable: true })
  expectedPayMin?: number;

  @Column({ type: "numeric", nullable: true })
  expectedPayMax?: number;

  @Column({ type: "text", nullable: true })
  daysAvailable?: string;

  @Column({ nullable: true })
  startTime?: string;

  @Column({ nullable: true })
  endTime?: string;

  @Column({ type: "boolean", default: false })
  manualOffers?: boolean;

  @Column({ type: "boolean", default: false })
  quickOffers?: boolean;

  @Column({ type: "numeric", nullable: true })
  receiveWithinKm?: number;

  // Education & Certification
  @Column({ nullable: true })
  qualificationType?: string;

  @Column({ nullable: true })
  institution?: string;

  @Column({ type: "numeric", nullable: true })
  yearCompleted?: number;

  @Column({ nullable: true })
  grade?: string;

  @Column({ nullable: true })
  certificationName?: string;

  @Column({ nullable: true })
  issuingOrganization?: string;

  @Column({ type: "date", nullable: true })
  issueDate?: Date;

  @Column({ type: "date", nullable: true })
  expiryDate?: Date;
}
