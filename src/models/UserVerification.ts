import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
} from "typeorm";
import User from "./User";
import { VerificationPurpose } from "../enums/Verification.enums";

@Entity("user_verifications")
export default class UserVerification {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => User, (user) => user.verifications, { onDelete: "CASCADE" })
    user!: User;

    // can store either OTP or password (depending on purpose)
    @Column({ type: "varchar", length: 6, nullable: true })
    code!: string | null;

    @Column({ type: "text", nullable: true })
    passwordHash!: string | null;

    @Column({
        type: "enum",
        enum: VerificationPurpose,
    })
    purpose!: VerificationPurpose; //'SIGNUP', 'FORGOT_PASSWORD'

    @Column({ type: "boolean", default: false })
    isUsed!: boolean;

    @Column({ type: "timestamptz" })
    expiresAt!: Date;

    @CreateDateColumn()
    createdAt!: Date;
}
