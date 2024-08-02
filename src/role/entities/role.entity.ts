
import { User } from "../../users/entities/user.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Role {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    role: string


    @OneToMany(()=> User, (user)=> user.role)
    user: User[]
}

