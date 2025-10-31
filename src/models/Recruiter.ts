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

@Entity("recruiters")
export default class Recruiter {
  @PrimaryGeneratedColumn()
  id!: number;

  // Company Details
  @Column()
  companyName!: string;

  @Column({ nullable: true })
  businessName?: string;

  @Column({ nullable: true })
  email?: string;

  @Column({ nullable: true })
  businessAddress?: string;

  @Column({ nullable: true })
  directorName?: string;

  @Column({ nullable: true })
  directorContactNumber?: string;

  @Column({ nullable: true })
  directorContactEmail?: string;

  // Relations
  @OneToOne(() => User, (user) => user.recruiter)
  @JoinColumn()
  user!: User;

  // Recruiter owns these one-to-one relations
  @OneToOne(() => BasicDetails, (b) => b.recruiter, { cascade: true })
  @JoinColumn()
  basicDetails!: BasicDetails;

  @OneToOne(() => TaxInfo, (t) => t.recruiter, { cascade: true })
  @JoinColumn()
  taxInfo!: TaxInfo;

  @OneToOne(() => SocialLinks, (s) => s.recruiter, { cascade: true })
  @JoinColumn()
  socialLinks!: SocialLinks;
}
