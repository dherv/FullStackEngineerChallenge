import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Review } from '../reviews/review.entity';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  department: string;

  @Column()
  position: string;

  @OneToMany(() => Review, (review) => review.employeeId, {
    cascade: ['insert', 'soft-remove'],
  })
  employee: Employee[];

  @OneToMany(() => Review, (review) => review.reviewerId, {
    cascade: ['insert', 'soft-remove'],
  })
  reviewer: Employee[];
}
