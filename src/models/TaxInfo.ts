import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";
import JobSeeker from "./JobSeeker";
import Recruiter from "./Recruiter";

@Entity("tax_info")
export default class TaxInfo {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  taxFileNumber?: string;

  @Column({ nullable: true })
  australianBusinessNumber?: string;

  @Column({ nullable: true })
  taxResidencyStatus?: string;

  @OneToOne(() => JobSeeker, (jobSeeker) => jobSeeker.taxInfo)
  jobSeeker?: JobSeeker;

  @OneToOne(() => Recruiter, (recruiter) => recruiter.taxInfo)
  recruiter?: Recruiter;
}
