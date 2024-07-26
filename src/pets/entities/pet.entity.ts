import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'pets' })
export class Pet {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: true })
    nombre: string;

    @Column({ nullable: true })
    edad: string;

    @Column({ nullable: true })
    tipo: string;

    @Column({ nullable: true })
    raza: string;

    @Column({ nullable: true })
    peligros: boolean;

    @Column({ nullable: true })
    genero: string;

    @ManyToOne(()=> User, (user) => user.id,{
        eager: true, //cuando busquemos el usuario, tare la mascota
    }) 
    user: User;


}


