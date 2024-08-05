import { Pet } from '../../pets/entities/pet.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, unique: true })
  username: string;

  @Column({ nullable: false, length: 8 })
  password: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  creation_date: Date;

  @Column({ default: 'user' })
  role: string;

  @Column({ default: 'none' })
  cargo: string;

  @OneToMany(() => Pet, (pet) => pet.owner)
  pets: Pet[];
}
