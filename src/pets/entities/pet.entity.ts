
import { Appointment } from '../../appointments/entities/appointment.entity';
import { User } from '../../users/entities/user.entity';

import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'pets' })
export class Pet {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  age: string;

  @Column({ nullable: false })
  type: string;

  @Column({ nullable: false })
  breed: string;

  @Column({ nullable: false, type: 'boolean', default: false })
  dangerous: boolean;

  @Column({ nullable: false })
  gender: string;

  @Column({type: 'boolean', default: true})
  state: boolean;

  @OneToMany(()=> Appointment, appointment => appointment.pet )
  appointments: Appointment[];

  @ManyToOne(() => User, (user) => user.pets)
  user: User;
}
