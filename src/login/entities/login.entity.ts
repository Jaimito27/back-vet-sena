import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'login' })
export class Login {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, unique: true })
  username: string;

  @Column({ nullable: false })
  password: string;
}
