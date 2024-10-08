
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

  @Column()
  doc_type: string;

  @Column({ nullable: false, unique: true })
  ident_document: string;

  @Column({ nullable: false })
  names: string;

  @Column({ nullable: false })
  last_name: string;

  @Column({ nullable: false })
  phone: string;


  @Column({ nullable: false, unique: true })
  username: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  creation_date: Date;

  @Column({ default: 'user' })
  role: string;


  @Column({ type: 'boolean', default: true })
  state: boolean;

  @OneToMany(() => Pet, (pet) => pet.user, {cascade: true})
  pets: Pet[];
}
