import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import User from "./User";

@Entity("recruiters")
export default class Recruiter {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    companyName!: string;

    @Column({ nullable: true })
    companyWebsite?: string;

    @OneToOne(() => User, (user) => user.recruiter)
    @JoinColumn()
    user!: User;
}
