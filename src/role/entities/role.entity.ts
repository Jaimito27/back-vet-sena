import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Role {

    @PrimaryGeneratedColumn('uuid')
    id: string;


    @Column({nullable: false, unique: true})
    username: string;

    @Column({nullable: false})
    password: string;
}
