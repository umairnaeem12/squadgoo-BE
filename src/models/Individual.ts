import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";
import User from "./User";

@Entity("individuals")
export default class Individual {
    @PrimaryGeneratedColumn()
    id!: number;

    @OneToOne(() => User, (user) => user.individual)
    @JoinColumn()
    user!: User;
}
