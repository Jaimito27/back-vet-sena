
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Role {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    role: string
}

