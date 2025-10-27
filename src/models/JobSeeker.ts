import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import User from "./User";

@Entity("job_seekers")
export default class JobSeeker {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ nullable: true })
    resumeUrl?: string;

    @Column({ nullable: true })
    skills?: string;

    @OneToOne(() => User, (user) => user.jobSeeker)
    @JoinColumn()
    user!: User;
}
