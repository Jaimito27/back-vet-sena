import { User } from '../../users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
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



  @ManyToOne(() => User, (user) => user.pets)

  owner: User;
}
