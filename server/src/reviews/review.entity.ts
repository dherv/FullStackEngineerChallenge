import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Employee } from '../employees/employee.entity';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  employeeId: number;

  @Column()
  pending: boolean;

  @Column()
  reviewerId: number;

  @Column({ nullable: true })
  text: string;

  @Column({ nullable: true })
  score: number;

  @ManyToOne((type) => Employee)
  @JoinColumn({ name: 'reviewerId' })
  reviewer: Employee;

  @ManyToOne((type) => Employee)
  @JoinColumn({ name: 'employeeId' })
  employee: Employee;
}
