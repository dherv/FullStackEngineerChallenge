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

  @OneToMany((type) => Review, (review) => review.employeeId, {
    cascade: ['insert'],
  })
  employee: Employee[];

  @OneToMany((type) => Review, (review) => review.reviewerId, {
    cascade: ['insert'],
  })
  reviewer: Employee[];
}
