import { Pet } from '../../pets/entities/pet.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({nullable: false})
  date_appointment: Date;

  @Column({nullable: true})
  type_procedure: string;

  @Column({type: 'boolean', default: true})
  state: boolean;

  @ManyToOne(() => Pet, (pet) => pet.appointments)
  pet: Pet;
}
