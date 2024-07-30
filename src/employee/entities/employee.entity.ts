import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name: 'employee'})
export class Employee {
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
  email: string;

  @Column({ type: 'datetime' })
  birthdate: Date;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  creation_date: Date;

  @Column({nullable: false})
  address: string;

  @Column({nullable: false})
  occupation: string;

}
