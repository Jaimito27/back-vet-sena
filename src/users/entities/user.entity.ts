import { Pet } from "src/pets/entities/pet.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";

@Entity({name: 'users'})
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    doc_type: string;

    @Column({nullable: false, unique: true})
    ident_document: string;

    @Column({nullable: false})
    names: string;

    @Column({nullable: true})
    last_name: string;
    
    @Column({nullable: true})   
    phone: string;

    @Column({nullable: false, unique: true})
    email: string;

    @Column({type: 'datetime', default: ()=>'CURRENT_TIMESTAMP'})
    createdAt: Date;

    @Column({nullable: false, unique: true})
    username: string;

    @Column({nullable: false})
    password: string;

    @OneToMany(()=> Pet, (pet) => pet.user)
    pets: Pet[]
    
}
