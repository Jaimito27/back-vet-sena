import { User } from '../../users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'pets' })
export class Pet {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false })
    nombre: string;

    @Column({ nullable: false })
    edad: string;

    @Column({ nullable: false })
    tipo: string;

    @Column({ nullable: false })
    raza: string;

    @Column({ nullable: false, type: 'boolean', default: false})
    peligroso: boolean;

    @Column({ nullable: false })
    genero: string;

    @ManyToOne(()=> User, (user) => user.id,{
        eager: true, //cuando busquemos el usuario, tare la mascota
    }) 
    user: User;


}
